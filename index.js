const express = require("express");
const app = express();
const session = require("express-session");
const MysqlStore = require("express-mysql-session")(session);
const JWT = require("jsonwebtoken");
const PORT = 5000;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");

const chalk = require("chalk");
const home = require("./routes/home");
const addProduct = require("./routes/addProduct");
const editProduct = require("./routes/editProduct");
const deleteProduct = require("./routes/deleteProduct");
const tryCookie = require("./routes/tryCookie");
const userAuth = require("./routes/userAuth");
const { tokenSignature } = require("./utils/globals");

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(__dirname));

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
app.use(cookieParser());
app.use(
  session({
    secret: tokenSignature,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

app.get("/tryBcrypt", async (req, res) => {
  const password = "password";
  const hashedPassword = bcrypt.hashSync(password, 10);
  console.log(bcrypt.compareSync(password, hashedPassword));
  res.send(hashedPassword);
});

app.use("/", home);
app.use("/add-product", addProduct);
app.use("/edit-product", editProduct);
app.use("/delete-product", deleteProduct);
app.use("/", userAuth);
app.use("/tryCookie", tryCookie);

const server = app.listen(PORT, () => {
  console.log(chalk.bgMagentaBright.bold(`Server Is Running At PORT ${PORT}`));
});
