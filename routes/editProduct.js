const express = require("express");
const {
  renderEditProduct,
  editProduct,
} = require("../controllers/productController");
const bodyParser = require("body-parser");
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.get("/:id", renderEditProduct);
router.post("/:id", editProduct);

module.exports = router;
