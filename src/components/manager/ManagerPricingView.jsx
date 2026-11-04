import React, { useState } from 'react';
import { Tag, Edit3, Plus, Check, Trash2 } from 'lucide-react';

export default function ManagerPricingView({
  currentPartner,
  onUpdatePartnerWastePrices,
}) {
  const [editingIdx, setEditingIdx] = useState(null);
  const [priceInput, setPriceInput] = useState('');

  const [newWasteName, setNewWasteName] = useState('');
  const [newWastePrice, setNewWastePrice] = useState('');

  const handleSavePrice = (idx) => {
    const p = parseInt(priceInput, 10);
    if (!p || p <= 0) {
      alert('Masukkan harga yang valid.');
      return;
    }
    const updated = [...currentPartner.acceptedWaste];
    updated[idx] = { ...updated[idx], price: p };
    onUpdatePartnerWastePrices(currentPartner.id, updated);
    setEditingIdx(null);
    setPriceInput('');
  };

  const handleAddNewWaste = (e) => {
    e.preventDefault();
    if (!newWasteName.trim() || !newWastePrice) {
      alert('Isi nama sampah dan harganya.');
      return;
    }
    const updated = [
      ...currentPartner.acceptedWaste,
      {
        name: newWasteName.trim(),
        price: parseInt(newWastePrice, 10),
        unit: 'kg',
      },
    ];
    onUpdatePartnerWastePrices(currentPartner.id, updated);
    setNewWasteName('');
    setNewWastePrice('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 items-start">
      {/* Existing catalog list */}
      <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900">
            Daftar Tarif Sampah Diterima
          </h3>
          <p className="text-xs text-slate-500">
            Harga per kilogram yang berlaku saat ini di {currentPartner.name}
          </p>
        </div>

        <div className="space-y-3 pt-2">
          {currentPartner.acceptedWaste.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border border-slate-100 bg-slate-50/60 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-800 flex items-center justify-center font-bold">
                  <Tag className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-xs sm:text-sm block">
                    {item.name}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Satuan per {item.unit}
                  </span>
                </div>
              </div>

              {editingIdx === idx ? (
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    value={priceInput}
                    onChange={(e) => setPriceInput(e.target.value)}
                    className="w-24 px-2 py-1 text-xs border border-slate-300 rounded-lg bg-white"
                  />
                  <button
                    onClick={() => handleSavePrice(idx)}
                    className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold"
                  >
                    Simpan
                  </button>
                  <button
                    onClick={() => setEditingIdx(null)}
                    className="px-2 py-1 text-slate-400 text-xs hover:underline"
                  >
                    Batal
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base font-black font-mono text-primary-800">
                    Rp {item.price.toLocaleString('id-ID')} /{item.unit}
                  </span>
                  <button
                    onClick={() => {
                      setEditingIdx(idx);
                      setPriceInput(String(item.price));
                    }}
                    className="p-1.5 text-slate-400 hover:text-primary-700 hover:bg-white rounded-lg transition-colors"
                    title="Ubah tarif"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add new item */}
      <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900 flex items-center gap-2">
            <Plus className="w-5 h-5 text-primary-700" />
            Tambah Material Baru
          </h3>
          <p className="text-xs text-slate-500">
            Perluas jenis sampah anorganik yang dapat disetor warga
          </p>
        </div>

        <form onSubmit={handleAddNewWaste} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Nama Sampah Anorganik *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Logam Tembaga / Aki Bekas"
              value={newWasteName}
              onChange={(e) => setNewWasteName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Harga Beli per Kilogram (Rp) *
            </label>
            <input
              type="number"
              required
              placeholder="Contoh: 15000"
              value={newWastePrice}
              onChange={(e) => setNewWastePrice(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-primary-700 hover:bg-primary-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all"
          >
            + Tambahkan ke Daftar Penerimaan
          </button>
        </form>
      </div>
    </div>
  );
}

