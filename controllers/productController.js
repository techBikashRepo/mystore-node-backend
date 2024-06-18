const Product = require("../models/product.js");

exports.renderProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.render("home", { products, isLoggedIn: global.isLoggedIn });
  } catch (err) {
    res.status(500).redirect("/error");
  }
};

exports.renderAddProduct = (req, res) => {
  res.render("add-product", { isLoggedIn: global.isLoggedIn });
};

exports.postAddProduct = async (req, res) => {
  try {
    const { productname, price } = req.body;
    const img = req.file.destination + "/" + req.file.filename;
    const newProduct = await Product.create({ productname, price, img });
    res.redirect("/");
  } catch (err) {
    res.status(500).redirect("/error");
  }
};

exports.renderEditProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.render("edit-product", { product, isLoggedIn: global.isLoggedIn });
    } else {
      res.redirect("/");
    }
  } catch (err) {
    res.status(500).redirect("/error");
  }
};

exports.editProduct = async (req, res) => {
  try {
    const { productname, price } = req.body;
    const img = req.file.destination + "/" + req.file.filename;
    await Product.findByIdAndUpdate(req.params.id, { productname, price, img });
    res.redirect("/");
  } catch (err) {
    res.status(500).redirect("/error");
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndRemove(req.params.id);
    res.redirect("/");
  } catch (err) {
    res.status(500).redirect("/error");
  }
};
