const express = require("express");
const { renderProducts } = require("../controllers/productController");
const { auth } = require("../middlewares/auth");
const cookieParser = require("cookie-parser");

const router = express.Router();

router.use(cookieParser());

router.get("/", auth, renderProducts);

module.exports = router;
