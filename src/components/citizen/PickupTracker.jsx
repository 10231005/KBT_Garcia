import React, { useState } from 'react';
import { PackageSearch, Search, Clock, CheckCircle2, Truck, AlertCircle, ArrowRight, Calendar, MapPin, User } from 'lucide-react';

export default function PickupTracker({ orders, initialOrderId }) {
  const [searchId, setSearchId] = useState(initialOrderId || orders[0]?.id || '');
  const [activeOrder, setActiveOrder] = useState(
    orders.find(o => o.id === initialOrderId) || orders[0] || null
  );

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchId.trim().toLowerCase();
    const found = orders.find(
      o => o.id.toLowerCase() === query || o.customerPhone.includes(query)
    );
    if (found) {
      setActiveOrder(found);
    } else {
      alert('Permintaan dengan nomor ID atau kontak tersebut tidak ditemukan.');
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
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 pb-20 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-100 text-primary-800 mb-2">
          <PackageSearch className="w-3.5 h-3.5" /> Pelacakan Penjemputan Sampah
        </span>
        <h1 className="text-3xl font-extrabold font-heading text-gray-900 tracking-tight">
          Lacak Status Permintaan Anda
        </h1>
        <p className="text-gray-600 text-sm mt-2">
          Pantau perkembangan penjemputan sampah anorganik Anda secara real-time dari konfirmasi pengelola hingga penimbangan selesai.
        </p>
      </div>

      {/* Search Input Bar */}
      <form onSubmit={handleSearch} className="bg-white p-4 rounded-3xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Masukkan ID Permintaan (contoh: EC-2026-001) atau Nomor WhatsApp..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-gray-800 bg-gray-50/50 font-mono"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-primary-700 hover:bg-primary-800 text-white font-bold text-sm rounded-2xl transition-all shadow-sm"
        >
          Cari Status
        </button>
      </form>

      {/* Quick Access to Sample Orders */}
      <div className="bg-gray-100/70 p-3.5 rounded-2xl flex flex-wrap items-center gap-2 text-xs">
        <span className="text-gray-500 font-semibold">Pilih Cepat Contoh Permintaan:</span>
        {orders.map(order => (
          <button
            key={order.id}
            onClick={() => {
              setSearchId(order.id);
              setActiveOrder(order);
            }}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-colors ${
              activeOrder?.id === order.id
                ? 'bg-primary-700 text-white font-bold'
                : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-200'
            }`}
          >
            {order.id} ({order.status})
          </button>
        ))}
      </div>

      {/* Order Status Display */}
      {activeOrder && (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Top Status Banner */}
          <div className="p-6 md:p-8 bg-gradient-to-r from-primary-900 to-primary-800 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-primary-200 font-bold block mb-1">
                Nomor Tiket Penjemputan
              </span>
              <div className="text-2xl md:text-3xl font-black font-mono text-white flex items-center gap-2">
                <span>{activeOrder.id}</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/20 text-accent-300 font-sans">
                  {activeOrder.status}
                </span>
              </div>
            </div>

            <div className="text-xs text-primary-200 sm:text-right">
              <div>Diajukan pada: <strong>{activeOrder.createdAt}</strong></div>
              <div>Mitra: <strong>{activeOrder.partnerName}</strong></div>
            </div>
          </div>

          {/* Visual Stepper */}
          <div className="p-6 md:p-8 border-b border-gray-100">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">
              Progres Penjemputan Digital:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Step 1 */}
              <div className={`p-4 rounded-2xl border transition-all ${
                currentStep >= 1 ? 'bg-primary-50 border-primary-200 text-primary-900' : 'bg-gray-50 border-gray-200 text-gray-400'
              }`}>
                <div className="flex items-center gap-2 font-bold text-sm mb-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    currentStep >= 1 ? 'bg-primary-700 text-white' : 'bg-gray-300 text-white'
                  }`}>
                    1
                  </div>
                  <span>Menunggu</span>
                </div>
                <p className="text-[11px] text-gray-600">
                  Permintaan dikirim ke sistem mitra pengelola
                </p>
              </div>

              {/* Step 2 */}
              <div className={`p-4 rounded-2xl border transition-all ${
                currentStep >= 2 ? 'bg-secondary-50 border-secondary-200 text-secondary-900' : 'bg-gray-50 border-gray-200 text-gray-400'
              }`}>
                <div className="flex items-center gap-2 font-bold text-sm mb-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    currentStep >= 2 ? 'bg-secondary-700 text-white' : 'bg-gray-300 text-white'
                  }`}>
                    2
                  </div>
                  <span>Dikonfirmasi</span>
                </div>
                <p className="text-[11px] text-gray-600">
                  Jadwal & armada jemput telah disetujui pengelola
                </p>
              </div>

              {/* Step 3 */}
              <div className={`p-4 rounded-2xl border transition-all ${
                currentStep >= 3 ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-gray-50 border-gray-200 text-gray-400'
              }`}>
                <div className="flex items-center gap-2 font-bold text-sm mb-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    currentStep >= 3 ? 'bg-amber-600 text-white' : 'bg-gray-300 text-white'
                  }`}>
                    3
                  </div>
                  <span>Dalam Jemput</span>
                </div>
                <p className="text-[11px] text-gray-600">
                  Armada kurir menuju ke lokasi penjemputan
                </p>
              </div>

              {/* Step 4 */}
              <div className={`p-4 rounded-2xl border transition-all ${
                currentStep >= 4 ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-gray-50 border-gray-200 text-gray-400'
              }`}>
                <div className="flex items-center gap-2 font-bold text-sm mb-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    currentStep >= 4 ? 'bg-emerald-600 text-white' : 'bg-gray-300 text-white'
                  }`}>
                    4
                  </div>
                  <span>Selesai & Catat</span>
                </div>
                <p className="text-[11px] text-gray-600">
                  Timbangan dicatat digital & transaksi tuntas
                </p>
              </div>
            </div>
          </div>

          {/* Details Body */}
          <div className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Info Pemohon & Lokasi */}
              <div className="space-y-4 bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Informasi Pemohon:
                </h4>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Nama:</span>
                    <span className="font-semibold text-gray-900">{activeOrder.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Kontak:</span>
                    <span className="font-mono text-gray-800">{activeOrder.customerPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Wilayah:</span>
                    <span className="font-medium text-gray-800">{activeOrder.district}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-0.5">Alamat Penjemputan:</span>
                    <span className="font-medium text-gray-900 block">{activeOrder.address}</span>
                  </div>
                  {activeOrder.notes && (
                    <div className="pt-2 border-t border-gray-200 text-xs text-gray-600">
                      <span className="font-semibold text-gray-700">Catatan:</span> {activeOrder.notes}
                    </div>
                  )}
                </div>
              </div>

              {/* Info Sampah & Jadwal */}
              <div className="space-y-4 bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Rincian Sampah & Jadwal:
                </h4>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Jenis Sampah:</span>
                    <span className="font-semibold text-gray-900">{activeOrder.wasteType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Estimasi Berat:</span>
                    <span className="font-medium text-gray-800">~{activeOrder.estimatedWeight} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tarif Pengelola:</span>
                    <span className="font-medium font-mono text-gray-800">
                      Rp {activeOrder.estimatedPricePerKg.toLocaleString('id-ID')}/kg
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Rencana Jadwal:</span>
                    <span className="font-semibold text-primary-800">
                      {activeOrder.pickupDate} ({activeOrder.pickupTimeSlot})
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="font-semibold text-gray-700">Estimasi Nilai:</span>
                    <span className="font-bold font-mono text-primary-800 text-base">
                      Rp {activeOrder.estimatedTotal.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* If Order is COMPLETED: Show Official Digital Weighting Receipt */}
            {activeOrder.status === 'Selesai' && (
              <div className="bg-emerald-50 border-2 border-emerald-500 p-6 rounded-2xl text-emerald-950 space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-base font-heading">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Struk Pencatatan Transaksi Digital Selesai</span>
                </div>
                <p className="text-xs text-emerald-800">
                  Penjemputan telah tuntas dilaksanakan oleh armada <strong>{activeOrder.partnerName}</strong>. Data timbangan telah direkam ke dalam basis data digital.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-3 border-t border-emerald-200 text-xs">
                  <div>
                    <span className="text-emerald-700 block">Berat Timbangan Aktual:</span>
                    <span className="text-lg font-black font-mono text-emerald-900">
                      {activeOrder.actualWeight} kg
                    </span>
                  </div>
                  <div>
                    <span className="text-emerald-700 block">Nominal Akhir Diterima Warga:</span>
                    <span className="text-lg font-black font-mono text-emerald-900">
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
      )}
    </div>
  );
}

