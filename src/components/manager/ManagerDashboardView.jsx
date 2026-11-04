import React from 'react';
import { Clock, Truck, Scale, TrendingUp, ArrowRight, Building2, AlertCircle } from 'lucide-react';

export default function ManagerDashboardView({
  currentPartner,
  orders,
  onNavigateToOrders,
  onUpdateOrderStatus,
  onOpenScaleModal,
}) {
  const partnerOrders = orders.filter(o => o.partnerId === currentPartner.id);

  const pendingOrders = partnerOrders.filter(o => o.status === 'Menunggu Konfirmasi');
  const activeOrders = partnerOrders.filter(o => o.status === 'Dikonfirmasi' || o.status === 'Dalam Penjemputan');
  const completedOrders = partnerOrders.filter(o => o.status === 'Selesai');

  const totalKg = completedOrders.reduce((sum, o) => sum + (o.actualWeight || o.estimatedWeight || 0), 0);
  const totalPayout = completedOrders.reduce((sum, o) => sum + (o.finalAmount || o.estimatedTotal || 0), 0);

  return (
    <div className="space-y-8 pb-12">
      {/* Partner Info Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-accent-500 text-slate-950 mb-2 inline-block">
            {currentPartner.type} • Balikpapan
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-tight">
            {currentPartner.name}
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            {currentPartner.address} • Jam: {currentPartner.hours}
          </p>
        </div>

        <button
          onClick={onNavigateToOrders}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-700 hover:bg-primary-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all self-start sm:self-auto"
        >
          <span>Kelola Semua Pesanan ({partnerOrders.length})</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            <span>Perlu Konfirmasi</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black font-mono text-amber-600">
            {pendingOrders.length}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Menunggu persetujuan jadwal</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            <span>Jemput Aktif</span>
            <Truck className="w-4 h-4 text-secondary-600" />
          </div>
          <div className="text-3xl font-black font-mono text-secondary-700">
            {activeOrders.length}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Armada dalam proses</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            <span>Sampah Terkumpul</span>
            <Scale className="w-4 h-4 text-primary-600" />
          </div>
          <div className="text-3xl font-black font-mono text-primary-800">
            {totalKg.toFixed(1)} <span className="text-xs font-normal text-slate-400">kg</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Dari {completedOrders.length} transaksi selesai</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            <span>Uang Disalurkan</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-700 truncate">
            Rp {(totalPayout / 1000).toFixed(0)}k
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Total: Rp {totalPayout.toLocaleString('id-ID')}</p>
        </div>
      </div>

      {/* Recent Orders Snippet */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900">
              Permintaan Penjemputan Terbaru
            </h3>
            <p className="text-xs text-slate-500">
              Pesanan masuk dari masyarakat Kota Balikpapan
            </p>
          </div>

          <button
            onClick={onNavigateToOrders}
            className="text-xs font-bold text-primary-700 hover:text-primary-800 hover:underline"
          >
            Lihat Tabel Lengkap →
          </button>
        </div>

        {partnerOrders.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs">
            Belum ada permintaan penjemputan untuk bank sampah ini.
          </div>
        ) : (
          <div className="space-y-3">
            {partnerOrders.slice(0, 3).map(order => (
              <div
                key={order.id}
                className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-primary-800 bg-white px-2 py-0.5 rounded border border-primary-200">
                      {order.id}
                    </span>
                    <span className="text-xs font-bold text-slate-900">{order.customerName}</span>
                    <span className="text-[11px] text-slate-400">({order.district})</span>
                  </div>
                  <div className="text-xs text-slate-600">
                    {order.wasteType} • Estimasi: ~{order.estimatedWeight} kg • Jadwal: {order.pickupDate} ({order.pickupTimeSlot})
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    order.status === 'Menunggu Konfirmasi' ? 'bg-amber-100 text-amber-900' :
                    order.status === 'Dikonfirmasi' ? 'bg-blue-100 text-blue-900' :
                    order.status === 'Dalam Penjemputan' ? 'bg-purple-100 text-purple-900' :
                    'bg-emerald-100 text-emerald-900'
                  }`}>
                    {order.status}
                  </span>

                  {order.status === 'Menunggu Konfirmasi' && (
                    <button
                      onClick={() => onUpdateOrderStatus(order.id, 'Dikonfirmasi')}
                      className="px-3 py-1 bg-primary-700 hover:bg-primary-800 text-white rounded-xl text-xs font-bold"
                    >
                      Konfirmasi
                    </button>
                  )}

                  {order.status === 'Dalam Penjemputan' && (
                    <button
                      onClick={() => onOpenScaleModal(order)}
                      className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold"
                    >
                      Timbang
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

