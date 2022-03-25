const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: { type: String, unique: true },
    existence: { type: Number, default: 5 },
    used_times: { type: Number, default: 0 },
    image: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", ProductSchema);
