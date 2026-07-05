"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Store() {
  const [filter, setFilter] = useState("all");
  const [subFilter, setSubFilter] = useState("all");

  // Konfigurasi Kategori Utama & Sub-Kategori Spesifik sesuai request lu
  const categories = [
    { id: "all", name: "Semua Kategori", subs: [] },
    { 
      id: "rumah", 
      name: "Perlengkapan Rumah", 
      subs: ["Dapur", "Kamar Mandi", "Kamar Tidur", "Ruang Tamu", "Ruang Keluarga", "Ruang Makan", "Teras", "Taman", "Garasi", "Dekorasi"] 
    },
    { 
      id: "buku", 
      name: "Buku & Alat Tulis", 
      subs: ["Alat Tulis (ATK)", "Buku UTBK / Pelajaran", "Novel & Sastra", "Buku Catatan", "Seni & Lukis"] 
    },
    { 
      id: "perawatan", 
      name: "Perawatan & Kecantikan", 
      subs: ["Skincare Wajah", "Perawatan Tubuh", "Perawatan Rambut", "Makeup", "Men's Grooming", "Parfum"] 
    },
    { 
      id: "makanan", 
      name: "Makanan & Minuman", 
      subs: ["Camilan", "Kopi & Teh", "Makanan Instan", "Bahan Dapur", "Makanan Sehat"] 
    },
    { 
      id: "otomotif", 
      name: "Otomotif", 
      subs: ["Aksesoris Mobil", "Aksesoris Motor", "Perawatan Kendaraan", "Helm & Proteksi", "Perkakas"] 
    }
  ];

  // Dummy data contoh produk yang sudah dispesifikkan sub-kategorinya
  const products = [
    { 
      id: 1, 
      name: "Kahf Face Wash Oil & Acne Care 100ml", 
      category: "perawatan", 
      subCategory: "Men's Grooming",
      price: "Rp 38.900", 
      image: "🧼", 
      tag: "Komisi XTRA", 
      link: "#" 
    },
    { 
      id: 2, 
      name: "Techno G Now Portable Handheld Turbo Fan", 
      category: "rumah", 
      subCategory: "Ruang Tamu",
      price: "Rp 149.000", 
      image: "🌪️", 
      tag: "Trending", 
      link: "#" 
    },
    { 
      id: 3, 
      name: "Buku Paket Raja Master UTBK-SNBT 2026 Terbaru", 
      category: "buku", 
      subCategory: "Buku UTBK / Pelajaran",
      price: "Rp 185.000", 
      image: "📚", 
      tag: "Rekomendasi", 
      link: "#" 
    },
    { 
      id: 4, 
      name: "Wajan Penggorengan Anti Lengket Oxone 24cm", 
      category: "rumah", 
      subCategory: "Dapur",
      price: "Rp 210.000", 
      image: "🍳", 
      tag: "Best Seller", 
      link: "#" 
    },
    { 
      id: 5, 
      name: "Parfum Kopi Bali Cair Premium Original", 
      category: "otomotif", 
      subCategory: "Perawatan Kendaraan",
      price: "Rp 15.000", 
      image: "☕", 
      tag: "Murah Lebay", 
      link: "#" 
    }
  ];

  // Handler ganti kategori utama (otomatis reset sub-kategori)
  const handleMainFilter = (catId) => {
    setFilter(catId);
    setSubFilter("all");
  };

  // Logika Penyaringan Multi-Level
  const filteredProducts = products.filter((product) => {
    const matchMain = filter === "all" || product.category === filter;
    const matchSub = subFilter === "all" || product.subCategory === subFilter;
    return matchMain && matchSub;
  });

  const activeCategory = categories.find((c) => c.id === filter);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans px-4 py-12 relative overflow-hidden">
      
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-[size:3rem_3rem] bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col border-b border-slate-800 pb-6 mb-8">
          <h1 className="text-3xl font-black tracking-tight uppercase bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Rey Store Hub
          </h1>
          <p className="text-xs font-mono text-slate-400 mt-1">// Curated Multi-Category Affiliate Engine</p>
          
          {/* TRUST BADGE BARU */}
          <div className="mt-4 inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-xl text-xs font-mono max-w-max">
            <span className="flex h-2 width-2 relative">
              <span className="animate-ping absolute inline-flex h-full width-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 width-2 bg-emerald-500"></span>
            </span>
            ✨ Seluruh produk terkurasi: 1,000+ Terjual & Rating 4.5★ ke atas
          </div>
        </div>

        {/* 1. KATEGORI UTAMA */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 font-mono text-xs font-bold scrollbar-none snap-x whitespace-nowrap">
          {categories.map((cat) => (
            <button
              key={cat.id} 
              onClick={() => handleMainFilter(cat.id)}
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

        {/* 2. SUB-KATEGORI (SPESIFIKASI) + TOMBOL [X] */}
        <AnimatePresence mode="wait">
          {activeCategory && activeCategory.subs.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 mb-8 flex flex-col md:flex-row items-start md:items-center gap-4 shadow-inner"
            >
              <div className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold whitespace-nowrap pt-1 md:pt-0">
                Spesifikasi:
              </div>
              
              {/* List Sub Kategori Scroller */}
              <div className="flex flex-wrap gap-2 items-center w-full">
                {activeCategory.subs.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSubFilter(sub)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      subFilter === sub
                        ? "bg-cyan-500 text-slate-950 font-bold border border-cyan-400"
                        : "bg-slate-950 border border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                    }`}
                  >
                    {sub}
                  </button>
                ))}

                {/* TOMBOL LOGO X UNTUK PEMBATALAN SPESIFIKASI */}
                {subFilter !== "all" && (
                  <button
                    onClick={() => setSubFilter("all")}
                    className="ml-auto md:ml-2 bg-rose-500/10 hover:bg-rose-500 border border-rose-500/20 hover:border-rose-400 text-rose-400 hover:text-white px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1"
                    title="Hapus Spesifikasi"
                  >
                    ✕ Clear Filter
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PRODUCTS GRID */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <motion.div
                  layout 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={product.id} 
                  whileHover={{ y: -5 }}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-xl transition-all hover:border-indigo-500/30 relative group"
                >
                  <span className="absolute top-4 right-4 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {product.tag}
                  </span>
                  
                  <div>
                    <div className="w-full aspect-[4/3] bg-slate-950 rounded-xl flex items-center justify-center text-5xl mb-4 border border-slate-800">
                      {/* Kalau mau diganti tag <img> tinggal sesuaikan seperti instruksi sebelumnya */}
                      {product.image}
                    </div>
                    <h3 className="font-bold text-base tracking-tight text-white mb-1 line-clamp-2">{product.name}</h3>
                    <div className="flex gap-2 items-center text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-4">
                      <span>// {categories.find(c => c.id === product.category)?.name}</span>
                      <span>•</span>
                      <span className="text-cyan-400">{product.subCategory}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-800/60 pt-4 mt-2">
                    <div className="flex flex-col">
                      <span className="font-mono font-black text-emerald-400 text-base">{product.price}</span>
                      <span className="text-[10px] font-mono text-slate-500 mt-0.5">⭐ 4.8+ | 1rb+ terjual</span>
                    </div>
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
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-12 text-slate-500 font-mono text-sm"
              >
                // Belum ada produk di spesifikasi ini.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}