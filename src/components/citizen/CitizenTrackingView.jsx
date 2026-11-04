import React, { useState } from 'react';
import { PackageSearch, Search, Clock, CheckCircle2, Truck, Check, Calendar, MapPin, User, FileText, Scale } from 'lucide-react';

export default function CitizenTrackingView({
  orders,
  initialOrderId,
}) {
  const [searchId, setSearchId] = useState(initialOrderId || orders[0]?.id || '');
  const [activeOrder, setActiveOrder] = useState(
    orders.find(o => o.id === initialOrderId) || orders[0] || null
  );

  const handleSearch = (e) => {
    e.preventDefault();
    const q = searchId.trim().toLowerCase();
    const found = orders.find(
      o => o.id.toLowerCase() === q || o.customerPhone.includes(q)
    );
    if (found) {
      setActiveOrder(found);
    } else {
      alert('Permintaan penjemputan dengan nomor tiket atau kontak tersebut tidak ditemukan.');
    }
  };

  const getStepIndex = (status) => {
    switch (status) {
      case 'Menunggu Konfirmasi': return 1;
      case 'Dikonfirmasi': return 2;
      case 'Dalam Penjemputan': return 3;
      case 'Selesai': return 4;
      default: return 1;
    }
  };

  const currentStep = getStepIndex(activeOrder?.status);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Masukkan Kode Tiket (cth: EC-2026-001) atau Nomor WhatsApp..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono bg-slate-50/50"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2.5 bg-primary-700 hover:bg-primary-800 text-white font-bold text-xs sm:text-sm rounded-2xl transition-all shadow-sm"
        >
          Lacak Tiket
        </button>
      </form>

      {/* Quick Select Buttons */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-400 font-semibold">Pilih Cepat Pesanan:</span>
        {orders.map(o => (
          <button
            key={o.id}
            onClick={() => {
              setSearchId(o.id);
              setActiveOrder(o);
            }}
            className={`px-3 py-1 rounded-xl font-mono text-xs transition-colors ${
              activeOrder?.id === o.id
                ? 'bg-primary-700 text-white font-bold'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {o.id} ({o.status})
          </button>
        ))}
      </div>

      {/* Active Order Card */}
      {activeOrder ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Header Banner */}
          <div className="p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                Nomor Tiket Penjemputan
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black font-mono text-white">
                  {activeOrder.id}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary-500/20 text-accent-300 border border-primary-500/30">
                  {activeOrder.status}
                </span>
              </div>
            </div>

            <div className="text-xs text-slate-300 sm:text-right">
              <div>Mitra Pengelola: <strong>{activeOrder.partnerName}</strong></div>
              <div>Diajukan pada: {activeOrder.createdAt}</div>
            </div>
          </div>

          {/* Stepper Progress */}
          <div className="p-6 sm:p-8 border-b border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
              Tahapan Penjemputan Sampah:
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {/* Step 1 */}
              <div className={`p-3.5 rounded-2xl border transition-all ${
                currentStep >= 1 ? 'bg-primary-50 border-primary-200 text-primary-900' : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}>
                <div className="flex items-center gap-2 font-bold text-xs mb-1">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    currentStep >= 1 ? 'bg-primary-700 text-white' : 'bg-slate-300 text-white'
                  }`}>1</span>
                  <span>Menunggu</span>
                </div>
                <p className="text-[11px] text-slate-500">Permintaan masuk ke pengelola</p>
              </div>

              {/* Step 2 */}
              <div className={`p-3.5 rounded-2xl border transition-all ${
                currentStep >= 2 ? 'bg-secondary-50 border-secondary-200 text-secondary-900' : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}>
                <div className="flex items-center gap-2 font-bold text-xs mb-1">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    currentStep >= 2 ? 'bg-secondary-700 text-white' : 'bg-slate-300 text-white'
                  }`}>2</span>
                  <span>Dikonfirmasi</span>
                </div>
                <p className="text-[11px] text-slate-500">Jadwal disetujui mitra</p>
              </div>

              {/* Step 3 */}
              <div className={`p-3.5 rounded-2xl border transition-all ${
                currentStep >= 3 ? 'bg-purple-50 border-purple-200 text-purple-900' : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}>
                <div className="flex items-center gap-2 font-bold text-xs mb-1">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    currentStep >= 3 ? 'bg-purple-700 text-white' : 'bg-slate-300 text-white'
                  }`}>3</span>
                  <span>Dalam Jemput</span>
                </div>
                <p className="text-[11px] text-slate-500">Kurir menuju lokasi penjemputan</p>
              </div>

              {/* Step 4 */}
              <div className={`p-3.5 rounded-2xl border transition-all ${
                currentStep >= 4 ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}>
                <div className="flex items-center gap-2 font-bold text-xs mb-1">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    currentStep >= 4 ? 'bg-emerald-700 text-white' : 'bg-slate-300 text-white'
                  }`}>4</span>
                  <span>Selesai & Catat</span>
                </div>
                <p className="text-[11px] text-slate-500">Timbangan dicatat digital</p>
              </div>
            </div>
          </div>

          {/* Details info */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs space-y-2">
                <span className="font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Data Pemohon & Alamat
                </span>
                <div className="flex justify-between">
                  <span className="text-slate-500">Nama:</span>
                  <span className="font-semibold text-slate-900">{activeOrder.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Nomor Kontak:</span>
                  <span className="font-mono text-slate-800">{activeOrder.customerPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Kecamatan:</span>
                  <span className="text-slate-800">{activeOrder.district}</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">Alamat Jemput:</span>
                  <span className="font-medium text-slate-800 block">{activeOrder.address}</span>
                </div>
                {activeOrder.notes && (
                  <div className="pt-2 border-t border-slate-200 text-slate-600">
                    <span className="font-semibold">Catatan:</span> {activeOrder.notes}
                  </div>
                )}
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs space-y-2">
                <span className="font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Rincian Sampah & Jadwal
                </span>
                <div className="flex justify-between">
                  <span className="text-slate-500">Material Sampah:</span>
                  <span className="font-semibold text-slate-900">{activeOrder.wasteType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimasi Berat:</span>
                  <span className="font-medium text-slate-800">~{activeOrder.estimatedWeight} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tarif Pengelola:</span>
                  <span className="font-mono text-slate-800">Rp {activeOrder.estimatedPricePerKg.toLocaleString('id-ID')}/kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Rencana Jadwal:</span>
                  <span className="font-semibold text-primary-800">{activeOrder.pickupDate} ({activeOrder.pickupTimeSlot})</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200">
                  <span className="font-semibold text-slate-700">Estimasi Total:</span>
                  <span className="font-bold font-mono text-primary-800 text-sm">
                    Rp {activeOrder.estimatedTotal.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            </div>

            {/* If Selesai: Struk Timbangan Digital */}
            {activeOrder.status === 'Selesai' && (
              <div className="bg-emerald-50 border-2 border-emerald-500 p-6 rounded-2xl text-emerald-950 space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm sm:text-base font-heading">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Struk Pencatatan Transaksi Digital Tuntas</span>
                </div>
                <p className="text-xs text-emerald-800">
                  Sampah anorganik telah berhasil dijemput dan ditimbang di lokasi oleh petugas <strong>{activeOrder.partnerName}</strong>.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-3 border-t border-emerald-200 text-xs">
                  <div>
                    <span className="text-emerald-700 block">Berat Riil Timbangan:</span>
                    <span className="text-base sm:text-lg font-black font-mono text-emerald-950">
                      {activeOrder.actualWeight} kg
                    </span>
                  </div>
                  <div>
                    <span className="text-emerald-700 block">Nominal Diterima Warga:</span>
                    <span className="text-base sm:text-lg font-black font-mono text-emerald-950">
                      Rp {activeOrder.finalAmount?.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div>
                    <span className="text-emerald-700 block">Waktu Selesai:</span>
                    <span className="font-medium text-emerald-900">
                      {activeOrder.completedAt || 'Baru saja'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-slate-500">
          Pilih atau cari kode tiket penjemputan untuk melihat perkembangan.
        </div>
      )}
    </div>
  );
}

