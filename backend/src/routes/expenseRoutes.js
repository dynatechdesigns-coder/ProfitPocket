const express = require("express");
const protect = require("../middleware/authMiddleware");
const { createExpense, getExpenses } = require("../controllers/expenseController");

const router = express.Router();

router.use(protect);

router.post("/", createExpense);
router.get("/", getExpenses);

module.exports = router;