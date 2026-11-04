import React, { useState } from 'react';
import { Calculator, ArrowRight, Sparkles, Coins } from 'lucide-react';

export default function PriceCalculator({ partners, onProceedWithCalculation }) {
  const [selectedPartnerId, setSelectedPartnerId] = useState(partners[0]?.id || '');
  const [selectedWasteIndex, setSelectedWasteIndex] = useState(0);
  const [weight, setWeight] = useState(10);

  const selectedPartner = partners.find(p => p.id === selectedPartnerId) || partners[0];
  const selectedWaste = selectedPartner?.acceptedWaste[selectedWasteIndex] || selectedPartner?.acceptedWaste[0];

  const estimatedTotal = (selectedWaste?.price || 0) * (Number(weight) || 0);

  return (
    <div className="bg-gradient-to-br from-primary-900 to-primary-800 text-white rounded-3xl p-6 md:p-8 shadow-xl">
      <div className="flex items-center gap-2.5 mb-2">
        <div className="p-2 rounded-xl bg-white/10 text-accent-400">
          <Calculator className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-bold font-heading">
          Kalkulator Estimasi Nilai Sampah Anda
        </h3>
      </div>
      <p className="text-xs md:text-sm text-primary-100 mb-6">
        Hitung potensi penghasilan dari pemilahan sampah anorganik berdasarkan tarif resmi bank sampah mitra di Balikpapan.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Pilih Mitra */}
        <div>
          <label className="block text-xs font-semibold text-primary-200 uppercase tracking-wider mb-1.5">
            1. Pengelola Sampah
          </label>
          <select
            value={selectedPartnerId}
            onChange={(e) => {
              setSelectedPartnerId(e.target.value);
              setSelectedWasteIndex(0);
            }}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white text-gray-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent-400"
          >
            {partners.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.district})
              </option>
            ))}
          </select>
        </div>

        {/* Pilih Jenis Sampah */}
        <div>
          <label className="block text-xs font-semibold text-primary-200 uppercase tracking-wider mb-1.5">
            2. Jenis Sampah Anorganik
          </label>
          <select
            value={selectedWasteIndex}
            onChange={(e) => setSelectedWasteIndex(Number(e.target.value))}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white text-gray-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent-400"
          >
            {selectedPartner?.acceptedWaste.map((item, idx) => (
              <option key={idx} value={idx}>
                {item.name} — Rp {item.price.toLocaleString('id-ID')}/kg
              </option>
            ))}
          </select>
        </div>

        {/* Berat kg */}
        <div>
          <label className="block text-xs font-semibold text-primary-200 uppercase tracking-wider mb-1.5">
            3. Estimasi Berat (kg)
          </label>
          <input
            type="number"
            min="1"
            max="1000"
            value={weight}
            onChange={(e) => setWeight(Math.max(1, Number(e.target.value)))}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white text-gray-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent-400"
          />
        </div>
      </div>

      {/* Result Card */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-accent-500 text-gray-950 flex items-center justify-center font-bold">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs uppercase text-primary-200 font-semibold tracking-wider block">
              Estimasi Nilai yang Anda Peroleh:
            </span>
            <div className="text-2xl md:text-3xl font-black font-mono text-accent-300">
              Rp {estimatedTotal.toLocaleString('id-ID')}
            </div>
            <span className="text-[11px] text-primary-200">
              ({weight} kg × Rp {(selectedWaste?.price || 0).toLocaleString('id-ID')} / kg)
            </span>
          </div>
        </div>

        <button
          onClick={() => onProceedWithCalculation({
            partner: selectedPartner,
            wasteType: selectedWaste?.name,
            weight: Number(weight),
            estimatedPricePerKg: selectedWaste?.price,
            estimatedTotal,
          })}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-500 hover:bg-accent-400 text-gray-950 font-bold text-sm shadow-lg hover:shadow-xl transition-all"
        >
          <span>Lanjut Ajukan Penjemputan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

