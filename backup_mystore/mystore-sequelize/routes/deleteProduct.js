const express = require("express");
const { auth } = require("../middlewares/auth");

const router = express.Router();
const { deleteProduct } = require("../controllers/productController");

router.get("/:id", auth, deleteProduct);

module.exports = router;
