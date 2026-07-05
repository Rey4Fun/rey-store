"use client";

import { useState } from "react";

// KOMPONEN KARTU PRODUK DENGAN DUAL PLATFORM & LIGHTBOX
function ProductCard({ product, onZoom }) {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 sm:p-5 flex flex-col justify-between shadow-md hover:border-slate-700 transition-colors relative group">
      
      <div>
        {/* CONTAINER IMAGE */}
        <div 
          onClick={() => onZoom(product.images[currentImgIdx])}
          className="w-full aspect-square bg-slate-950 rounded-lg flex items-center justify-center mb-3 border border-slate-800/50 relative overflow-hidden select-none cursor-zoom-in"
          title="Klik untuk memperbesar"
        >
          {product.images[0].startsWith("/") ? (
            <img 
              src={product.images[currentImgIdx]} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-3xl sm:text-5xl">{product.images[currentImgIdx]}</span>
          )}

          {/* Tombol Navigasi Slider */}
          {product.images.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-1 top-1/2 -translate-y-1/2 bg-slate-950/80 border border-slate-800 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs z-10 font-bold"
              >
                ‹
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-slate-950/80 border border-slate-800 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs z-10 font-bold"
              >
                ›
              </button>
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                {product.images.map((_, idx) => (
                  <span 
                    key={idx}
                    className={`h-1 w-1 rounded-full transition-colors ${idx === currentImgIdx ? 'bg-cyan-400' : 'bg-slate-600'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* TEMPAT BADGE: DI BAWAH FOTO */}
        <div className="mb-2">
          <span className={`inline-block font-mono text-[8px] sm:text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
            product.isOfficial 
              ? "bg-blue-500/10 border border-blue-500/30 text-blue-400" 
              : "bg-slate-950 border border-slate-800 text-slate-400"
          }`}>
            {product.isOfficial ? "🔹 Official Store" : "⭐ Top Rated"}
          </span>
        </div>

        {/* Detail Identitas Produk */}
        <h3 className="font-bold text-xs sm:text-base tracking-tight text-white mb-1 line-clamp-2 h-8 sm:h-auto">
          {product.name}
        </h3>
        <div className="flex flex-wrap gap-1 items-center text-[8px] sm:text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-3">
          <span className="text-indigo-400">{product.subCategory}</span>
          <span>•</span>
          <span className="text-cyan-400 truncate max-w-[75px] sm:max-w-none">{product.detailCategory}</span>
        </div>
      </div>

      {/* MATRIX PERBANDINGAN HARGA */}
      <div className="flex flex-col border-t border-slate-800/60 pt-2.5 mt-auto gap-1.5">
        <div className="text-[8px] font-mono text-slate-500 uppercase tracking-wider">// Perbandingan Harga:</div>
        
        {/* Baris Harga Shopee */}
        {product.shopee && (
          <div className="flex items-center justify-between bg-slate-950/40 border border-slate-800/60 p-1.5 rounded-lg gap-2">
            <div className="flex flex-col min-w-0">
              <span className="text-[8px] text-orange-400 font-bold font-mono tracking-wider">SHOPEE</span>
              <span className="font-mono font-black text-slate-200 text-xs sm:text-sm truncate">{product.shopee.price}</span>
            </div>
            <a 
              href={product.shopee.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-2.5 py-1 bg-orange-600 hover:bg-orange-500 text-white text-[10px] font-mono font-bold rounded-md transition-colors shrink-0 whitespace-nowrap"
            >
              Beli ↗
            </a>
          </div>
        )}

        {/* Baris Harga Tokopedia */}
        {product.tokopedia && (
          <div className="flex items-center justify-between bg-slate-950/40 border border-slate-800/60 p-1.5 rounded-lg gap-2">
            <div className="flex flex-col min-w-0">
              <span className="text-[8px] text-emerald-400 font-bold font-mono tracking-wider">TOKOPEDIA</span>
              <span className="font-mono font-black text-slate-200 text-xs sm:text-sm truncate">{product.tokopedia.price}</span>
            </div>
            <a 
              href={product.tokopedia.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-mono font-bold rounded-md transition-colors shrink-0 whitespace-nowrap"
            >
              Beli ↗
            </a>
          </div>
        )}

        {/* Info Reputasi Global */}
        <div className="text-[8px] sm:text-[9px] font-mono text-slate-500 text-center mt-1">
          ⭐ 4.5+ | 1rb+ Terjual Aman Terpercaya
        </div>
      </div>
    </div>
  );
}

// MAIN PLATFORM DASHBOARD
export default function Store() {
  const [filter, setFilter] = useState("all");
  const [subFilter, setSubFilter] = useState("all");
  const [detailFilter, setDetailFilter] = useState("all");
  const [zoomImg, setZoomImg] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);

  const categories = [
    { id: "all", name: "Semua Kategori", subs: [] },
    { 
      id: "rumah", 
      name: "Perlengkapan Rumah", 
      subs: [
        { name: "Dapur", details: ["Air Fryer Low Watt", "Rak Bumbu Putar", "Organizer Kulkas Acrylic", "Kompor Induksi Portable", "Pisau Set Keramik", "Timbangan Digital Kue"] },
        { name: "Kamar Mandi", details: ["Keset Diatomite", "Dispenser Sabun Otomatis", "Rak Sudut Tanpa Bor", "Cermin LED Touch Screen", "Shower Head High Pressure", "Sikat WC Silikon"] },
        { name: "Kamar Tidur", details: ["Sprei Tencel/Bambu", "Bantal Memory Foam", "Humidifier Diffuser", "Lampu Tidur Proyektor", "Meja Rias LED Minimalis", "Gorden Blackout 100%"] },
        { name: "Ruang Tamu", details: ["Sofa Bed Multifungsi", "Karpet Bulu Premium", "Coffee Table Nesting", "Pajangan Dinding Macrame", "Diffuser Reed Stick"] },
        { name: "Ruang Keluarga", details: ["Bean Bag Triangle", "Bracket TV Swivel", "Soundbar Bluetooth", "Air Purifier HEPA", "Rak TV Gantung"] },
        { name: "Ruang Makan", details: ["Taplak Meja PVC", "Set Cangkir Nordic", "Placemat Enceng Gondok", "Tudung Saji Susun", "Dispenser Galon Bawah"] },
        { name: "Teras", details: ["Kursi Teras Rotan", "Keset Bihun Welcome", "Lampu Cafe Waterproof", "Rak Sepatu Tertutup", "Tanaman Artifisial Gantung"] },
        { name: "Taman", details: ["Lampu Taman Solar", "Pot Terracotta/Semen", "Selang Air Magic Hose", "Rumput Sintetis", "Gunting Dahan SK5"] },
        { name: "Garasi", details: ["Pegboard Perkakas", "Jet Cleaner Mobil", "Dongkrak Hidrolik", "Lampu LED Sensor Gerak", "Kunci Shock Set"] }
      ] 
    },
    { 
      id: "buku", 
      name: "Buku & Alat Tulis", 
      subs: [
        { name: "Studygram & Estetika Pelajar", details: ["Loose Leaf Grid/Dotted B5", "Binder Transparan B5", "Stabilo Warna Pastel", "Pulpen Gel Cepat Kering", "Flashcard Ring Hafalan", "Sticky Notes Transparan"] },
        { name: "Bullet Journal & Seni Kreatif", details: ["Notebook Dotted Tebal", "Brush Pen Dual Tip", "Washi Tape Aesthetic", "Stiker Dekorasi Jurnal", "Sketchbook Watercolor", "Paper Cutter Pen"] },
        { name: "Profesional & Produktivitas", details: ["Undated Planner Book", "Expanding File Folder", "Notebook Kulit Premium", "Pulpen Tanda Tangan Premium", "Desktop Organizer Editor", "Sticky Notes Index Flags"] },
        { name: "Buku Edukasi & Persiapan Ujian", details: ["Bank Soal UTBK-SNBT", "Panduan TOEFL/IELTS/JLPT", "Panduan Coding Python", "Belajar Investasi Saham", "Buku Rangkuman Rumus Saku"] },
        { name: "Self-Improvement & Literasi Umum", details: ["Buku Self-Improvement", "Novel Fiksi Lokal", "Buku Parenting & Anak", "Novel Misteri/Thriller"] },
        { name: "Edukasi Anak & Balita", details: ["Buku Mewarnai Wipe & Clean", "Buku Pop-Up 3D/Flap", "Busy Book Flannel", "Crayon Putar Non-Toxic", "Pensil Warna Box Kaleng"] }
      ] 
    },
    { 
      id: "perawatan", 
      name: "Perawatan & Kecantikan", 
      subs: [
        { name: "Men's Grooming & Care", details: ["Sabun Muka Pria", "Minyak Rambut / Pomade", "Parfum Pria", "Paket Perawatan Pria", "Shampoo & Tonic Pria", "Deodorant & Body Pria"] },
        { name: "Women's Skincare & Beauty", details: ["Facial Wash Glow Wanita", "Serum Mencerahkan", "Sunscreen Dewy Glow", "Moisturizer Brightening", "Body Lotion Whitening", "Paket Skincare Wanita"] },
        { name: "Kulit Sensitif & Barrier Repair", details: ["Facial Wash Low pH", "Moisturizer Ceramide/Centella", "Physical Sunscreen", "Hydrating Toner Hyaluronic", "Micellar Water Sensitive"] },
        { name: "Kulit Berjerawat & Berminyak", details: ["Acne Patch Invisible", "Serum Salicylic Acid (BHA)", "Clay Mask Mugwort/Teatree", "Sunscreen Matte Finish", "Spot Treatment/Gel Totol"] },
        { name: "Anti-Aging & Kulit Kering", details: ["Serum Retinol Pemula", "Eye Cream Peptide/Caffeine", "Night Cream Collagen", "Essence Wajah Kental"] },
        { name: "Rambut & Kulit Kepala Khusus", details: ["Shampoo Anti Ketombe", "Hair Tonic Anti Rontok", "Hair Serum Heat Protector", "Hair Mask Bleaching/Warna", "Dry Shampoo Anti Lepek"] },
        { name: "Perawatan Tubuh & Higienitas", details: ["Body Wash Acne Punggung", "Body Lotion SPF 50++++", "Lotion Tumit Pecah/Urea", "Deodorant Serum Brightening", "Body Scrub Kojic Acid"] },
        { name: "Perawatan Gigi & Mulut (Oral Care)", details: ["Sikat Gigi Ultra Soft/Nano", "Sikat Gigi Khusus Ortho/Behel", "Pasta Gigi Sensitif No SLS", "Dental Floss Pick Gagang", "Mouthwash Non-Alkohol", "Alat Pembersih Lidah"] },
        { name: "Makeup & Kosmetik Estetik", details: ["Lip Tint & Lipstik", "Bedak & Cushion", "Blush On & Highlighter"] }
      ] 
    },
    { 
      id: "makanan", 
      name: "Makanan & Minuman", 
      subs: [
        { name: "Diet Khusus & Lifestyle Sehat", details: ["Susu Oat/Almond Barista", "Granola Low Sugar", "Minyak Zaitun EVOO", "Kecap/Saus Bebas Gula", "Tepung Premix Gluten-Free"] },
        { name: "Makanan Praktis & Siap Saji", details: ["Daging Slice Premium", "Dimsum/Gyoza Frozen", "Bumbu Dasar Siap Pakai", "Sambal Botolan Unik", "Kit Steamboat Instan"] },
        { name: "Home Barista & Cafe di Rumah", details: ["Biji Kopi Arabika", "Sirup Flavor Premium", "Bubuk Matcha Jepang Murni", "Teh Artisan Blend", "Bubuk Minuman Kiloan"] },
        { name: "Camilan & Dessert Estetik", details: ["Baso Aci Instan Mercon", "Keripik Kaca/Usus Pedas", "Fudgy Brownies/Cookies", "Cokelat Kurma Almond", "Popcorn Karamel Pouch"] },
        { name: "MPASI & Makanan Anak Sehat", details: ["Bubuk Kaldu Non-MSG", "Baby Rice Puffs", "Keju Khusus Bayi", "Bubur Organik MPASI", "Mie Sayur Organik"] },
        { name: "Bahan Baku Baking Premium", details: ["Butter Premium Blok", "Cokelat Bubuk High Fat", "Garam Laut Sea Salt Flakes", "Ragi Instan Aktif"] }
      ] 
    },
    { 
      id: "otomotif", 
      name: "Otomotif & Transportasi", 
      // INTEGRASI STRUKTUR MEGAPROJEK KENDARAAN GLOBAL & MEREK SPESIFIK PILIHAN REY
      subs: [
        { name: "Mobil & Roda Empat (Cars)", details: ["Toyota", "Honda", "BYD / Tesla (EV)", "Suzuki", "Mitsubishi", "Hyundai / Wuling", "Daihatsu", "BMW / Mercedes-Benz"] },
        { name: "Motor & Roda Dua (Motorcycles)", details: ["Honda Motor", "Yamaha", "Kawasaki", "Suzuki Motor", "Vespa / Piaggio", "Motor Listrik (Alva/Gesits)", "Harley-Davidson"] },
        { name: "Pesawat Terbang (Aviation)", details: ["Airbus", "Boeing", "ATR", "Bombardier / Embraer", "Cessna / Private Jet"] },
        { name: "Helikopter (Helicopters)", details: ["Airbus Helicopters", "Bell Textron", "Sikorsky", "Leonardo / AgustaWestland", "Robinson"] },
        { name: "Kereta Api & Rel (Railways)", details: ["PT INKA (Indonesia)", "CRRC (China)", "Alstom", "Siemens", "Hitachi / Kawasaki Heavy"] },
        { name: "Kendaraan Berat & Komersial", details: ["Caterpillar (CAT)", "Komatsu", "Volvo Trucks", "Scania / Hino"] }
      ] 
    }
  ];

  const products = [
    { 
      id: 1, 
      name: "Face Wash SOMBONG 5-in-1 Gentle Clean Pria", 
      category: "perawatan", 
      subCategory: "Men's Grooming & Care",
      detailCategory: "Sabun Muka Pria",
      isOfficial: false, 
      images: [
        "/products/sombong/face-wash/1.jpeg",
        "/products/sombong/face-wash/2.jpeg",
        "/products/sombong/face-wash/3.jpeg",
        "/products/sombong/face-wash/4.jpeg",
        "/products/sombong/face-wash/5.jpeg",
        "/products/sombong/face-wash/6.jpeg",
        "/products/sombong/face-wash/7.jpeg",
        "/products/sombong/face-wash/8.jpeg",
        "/products/sombong/face-wash/9.jpeg"
      ], 
      shopee: { price: "Rp 81.900", link: "https://s.shopee.co.id/AKYk87hPSy" },
      tokopedia: { price: "Rp 81.900", link: "https://vt.tokopedia.com/t/ZS9MeSCHoX8jE-yGahM/" }
    },
    { 
      id: 2, 
      name: "Kahf Bundle 4IN1 Bright & Pembersih Komplit Pria", 
      category: "perawatan", 
      subCategory: "Men's Grooming & Care",
      detailCategory: "Paket Perawatan Pria",
      isOfficial: false, 
      images: [
        "/products/kahf/bundle-4in1/1.jpeg", "/products/kahf/bundle-4in1/2.jpeg", "/products/kahf/bundle-4in1/3.jpeg",
        "/products/kahf/bundle-4in1/4.jpeg", "/products/kahf/bundle-4in1/5.jpeg", "/products/kahf/bundle-4in1/6.jpeg",
        "/products/kahf/bundle-4in1/7.jpeg", "/products/kahf/bundle-4in1/8.jpeg", "/products/kahf/bundle-4in1/9.jpeg",
        "/products/kahf/bundle-4in1/10.jpeg", "/products/kahf/bundle-4in1/11.jpeg", "/products/kahf/bundle-4in1/12.jpeg",
        "/products/kahf/bundle-4in1/13.jpeg", "/products/kahf/bundle-4in1/14.jpeg"
      ], 
      shopee: { price: "Rp 126.490", link: "https://s.shopee.co.id/9AMmqIuh1y" },
      tokopedia: { price: "Rp 105.154", link: "https://vt.tokopedia.com/t/ZS9MeAPEWbsdQ-BGFRW/" }
    },
    { 
      id: 3, 
      name: "Hanasui Tintdorable Lip Stain / Lip Tint Natural Tint", 
      category: "perawatan", 
      subCategory: "Makeup & Kosmetik Estetik",
      detailCategory: "Lip Tint & Lipstik",
      isOfficial: false, 
      images: [
        "/products/hanasui/lip-tint/1.jpeg", "/products/hanasui/lip-tint/2.jpeg", "/products/hanasui/lip-tint/3.jpeg",
        "/products/hanasui/lip-tint/4.jpeg", "/products/hanasui/lip-tint/5.jpeg", "/products/hanasui/lip-tint/6.jpeg",
        "/products/hanasui/lip-tint/7.jpeg", "/products/hanasui/lip-tint/8.jpeg", "/products/hanasui/lip-tint/9.jpeg",
        "/products/hanasui/lip-tint/10.jpeg", "/products/hanasui/lip-tint/11.jpeg", "/products/hanasui/lip-tint/12.jpeg",
        "/products/hanasui/lip-tint/13.jpeg", "/products/hanasui/lip-tint/14.jpeg", "/products/hanasui/lip-tint/15.jpeg"
      ], 
      shopee: { price: "Rp 44.533", link: "https://s.shopee.co.id/AAFK2Tqn3R" },
      tokopedia: { price: "Rp 41.912", link: "https://vt.tokopedia.com/t/ZS9MeDrTBJFym-y5NSK/" }
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
          <p className="text-[10px] sm:text-xs font-mono text-slate-400 mt-1">// Premium Smart Target Affiliate Engine</p>
          <div className="mt-3 inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-1.5 rounded-xl text-[10px] sm:text-xs font-mono max-w-max">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            ✨ Semua Produk Terjamin: 1000+ Terjual & Rating 4.5★ ke atas
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
              ↳ Pilih Spesifikasi Area:
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
                  ✕ Reset Area
                </button>
              )}
            </div>
          </div>
        )}

        {/* LEVEL 3: DETAILS */}
        {subFilter !== "all" && activeSubObject && activeSubObject.details.length > 0 && (
          <div className="bg-slate-900/40 border border-slate-800/80 border-dashed rounded-xl p-3 mb-6 flex flex-col gap-2">
            <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
              ↳ Filter Berdasarkan Jenis Barang:
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
                onZoom={setZoomImg}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-slate-500 font-mono text-xs sm:text-sm">
              // Belum ada produk di spesifikasi detail ini.
            </div>
          )}
        </div>
      </div>

      {/* LIGHTBOX MODAL: ZOOM PREVIEW */}
      {zoomImg && (
        <div 
          onClick={() => setZoomImg(null)}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div className="relative max-w-3xl max-h-[85vh] w-full h-full flex items-center justify-center">
            <img 
              src={zoomImg} 
              alt="Preview Zoom" 
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-slate-800"
            />
            <button className="absolute -top-10 right-0 text-white font-mono text-xs bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full hover:bg-slate-800">
              ✕ Tutup
            </button>
          </div>
        </div>
      )}

      {/* POP-UP MODAL: WELCOME MESSAGE */}
      {showWelcome && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-7 max-w-md w-full text-center shadow-2xl relative">
            <div className="w-12 h-12 bg-indigo-600/10 border border-indigo-500/30 text-indigo-400 rounded-full flex items-center justify-center mx-auto text-xl mb-4">
              👋
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight mb-2">
              Welcome to Rey Store Hub!
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mb-6">
              Terima kasih banyak telah berkunjung ke platform kurasi kami. Website ini dibuat secara independen untuk mempermudah kamu berbelanja produk terpercaya. 
              <br /><br />
              Kami akan sangat berterima kasih apabila kamu melakukan checkout barang dari <span className="font-bold text-indigo-400">link Shopee atau Tokopedia</span> yang kami sediakan. Komisi kecil dari pembelianmu akan dialokasikan penuh untuk <span className="font-bold text-indigo-400">memperpanjang biaya sewa domain</span> website ini agar tetap bisa terus mengudara. 🙏✨
            </p>
            <button 
              onClick={() => setShowWelcome(false)}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold rounded-xl transition-colors shadow-lg shadow-indigo-600/20 uppercase tracking-wider"
            >
              Masuk ke Toko →
            </button>
          </div>
        </div>
      )}

    </div>
  );
}