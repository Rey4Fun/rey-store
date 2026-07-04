"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Store() {
  const [filter, setFilter] = useState("all");

  // Kategori dinamis berdasarkan screenshot Shopee Affiliate lu
  const categories = [
    { id: "all", name: "Semua" },
    { id: "perawatan", name: "Perawatan & Kecantikan" },
    { id: "rumah", name: "Perlengkapan Rumah" },
    { id: "buku", name: "Buku & Alat Tulis" },
    { id: "otomotif", name: "Otomotif" },
    { id: "makanan", name: "Makanan & Minuman" },
  ];

  // Data produk yang disesuaikan dengan gambar penawaran & tren lu
  const products = [
    { 
      id: 1, 
      name: "Kahf Face Wash & Amino Grit 100ml", 
      category: "perawatan", 
      price: "Rp 38.900", 
      image: "🧼", 
      tag: "Komisi XTRA", 
      link: "#" // Ganti dengan link affiliate khusus produk ini nanti
    },
    { 
      id: 2, 
      name: "Techno G Now Portable Handheld Turbo Fan", 
      category: "rumah", 
      price: "Rp 149.000", 
      image: "🌪️", 
      tag: "Trending", 
      link: "#" 
    },
    { 
      id: 3, 
      name: "Maybelline Superstay Matte Ink Liquid", 
      category: "perawatan", 
      price: "Rp 115.000", 
      image: "💄", 
      tag: "Top 1 Seller", 
      link: "#" 
    },
    { 
      id: 4, 
      name: "Buku Paket Raja Master UTBK-SNBT 2026", 
      category: "buku", 
      price: "Rp 185.000", 
      image: "📚", 
      tag: "Rekomendasi", 
      link: "#" 
    },
    { 
      id: 5, 
      name: "Bor Listrik Cordless 12V Pro", 
      category: "rumah", 
      price: "Rp 245.000", 
      image: "⚙️", 
      tag: "Toko Populer", 
      link: "#" 
    },
    { 
      id: 6, 
      name: "Parfum Kopi Bali Premium Mobil", 
      category: "otomotif", 
      price: "Rp 15.000", 
      image: "☕", 
      tag: "Murah Lebay", 
      link: "#" 
    },
  ];

  const filteredProducts = filter === "all" ? products : products.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans px-4 py-12 relative overflow-hidden">
      
      {/* Background Tech Grid */}
      <div className="absolute inset-0 bg-[size:3rem_3rem] bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* HEADER BRAND */}
        <div className="flex flex-col border-b border-slate-800 pb-6 mb-8">
          <h1 className="text-3xl font-black tracking-tight uppercase bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Rey Store Hub
          </h1>
          <p className="text-xs font-mono text-slate-400 mt-1">// Curated Personal Affiliate Engine</p>
        </div>

        {/* HORIZONTAL SCROLLABLE CATEGORIES TABS */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 font-mono text-xs font-bold scrollbar-none snap-x whitespace-nowrap">
          {categories.map((cat) => (
            <button
              key={cat.id} 
              onClick={() => setFilter(cat.id)}
              className={`px-4 py-2.5 rounded-xl uppercase transition-all snap-item ${
                filter === cat.id 
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-500" 
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-indigo-400 hover:border-slate-700"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* PRODUCTS GRID */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <motion.div
              layout 
              key={product.id} 
              whileHover={{ y: -5 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-xl transition-all hover:border-indigo-500/30 relative group"
            >
              {/* Badge Promo */}
              <span className="absolute top-4 right-4 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                {product.tag}
              </span>
              
              <div>
                {/* Product Image Placeholder */}
                <div className="w-full aspect-[4/3] bg-slate-950 rounded-xl flex items-center justify-center text-5xl mb-4 border border-slate-800 group-hover:bg-slate-900/40 transition-colors">
                  {product.image}
                </div>
                {/* Product Meta */}
                <h3 className="font-bold text-base tracking-tight text-white mb-1 line-clamp-2">{product.name}</h3>
                <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-4">
                  // {categories.find(c => c.id === product.category)?.name}
                </p>
              </div>

              {/* Action Area */}
              <div className="flex items-center justify-between border-t border-slate-800/60 pt-4 mt-2">
                <span className="font-mono font-black text-emerald-400 text-base">{product.price}</span>
                <a 
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold font-mono rounded-xl transition-colors shadow-md"
                >
                  Beli Sekarang →
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}