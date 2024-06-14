const JWT = require("jsonwebtoken");
const { tokenSignature } = require("../utils/globals");
const bcrypt = require("bcrypt");
const Users = require("../models/users");

exports.renderSignUp = (req, res) => {
  res.render("sign-up", { isLoggedIn: global.isLoggedIn });
};

exports.registerUser = async (req, res) => {
  const { username, password, confirmpassword } = req.body;

  try {
    const hashedPassword = await bcrypt.hashSync(password, 10);
    await Users.insertUser({
      username,
      password: hashedPassword,
    });
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).redirect("/error");
  }
};

exports.renderLogin = (req, res) => {
  const cookie = req.session.isLoggedIn;
  res.render("login", { isLoggedIn: cookie });
};

exports.validateLogin = (req, res) => {
  const { username, password } = req.body;

  Users.fetchUserByUsername(username).then((userCredentials) => {
    if (userCredentials) {
      const isMatch = bcrypt.compare(password, userCredentials.password);

      if (isMatch) {
        const token = JWT.sign({ username }, tokenSignature);
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
