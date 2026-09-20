const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantitySold: {
      type: Number,
      required: true,
      min: 1,
    },
    sellingPriceAtSale: {
      type: Number,
      required: true,
    },
    costPriceAtSale: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sale", saleSchema);