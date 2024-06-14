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

exports.editProduct = (req, res) => {
  const { productname, price } = req.body;
  const img = req.file.destination + "/" + req.file.filename;
  const id = req.params.id;

  const products = new Products(id, productname, price, img);
  products.editData().then(() => {
    res.redirect("/");
  });
};

exports.deleteProduct = (req, res) => {
  Products.deleteProductById(req.params.id).then(() => {
    res.redirect("/");
  });
};
