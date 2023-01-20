const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  category: {
    type: String,
  },

  company: {
    type: String,
  },
  userId: {
    type: String,
  },
});

module.exports = mongoose.model("products", productSchema);
