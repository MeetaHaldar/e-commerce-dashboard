require("./db/config");
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const Product = require("./model/Product");
const User = require("./model/User");
const { findOne } = require("./model/User");
const jwt = require("jsonwebtoken");
const app = express();
const jwt_key = "hellothere";
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.json({ message: "hello there" });
});
//register user
app.post("/register", async (req, res) => {
  if (req.body.name && req.body.email && req.body.password) {
    const { name, email, password } = req.body;
    let data = new User({
      name: name,
      email: email,
      password: password,
    });
    try {
      let result = await data.save();
      result = result.toObject();
      delete result.password;
      jwt.sign({ result }, jwt_key, { expiresIn: "4h" }, (err, token) => {
        if (err) {
          res.send({ message: err.message });
        } else res.send({ result, auth: token });
      });
    } catch (err) {
      res.json({ message: err.message });
    }
  } else {
    res.json({ message: "each field is required" });
  }
});

// login user
app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      jwt.sign({ user }, jwt_key, { expiresIn: "4h" }, (err, token) => {
        if (err) {
          res.send({ message: err.message });
        } else res.send({ user, auth: token });
      });
    } else {
      res.json({ message: "user not found" });
    }
  } else {
    res.json({ message: "user is not present" });
  }
});
//list products
app.get("/getProducts", verifyToken, async (req, res) => {
  const products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send("No product found");
  }
});
//add product
app.post("/add", verifyToken, async (req, res) => {
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
app.delete("/product/:id", verifyToken, async (req, res) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});
// get single product
app.get("/Product/:id", verifyToken, async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) res.send(result);
  else res.send({ result: "No record found" });
});

//update product
app.put("/product/:id", verifyToken, async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
});

// search api
app.get("/search/:key", verifyToken, async (req, res) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });

  res.send(result);
});

function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    // token = token.split(" ")[1];
    jwt.verify(token, jwt_key, (err, valid) => {
      if (err) {
        res.status(401).send({ meassage: "please provide valid token" });
      } else {
        next();
      }
    });
  } else {
    res.status(403).send({ result: "Please add token with headers" });
  }
}

app.listen(port, (req, res) => {
  console.log("you app is running in 3000 port");
});
