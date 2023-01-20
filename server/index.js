require("./db/config");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const Product = require("./model/Product");
const User = require("./model/User");
const { findOne } = require("./model/User");
const jwt = require("jsonwebtoken");
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "hello there" });
});
//register user
app.post("/register", async (req, res) => {
  const data = new User(req.body);
  try {
    const result = await data.save();
    result = result.toObject();
    delete result.password;
    res.send(result);
  } catch (err) {
    res.json({ message: err.message });
  }
});

// login user
app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      jwt.sign(
        { user },
        process.env.SECRET_STRING,
        { expiresIn: "4h" },
        (err, token) => {
          res.send({ user, token: token });
        }
      );
    } else {
      res.json({ message: "user not found" });
    }
  } else {
    res.json({ message: "user is not present" });
  }
});
//list products
app.get("/getProducts", async (req, res) => {
  const products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send("No product found");
  }
});
//add product
app.post("/add", async (req, res) => {
  const { name, category, price, company, userId } = req.body;
  const data = new Product({
    name: name,
    category: category,
    price: price,
    company: company,
    userId: userId,
  });
  try {
    const result = await data.save();
    res.send(result);
  } catch (err) {
    res.json({ message: err.message });
  }
});

// delete product
app.delete("/product/:id", async (req, res) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});
// get single product
app.get("/Product/:id", async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) res.send(result);
  else res.send({ result: "No record found" });
});

//update product
app.put("/product/:id", async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
});

// search api
app.get("/search/:key", async (req, res) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });

  res.send(result);
});

app.listen(3000, (req, res) => {
  console.log("you app is running in 3000 port");
});
