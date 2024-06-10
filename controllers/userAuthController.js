const Users = require("../models/users");
const JWT = require("jsonwebtoken");
const { tokenSignature } = require("../utils/globals");
const bcrypt = require("bcrypt");

exports.renderSignUp = (req, res) => {
  const cookie = req.session.isLoggedIn;
  res.render("sign-up", { isLoggedIn: cookie });
};

exports.registerUser = async (req, res) => {
  const { username, password, confirmpassword } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const users = new Users(null, username, hashedPassword);

  users.insertUser().then(() => {
    res.redirect("/");
  });
};

exports.renderLogin = (req, res) => {
  const cookie = req.session.isLoggedIn;
  res.render("login", { isLoggedIn: cookie });
};

exports.validateLogin = (req, res) => {
  const { username, password } = req.body;

  Users.fetchUserByUsername(username).then(([[userCredential], tableInfo]) => {
    const token = JWT.sign({ username }, tokenSignature);
    if (userCredential) {
      const isMatch = bcrypt.compare(userCredential.password, password);
      if (isMatch) {
        req.session.token = token;
        res.redirect("/");
      } else {
        res.redirect("/login");
      }
    } else {
      res.redirect("/login");
    }
  });
};

exports.logout = (req, res) => {
  req.session.destroy(req.session.id);
  res.redirect("/");
};
