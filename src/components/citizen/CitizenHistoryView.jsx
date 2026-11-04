import React, { useState } from 'react';
import { History, Scale, Coins, CheckCircle2, Truck, Clock, Calendar, ArrowRight, FileText, AlertCircle } from 'lucide-react';

export default function CitizenHistoryView({
  orders,
  currentUser,
  onGoToTracking,
  onGoToPickup,
}) {
  const [filterStatus, setFilterStatus] = useState('Semua');

  // Filter orders related to this citizen (by phone or name, or all if demo)
  const myOrders = orders.filter(o => 
    !currentUser?.phone || o.customerPhone.includes(currentUser.phone) || o.customerName.toLowerCase().includes(currentUser.name.toLowerCase()) || true // allow viewing all in MVP demo
  );

  const filteredOrders = myOrders.filter(o => {
    if (filterStatus === 'Semua') return true;
    return o.status === filterStatus;
  });

  const completedOrders = myOrders.filter(o => o.status === 'Selesai');
  const totalKg = completedOrders.reduce((sum, o) => sum + (o.actualWeight || o.estimatedWeight || 0), 0);
  const totalEarned = completedOrders.reduce((sum, o) => sum + (o.finalAmount || o.estimatedTotal || 0), 0);

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-primary-800 to-primary-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-primary-200 mb-3 border border-white/10">
            <History className="w-3.5 h-3.5 text-accent-400" /> Riwayat Penjemputan & Transaksi
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-tight">
            Riwayat Setoran Sampah Anda
          </h2>
          <p className="text-xs sm:text-sm text-primary-100 mt-1 max-w-md">
            Rekam jejak seluruh permintaan penjemputan sampah anorganik yang pernah Anda ajukan di Kota Balikpapan.
          </p>
        </div>

        <button
          onClick={onGoToPickup}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-500 hover:bg-accent-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all self-start sm:self-auto"
        >
          <Truck className="w-4 h-4" />
          <span>Ajukan Penjemputan Baru</span>
        </button>
      </div>

      {/* Impact Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary-100 text-primary-800 flex items-center justify-center font-bold">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold block">
              Total Sampah Diselamatkan
            </span>
            <div className="text-2xl font-black font-mono text-primary-900">
              {totalKg.toFixed(1)} <span className="text-xs font-normal text-slate-500">kg</span>
            </div>
            <span className="text-[10px] text-slate-500">Dari {completedOrders.length} penjemputan tuntas</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold block">
              Total Penghasilan Daur Ulang
            </span>
            <div className="text-2xl font-black font-mono text-emerald-700">
              Rp {totalEarned.toLocaleString('id-ID')}
            </div>
            <span className="text-[10px] text-slate-500">Uang hasil penjualan sampah</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-secondary-100 text-secondary-800 flex items-center justify-center font-bold">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold block">
              Total Tiket Permintaan
            </span>
            <div className="text-2xl font-black font-mono text-secondary-800">
              {myOrders.length} <span className="text-xs font-normal text-slate-500">tiket</span>
            </div>
            <span className="text-[10px] text-slate-500">{myOrders.filter(o => o.status !== 'Selesai').length} dalam proses</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
          <span>Filter Status Riwayat:</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {['Semua', 'Selesai', 'Dalam Penjemputan', 'Dikonfirmasi', 'Menunggu Konfirmasi'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                filterStatus === st
                  ? 'bg-primary-700 text-white font-bold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto">
            <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-900 mb-1">Belum ada riwayat penjemputan</h4>
            <p className="text-xs text-slate-500 mb-4">Anda belum memiliki transaksi dengan status "{filterStatus}".</p>
            <button
              onClick={onGoToPickup}
              className="px-4 py-2 bg-primary-700 text-white rounded-xl text-xs font-semibold"
            >
              Ajukan Penjemputan Pertama
            </button>
          </div>
        ) : (
          filteredOrders.map(order => (
            <div
              key={order.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 hover:border-primary-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-primary-800 bg-primary-50 px-2.5 py-0.5 rounded border border-primary-200">
                    {order.id}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    order.status === 'Selesai' ? 'bg-emerald-100 text-emerald-900' :
                    order.status === 'Dalam Penjemputan' ? 'bg-purple-100 text-purple-900' :
                    order.status === 'Dikonfirmasi' ? 'bg-blue-100 text-blue-900' :
                    'bg-amber-100 text-amber-900'
                  }`}>
                    {order.status}
                  </span>
                  <span className="text-xs text-slate-400">
                    • Diajukan: {order.createdAt}
                  </span>
                </div>

                <div className="text-sm font-bold text-slate-900">
                  {order.wasteType} ke {order.partnerName}
                </div>

                <div className="text-xs text-slate-500">
                  Lokasi: {order.address} ({order.district}) • Jadwal: {order.pickupDate} ({order.pickupTimeSlot})
                </div>

                {order.status === 'Selesai' && (
                  <div className="pt-2 text-xs text-emerald-800 font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Timbangan Riil: <strong>{order.actualWeight} kg</strong></span>
                    <span>• Uang Diterima: <strong>Rp {order.finalAmount?.toLocaleString('id-ID')}</strong></span>
                  </div>
                )}
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-3 sm:pt-0 border-t sm:border-0 border-slate-100">
                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">
                    {order.status === 'Selesai' ? 'Nominal Akhir:' : 'Estimasi Nilai:'}
                  </span>
                  <span className="text-base sm:text-lg font-black font-mono text-primary-900">
                    Rp {(order.finalAmount || order.estimatedTotal)?.toLocaleString('id-ID')}
                  </span>
                </div>

                <button
                  onClick={() => onGoToTracking(order.id)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-primary-50 text-slate-700 hover:text-primary-800 text-xs font-bold transition-all border border-slate-200"
                >
                  <span>Lihat Detail & Struk</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

