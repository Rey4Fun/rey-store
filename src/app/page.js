"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Store() {
  const [filter, setFilter] = useState("all");

  const products = [
    { id: 1, name: "Samba OG 'Cloud White'", category: "originals", price: "Rp 2.200.000", image: "👟", tag: "Hot Release", link: "#" },
    { id: 2, name: "Ultraboost Light 23", category: "running", price: "Rp 3.300.000", image: "🏃", tag: "Top Performance", link: "#" },
    { id: 3, name: "Gazelle Core Black", category: "originals", price: "Rp 1.900.000", image: "👟", tag: "Classic", link: "#" },
    { id: 4, name: "Predator Elite FT FG", category: "football", price: "Rp 4.000.000", image: "⚽", tag: "Pro Choice", link: "#" },
    { id: 5, name: "Forum Low White Blue", category: "originals", price: "Rp 1.800.000", image: "🏀", tag: "Streetwear", link: "#" },
    { id: 6, name: "Superstar EG4958", category: "originals", price: "Rp 1.700.000", image: "⭐", tag: "All-Time Icon", link: "#" },
  ];

  const filteredProducts = filter === "all" ? products : products.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans px-6 py-12 relative overflow-hidden">
      
      {/* Background Blueprint Grid Link */}
      <div className="absolute inset-0 bg-[size:3rem_3rem] bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-800 pb-6 mb-10">
          <div>
            <h1 className="text-4xl font-black tracking-tight uppercase">Curated Kicks Lab</h1>
            <p className="text-sm font-mono text-slate-400 mt-1">// Affiliate Showcase Hub</p>
          </div>

          {/* FILTER TABS */}
          <div className="flex gap-2 mt-6 md:mt-0 font-mono text-xs font-bold">
            {["all", "originals", "running", "football"].map((cat) => (
              <button
                key={cat} onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-xl uppercase transition-all ${filter === cat ? "bg-indigo-600 text-white shadow-lg" : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-indigo-400"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCTS GRID */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <motion.div
              layout key={product.id} whileHover={{ y: -6 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-xl transition-all hover:border-indigo-500/40 relative group"
            >
              <span className="absolute top-4 right-4 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">{product.tag}</span>
              
              <div>
                <div className="w-full aspect-[4/3] bg-slate-950 rounded-xl flex items-center justify-center text-5xl mb-4 border border-slate-800 group-hover:bg-slate-900/50 transition-colors">
                  {product.image}
                </div>
                <h3 className="font-bold text-lg tracking-tight text-white mb-1">{product.name}</h3>
                <p className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-4">// category: {product.category}</p>
              </div>

              <div className="flex items-center justify-between border-t border-slate-800/60 pt-4 mt-2">
                <span className="font-mono font-black text-emerald-400 text-base">{product.price}</span>
                <a 
                  href={product.link}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold font-mono rounded-xl transition-colors shadow-md"
                >
                  Buy via Affiliate →
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}