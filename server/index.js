require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const controller = require("./controller");
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;
const app = express();

app.use(express.json());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
      //max age 10 mins
      maxAge: 1000 * 60 * 10
    }
  })
);

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("database connected");
});

app.post("/auth/register", controller.register);
app.post("/auth/login", controller.login);
app.post("/auth/logout", controller.logout);
app.get("/auth/me", controller.me);

//takes two query strings: userposts and search
app.get("/api/posts/", controller.searchPosts);
app.get("/api/post/:id", controller.getPost);
app.post("/api/post/", controller.addPost);

const port = SERVER_PORT || 4040;
app.listen(port, () => console.log(`Server running on port ${port}`));
