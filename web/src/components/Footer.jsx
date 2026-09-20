function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <span className="text-xl font-bold text-white">
          Profit<span className="text-emerald-500">Pocket</span>
        </span>
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} ProfitPocket. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;