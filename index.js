const express = require("express");
const app = express();
const session = require("express-session");
const MysqlStore = require("express-mysql-session")(session);
const JWT = require("jsonwebtoken");
const PORT = 5000;

const chalk = require("chalk");
const home = require("./routes/home");
const addProduct = require("./routes/addProduct");
const editProduct = require("./routes/editProduct");
const deleteProduct = require("./routes/deleteProduct");
const tryCookie = require("./routes/tryCookie");
const userAuth = require("./routes/userAuth");

const options = {
  connectionLimit: 10,
  port: 3306,
  host: "localhost",
  database: "mystore",
  user: "root",
  password: "admin",
  createDatabaseTable: true,
};
const sessionStore = new MysqlStore(options);

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(__dirname));

app.use(
  session({
    secret: "It is a secret key",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

app.get("/tryJWT", (req, res) => {
  const token = JWT.sign({ isLoggedIn: true }, "It is a Secret");
  res.cookie("token", token);
  res.send(token);
});

app.get("/verifyJWT", (req, res) => {});

app.use("/", home);
app.use("/add-product", addProduct);
app.use("/edit-product", editProduct);
app.use("/delete-product", deleteProduct);
app.use("/", userAuth);
app.use("/tryCookie", tryCookie);

const server = app.listen(PORT, () => {
  console.log(chalk.bgMagentaBright.bold(`Server Is Running At PORT ${PORT}`));
});
