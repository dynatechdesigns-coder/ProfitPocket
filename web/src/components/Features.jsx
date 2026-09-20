import { motion } from "framer-motion";

const features = [
  {
    title: "Real-Time Inventory",
    description:
      "Stock levels update automatically the moment you log a sale — no manual recounting.",
    image:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Profit & Loss Reports",
    description:
      "See your true profit after cost of goods and expenses — daily, weekly, monthly, or yearly.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Expense Tracking",
    description:
      "Log business expenses by category so nothing gets lost between sales and spending.",
    image:
      "https://images.unsplash.com/photo-1554224311-beee415c201f?auto=format&fit=crop&w=600&q=80",
  },
];

function Features() {
  return (
    <section id="features" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900">
            Everything your business needs to stay on top of money
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            No accounting degree required.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;