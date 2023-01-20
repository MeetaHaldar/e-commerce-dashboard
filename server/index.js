require("./db/config");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const Product = require("./model/Product");
const User = require("./model/User");
const { findOne } = require("./model/User");

const app = express();

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
      res.send(user);
    } else {
      res.json({ message: "user not found" });
    }
  } else {
    res.json({ message: "user is not present" });
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

app.listen(3000, (req, res) => {
  console.log("you app is running in 3000 port");
});
