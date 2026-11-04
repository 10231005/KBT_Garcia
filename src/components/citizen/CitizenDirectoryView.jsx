import React, { useState } from 'react';
import { Search, MapPin, Tag, Star, Phone, Clock, Truck, Calculator, Coins, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';
import { BALIKPAPAN_DISTRICTS } from '../../data/initialData';

export default function CitizenDirectoryView({
  partners,
  onSelectPartnerForPickup,
}) {
  const [selectedDistrict, setSelectedDistrict] = useState('Semua Kecamatan');
  const [searchQuery, setSearchQuery] = useState('');
  const [wasteFilter, setWasteFilter] = useState('Semua');

  // Mini calculator state
  const [calcPartnerId, setCalcPartnerId] = useState(partners[0]?.id || '');
  const [calcWasteIndex, setCalcWasteIndex] = useState(0);
  const [calcWeight, setCalcWeight] = useState(10);

  const selectedCalcPartner = partners.find(p => p.id === calcPartnerId) || partners[0];
  const selectedCalcWaste = selectedCalcPartner?.acceptedWaste[calcWasteIndex] || selectedCalcPartner?.acceptedWaste[0];
  const estimatedCalcTotal = (selectedCalcWaste?.price || 0) * (Number(calcWeight) || 0);

  // Filter partners
  const filteredPartners = partners.filter(p => {
    const matchesDistrict = selectedDistrict === 'Semua Kecamatan' || p.district === selectedDistrict;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesWaste = wasteFilter === 'Semua' ||
                         p.acceptedWaste.some(w => w.name.toLowerCase().includes(wasteFilter.toLowerCase()));
    return matchesDistrict && matchesSearch && matchesWaste;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner & Info */}
      <div className="bg-gradient-to-r from-primary-800 to-primary-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-primary-200 mb-3 border border-white/10">
            <MapPin className="w-3.5 h-3.5 text-accent-400" /> Wilayah Kota Balikpapan
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-tight mb-2">
            Temukan Pengelola Sampah Anorganik
          </h2>
          <p className="text-xs sm:text-sm text-primary-100 leading-relaxed">
            Bandingkan harga beli resmi per kilogram dari bank sampah dan pengepul berizin di sekitar Anda, lalu jadwalkan penjemputan langsung dari rumah.
          </p>
        </div>
      </div>

      {/* Interactive Price Calculator Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <div className="p-2 rounded-xl bg-primary-100 text-primary-800">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold font-heading text-slate-900">
              Kalkulator Estimasi Pendapatan Sampah
            </h3>
            <p className="text-xs text-slate-500">
              Hitung potensi uang yang Anda peroleh berdasarkan berat dan tarif resmi mitra
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              1. Pilih Bank Sampah Mitra
            </label>
            <select
              value={calcPartnerId}
              onChange={(e) => {
                setCalcPartnerId(e.target.value);
                setCalcWasteIndex(0);
              }}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {partners.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.district})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              2. Jenis Sampah Anorganik
            </label>
            <select
              value={calcWasteIndex}
              onChange={(e) => setCalcWasteIndex(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {selectedCalcPartner?.acceptedWaste.map((item, idx) => (
                <option key={idx} value={idx}>
                  {item.name} — Rp {item.price.toLocaleString('id-ID')}/kg
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              3. Estimasi Berat (kg)
            </label>
            <input
              type="number"
              min="1"
              max="1000"
              value={calcWeight}
              onChange={(e) => setCalcWeight(Math.max(1, Number(e.target.value)))}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-bold text-slate-900 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Calculator Output & Action */}
        <div className="bg-primary-50/80 p-4 rounded-2xl border border-primary-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-700 text-white flex items-center justify-center font-bold shrink-0">
              <Coins className="w-5 h-5 text-accent-300" />
            </div>
            <div>
              <span className="text-[11px] text-slate-600 block">Total Estimasi Pendapatan:</span>
              <span className="text-xl sm:text-2xl font-black font-mono text-primary-900">
                Rp {estimatedCalcTotal.toLocaleString('id-ID')}
              </span>
              <span className="text-[11px] text-slate-500 ml-2">
                ({calcWeight} kg × Rp {(selectedCalcWaste?.price || 0).toLocaleString('id-ID')})
              </span>
            </div>
          </div>

          <button
            onClick={() => onSelectPartnerForPickup(selectedCalcPartner, selectedCalcWaste?.name, calcWeight)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary-700 hover:bg-primary-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
          >
            <span>Ajukan Penjemputan Ini</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama bank sampah atau jalan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50/50"
            />
          </div>

          <div className="md:col-span-4 relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50/50"
            >
              {BALIKPAPAN_DISTRICTS.map((d, i) => (
                <option key={i} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={wasteFilter}
              onChange={(e) => setWasteFilter(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50/50"
            >
              <option value="Semua">Semua Material</option>
              <option value="Plastik">Plastik (PET/HDPE)</option>
              <option value="Kardus">Kardus / Kertas</option>
              <option value="Kaleng">Kaleng / Logam</option>
              <option value="Kaca">Kaca / Botol</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>
            Menampilkan <strong className="text-primary-800">{filteredPartners.length}</strong> pengelola sampah aktif di Balikpapan
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

      {/* Partners Grid */}
      {filteredPartners.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto">
          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
          <h4 className="text-base font-bold text-slate-900 mb-1">Tidak ada mitra pengelola yang cocok</h4>
          <p className="text-xs text-slate-500 mb-4">Coba ubah kata kunci pencarian atau pilih wilayah kecamatan lainnya.</p>
          <button
            onClick={() => {
              setSelectedDistrict('Semua Kecamatan');
              setSearchQuery('');
              setWasteFilter('Semua');
            }}
            className="px-4 py-2 bg-primary-700 text-white rounded-xl text-xs font-semibold"
          >
            Tampilkan Semua Pengelola
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPartners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-primary-300 transition-all flex flex-col justify-between overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-primary-50 text-primary-800 border border-primary-100">
                    {partner.type}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-700 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{partner.rating}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold font-heading text-slate-900 mb-1.5">
                  {partner.name}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                  {partner.description}
                </p>

                <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3 mb-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
                    <span className="font-medium text-slate-800">{partner.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary-600 shrink-0" />
                    <span>{partner.hours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary-600 shrink-0" />
                    <span className="font-mono">{partner.phone}</span>
                  </div>
                </div>

                {/* Accepted waste price snippet */}
                <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
                  <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3 h-3 text-primary-700" /> Tarif Sampah Diterima:
                    </span>
                    <span className="text-[10px] text-slate-400 font-normal">Min {partner.minPickupWeight} kg</span>
                  </div>

                  <div className="space-y-1">
                    {partner.acceptedWaste.slice(0, 3).map((w, idx) => (
                      <div key={idx} className="flex justify-between text-xs py-0.5">
                        <span className="text-slate-600 truncate mr-2">{w.name}</span>
                        <span className="font-bold font-mono text-primary-800 shrink-0">
                          Rp {w.price.toLocaleString('id-ID')}/{w.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                  {partner.acceptedWaste.length > 3 && (
                    <span className="text-[10px] text-primary-700 font-semibold block mt-1">
                      + {partner.acceptedWaste.length - 3} material lainnya
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 bg-slate-50/80 border-t border-slate-100">
                <button
                  onClick={() => onSelectPartnerForPickup(partner)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary-700 hover:bg-primary-800 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all"
                >
                  <Truck className="w-4 h-4" />
                  <span>Pilih & Ajukan Penjemputan</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

