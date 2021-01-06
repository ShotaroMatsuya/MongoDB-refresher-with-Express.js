const MongoClient = require('mongodb').MongoClient;

const DATABASE_PASSWORD = require('./secret');

const url = `mongodb+srv://shotaro:${DATABASE_PASSWORD}@cluster0.omrq7.mongodb.net/products_test?retryWrites=true&w=majority`;

const createProduct = async (req, res, next) => {};

const getProducts = async (req, res, next) => {};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
