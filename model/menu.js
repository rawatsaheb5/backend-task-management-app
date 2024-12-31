const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Appetizers", "Main Course", "Desserts"],
      default: "Appetizers",
    },
    price: {
      type: Number,
      required: true,
    },
    availability: {
      type: Boolean,
      default:true
    },
  },
  { timestamps: true }
);

const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;
