const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: String,
    existence: { type: Number, default: 5 },
    image: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", ProductSchema);
