const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const connectDb = async () => {
  mongoose
    .connect("mongodb://0.0.0.0:27017/ecommerce")
    .then(console.log("connected!"));
};

connectDb();
