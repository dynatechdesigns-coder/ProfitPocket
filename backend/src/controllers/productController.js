const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    const { name, costPrice, sellingPrice, quantity } = req.body;

    if (!name || costPrice == null || sellingPrice == null) {
      return res.status(400).json({ error: "name, costPrice, and sellingPrice are required" });
    }

    const product = await Product.create({
      user: req.userId,
      name,
      costPrice,
      sellingPrice,
      quantity: quantity || 0,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error creating product" });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error fetching products" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error updating product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id, user: req.userId });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error deleting product" });
  }
};

module.exports = { createProduct, getProducts, updateProduct, deleteProduct };