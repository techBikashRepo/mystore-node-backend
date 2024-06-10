const express = require("express");
const { auth } = require("../middlewares/auth");
const {
  renderAddProduct,
  postAddProduct,
} = require("../controllers/productController");
const bodyParser = require("body-parser");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", auth, renderAddProduct);
router.post("/", auth, postAddProduct);

module.exports = router;
