const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
const productRoutes = require("./routes/productRoutes");
const saleRoutes = require("./routes/saleRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const reportRoutes = require("./routes/reportRoutes");

app.use("/api/products", productRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/reports", reportRoutes);
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "ProfitPocket backend is running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});