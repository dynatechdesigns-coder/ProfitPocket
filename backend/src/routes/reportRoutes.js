const express = require("express");
const protect = require("../middleware/authMiddleware");
const { getProfitLoss } = require("../controllers/reportController");

const router = express.Router();

router.use(protect);

router.get("/profit-loss", getProfitLoss);

module.exports = router;