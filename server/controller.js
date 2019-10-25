module.exports = {
  register: async (req, res) => {
    const { username, password } = req.body;
    const db = req.app.get("db");
    let newUser = await db.register(username, password);
    newUser = newUser[0];
    res.status(200).send(newUser);
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    const db = req.app.get("db");
    let foundUser = await db.login(username, password);
    if (foundUser) {
      res.status(202).send(foundUser);
    } else {
      res.status(401).send("username or password incorrect");
    }
  }
};
