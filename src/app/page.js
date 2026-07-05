"use client";

import { useState } from "react";

// KOMPONEN SLIDER UNTUK MULTI-IMAGE PER PRODUK
function ProductCard({ product }) {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  const nextImage = (e) => {
    e.preventDefault(); // Mencegah link terbuka saat klik panah
    setCurrentImgIdx((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (e) => {
    e.preventDefault(); // Mencegah link terbuka saat klik panah
    setCurrentImgIdx((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 sm:p-5 flex flex-col justify-between shadow-md hover:border-slate-700 transition-colors relative group">
      {/* Badge Promo */}
      <span className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-slate-950 border border-slate-800 text-indigo-400 font-mono text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider z-20">
        {product.tag}
      </span>
      
      <div>
        {/* CONTAINER IMAGE DENGAN NAVIGASI SLIDER */}
        <div className="w-full aspect-square sm:aspect-[4/3] bg-slate-950 rounded-lg flex items-center justify-center mb-2 sm:mb-4 border border-slate-800/50 relative overflow-hidden select-none">
          
          {/* Render Gambar Real (.jpeg) atau Emoji */}
          {product.images[0].startsWith("/") ? (
            <img 
              src={product.images[currentImgIdx]} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-3xl sm:text-5xl">{product.images[currentImgIdx]}</span>
          )}

          {/* Tombol Navigasi Gambar (Hanya muncul jika gambar lebih dari 1) */}
          {product.images.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-1 top-1/2 -translate-y-1/2 bg-slate-950/80 border border-slate-800 text-white w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs z-10 font-bold"
              >
                ‹
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-slate-950/80 border border-slate-800 text-white w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs z-10 font-bold"
              >
                ›
              </button>

              {/* Titik Indikator Posisi Gambar (Dots) */}
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                {product.images.map((_, idx) => (
                  <span 
                    key={idx}
                    className={`h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full transition-colors ${idx === currentImgIdx ? 'bg-cyan-400' : 'bg-slate-600'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Detail Produk */}
        <h3 className="font-bold text-xs sm:text-base tracking-tight text-white mb-1 line-clamp-2 h-8 sm:h-auto">
          {product.name}
        </h3>
        <div className="flex flex-wrap gap-1 items-center text-[8px] sm:text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2 sm:mb-4">
          <span className="text-indigo-400">{product.subCategory}</span>
          <span>•</span>
          <span className="text-cyan-400 truncate max-w-[75px] sm:max-w-none">{product.detailCategory}</span>
        </div>
      </div>

      {/* Harga & Tombol Beli */}
      <div className="flex flex-col border-t border-slate-800/60 pt-2 sm:pt-4 mt-auto gap-2">
        <div className="flex flex-col">
          <span className="font-mono font-black text-emerald-400 text-sm sm:text-base">{product.price}</span>
          <span className="text-[8px] sm:text-[10px] font-mono text-slate-500 mt-0.5">⭐ 4.8+ | 1rb+ terjual</span>
        </div>
        <a 
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-center py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] sm:text-xs font-bold font-mono rounded-lg transition-colors block"
        >
          Beli Sekarang →
        </a>
      </div>
    </div>
  );
}

// MAIN PLATFORM ENGINE
export default function Store() {
  const [filter, setFilter] = useState("all");
  const [subFilter, setSubFilter] = useState("all");
  const [detailFilter, setDetailFilter] = useState("all");

  const categories = [
    { id: "all", name: "Semua Kategori", subs: [] },
    { 
      id: "rumah", 
      name: "Perlengkapan Rumah", 
      subs: [
        { name: "Dapur", details: ["Alat Masak & Wajan", "Bumbu & Wadah", "Peralatan Makan"] },
        { name: "Kamar Mandi", details: ["Rak Gantung", "Keset Anti Slip", "Dispenser Sabun"] },
        { name: "Ruang Tamu", details: ["Karpet & Alas", "Gorden & Tirai", "Hiasan Dinding"] }
      ] 
    },
    { 
      id: "buku", 
      name: "Buku & Alat Tulis", 
      subs: [
        { name: "Buku UTBK / Pelajaran", details: ["Saintek", "Soshum", "TPS / TPA", "Mandiri PTN"] },
        { name: "Alat Tulis (ATK)", details: ["Pulpen & Pensil", "Notebook & Binder", "Cutter & Gunting"] }
      ] 
    },
    { 
      id: "perawatan", 
      name: "Perawatan & Kecantikan", 
      subs: [
        { name: "Skincare Wajah", details: ["Kulit Berjerawat", "Kulit Berminyak", "Brightening", "Sunscreen"] },
        { name: "Men's Grooming", details: ["Sabun Muka Pria", "Minyak Rambut / Pomade", "Parfum Pria"] }
      ] 
    },
    { 
      id: "makanan", 
      name: "Makanan & Minuman", 
      subs: [
        { name: "Bahan Dapur", details: ["Bumbu Instan Masak", "Kebutuhan Baking", "Minyak & Saus", "Sambal Nusantara"] },
        { name: "Camilan", details: ["Keripik Pedas", "Cokelat & Biskuit", "Camilan Sehat"] }
      ] 
    },
    { 
      id: "otomotif", 
      name: "Otomotif", 
      subs: [
        { name: "Aksesoris Mobil", details: ["Khusus Avanza / Xenia", "Khusus Innova", "Khusus Brio / Hatchback", "Universal Mobil"] },
        { name: "Aksesoris Motor", details: ["Beat / Scoopy", "NMAX / PCX", "Vespa Matik", "Motor Sport / Kopling"] },
        { name: "Perkakas", details: ["Khusus Mobil", "Khusus Motor", "Untuk Keduanya (Universal)"] }
      ] 
    }
  ];

  const products = [
    { 
      id: 1, 
      name: "Kahf Face Wash & Grooming Pack Men - Original", 
      category: "perawatan", 
      subCategory: "Men's Grooming",
      detailCategory: "Sabun Muka Pria",
      price: "Rp 38.900", 
      // 8 FOTO JPEG LU SUDAH TERPASANG DI SINI
      images: [
        "/products/produk-1.jpeg",
        "/products/produk-2.jpeg",
        "/products/produk-3.jpeg",
        "/products/produk-4.jpeg",
        "/products/produk-5.jpeg",
        "/products/produk-6.jpeg",
        "/products/produk-7.jpeg",
        "/products/produk-8.jpeg"
      ], 
      tag: "Komisi XTRA", 
      link: "https://s.shopee.co.id/1VxLaigbJh" // LINK AFFILIATE LU SUDAH AKTIF
    },
    { 
      id: 2, 
      name: "Karpet Mie Dust Mat Presisi Avanza & Xenia (Full Set)", 
      category: "otomotif", 
      subCategory: "Aksesoris Mobil",
      detailCategory: "Khusus Avanza / Xenia",
      price: "Rp 185.000", 
      images: ["🚗"], 
      tag: "100% Fit", 
      link: "#" 
    },
    { 
      id: 3, 
      name: "Kunci Sok Set Pas 46 Pcs Chrome Vanadium Heavy Duty", 
      category: "otomotif", 
      subCategory: "Perkakas",
      detailCategory: "Untuk Keduanya (Universal)",
      price: "Rp 125.000", 
      images: ["🔧"], 
      tag: "Best Tool", 
      link: "#" 
    }
  ];

  const handleMainFilter = (catId) => {
    setFilter(catId);
    setSubFilter("all");
    setDetailFilter("all");
  };

  const handleSubFilter = (subName) => {
    setSubFilter(subName);
    setDetailFilter("all");
  };

  const filteredProducts = products.filter((product) => {
    const matchMain = filter === "all" || product.category === filter;
    const matchSub = subFilter === "all" || product.subCategory === subFilter;
    const matchDetail = detailFilter === "all" || product.detailCategory === detailFilter;
    return matchMain && matchSub && matchDetail;
  });

  const activeCategory = categories.find((c) => c.id === filter);
  const activeSubObject = activeCategory?.subs.find((s) => s.name === subFilter);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans px-3 sm:px-4 py-8 sm:py-12 relative">
      <div className="absolute inset-0 bg-[size:3rem_3rem] bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* HEADER */}
        <div className="flex flex-col border-b border-slate-800 pb-4 sm:pb-6 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight uppercase bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Rey Store Hub
          </h1>
          <p className="text-[10px] sm:text-xs font-mono text-slate-400 mt-1">// Hyper-Targeted Affiliate Filtering Engine</p>
          <div className="mt-3 inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-1.5 rounded-xl text-[10px] sm:text-xs font-mono max-w-max">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            ✨ Rating 4.5★+ | 1,000+ Produk Terjual Laris
          </div>
        </div>

        {/* LEVEL 1: KATEGORI UTAMA */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 font-mono text-[11px] sm:text-xs font-bold scrollbar-none snap-x whitespace-nowrap">
          {categories.map((cat) => (
            <button
              key={cat.id} 
              onClick={() => handleMainFilter(cat.id)}
              className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl uppercase transition-colors snap-item ${
                filter === cat.id ? "bg-indigo-600 text-white border border-indigo-500 shadow-md" : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-indigo-400"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* LEVEL 2: SUB-KATEGORI */}
        {activeCategory && activeCategory.subs.length > 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 mb-3 flex flex-col gap-2">
            <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold">
              ↳ Pilih Spesifikasi:
            </div>
            <div className="flex flex-wrap gap-1.5 items-center">
              {activeCategory.subs.map((sub) => (
                <button
                  key={sub.name}
                  onClick={() => handleSubFilter(sub.name)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-medium transition-colors ${
                    subFilter === sub.name ? "bg-indigo-500 text-white font-bold" : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {sub.name}
                </button>
              ))}
              {subFilter !== "all" && (
                <button onClick={() => handleSubFilter("all")} className="ml-auto bg-rose-500/10 text-rose-400 px-2 py-1 rounded-lg text-[10px] font-mono font-bold">
                  ✕ Reset
                </button>
              )}
            </div>
          </div>
        )}

        {/* LEVEL 3: DETAILS */}
        {subFilter !== "all" && activeSubObject && activeSubObject.details.length > 0 && (
          <div className="bg-slate-900/40 border border-slate-800/80 border-dashed rounded-xl p-3 mb-6 flex flex-col gap-2">
            <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
              ↳ Detail Spesifik (Bintang 4.5+ & Terjual Tinggi):
            </div>
            <div className="flex flex-wrap gap-1.5 items-center">
              {activeSubObject.details.map((detail) => (
                <button
                  key={detail}
                  onClick={() => setDetailFilter(detail)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-medium transition-colors ${
                    detailFilter === detail ? "bg-cyan-500 text-slate-950 font-black border border-cyan-400" : "bg-slate-950 border border-slate-800/60 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {detail}
                </button>
              ))}
              {detailFilter !== "all" && (
                <button onClick={() => setDetailFilter("all")} className="ml-auto bg-rose-500/10 text-rose-400 px-2 py-1 rounded-lg text-[10px] font-mono font-bold">
                  ✕ Cancel
                </button>
              )}
            </div>
          </div>
        )}

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-slate-500 font-mono text-xs sm:text-sm">
              // Belum ada produk di spesifikasi detail ini.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}