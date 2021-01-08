const mongoose = require('mongoose');

const Product = require('./models/product');

const DATABASE_PASSWORD = require('./secret');

const url = `mongodb+srv://shotaro:${DATABASE_PASSWORD}@cluster0.omrq7.mongodb.net/products_test?retryWrites=true&w=majority`;

//only one method required to connect db by mongoose
mongoose
  .connect(url)
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

const createProduct = async (req, res, next) => {
  const createdProduct = new Product({
    name: req.body.name,
    price: req.body.price,
  });
  const result = await createdProduct.save();
  // Understanding the ObjectId
  // it is a so-called object that you saw a mongoDB specific data
  // you need convert ids into a string in order to use id with javascript.
  console.log(typeof createdProduct.id); //return string
  console.log(typeof createdProduct._id); //return object

  res.json(result);
};

const getProducts = async (req, res, next) => {
  //1.find method is a static method used directly on our constructor & return array automatically
  //2.find method provided by mongoose returns a kind of promise object.
  //we can use async await,but it's not a real promise.
  //3.exec function is return a real promise object.
  const products = await Product.find().exec();
  res.json(products);
};

//not using module export because one export's required now
exports.createProduct = createProduct;
exports.getProducts = getProducts;
