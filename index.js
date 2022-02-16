require("dotenv/config");
require("./db");

const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const routes = require("./routes");
const MongoDBStore = require("connect-mongodb-session")(session);

const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    store,
  })
);

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(routes);

app.listen(process.env.PORT || 3000);
