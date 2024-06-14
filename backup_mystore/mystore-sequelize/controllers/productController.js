const Product = require("../models/products");

// const products = [
//   {
//     id: 1,
//     productname: "Apple",
//     price: 10,
//     img: "apple.jpg",
//   },
//   {
//     id: 2,
//     productname: "Banana",
//     price: 20,
//     img: "banana.jpg",
//   },
//   {
//     id: 3,
//     productname: "Orange",
//     price: 30,
//     img: "orange.jpg",
//   },
//   {
//     id: 4,
//     productname: "Pineapple",
//     price: 40,
//     img: "pineapple.jpg",
//   },
// ];
exports.renderProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    console.log("Products: ", products);
    res.render("home", { products: products, isLoggedIn: global.isLoggedIn });
  } catch (err) {
    console.error(err);
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

    const newProduct = await Product.create({
      productname,
      price,
      img,
    });
    console.log("Products Added : ", newProduct);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).redirect("/error");
  }
};

exports.renderEditProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.render("edit-product", {
        product: product,
        isLoggedIn: global.isLoggedIn,
      });
    } else {
      res.redirect("/");
    }
  } catch (err) {
    console.error(err);
    res.status(500).redirect("/error");
  }
};

exports.editProduct = async (req, res) => {
  try {
    const { productname, price } = req.body;
    const img = req.file.destination + "/" + req.file.filename;
    const id = req.params.id;

    const product = await Product.findByPk(id);
    if (!product) {
      console.error("Product not found !");
      return res.status(404).send("Product not found !");
    }
    product.productname = productname;
    product.price = price;
    product.img = img;

    await product.save();
    console.log("Product edited successfully");
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).redirect("/error");
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    console.log("Product deleted successfully");
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).redirect("/error");
  }
};
