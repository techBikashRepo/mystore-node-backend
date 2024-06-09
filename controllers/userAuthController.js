const Users = require("../models/users");

exports.renderSignUp = (req, res) => {
  const cookie = req.session.isLoggedIn;
  res.render("sign-up", { isLoggedIn: cookie });
};

exports.registerUser = (req, res) => {
  const { username, password, confirmpassword } = req.body;
  const users = new Users(null, username, password);

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
    if (userCredential) {
      if (userCredential.password === password) {
        req.session.isLoggedIn = "true";
        res.redirect("/");
      } else {
        req.session.isLoggedIn = "invalidPassword";
        res.redirect("/login");
      }
    } else {
      req.session.isLoggedIn = "invalidUsername";
      res.redirect("/login");
    }
  });
};

exports.logout = (req, res) => {
  req.session.destroy(req.session.id);
  res.redirect("/");
};
