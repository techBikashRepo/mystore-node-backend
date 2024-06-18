const express = require("express");
const app = express();
const session = require("express-session");
// const MysqlStore = require("express-mysql-session")(session);
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const multer = require("multer");
const mongoose = require("mongoose");
const sequelize = require("./utils/database.js");
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

const dbString = "mongodb://localhost:27017/mystore";

mongoose
  .connect(dbString)
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(__dirname));

const sessionStore = new SequelizeStore({
  db: sequelize,
});
sessionStore.sync();

app.use(cookieParser());
app.use(
  session({
    secret: tokenSignature,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().toISOString().replace(/:/g, "-");
    cb(null, `${timestamp}-${file.originalname}`);
  },
});
app.use(multer({ storage: storage }).single("img"));

app.get("/tryBcrypt", async (req, res) => {
  const password = "password";
  const hashedPassword = bcrypt.hashSync(password, 10);
  res.send(hashedPassword);
});

app.use("/", home);
app.use("/add-product", addProduct);
app.use("/edit-product", editProduct);
app.use("/delete-product", deleteProduct);
app.use("/", userAuth);
app.use("/tryCookie", tryCookie);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database conneted...");
  })
  .catch((err) => {
    console.log(err);
  });

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(
      chalk.bgMagentaBright.bold(`Server Is Running At PORT ${PORT}`)
    );
  });
});
