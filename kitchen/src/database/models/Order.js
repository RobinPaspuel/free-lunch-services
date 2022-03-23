const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    serves_number: { type: Number, default: 1 },
    status: {
      type: String,
      enum: ["received", "dispatched"],
      default: "received",
    },
    recipes: [{ type: Schema.Types.ObjectId, ref: "recipe", required: true }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("order", OrderSchema);
