import React, { useState } from 'react';
import { Search, MapPin, Filter, Sparkles, AlertCircle, Building2 } from 'lucide-react';
import PartnerCard from './PartnerCard';
import PriceCalculator from './PriceCalculator';
import { BALIKPAPAN_DISTRICTS } from '../../data/initialData';

export default function PartnerDirectory({ partners, onSelectPartner, onProceedWithCalculation }) {
  const [selectedDistrict, setSelectedDistrict] = useState('Semua Kecamatan');
  const [searchQuery, setSearchQuery] = useState('');
  const [wasteFilter, setWasteFilter] = useState('Semua');

  // Filter partners
  const filteredPartners = partners.filter(partner => {
    const matchesDistrict = selectedDistrict === 'Semua Kecamatan' || partner.district === selectedDistrict;
    const matchesSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          partner.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesWaste = wasteFilter === 'Semua' || 
                         partner.acceptedWaste.some(w => w.name.toLowerCase().includes(wasteFilter.toLowerCase()));

    return matchesDistrict && matchesSearch && matchesWaste;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Banner Section for Search */}
      <div className="bg-gradient-to-b from-primary-50 via-white to-white border-b border-gray-200/80 pt-8 pb-10 px-4 sm:px-6 lg:px-8 -mt-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-100 text-primary-800 mb-3">
              <MapPin className="w-3.5 h-3.5" /> Direktori Pengelola Sampah Balikpapan
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-gray-900 tracking-tight leading-tight mb-3">
              Temukan Bank Sampah & Pengepul Terdekat
            </h1>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Cari mitra pengelola sampah anorganik berizin di Kota Balikpapan. Bandingkan harga beli per kilogram dan ajukan penjemputan langsung dari rumah Anda.
            </p>
          </div>

          {/* Interactive Filters Bar */}
          <div className="mt-8 bg-white p-4 md:p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              {/* Search input */}
              <div className="md:col-span-5 relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari nama bank sampah atau jalan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-gray-800 placeholder-gray-400 bg-gray-50/50"
                />
              </div>

              {/* District Filter */}
              <div className="md:col-span-4 relative">
                <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full pl-10 pr-8 py-2.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-gray-800 bg-gray-50/50"
                >
                  {BALIKPAPAN_DISTRICTS.map((district, idx) => (
                    <option key={idx} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>

              {/* Material Filter */}
              <div className="md:col-span-3">
                <select
                  value={wasteFilter}
                  onChange={(e) => setWasteFilter(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-gray-800 bg-gray-50/50"
                >
                  <option value="Semua">Semua Jenis Sampah</option>
                  <option value="Plastik">Plastik (PET/HDPE)</option>
                  <option value="Kardus">Kardus & Kertas</option>
                  <option value="Kaleng">Kaleng & Logam</option>
                  <option value="Kaca">Kaca / Botol</option>
                </select>
              </div>
            </div>

            {/* Active filter counter */}
            <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
              <span className="font-medium">
                Menampilkan <strong className="text-primary-700">{filteredPartners.length}</strong> mitra pengelola di Balikpapan
              </span>
              {(selectedDistrict !== 'Semua Kecamatan' || searchQuery !== '' || wasteFilter !== 'Semua') && (
                <button
                  onClick={() => {
                    setSelectedDistrict('Semua Kecamatan');
                    setSearchQuery('');
                    setWasteFilter('Semua');
                  }}
                  className="text-primary-700 font-semibold hover:underline"
                >
                  Reset Filter
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Price Calculator Widget */}
        <PriceCalculator
          partners={partners}
          onProceedWithCalculation={onProceedWithCalculation}
        />

        {/* Partners Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold font-heading text-gray-900">
                Daftar Mitra Bank Sampah & Pengepul
              </h2>
              <p className="text-xs text-gray-500">
                Pilih mitra yang sesuai dengan lokasi Anda untuk proses penjemputan lebih cepat
              </p>
            </div>
          </div>

          {filteredPartners.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                Tidak ada mitra yang cocok
              </h3>
              <p className="text-xs text-gray-600 mb-6">
                Coba ubah kata kunci pencarian atau pilih wilayah kecamatan lainnya di Kota Balikpapan.
              </p>
              <button
                onClick={() => {
                  setSelectedDistrict('Semua Kecamatan');
                  setSearchQuery('');
                  setWasteFilter('Semua');
                }}
                className="px-4 py-2 bg-primary-700 text-white rounded-xl text-xs font-semibold hover:bg-primary-800"
              >
                Tampilkan Semua Mitra
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPartners.map(partner => (
                <PartnerCard
                  key={partner.id}
                  partner={partner}
                  onSelectPartner={onSelectPartner}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

