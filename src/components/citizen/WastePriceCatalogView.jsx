import React, { useState } from 'react';
import { Tag, Search, ArrowRight, CheckCircle2, Sparkles, Filter, Info, Package, AlertCircle } from 'lucide-react';

export const WASTE_CATALOG_DATA = [
  {
    id: 'w-1',
    category: 'Plastik',
    name: 'Plastik PET (Botol Bening)',
    priceRange: 'Rp 3.300 - Rp 3.600',
    unit: 'kg',
    description: 'Botol air mineral transparan, botol jus bening, dan wadah minuman sekali pakai.',
    sortingTips: [
      'Bilas sisa cairan di dalam botol hingga bersih.',
      'Lepas label plastik luar jika memungkinkan.',
      'Pipihkan botol untuk menghemat ruang penyimpanan.',
    ],
    acceptanceRate: 'Diterima oleh semua bank sampah di Balikpapan',
    ecoImpact: '1 kg botol PET mencegah ~1.5 kg emisi karbon CO2e.',
  },
  {
    id: 'w-2',
    category: 'Plastik',
    name: 'Plastik HDPE / Keras',
    priceRange: 'Rp 2.000 - Rp 2.700',
    unit: 'kg',
    description: 'Botol sampo, jerigen minyak goreng, botol sabun cuci, dan tutup botol tebal.',
    sortingTips: [
      'Pastikan isi sabun atau minyak telah dibilas bersih.',
      'Pisahkan tutup yang berbahan beda jika dianjurkan pengelola.',
    ],
    acceptanceRate: 'Tinggi (Bank Sampah & Pengepul)',
    ecoImpact: 'Didaur ulang menjadi ember, pipa, dan pot tanaman.',
  },
  {
    id: 'w-3',
    category: 'Kertas',
    name: 'Kardus Box / Karton Cokelat',
    priceRange: 'Rp 2.100 - Rp 2.400',
    unit: 'kg',
    description: 'Kardus kemasan barang elektronik, boks belanja online, dan karton gelombang cokelat.',
    sortingTips: [
      'Bongkar lipatan kardus agar menjadi lembaran datar.',
      'Pastikan kardus dalam keadaan kering dan tidak terkena minyak/lembab.',
      'Ikat rapi dengan tali rafia dalam ikatan 5-10 kg.',
    ],
    acceptanceRate: 'Sangat Tinggi di seluruh Kota Balikpapan',
    ecoImpact: 'Dapat didaur ulang kembali hingga 7 kali siklus.',
  },
  {
    id: 'w-4',
    category: 'Kertas',
    name: 'Kertas HVS / Arsip Putih',
    priceRange: 'Rp 2.500 - Rp 2.700',
    unit: 'kg',
    description: 'Kertas bekas cetak kantor, buku tulis, lembar fotokopi, dan dokumen administrasi.',
    sortingTips: [
      'Lepas klip kertas, staples besi, dan binder plastik.',
      'Kertas tidak boleh basah atau terbakar.',
      'Tumpuk rapi dan ikat dengan tali.',
    ],
    acceptanceRate: 'Tinggi untuk kawasan perkantoran & sekolah',
    ecoImpact: 'Mengurangi kebutuhan penebangan pohon untuk bubur kertas baru.',
  },
  {
    id: 'w-5',
    category: 'Logam',
    name: 'Kaleng Aluminium Minuman',
    priceRange: 'Rp 11.500 - Rp 12.500',
    unit: 'kg',
    description: 'Kaleng minuman ringan bersoda, minuman isotonik, dan kaleng susu aluminium.',
    sortingTips: [
      'Bilas sisa minuman manis untuk mencegah semut.',
      'Injak atau pipihkan kaleng hingga gepeng untuk efisiensi volume.',
    ],
    acceptanceRate: 'Memiliki nilai ekonomi tertinggi per kilogram',
    ecoImpact: 'Daur ulang aluminium menghemat 95% energi dibanding produksi bijih bauksit.',
  },
  {
    id: 'w-6',
    category: 'Logam',
    name: 'Besi Tua & Logam Campur',
    priceRange: 'Rp 4.500 - Rp 5.000',
    unit: 'kg',
    description: 'Pipa besi, kawat, seng atap sisa renovasi, rangka sepeda, dan perkakas rusak.',
    sortingTips: [
      'Pisahkan dari material semen, kayu, atau karet yang menempel.',
      'Kumpulkan dalam wadah yang aman agar tidak melukai kurir penjemput.',
    ],
    acceptanceRate: 'Diterima oleh pengepul dan bank sampah induk',
    ecoImpact: 'Dilebur kembali di pabrik baja nasional tanpa penurunan kualitas.',
  },
  {
    id: 'w-7',
    category: 'Kaca',
    name: 'Botol Kaca Utuh',
    priceRange: 'Rp 1.000 - Rp 1.200',
    unit: 'kg',
    description: 'Botol kecap, botol sirup, dan botol selai kaca dalam kondisi utuh tidak pecah.',
    sortingTips: [
      'Cuci bersih bagian dalam botol.',
      'Lepaskan tutup logam atau plastik.',
      'Kemukakan dalam kardus penyekat agar tidak saling berbenturan dan pecah.',
    ],
    acceptanceRate: 'Diterima oleh pengelola yang bekerja sama dengan pabrik botol',
    ecoImpact: 'Dapat digunakan kembali (*reuse*) setelah proses sterilisasi industri.',
  },
];

