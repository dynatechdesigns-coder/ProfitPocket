import { Wallet } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Wallet className="w-6 h-6 text-emerald-600" />
          <span className="text-xl font-bold text-gray-900">ProfitPocket</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
          <a href="#features" className="hover:text-emerald-600 transition">Features</a>
          <a href="#pricing" className="hover:text-emerald-600 transition">Pricing</a>
          <a href="#about" className="hover:text-emerald-600 transition">About</a>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-gray-700 font-medium hover:text-emerald-600 transition">
            Log In
          </Link>
          <Link to="/signup" className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition shadow-sm">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;