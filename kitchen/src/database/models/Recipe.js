const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RecipeSchema = new Schema(
  {
    name: String,
    used_times: { type: Number, default: 0 },
    image: {type: String, unique: true},
    ingredients: [
      {
        ingredient: {
          _id: { type: String, required: true },
          name: { type: String },
          existence: { type: Number, default: 5 },
          image: { type: String },
        },
        required_qt: { type: Number, required: true, default: 0 },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("recipe", RecipeSchema);
