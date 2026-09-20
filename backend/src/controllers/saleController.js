const Sale = require("../models/Sale");
const Product = require("../models/Product");

const createSale = async (req, res) => {
  try {
    const { productId, quantitySold } = req.body;

    if (!productId || !quantitySold) {
      return res.status(400).json({ error: "productId and quantitySold are required" });
    }

    const product = await Product.findOne({ _id: productId, user: req.userId });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (product.quantity < quantitySold) {
      return res.status(400).json({ error: "Not enough stock for this sale" });
    }

    const sale = await Sale.create({
      user: req.userId,
      product: product._id,
      quantitySold,
      sellingPriceAtSale: product.sellingPrice,
      costPriceAtSale: product.costPrice,
    });

    product.quantity -= quantitySold;
    await product.save();

    res.status(201).json(sale);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error creating sale" });
  }
};

const getSales = async (req, res) => {
  try {
    const sales = await Sale.find({ user: req.userId })
      .populate("product", "name")
      .sort({ date: -1 });
    res.json(sales);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error fetching sales" });
  }
};

module.exports = { createSale, getSales };