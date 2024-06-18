const JWT = require("jsonwebtoken");
const { tokenSignature } = require("../utils/globals.js");
const bcrypt = require("bcrypt");
const User = require("../models/User.js");

exports.renderSignUp = (req, res) => {
  res.render("sign-up", { isLoggedIn: global.isLoggedIn });
};

exports.registerUser = async (req, res) => {
  const { username, password, confirmpassword } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
    });
    await user.save();
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).redirect("/error");
  }
};

exports.renderLogin = (req, res) => {
  res.render("login", { isLoggedIn: global.isLoggedIn });
};

exports.validateLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.fetchUserByUsername(username);
    if (!user) {
      return res.status(401).redirect("/login");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).redirect("/login");
    }

    const token = JWT.sign({ username: user.username }, tokenSignature);
    req.session.token = token;
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).redirect("/error");
  }
};

exports.logout = (req, res) => {
  req.session.destroy(req.session.id);
  res.redirect("/");
};
