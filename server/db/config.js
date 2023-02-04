require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const connectDb = async () => {
  mongoose
    .connect(process.env.STRING, { useNewUrlParser: true })
    .then(console.log("connected!"));
};

connectDb();
