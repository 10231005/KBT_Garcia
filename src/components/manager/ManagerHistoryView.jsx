import React, { useState } from 'react';
import { History, Scale, Coins, Search, CheckCircle2, FileText, Download, AlertCircle } from 'lucide-react';

export default function ManagerHistoryView({
  currentPartner,
  orders,
}) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter completed orders for this partner
  const completedOrders = orders.filter(
    o => o.partnerId === currentPartner.id && o.status === 'Selesai'
  );

  const filteredOrders = completedOrders.filter(o => {
    const q = searchQuery.toLowerCase();
    return o.id.toLowerCase().includes(q) ||
           o.customerName.toLowerCase().includes(q) ||
           o.wasteType.toLowerCase().includes(q);
  });

  const totalKg = completedOrders.reduce((sum, o) => sum + (o.actualWeight || o.estimatedWeight || 0), 0);
  const totalPayout = completedOrders.reduce((sum, o) => sum + (o.finalAmount || o.estimatedTotal || 0), 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-accent-500 text-slate-950 mb-2 inline-block">
            Buku Kas & Arsip Digital
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-tight">
            Riwayat Transaksi Penjemputan Tuntas
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Rekam jejak digital pengganti buku fisik untuk pencatatan timbangan dan pembayaran kas {currentPartner.name}.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            onClick={() => alert('Fitur Ekspor Laporan Excel/PDF siap diintegrasikan pada fase pengembangan lanjutan.')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/10 transition-all"
          >
            <Download className="w-4 h-4 text-accent-400" />
            <span>Ekspor Pembukuan</span>
          </button>
        </div>
      </div>

      {/* Metric Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary-100 text-primary-800 flex items-center justify-center font-bold">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold block">
              Total Sampah Terhimpun
            </span>
            <div className="text-2xl font-black font-mono text-primary-900">
              {totalKg.toFixed(1)} <span className="text-xs font-normal text-slate-500">kg</span>
            </div>
            <span className="text-[10px] text-slate-400">Total akumulasi timbangan riil</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold block">
              Total Dana Disalurkan ke Warga
            </span>
            <div className="text-2xl font-black font-mono text-emerald-700">
              Rp {totalPayout.toLocaleString('id-ID')}
            </div>
            <span className="text-[10px] text-slate-400">Kas operasional pembelian</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-secondary-100 text-secondary-800 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold block">
              Transaksi Sukses Selesai
            </span>
            <div className="text-2xl font-black font-mono text-secondary-800">
              {completedOrders.length} <span className="text-xs font-normal text-slate-500">transaksi</span>
            </div>
            <span className="text-[10px] text-slate-400">Tercatat tanpa buku manual</span>
          </div>
        </div>
      </div>

      {/* Search Input Box */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari berdasarkan nomor tiket, nama warga, atau jenis material..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50/50"
          />
        </div>
      </div>

      {/* Archived Ledger Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-semibold">Belum ada riwayat transaksi selesai yang cocok.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-wider font-heading">
                <tr>
                  <th className="py-4 px-6">Tiket & Tanggal Selesai</th>
                  <th className="py-4 px-6">Nama Warga / Instansi</th>
                  <th className="py-4 px-6">Material Sampah</th>
                  <th className="py-4 px-6">Berat Timbangan Riil</th>
                  <th className="py-4 px-6 text-right">Nominal Pembayaran</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Tiket & Selesai */}
                    <td className="py-4 px-6">
                      <span className="font-mono text-xs font-bold text-primary-800 bg-primary-50 px-2 py-0.5 rounded border border-primary-200 block w-max mb-1">
                        {order.id}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {order.completedAt || order.pickupDate}
                      </span>
                    </td>

                    {/* Customer */}
                    <td className="py-4 px-6">
                      <span className="font-bold text-slate-900 block">{order.customerName}</span>
                      <span className="text-[11px] text-slate-400">{order.address} ({order.district})</span>
                    </td>

                    {/* Material */}
                    <td className="py-4 px-6">
                      <span className="font-medium text-slate-800">{order.wasteType}</span>
                      <span className="text-[11px] text-slate-400 block font-mono">
                        @Rp {order.estimatedPricePerKg.toLocaleString('id-ID')}/kg
                      </span>
                    </td>

                    {/* Actual Weight */}
                    <td className="py-4 px-6">
                      <span className="text-sm font-black font-mono text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                        {order.actualWeight} kg
                      </span>
                    </td>

                    {/* Final Payout */}
                    <td className="py-4 px-6 text-right">
                      <span className="text-base font-black font-mono text-emerald-700">
                        Rp {order.finalAmount?.toLocaleString('id-ID')}
                      </span>
                      <span className="text-[10px] text-emerald-800 block">Lunas di lokasi</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

