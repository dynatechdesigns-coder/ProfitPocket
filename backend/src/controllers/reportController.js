const mongoose = require("mongoose");
const Sale = require("../models/Sale");
const Expense = require("../models/Expense");

const getProfitLoss = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: "startDate and endDate are required" });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const userId = new mongoose.Types.ObjectId(req.userId);

    const salesAgg = await Sale.aggregate([
      { $match: { user: userId, date: { $gte: start, $lte: end } } },
      {
        $group: {
          _id: null,
          revenue: { $sum: { $multiply: ["$sellingPriceAtSale", "$quantitySold"] } },
          cogs: { $sum: { $multiply: ["$costPriceAtSale", "$quantitySold"] } },
        },
      },
    ]);

    const expenseAgg = await Expense.aggregate([
      { $match: { user: userId, date: { $gte: start, $lte: end } } },
      { $group: { _id: null, totalExpenses: { $sum: "$amount" } } },
    ]);

    const revenue = salesAgg[0]?.revenue || 0;
    const cogs = salesAgg[0]?.cogs || 0;
    const totalExpenses = expenseAgg[0]?.totalExpenses || 0;

    const grossProfit = revenue - cogs;
    const netProfit = grossProfit - totalExpenses;

    res.json({
      startDate,
      endDate,
      revenue,
      cogs,
      grossProfit,
      totalExpenses,
      netProfit,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error generating report" });
  }
};

module.exports = { getProfitLoss };