import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const points = [
  "See your true profit after cost of goods sold",
  "Track daily, weekly, monthly, and yearly performance",
  "Get alerted when stock is running low",
  "No accounting background required",
];

function Showcase() {
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.img
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80"
          alt="Retail shop owner reviewing sales on a tablet"
          className="rounded-2xl shadow-xl w-full object-cover"
        />
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Stop guessing. Start knowing.
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Most small traders don't know their real profit until it's too
            late. ProfitPocket shows you exactly where you stand, every day.
          </p>
          <ul className="space-y-4">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

export default Showcase;