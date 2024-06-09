const express = require("express");
const { renderProducts } = require("../controllers/productController");
const cookieParser = require("cookie-parser");

const router = express.Router();

router.use(cookieParser());

router.get("/", renderProducts);

module.exports = router;
