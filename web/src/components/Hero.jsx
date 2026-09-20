import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="pt-40 pb-24 px-6 bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Bookkeeping made simple for your business
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-lg">
            Track sales, manage inventory, and see your real profit — all in
            one place. Built for small traders and retail businesses who want
            clarity without the spreadsheets.
          </p>
          <div className="mt-8 flex gap-4">
            <button className="bg-emerald-600 text-white px-7 py-3 rounded-lg font-medium hover:bg-emerald-700 transition shadow-md">
              Start Free Trial
            </button>
            <button className="border border-gray-300 text-gray-700 px-7 py-3 rounded-lg font-medium hover:bg-gray-50 transition">
              Watch Demo
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-2xl overflow-hidden shadow-2xl"
        >
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80"
            alt="Business owner reviewing sales on a laptop"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;