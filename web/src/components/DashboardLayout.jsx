import { Link, useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart, Receipt, BarChart3, LogOut, Wallet } from "lucide-react";

const navItems = [
  { label: "Overview", path: "/dashboard", icon: LayoutDashboard },
  { label: "Products", path: "/dashboard/products", icon: Package },
  { label: "Sales", path: "/dashboard/sales", icon: ShoppingCart },
  { label: "Expenses", path: "/dashboard/expenses", icon: Receipt },
  { label: "Reports", path: "/dashboard/reports", icon: BarChart3 },
];

function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-100">
          <Wallet className="w-6 h-6 text-emerald-600" />
          <span className="text-lg font-bold text-gray-900">ProfitPocket</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition w-full"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}

export default DashboardLayout;