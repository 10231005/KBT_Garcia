import React, { useState, useEffect } from 'react';
import { Truck, Calendar, MapPin, User, Phone, CheckCircle2, ArrowRight, ShieldCheck, AlertCircle, FileText } from 'lucide-react';
import { BALIKPAPAN_DISTRICTS } from '../../data/initialData';

export default function CitizenPickupView({
  partners,
  prefilledData,
  currentUser,
  onSubmitOrder,
  onGoToTracking,
}) {
  const [selectedPartnerId, setSelectedPartnerId] = useState(
    prefilledData?.partner?.id || partners[0]?.id || ''
  );
  const [selectedWasteType, setSelectedWasteType] = useState(
    prefilledData?.wasteType || ''
  );
  const [weight, setWeight] = useState(prefilledData?.weight || 10);
  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '');
  const [district, setDistrict] = useState(currentUser?.district || 'Balikpapan Kota');
  const [address, setAddress] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTimeSlot, setPickupTimeSlot] = useState('Pagi (09.00 - 12.00 WITA)');
  const [notes, setNotes] = useState('');

  const [submittedOrder, setSubmittedOrder] = useState(null);

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setPickupDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  const currentPartner = partners.find(p => p.id === selectedPartnerId) || partners[0];

  useEffect(() => {
    if (currentPartner && (!selectedWasteType || !currentPartner.acceptedWaste.some(w => w.name === selectedWasteType))) {
      setSelectedWasteType(currentPartner.acceptedWaste[0]?.name || '');
    }
  }, [currentPartner]);

  const wasteInfo = currentPartner?.acceptedWaste.find(w => w.name === selectedWasteType) || currentPartner?.acceptedWaste[0];
  const pricePerKg = wasteInfo?.price || 0;
  const estimatedTotal = pricePerKg * (Number(weight) || 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!customerName || !customerPhone || !address || !pickupDate) {
      alert('Mohon lengkapi nama pemohon, nomor WhatsApp, alamat lengkap, dan tanggal penjemputan.');
      return;
    }

    if (Number(weight) < (currentPartner.minPickupWeight || 5)) {
      alert(`Berat minimal penjemputan untuk ${currentPartner.name} adalah ${currentPartner.minPickupWeight} kg.`);
      return;
    }

    const orderId = `EC-2026-${String(Math.floor(Math.random() * 900) + 100)}`;
    const newOrder = {
      id: orderId,
      customerName,
      customerPhone,
      district,
      address,
      partnerId: currentPartner.id,
      partnerName: currentPartner.name,
      wasteType: selectedWasteType,
      estimatedWeight: Number(weight),
      estimatedPricePerKg: pricePerKg,
      estimatedTotal,
      pickupDate,
      pickupTimeSlot,
      notes,
      status: 'Menunggu Konfirmasi',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      actualWeight: null,
      finalAmount: null,
    };

    onSubmitOrder(newOrder);
    setSubmittedOrder(newOrder);
  };

  if (submittedOrder) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <div className="bg-white rounded-3xl border border-primary-200 shadow-xl p-6 sm:p-10 text-center">
          <div className="w-16 h-16 bg-primary-100 text-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-50 text-primary-800 border border-primary-200 mb-2 inline-block">
            Permintaan Berhasil Dikirim
          </span>

          <h2 className="text-2xl font-bold font-heading text-slate-900 mb-2">
            Terima Kasih, {submittedOrder.customerName}!
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mb-6 max-w-md mx-auto">
            Permintaan penjemputan Anda telah diteruskan ke sistem <strong>{submittedOrder.partnerName}</strong>.
          </p>

          <div className="bg-slate-50 rounded-2xl p-5 text-left border border-slate-200 mb-6 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-xs text-slate-500 font-medium">Nomor Booking Permintaan:</span>
              <span className="text-base font-black font-mono text-primary-800 bg-white px-2.5 py-0.5 rounded border border-primary-200">
                {submittedOrder.id}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block">Mitra Pengelola:</span>
                <span className="font-semibold text-slate-800">{submittedOrder.partnerName}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Jenis & Berat:</span>
                <span className="font-semibold text-slate-800">{submittedOrder.wasteType} (~{submittedOrder.estimatedWeight} kg)</span>
              </div>
              <div>
                <span className="text-slate-400 block">Jadwal Jemput:</span>
                <span className="font-semibold text-slate-800">{submittedOrder.pickupDate} ({submittedOrder.pickupTimeSlot})</span>
              </div>
              <div>
                <span className="text-slate-400 block">Estimasi Nilai:</span>
                <span className="font-bold text-primary-800 font-mono">Rp {submittedOrder.estimatedTotal.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onGoToTracking(submittedOrder.id)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-700 hover:bg-primary-800 text-white font-bold text-xs sm:text-sm shadow-md"
            >
              <span>Lacak Status Pesanan Ini</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setSubmittedOrder(null);
                setAddress('');
                setNotes('');
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50"
            >
              Buat Permintaan Baru
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-primary-100 text-primary-800 flex items-center justify-center shrink-0">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
              Formulir Pengajuan Penjemputan Sampah
            </h2>
            <p className="text-xs text-slate-500">
              Isi formulir di bawah ini untuk memesan armada penjemputan sampah anorganik ke rumah Anda di Balikpapan.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* STEP 1: PENGELOLA & MATERIAL */}
          <div className="space-y-4">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary-700 text-white text-[10px] flex items-center justify-center">1</span>
              <span>Pilihan Pengelola & Sampah</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Mitra Pengelola Sampah *
                </label>
                <select
                  value={selectedPartnerId}
                  onChange={(e) => setSelectedPartnerId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {partners.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.district})
                    </option>
                  ))}
                </select>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Minimal jemput: {currentPartner?.minPickupWeight || 5} kg
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Jenis Material Sampah *
                </label>
                <select
                  value={selectedWasteType}
                  onChange={(e) => setSelectedWasteType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {currentPartner?.acceptedWaste.map((item, idx) => (
                    <option key={idx} value={item.name}>
                      {item.name} — Rp {item.price.toLocaleString('id-ID')}/kg
                    </option>
                  ))}
                </select>
                <span className="text-[11px] text-primary-700 font-semibold mt-1 block">
                  Tarif beli: Rp {pricePerKg.toLocaleString('id-ID')} / kg
                </span>
              </div>
            </div>

            {/* Berat & Realtime calculation */}
            <div className="bg-primary-50/70 p-4 rounded-2xl border border-primary-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-1/2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Estimasi Berat Sampah (kg) *
                </label>
                <input
                  type="number"
                  min={currentPartner?.minPickupWeight || 5}
                  max="1000"
                  value={weight}
                  onChange={(e) => setWeight(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 bg-white"
                />
              </div>

              <div className="w-full sm:w-1/2 sm:text-right">
                <span className="text-xs text-slate-500 block">Estimasi Nilai yang Anda Peroleh:</span>
                <span className="text-2xl font-black font-mono text-primary-900">
                  Rp {estimatedTotal.toLocaleString('id-ID')}
                </span>
                <span className="text-[10px] text-slate-400 block">
                  *Timbangan riil akan ditimbang di lokasi oleh kurir
                </span>
              </div>
            </div>
          </div>

          {/* STEP 2: ALAMAT & KONTAK */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary-700 text-white text-[10px] flex items-center justify-center">2</span>
              <span>Identitas & Alamat Penjemputan di Balikpapan</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nama Pemohon / Instansi *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nama Anda"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nomor WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="0812-xxxx-xxxx"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-4">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Kecamatan *
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 bg-white"
                >
                  {BALIKPAPAN_DISTRICTS.filter(d => d !== 'Semua Kecamatan').map((d, i) => (
                    <option key={i} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-8">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Alamat Lengkap & Patokan Rumah *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nama jalan, nomor rumah, RT/RW, warna pagar"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* STEP 3: JADWAL & CATATAN */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary-700 text-white text-[10px] flex items-center justify-center">3</span>
              <span>Jadwal Penjemputan</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Tanggal yang Diinginkan *
                </label>
                <input
                  type="date"
                  required
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Sesi Waktu *
                </label>
                <select
                  value={pickupTimeSlot}
                  onChange={(e) => setPickupTimeSlot(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 bg-white"
                >
                  <option value="Pagi (09.00 - 12.00 WITA)">Pagi (09.00 - 12.00 WITA)</option>
                  <option value="Siang (13.00 - 16.00 WITA)">Siang (13.00 - 16.00 WITA)</option>
                  <option value="Sore (16.00 - 17.30 WITA)">Sore (16.00 - 17.30 WITA)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Catatan Tambahan untuk Petugas Penjemput (Opsional)
              </label>
              <textarea
                rows={2}
                placeholder="Contoh: Sampah sudah dipipihkan dalam 2 karung."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800"
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-primary-700" />
              Tanpa biaya penjemputan • Uang hasil timbangan dibayar langsung saat jemput
            </span>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-primary-700 hover:bg-primary-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Truck className="w-4 h-4" />
              <span>Kirim Permintaan Penjemputan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

