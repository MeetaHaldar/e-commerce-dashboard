const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const connectDb = async () => {
  mongoose
    .connect("mongodb://localhost:27017/ecommerce")
    .then(console.log("connected!"));
};

connectDb();
