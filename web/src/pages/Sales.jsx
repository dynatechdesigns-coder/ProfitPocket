import { useState, useEffect } from "react";
import { Plus, X, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import DashboardLayout from "../components/DashboardLayout";

function Sales() {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [productId, setProductId] = useState("");
  const [quantitySold, setQuantitySold] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem("token");
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchData = async () => {
    try {
      const [salesRes, productsRes] = await Promise.all([
        fetch(`${API_URL}/api/sales`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_URL}/api/products`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const salesData = await salesRes.json();
      const productsData = await productsRes.json();

      setSales(salesData);
      setProducts(productsData);
    } catch (err) {
      toast.error("Could not load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/api/sales`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantitySold: Number(quantitySold),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to log sale");
        setSubmitting(false);
        return;
      }

      toast.success("Sale logged!");
      setProductId("");
      setQuantitySold("");
      setShowForm(false);
      fetchData();
    } catch (err) {
      toast.error("Could not connect to server");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this sale? Inventory will be restored.")) return;

    try {
      const res = await fetch(`${API_URL}/api/sales/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        toast.error("Failed to delete sale");
        return;
      }

      toast.success("Sale deleted, inventory restored");
      fetchData();
    } catch (err) {
      toast.error("Could not connect to server");
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales</h1>
          <p className="text-gray-600 text-sm mt-1">
            Log sales and track what's sold
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Cancel" : "Log Sale"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl border border-gray-200 p-6 mb-6 grid md:grid-cols-3 gap-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product
            </label>
            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="">Select a product</option>
              {products.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name} ({p.quantity} in stock)
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity Sold
            </label>
            <input
              type="number"
              value={quantitySold}
              onChange={(e) => setQuantitySold(e.target.value)}
              required
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="1"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={submitting}
              className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition disabled:opacity-50 w-full"
            >
              {submitting ? "Logging..." : "Log Sale"}
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        {loading ? (
          <p className="p-6 text-gray-500">Loading sales...</p>
        ) : sales.length === 0 ? (
          <div className="p-12 text-center">
            <ShoppingCart className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No sales logged yet.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 text-left">
              <tr>
                <th className="px-6 py-3 font-medium">Product</th>
                <th className="px-6 py-3 font-medium">Quantity</th>
                <th className="px-6 py-3 font-medium">Sale Price</th>
                <th className="px-6 py-3 font-medium">Total</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sales.map((sale) => (
                <tr key={sale._id}>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {sale.product?.name || "Unknown"}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{sale.quantitySold}</td>
                  <td className="px-6 py-4 text-gray-600">
                    ₦{sale.sellingPriceAtSale.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    ₦{(sale.sellingPriceAtSale * sale.quantitySold).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(sale.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(sale._id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Sales;