const express = require("express");
const {
  renderAddProduct,
  postAddProduct,
} = require("../controllers/productController");
const bodyParser = require("body-parser");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", renderAddProduct);
router.post("/", postAddProduct);

module.exports = router;
