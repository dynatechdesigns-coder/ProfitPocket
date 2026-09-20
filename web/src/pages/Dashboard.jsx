import { useState, useEffect } from "react";
import { Package, ShoppingCart, Receipt, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

function Dashboard() {
  const [stats, setStats] = useState({
    productCount: 0,
    salesCount: 0,
    expensesCount: 0,
    netProfit: 0,
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, salesRes, expensesRes] = await Promise.all([
          fetch("http://localhost:5000/api/products", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:5000/api/sales", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:5000/api/expenses", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const productsData = await productsRes.json();
        const sales = await salesRes.json();
        const expenses = await expensesRes.json();

        const revenue = sales.reduce(
          (sum, s) => sum + s.sellingPriceAtSale * s.quantitySold,
          0
        );
        const cogs = sales.reduce(
          (sum, s) => sum + s.costPriceAtSale * s.quantitySold,
          0
        );
        const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
        const netProfit = revenue - cogs - totalExpenses;

        setStats({
          productCount: productsData.length,
          salesCount: sales.length,
          expensesCount: expenses.length,
          netProfit,
        });
        setProducts(productsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      label: "Products",
      value: stats.productCount,
      icon: Package,
      color: "bg-blue-100 text-blue-700",
    },
    {
      label: "Sales Logged",
      value: stats.salesCount,
      icon: ShoppingCart,
      color: "bg-purple-100 text-purple-700",
    },
    {
      label: "Expenses Logged",
      value: stats.expensesCount,
      icon: Receipt,
      color: "bg-orange-100 text-orange-700",
    },
    {
      label: "Net Profit (all time)",
      value: `₦${stats.netProfit.toLocaleString()}`,
      icon: TrendingUp,
      color:
        stats.netProfit >= 0
          ? "bg-emerald-100 text-emerald-700"
          : "bg-red-100 text-red-700",
    },
  ];

  const recentProducts = [...products]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const lowStockProducts = products.filter((p) => p.quantity < 5);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        Welcome back 👋
      </h1>
      <p className="text-gray-600 mb-8">
        Here's how your business is doing.
      </p>

      {loading ? (
        <p className="text-gray-500">Loading overview...</p>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {cards.map((card) => (
              <div
                key={card.label}
                className="bg-white rounded-xl border border-gray-200 p-6"
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${card.color}`}
                >
                  <card.icon className="w-5 h-5" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                <p className="text-sm text-gray-500 mt-1">{card.label}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Products
                </h2>
                <Link
                  to="/dashboard/products"
                  className="text-sm text-emerald-600 font-medium hover:underline"
                >
                  View all
                </Link>
              </div>
              {recentProducts.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  No products added yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {recentProducts.map((product) => (
                    <div
                      key={product._id}
                      className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
                    >
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          ₦{product.sellingPrice.toLocaleString()} each
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.quantity < 5
                            ? "bg-red-100 text-red-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {product.quantity} in stock
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Low Stock Alerts
              </h2>
              {lowStockProducts.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  All products are well stocked. 🎉
                </p>
              ) : (
                <div className="space-y-3">
                  {lowStockProducts.map((product) => (
                    <div
                      key={product._id}
                      className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
                    >
                      <p className="font-medium text-gray-900 text-sm">
                        {product.name}
                      </p>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                        Only {product.quantity} left
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

export default Dashboard;