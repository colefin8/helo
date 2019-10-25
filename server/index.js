require("dotenv").config();
const express = require("express");
const massive = require("massive");
const controller = require("./controller");
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;
const app = express();

app.use(express.json());

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("database connected");
});

app.post("/auth/register", controller.register);
app.post("/auth/login", controller.login);
app.get('/api/posts/?usesrposts=boolean&search=string', controller.)

const port = SERVER_PORT || 4040;
app.listen(port, () => console.log(`Server running on port ${port}`));
