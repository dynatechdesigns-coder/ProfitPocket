const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router.use(protect);

router.post("/", createProduct);
router.get("/", getProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;