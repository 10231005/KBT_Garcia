import React, { useState } from 'react';
import { Filter, Scale, Check, Clock, CheckCircle2, Truck, AlertCircle, FileText } from 'lucide-react';

export default function ManagerOrdersView({
  currentPartner,
  orders,
  onUpdateOrderStatus,
  onCompleteOrder,
}) {
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [scaleOrder, setScaleOrder] = useState(null);
  const [scaleWeightInput, setScaleWeightInput] = useState('');

  const partnerOrders = orders.filter(o => o.partnerId === currentPartner.id);

  const filteredOrders = partnerOrders.filter(o => {
    if (statusFilter === 'Semua') return true;
    return o.status === statusFilter;
  });

  const handleConfirmScale = (e) => {
    e.preventDefault();
    const w = parseFloat(scaleWeightInput);
    if (!w || w <= 0) {
      alert('Masukkan angka timbangan yang valid.');
      return;
    }

    const finalAmount = Math.round(w * scaleOrder.estimatedPricePerKg);
    onCompleteOrder(scaleOrder.id, w, finalAmount);
    setScaleOrder(null);
    setScaleWeightInput('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top filter bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
          <Filter className="w-4 h-4 text-primary-700" />
          <span>Status Pesanan:</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {['Semua', 'Menunggu Konfirmasi', 'Dikonfirmasi', 'Dalam Penjemputan', 'Selesai'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                statusFilter === st
                  ? 'bg-primary-700 text-white font-bold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-semibold">Tidak ada pesanan penjemputan dengan status "{statusFilter}".</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-wider font-heading">
                <tr>
                  <th className="py-4 px-6">Tiket & Pemohon</th>
                  <th className="py-4 px-6">Jenis Sampah</th>
                  <th className="py-4 px-6">Jadwal & Lokasi</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Tindakan Petugas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Tiket & Pemohon */}
                    <td className="py-4 px-6">
                      <span className="font-mono text-xs font-bold text-primary-800 bg-primary-50 px-2 py-0.5 rounded border border-primary-200 block w-max mb-1">
                        {order.id}
                      </span>
                      <span className="font-bold text-slate-900 block">{order.customerName}</span>
                      <span className="text-[11px] text-slate-400 font-mono">WA: {order.customerPhone}</span>
                    </td>

                    {/* Sampah */}
                    <td className="py-4 px-6">
                      <span className="font-medium text-slate-900 block">{order.wasteType}</span>
                      <span className="text-xs text-slate-500">
                        Est: ~{order.estimatedWeight} kg • Rp {order.estimatedPricePerKg.toLocaleString('id-ID')}/kg
                      </span>
                      <span className="text-xs font-mono font-bold text-primary-800 block">
                        Est. Rp {order.estimatedTotal.toLocaleString('id-ID')}
                      </span>
                    </td>

                    {/* Jadwal & Lokasi */}
                    <td className="py-4 px-6 max-w-xs">
                      <span className="font-bold text-slate-800 block text-xs">
                        {order.pickupDate} ({order.pickupTimeSlot})
                      </span>
                      <span className="text-xs text-slate-600 line-clamp-2 block mt-0.5">
                        {order.address} ({order.district})
                      </span>
                      {order.notes && (
                        <span className="text-[11px] text-amber-700 italic block mt-1">
                          "{order.notes}"
                        </span>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-6">
                      {order.status === 'Menunggu Konfirmasi' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                          <Clock className="w-3 h-3" /> Menunggu
                        </span>
                      )}
                      {order.status === 'Dikonfirmasi' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900">
                          <CheckCircle2 className="w-3 h-3" /> Dikonfirmasi
                        </span>
                      )}
                      {order.status === 'Dalam Penjemputan' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-900">
                          <Truck className="w-3 h-3" /> Di Jalan
                        </span>
                      )}
                      {order.status === 'Selesai' && (
                        <div>
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 mb-1">
                            <Check className="w-3 h-3" /> Selesai
                          </span>
                          <span className="text-[11px] text-emerald-800 font-mono block">
                            {order.actualWeight} kg • Rp {order.finalAmount?.toLocaleString('id-ID')}
                          </span>
                        </div>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right space-y-1">
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
                          Tugaskan Armada
                        </button>
                      )}

                      {order.status === 'Dalam Penjemputan' && (
                        <button
                          onClick={() => {
                            setScaleOrder(order);
                            setScaleWeightInput(String(order.estimatedWeight));
                          }}
                          className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-sm inline-flex items-center gap-1"
                        >
                          <Scale className="w-3.5 h-3.5" />
                          <span>Timbang Riil</span>
                        </button>
                      )}

                      {order.status === 'Selesai' && (
                        <span className="text-xs text-slate-400 italic">
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

      {/* Modal Digital Scale Weighing */}
      {scaleOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2 text-primary-900 font-bold text-base font-heading">
                <Scale className="w-5 h-5 text-primary-700" />
                <span>Pencatatan Timbangan Digital</span>
              </div>
              <button
                onClick={() => setScaleOrder(null)}
                className="text-slate-400 hover:text-slate-600 text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-4">
              Masukkan hasil timbangan riil di lokasi untuk tiket <strong>{scaleOrder.id}</strong> ({scaleOrder.customerName}).
            </p>

            <form onSubmit={handleConfirmScale} className="space-y-4">
              <div className="bg-slate-50 p-3.5 rounded-2xl text-xs space-y-1 border border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-500">Material:</span>
                  <span className="font-semibold text-slate-800">{scaleOrder.wasteType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tarif Satuan:</span>
                  <span className="font-mono text-slate-800">Rp {scaleOrder.estimatedPricePerKg.toLocaleString('id-ID')}/kg</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Berat Aktual Timbangan (kg) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  autoFocus
                  value={scaleWeightInput}
                  onChange={(e) => setScaleWeightInput(e.target.value)}
                  className="w-full px-4 py-2.5 text-lg font-bold font-mono rounded-xl border border-primary-500 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-600"
                />
              </div>

              {parseFloat(scaleWeightInput) > 0 && (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-xs">
                  <span className="font-medium text-emerald-800">Total Dibayarkan ke Warga:</span>
                  <span className="text-base font-black font-mono text-emerald-900">
                    Rp {Math.round(parseFloat(scaleWeightInput) * scaleOrder.estimatedPricePerKg).toLocaleString('id-ID')}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setScaleOrder(null)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
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

