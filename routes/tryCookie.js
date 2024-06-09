const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  const cookie = req.get("Cookie");
  res.send(cookie);
});

router.post("/", (req, res) => {
  const expDate = new Date(Date.now() + 5e3);
  res.cookie("isLoggedIn", "true", { expires: expDate, httpOnly: true });
  res.send("Cookie Send Through POST Method..");
});

module.exports = router;
