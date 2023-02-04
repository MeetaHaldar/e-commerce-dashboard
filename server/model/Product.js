const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  price: {
    type: Number,
    required: true,
    index: true,
  },
  category: {
    type: String,
    required: true,
    index: true,
  },

  company: {
    type: String,
    required: true,
    index: true,
  },
  userId: {
    type: String,
    required: true,
    index: true,
    ref: "User",
  },
});

module.exports = mongoose.model("products", productSchema);
