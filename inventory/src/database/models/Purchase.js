const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PurchaseSchema = new Schema(
  {
    orderId: String,
    product: { type: Schema.Types.ObjectId, ref: "product", required: true },
    quantitySold: Number,
},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("purchase", PurchaseSchema);
