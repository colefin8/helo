const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    const { username, password } = req.body;
    const db = req.app.get("db");
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    let newUser = await db.register(username, hash);
    newUser = newUser[0];
    req.session.userId = newUser.id;
    res.status(200).send(newUser);
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    const db = req.app.get("db");
    let foundUser = await db.login(username, password);
    foundUser = foundUser[0];
    const authenticated = bcrypt.compareSync(password, foundUser.password);
    if (authenticated) {
      delete foundUser.password;
      // console.log(foundUser);
      req.session.userId = foundUser[0].id;
      if (foundUser) {
        res.status(202).send(foundUser);
      } else {
        res.status(401).send("username not found");
      }
    } else {
      res.status(401).send("password incorrect");
    }
  },

  searchPosts: async (req, res) => {
    const { userposts, search } = req.query;
    const db = req.app.get("db");
    const allPosts = await db.get_posts();
    let filtered = null;
    console.log(allPosts);

    //filters all posts based on whether or not "my posts" is checked and if there is a search query bc i didn't want to do it in db queries
    if (userposts === "true" && search) {
      filtered = allPosts.filter((e, i) => {
        if (e.title.includes(search)) return true;
      });
    } else if (userposts === "false" && search) {
      filtered = allPosts.filter((e, i) => {
        if (e.author_id !== req.session.id && e.title.includes(search))
          return true;
      });
    } else if (userposts === "true" && !search) {
      filtered = allPosts;
    } else {
      filtered = allPosts.filter((e, i) => {
        if (e.author_id !== req.session.userId) return true;
      });
    }
    res.status(200).send(filtered);
  },
  getPost: async (req, res) => {
    const { id } = req.params;
    const db = req.app.get("db");
    let post = await db.get_post(+id);
    post = post[0];
    res.status(200).send(post);
  },
  addPost: (req, res) => {
    const { title, image, content } = req.body;
    const db = req.app.get("db");
    db.add_post(title, image, content, req.session.userId);
    res.sendStatus(200);
  },
  logout: (req, res) => {
    req.session.destroy;
    res.sendStatus(200);
  },
  me: async (req, res) => {
    const db = req.app.get("db");
    // console.log(req.session);
    //returning the session with the userId correctly
    //userId is an int not a string
    let user = await db.me(req.session.userId);
    // console.log(user);
    // returning the correct user so... go figure
    user = user[0];
    const { username, profile_pic } = user;
    res.status(200).send({ username, profile_pic });
  }
};
