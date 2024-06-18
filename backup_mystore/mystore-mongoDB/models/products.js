const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productname: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String, required: true },
});

const Product = mongoose.model("Product", ProductSchema, "products");
module.exports = Product;
