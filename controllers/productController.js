const Products = require("../models/products");

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
exports.renderProducts = (req, res) => {
  const cookie = req.session.isLoggedIn;

  Products.fetchProducts().then(([rows, fieldData]) => {
    res.render("home", { products: rows, isLoggedIn: cookie });
  });
};

exports.renderAddProduct = (req, res) => {
  const cookie = req.session.isLoggedIn;
  res.render("add-product", { isLoggedIn: cookie });
};

exports.postAddProduct = (req, res) => {
  const { productname, price, img } = req.body;
  const products = new Products(null, productname, price, img);
  products.postData().then(() => {
    res.redirect("/");
  });
};

exports.renderEditProduct = (req, res) => {
  const cookie = req.session.isLoggedIn;
  Products.fetchProductById(req.params.id).then(
    ([[productData], fieldData]) => {
      res.render("edit-product", { product: productData, isLoggedIn: cookie });
    }
  );
};

exports.editProduct = (req, res) => {
  const { productname, price, img } = req.body;
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