export default function WastePriceCatalogView({ onGoToDirectory }) {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Semua', 'Plastik', 'Kertas', 'Logam', 'Kaca'];

  const filteredItems = WASTE_CATALOG_DATA.filter(item => {
    const matchesCat = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-primary-800 to-primary-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-primary-200 mb-3 border border-white/10">
            <Tag className="w-3.5 h-3.5 text-accent-400" /> Katalog Harga & Edukasi Pemilahan
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-tight mb-2">
            Jenis Sampah Anorganik & Standar Harga Balikpapan
          </h2>
          <p className="text-xs sm:text-sm text-primary-100 leading-relaxed">
            Ketahui jenis sampah bernilai ekonomi, rentang harga beli resmi per kilogram di bank sampah mitra, serta tips pemilahan agar sampah Anda dihargai optimal.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-primary-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Query */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari jenis sampah..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50/50"
          />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-primary-200 transition-all p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                  item.category === 'Plastik' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                  item.category === 'Kertas' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                  item.category === 'Logam' ? 'bg-blue-50 text-blue-800 border border-blue-200' :
                  'bg-purple-50 text-purple-800 border border-purple-200'
                }`}>
                  Kategori {item.category}
                </span>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-medium">Rentang Harga Balikpapan:</span>
                  <span className="text-base sm:text-lg font-black font-mono text-primary-800">
                    {item.priceRange} <span className="text-xs font-normal text-slate-500">/{item.unit}</span>
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold font-heading text-slate-900 mb-1.5">
                {item.name}
              </h3>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                {item.description}
              </p>

              {/* Sorting Tips */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2 mb-4">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary-700" /> Panduan Pemilahan yang Benar:
                </span>
                <ul className="space-y-1 text-xs text-slate-600">
                  {item.sortingTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary-700 font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Eco Impact */}
              <div className="text-[11px] text-slate-500 flex items-start gap-2 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-accent-600 shrink-0 mt-0.5" />
                <span>{item.ecoImpact}</span>
              </div>
            </div>

            {/* Action */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 mt-2">
              <span className="text-[11px] text-slate-400 italic">
                {item.acceptanceRate}
              </span>

              <button
                onClick={onGoToDirectory}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-700 hover:text-primary-800 hover:underline"
              >
                <span>Cari Bank Sampah Terdekat</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

