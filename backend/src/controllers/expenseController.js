const Expense = require("../models/Expense");

const createExpense = async (req, res) => {
  try {
    const { description, amount, category, date } = req.body;

    if (!description || amount == null) {
      return res.status(400).json({ error: "description and amount are required" });
    }

    const expense = await Expense.create({
      user: req.userId,
      description,
      amount,
      category,
      date,
    });

    res.status(201).json(expense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error creating expense" });
  }
};

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.userId }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error fetching expenses" });
  }
};

module.exports = { createExpense, getExpenses };