const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "name is required"],
  },
  price: {
    type: Number,
    require: [true, "price is required"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ["liddy", "ikea", "caressa", "marcos"],
      message: "{VALUE} is not supported",
    },
  },
  image: {
    type: String,
  },
});
module.exports = mongoose.model("Product", productSchema);
