const MongoClient = require('mongodb').MongoClient;

const DATABASE_PASSWORD = require('./secret');

const url = `mongodb+srv://shotaro:${DATABASE_PASSWORD}@cluster0.omrq7.mongodb.net/products_test?retryWrites=true&w=majority`;

const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };
  //targeting specific dbServer
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    //connecting dbServer
    await client.connect();
    //accessing a specific database
    const db = client.db(); //access 'products_test' db
    //create a Document on collection(products)
    const result = await db.collection('products').insertOne(newProduct);
  } catch (error) {
    // console.log(error);
    return res.json({ message: 'Could not store data.' });
  }
  //このままだとdbとのconnectionが維持されるのでdbとのconnectionをcloseする
  client.close();

  res.json(newProduct);
};

const getProducts = async (req, res, next) => {
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  let products;
  try {
    //connecting dbServer
    await client.connect();
    //accessing a specific database
    const db = client.db();
    //fetch a Document on collection(products)
    products = await db.collection('products').find().toArray();
  } catch (error) {
    return res.json({ message: 'Could not retrieve products.' });
  }
  client.close();
  res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
