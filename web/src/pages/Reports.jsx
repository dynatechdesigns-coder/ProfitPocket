import { useState, useEffect } from "react";
import { BarChart3 } from "lucide-react";
import toast from "react-hot-toast";
import DashboardLayout from "../components/DashboardLayout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ranges = [
  { label: "Today", value: "day" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "This Year", value: "year" },
];

function getDateRange(range) {
  const now = new Date();
  let start;

  if (range === "day") {
    start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  } else if (range === "week") {
    const day = now.getDay();
    start = new Date(now);
    start.setDate(now.getDate() - day);
  } else if (range === "month") {
    start = new Date(now.getFullYear(), now.getMonth(), 1);
  } else {
    start = new Date(now.getFullYear(), 0, 1);
  }

  return {
    startDate: start.toISOString().split("T")[0],
    endDate: now.toISOString().split("T")[0],
  };
}

function Reports() {
  const [range, setRange] = useState("month");
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      try {
        const { startDate, endDate } = getDateRange(range);
        const res = await fetch(
          `http://localhost:5000/api/reports/profit-loss?startDate=${startDate}&endDate=${endDate}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();

        if (!res.ok) {
          toast.error(data.error || "Failed to load report");
          return;
        }

        setReport(data);
      } catch (err) {
        toast.error("Could not connect to server");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [range]);

  const chartData = report
    ? [
        {
          name: ranges.find((r) => r.value === range)?.label,
          Revenue: report.revenue,
          COGS: report.cogs,
          Expenses: report.totalExpenses,
          "Net Profit": report.netProfit,
        },
      ]
    : [];

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 text-sm mt-1">
            Your profit and loss at a glance
          </p>
        </div>
        <div className="flex gap-2">
          {ranges.map((r) => (
            <button
              key={r.value}
              onClick={() => setRange(r.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                range === r.value
                  ? "bg-emerald-600 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading report...</p>
      ) : !report ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <BarChart3 className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No data for this period yet.</p>
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-sm text-gray-500 mb-1">Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                ₦{report.revenue.toLocaleString()}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-sm text-gray-500 mb-1">Cost of Goods Sold</p>
              <p className="text-2xl font-bold text-gray-900">
                ₦{report.cogs.toLocaleString()}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-sm text-gray-500 mb-1">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-900">
                ₦{report.totalExpenses.toLocaleString()}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-sm text-gray-500 mb-1">Net Profit</p>
              <p
                className={`text-2xl font-bold ${
                  report.netProfit >= 0 ? "text-emerald-600" : "text-red-600"
                }`}
              >
                ₦{report.netProfit.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Breakdown
            </h2>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `₦${value.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="Revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="COGS" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Net Profit" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

export default Reports;