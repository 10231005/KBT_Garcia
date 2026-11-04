import React, { useState } from 'react';
import { 
  Building2, 
  Clock, 
  CheckCircle2, 
  Truck, 
  XCircle, 
  Scale, 
  Tag, 
  Plus, 
  Edit3, 
  TrendingUp, 
  FileText,
  Filter,
  Check,
  AlertCircle
} from 'lucide-react';

export default function ManagerDashboard({
  partners,
  orders,
  onUpdateOrderStatus,
  onCompleteOrder,
  onUpdatePartnerWastePrices,
}) {
  const [selectedPartnerId, setSelectedPartnerId] = useState(partners[0]?.id || '');
  const [activeSubTab, setActiveSubTab] = useState('orders'); // 'orders' | 'services'
  const [statusFilter, setStatusFilter] = useState('Semua');

  // Modal State for Digital Weighting & Completion
  const [weightingOrder, setWeightingOrder] = useState(null);
  const [actualWeightInput, setActualWeightInput] = useState('');

  // Service Edit State
  const [editingWasteIdx, setEditingWasteIdx] = useState(null);
  const [editPriceInput, setEditPriceInput] = useState('');

  // Add new waste type state
  const [newWasteName, setNewWasteName] = useState('');
  const [newWastePrice, setNewWastePrice] = useState('');

  const currentPartner = partners.find(p => p.id === selectedPartnerId) || partners[0];

  // Orders filtered for this partner
  const partnerOrders = orders.filter(o => o.partnerId === currentPartner.id);

  const filteredOrders = partnerOrders.filter(o => {
    if (statusFilter === 'Semua') return true;
    return o.status === statusFilter;
  });

  // Calculate stats
  const pendingCount = partnerOrders.filter(o => o.status === 'Menunggu Konfirmasi').length;
  const confirmedCount = partnerOrders.filter(o => o.status === 'Dikonfirmasi').length;
  const inProgressCount = partnerOrders.filter(o => o.status === 'Dalam Penjemputan').length;
  const completedOrders = partnerOrders.filter(o => o.status === 'Selesai');
  const completedCount = completedOrders.length;
  
  const totalVolumeKg = completedOrders.reduce((sum, o) => sum + (o.actualWeight || o.estimatedWeight || 0), 0);
  const totalPayout = completedOrders.reduce((sum, o) => sum + (o.finalAmount || o.estimatedTotal || 0), 0);

  // Handle Complete Order Submission
  const handleConfirmWeighting = (e) => {
    e.preventDefault();
    const weightVal = parseFloat(actualWeightInput);
    if (!weightVal || weightVal <= 0) {
      alert('Masukkan angka timbangan yang valid.');
      return;
    }

    const finalAmount = Math.round(weightVal * weightingOrder.estimatedPricePerKg);
    onCompleteOrder(weightingOrder.id, weightVal, finalAmount);
    setWeightingOrder(null);
    setActualWeightInput('');
  };

  // Handle Price Edit
  const handleSavePrice = (idx) => {
    const newPriceVal = parseInt(editPriceInput, 10);
    if (!newPriceVal || newPriceVal <= 0) {
      alert('Masukkan nominal harga yang valid.');
      return;
    }

    const updatedWaste = [...currentPartner.acceptedWaste];
    updatedWaste[idx] = {
      ...updatedWaste[idx],
      price: newPriceVal,
    };

    onUpdatePartnerWastePrices(currentPartner.id, updatedWaste);
    setEditingWasteIdx(null);
    setEditPriceInput('');
  };

  // Handle Add New Waste Type
  const handleAddWaste = (e) => {
    e.preventDefault();
    if (!newWasteName || !newWastePrice) {
      alert('Isi nama jenis sampah dan harganya.');
      return;
    }

    const updatedWaste = [
      ...currentPartner.acceptedWaste,
      {
        name: newWasteName,
        price: parseInt(newWastePrice, 10),
        unit: 'kg',
      },
    ];

    onUpdatePartnerWastePrices(currentPartner.id, updatedWaste);
    setNewWasteName('');
    setNewWastePrice('');
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 pb-20 space-y-8">
      {/* Top Header: Partner Switcher */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-3xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-accent-500 text-gray-950">
              Portal Mitra Econnect
            </span>
            <span className="text-xs text-gray-300">
              Kota Balikpapan
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            Dashboard Pengelola Sampah
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 mt-1">
            Sistem informasi operasional penerimaan sampah anorganik, jadwal jemput, dan pencatatan digital.
          </p>
        </div>

        {/* Partner Select Dropdown */}
        <div className="bg-white/10 p-4 rounded-2xl border border-white/10 min-w-[280px]">
          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-accent-400" /> Kelola Sebagai Mitra:
          </label>
          <select
            value={selectedPartnerId}
            onChange={(e) => {
              setSelectedPartnerId(e.target.value);
              setEditingWasteIdx(null);
            }}
            className="w-full px-3 py-2 rounded-xl bg-white text-gray-900 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-accent-400"
          >
            {partners.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.district})
              </option>
            ))}
          </select>
          <span className="text-[11px] text-gray-400 block mt-1.5">
            Alamat: {currentPartner.address}
          </span>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            <span>Perlu Konfirmasi</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black font-mono text-amber-600">
            {pendingCount}
          </div>
          <p className="text-[11px] text-gray-500 mt-1">
            Pesanan baru dari warga
          </p>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            <span>Penjemputan Aktif</span>
            <Truck className="w-4 h-4 text-secondary-600" />
          </div>
          <div className="text-3xl font-black font-mono text-secondary-700">
            {confirmedCount + inProgressCount}
          </div>
          <p className="text-[11px] text-gray-500 mt-1">
            {confirmedCount} dijadwalkan, {inProgressCount} di jalan
          </p>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            <span>Total Sampah Terkumpul</span>
            <Scale className="w-4 h-4 text-primary-600" />
          </div>
          <div className="text-3xl font-black font-mono text-primary-800">
            {totalVolumeKg.toFixed(1)} <span className="text-sm font-normal text-gray-500">kg</span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">
            Dari {completedCount} transaksi selesai
          </p>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            <span>Uang Disalurkan ke Warga</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-700">
            Rp {(totalPayout / 1000).toFixed(0)}k
          </div>
          <p className="text-[11px] text-gray-500 mt-1">
            Total: Rp {totalPayout.toLocaleString('id-ID')}
          </p>
        </div>
      </div>

      {/* Sub Tabs Selection (Orders vs Services/Prices) */}
      <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
        <button
          onClick={() => setActiveSubTab('orders')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all ${
            activeSubTab === 'orders'
              ? 'bg-primary-700 text-white shadow-sm'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Manajemen Permintaan Penjemputan ({partnerOrders.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('services')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all ${
            activeSubTab === 'services'
              ? 'bg-primary-700 text-white shadow-sm'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>Pengaturan Tarif & Jenis Sampah ({currentPartner.acceptedWaste.length})</span>
        </button>
      </div>

      {/* TAB 1: MANAJEMEN PERMINTAAN PENJEMPUTAN */}
      {activeSubTab === 'orders' && (
        <div className="space-y-4">
          {/* Status Filter */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
              <Filter className="w-4 h-4 text-primary-700" />
              <span>Filter Status:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['Semua', 'Menunggu Konfirmasi', 'Dikonfirmasi', 'Dalam Penjemputan', 'Selesai'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1 rounded-xl text-xs font-medium transition-colors ${
                    statusFilter === status
                      ? 'bg-primary-700 text-white font-bold'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
            {filteredOrders.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-semibold">Tidak ada permintaan dengan status "{statusFilter}".</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                  <thead className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-700 uppercase tracking-wider font-heading">
                    <tr>
                      <th className="py-4 px-6">ID & Pemohon</th>
                      <th className="py-4 px-6">Sampah & Estimasi</th>
                      <th className="py-4 px-6">Jadwal & Alamat</th>
                      <th className="py-4 px-6">Status</th>
                      <th className="py-4 px-6 text-right">Aksi Tindakan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredOrders.map(order => (
                      <tr key={order.id} className="hover:bg-gray-50/70 transition-colors">
                        {/* ID & Customer */}
                        <td className="py-4 px-6">
                          <span className="font-mono text-xs font-bold text-primary-800 bg-primary-50 px-2 py-0.5 rounded border border-primary-100 block w-max mb-1">
                            {order.id}
                          </span>
                          <span className="font-bold text-gray-900 block text-sm">
                            {order.customerName}
                          </span>
                          <span className="text-xs text-gray-500 font-mono">
                            WA: {order.customerPhone}
                          </span>
                        </td>

                        {/* Waste & Weight */}
                        <td className="py-4 px-6">
                          <span className="font-medium text-gray-900 block">
                            {order.wasteType}
                          </span>
                          <span className="text-xs text-gray-500 block">
                            Estimasi: <strong>~{order.estimatedWeight} kg</strong> (@Rp {order.estimatedPricePerKg.toLocaleString('id-ID')})
                          </span>
                          <span className="text-xs font-mono font-bold text-primary-700">
                            Est. Rp {order.estimatedTotal.toLocaleString('id-ID')}
                          </span>
                        </td>

                        {/* Schedule & Address */}
                        <td className="py-4 px-6 max-w-xs">
                          <span className="font-bold text-gray-800 text-xs block">
                            {order.pickupDate} ({order.pickupTimeSlot})
                          </span>
                          <span className="text-xs text-gray-600 line-clamp-2 block mt-0.5">
                            {order.address} ({order.district})
                          </span>
                          {order.notes && (
                            <span className="text-[11px] text-amber-700 italic block mt-1">
                              " {order.notes} "
                            </span>
                          )}
                        </td>

                        {/* Status Badge */}
                        <td className="py-4 px-6">
                          {order.status === 'Menunggu Konfirmasi' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
                              <Clock className="w-3.5 h-3.5" /> Menunggu
                            </span>
                          )}
                          {order.status === 'Dikonfirmasi' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-200">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Dikonfirmasi
                            </span>
                          )}
                          {order.status === 'Dalam Penjemputan' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-900 border border-purple-200">
                              <Truck className="w-3.5 h-3.5" /> Di Jalan
                            </span>
                          )}
                          {order.status === 'Selesai' && (
                            <div>
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-200 mb-1">
                                <Check className="w-3.5 h-3.5" /> Selesai
                              </span>
                              <div className="text-[11px] text-emerald-800 font-mono">
                                {order.actualWeight} kg • Rp {order.finalAmount?.toLocaleString('id-ID')}
                              </div>
                            </div>
                          )}
                        </td>

                        {/* Action Buttons */}
                        <td className="py-4 px-6 text-right space-x-1 space-y-1">
                          {order.status === 'Menunggu Konfirmasi' && (
                            <button
                              onClick={() => onUpdateOrderStatus(order.id, 'Dikonfirmasi')}
                              className="px-3 py-1.5 rounded-xl bg-primary-700 hover:bg-primary-800 text-white text-xs font-bold shadow-sm"
                            >
                              Konfirmasi Jadwal
                            </button>
                          )}

                          {order.status === 'Dikonfirmasi' && (
                            <button
                              onClick={() => onUpdateOrderStatus(order.id, 'Dalam Penjemputan')}
                              className="px-3 py-1.5 rounded-xl bg-secondary-700 hover:bg-secondary-800 text-white text-xs font-bold shadow-sm"
                            >
                              Jemput Sekarang
                            </button>
                          )}

                          {order.status === 'Dalam Penjemputan' && (
                            <button
                              onClick={() => {
                                setWeightingOrder(order);
                                setActualWeightInput(String(order.estimatedWeight));
                              }}
                              className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-sm inline-flex items-center gap-1"
                            >
                              <Scale className="w-3.5 h-3.5" />
                              <span>Timbang & Selesaikan</span>
                            </button>
                          )}

                          {order.status === 'Selesai' && (
                            <span className="text-xs text-gray-400 italic">
                              Tercatat Digital
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: PENGATURAN TARIF & LAYANAN MITRA */}
      {activeSubTab === 'services' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* List of current waste accepted */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200 shadow-sm p-6 md:p-8 space-y-6">
            <div>
              <h3 className="text-lg font-bold font-heading text-gray-900">
                Katalog Tarif Sampah yang Diterima
              </h3>
              <p className="text-xs text-gray-500">
                Harga per kilogram ini akan langsung terlihat oleh warga Balikpapan di direktori pencarian.
              </p>
            </div>

            <div className="space-y-3">
              {currentPartner.acceptedWaste.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-gray-100 bg-gray-50/60 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-800 flex items-center justify-center font-bold">
                      <Tag className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-gray-900 text-sm block">
                        {item.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        Satuan: {item.unit}
                      </span>
                    </div>
                  </div>

                  {editingWasteIdx === idx ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={editPriceInput}
                        onChange={(e) => setEditPriceInput(e.target.value)}
                        placeholder="Harga baru"
                        className="w-28 px-2 py-1 text-xs border border-gray-300 rounded-lg bg-white"
                      />
                      <button
                        onClick={() => handleSavePrice(idx)}
                        className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold"
                      >
                        Simpan
                      </button>
                      <button
                        onClick={() => setEditingWasteIdx(null)}
                        className="px-2 py-1 text-gray-500 text-xs hover:underline"
                      >
                        Batal
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <span className="text-base font-black font-mono text-primary-800">
                        Rp {item.price.toLocaleString('id-ID')} /{item.unit}
                      </span>
                      <button
                        onClick={() => {
                          setEditingWasteIdx(idx);
                          setEditPriceInput(String(item.price));
                        }}
                        className="p-2 text-gray-400 hover:text-primary-700 hover:bg-white rounded-lg transition-colors"
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

          {/* Form add new waste */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-gray-200 shadow-sm p-6 md:p-8 space-y-4">
            <div>
              <h3 className="text-lg font-bold font-heading text-gray-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-primary-700" />
                Tambah Jenis Sampah Baru
              </h3>
              <p className="text-xs text-gray-500">
                Perluas jenis material anorganik yang dapat disetor warga ke bank sampah Anda.
              </p>
            </div>

            <form onSubmit={handleAddWaste} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Nama Sampah Anorganik *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Aki Bekas / Tembaga"
                  value={newWasteName}
                  onChange={(e) => setNewWasteName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Harga Beli per Kilogram (Rp) *
                </label>
                <input
                  type="number"
                  required
                  placeholder="Contoh: 15000"
                  value={newWastePrice}
                  onChange={(e) => setNewWastePrice(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-primary-700 hover:bg-primary-800 text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                + Tambahkan ke Daftar Penerimaan
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: INPUT TIMBANGAN AKTUAL DIGITAL */}
      {weightingOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl border border-gray-100 animate-fadeIn">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2 text-primary-800 font-bold text-base font-heading">
                <Scale className="w-5 h-5 text-primary-700" />
                <span>Pencatatan Timbangan Digital</span>
              </div>
              <button
                onClick={() => setWeightingOrder(null)}
                className="text-gray-400 hover:text-gray-600 text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-600 mb-4">
              Masukkan hasil timbangan riil di lokasi untuk pesanan <strong>{weightingOrder.id}</strong> ({weightingOrder.customerName}).
            </p>

            <form onSubmit={handleConfirmWeighting} className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-2xl text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-gray-500">Jenis Sampah:</span>
                  <span className="font-semibold text-gray-900">{weightingOrder.wasteType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tarif Satuan:</span>
                  <span className="font-mono text-gray-900">Rp {weightingOrder.estimatedPricePerKg.toLocaleString('id-ID')} / kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Estimasi Awal Warga:</span>
                  <span>{weightingOrder.estimatedWeight} kg</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Berat Timbangan Riil / Aktual (kg) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  autoFocus
                  value={actualWeightInput}
                  onChange={(e) => setActualWeightInput(e.target.value)}
                  className="w-full px-4 py-3 text-lg font-bold font-mono rounded-xl border border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-600 text-gray-900"
                />
              </div>

              {/* Realtime calculation in modal */}
              {parseFloat(actualWeightInput) > 0 && (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-xs">
                  <span className="font-medium text-emerald-800">Total Dibayarkan ke Warga:</span>
                  <span className="text-lg font-black font-mono text-emerald-900">
                    Rp {Math.round(parseFloat(actualWeightInput) * weightingOrder.estimatedPricePerKg).toLocaleString('id-ID')}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setWeightingOrder(null)}
                  className="w-1/2 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md"
                >
                  Simpan Transaksi Selesai
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

