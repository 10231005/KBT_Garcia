import React, { useState, useEffect } from 'react';
import { Truck, Calendar, MapPin, User, Phone, CheckCircle2, ArrowRight, ShieldCheck, Tag, AlertCircle } from 'lucide-react';
import { BALIKPAPAN_DISTRICTS } from '../../data/initialData';

export default function PickupRequestForm({
  partners,
  prefilledData,
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
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [district, setDistrict] = useState('Balikpapan Kota');
  const [address, setAddress] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTimeSlot, setPickupTimeSlot] = useState('Pagi (09.00 - 12.00 WITA)');
  const [notes, setNotes] = useState('');

  const [submittedOrder, setSubmittedOrder] = useState(null);

  // Set default pickup date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setPickupDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  const currentPartner = partners.find(p => p.id === selectedPartnerId) || partners[0];

  // Update selectedWasteType if partner changes or initial load
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
      alert('Mohon lengkapi nama, nomor telepon, alamat, dan tanggal penjemputan.');
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

  // If order was successfully submitted, show success view with tracking action
  if (submittedOrder) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-primary-200 shadow-xl p-8 md:p-10 text-center">
          <div className="w-20 h-20 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-100 text-primary-800 mb-2">
            Permintaan Berhasil Dikirim
          </span>

          <h2 className="text-2xl md:text-3xl font-bold font-heading text-gray-900 mb-2">
            Terima Kasih, {submittedOrder.customerName}!
          </h2>
          <p className="text-gray-600 text-sm mb-6 max-w-md mx-auto">
            Permintaan penjemputan sampah Anda telah diteruskan ke <strong>{submittedOrder.partnerName}</strong>. Pengelola akan segera mengonfirmasi jadwal penjemputan.
          </p>

          {/* Ticket Booking Card */}
          <div className="bg-gray-50 rounded-2xl p-6 text-left border border-gray-200 mb-8 space-y-3">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <span className="text-xs text-gray-500 font-medium">Nomor Booking / ID Permintaan</span>
              <span className="text-base font-bold font-mono text-primary-800 bg-white px-3 py-1 rounded-lg border border-primary-100">
                {submittedOrder.id}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-gray-400 block">Mitra Pengelola:</span>
                <span className="font-semibold text-gray-800">{submittedOrder.partnerName}</span>
              </div>
              <div>
                <span className="text-gray-400 block">Jenis & Berat:</span>
                <span className="font-semibold text-gray-800">{submittedOrder.wasteType} (~{submittedOrder.estimatedWeight} kg)</span>
              </div>
              <div>
                <span className="text-gray-400 block">Rencana Jadwal:</span>
                <span className="font-semibold text-gray-800">{submittedOrder.pickupDate} ({submittedOrder.pickupTimeSlot})</span>
              </div>
              <div>
                <span className="text-gray-400 block">Estimasi Nilai:</span>
                <span className="font-bold text-primary-700 font-mono">Rp {submittedOrder.estimatedTotal.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onGoToTracking(submittedOrder.id)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-700 hover:bg-primary-800 text-white font-bold text-sm shadow-md"
            >
              <span>Lacak Status Penjemputan Ini</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setSubmittedOrder(null);
                setAddress('');
                setNotes('');
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-50"
            >
              Ajukan Penjemputan Baru
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 pb-20">
      {/* Title */}
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-100 text-primary-800 mb-2">
          <Truck className="w-3.5 h-3.5" /> Formulir Penjemputan Sampah
        </span>
        <h1 className="text-3xl font-extrabold font-heading text-gray-900 tracking-tight">
          Ajukan Penjemputan dari Rumah
        </h1>
        <p className="text-gray-600 text-sm mt-2">
          Sampah anorganik terpilah akan dijemput langsung oleh armada mitra pengelola ke lokasi Anda di Kota Balikpapan.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 md:p-10 space-y-8">
          {/* STEP 1: PILIH PENGELOLA & MATERIAL */}
          <div>
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
              <span className="w-6 h-6 rounded-full bg-primary-700 text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h3 className="text-base font-bold text-gray-900 font-heading">
                Pilih Pengelola & Jenis Sampah
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Mitra Pengelola Sampah *
                </label>
                <select
                  value={selectedPartnerId}
                  onChange={(e) => setSelectedPartnerId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-gray-800 bg-white"
                >
                  {partners.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.district})
                    </option>
                  ))}
                </select>
                <span className="text-[11px] text-gray-500 mt-1 block">
                  Minimal berat jemput: {currentPartner?.minPickupWeight || 5} kg
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Jenis Sampah Anorganik *
                </label>
                <select
                  value={selectedWasteType}
                  onChange={(e) => setSelectedWasteType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-gray-800 bg-white"
                >
                  {currentPartner?.acceptedWaste.map((item, idx) => (
                    <option key={idx} value={item.name}>
                      {item.name} — Rp {item.price.toLocaleString('id-ID')}/kg
                    </option>
                  ))}
                </select>
                <span className="text-[11px] text-primary-700 font-medium mt-1 block">
                  Tarif resmi: Rp {pricePerKg.toLocaleString('id-ID')} / kg
                </span>
              </div>
            </div>

            {/* Berat & Estimasi Realtime */}
            <div className="mt-4 bg-primary-50/60 p-4 rounded-2xl border border-primary-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-1/2">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Estimasi Berat Sampah (kg) *
                </label>
                <input
                  type="number"
                  min={currentPartner?.minPickupWeight || 5}
                  max="1000"
                  value={weight}
                  onChange={(e) => setWeight(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm bg-white font-semibold text-gray-800"
                />
              </div>

              <div className="w-full sm:w-1/2 sm:text-right">
                <span className="text-xs text-gray-500 block">Estimasi Nilai yang Diterima:</span>
                <span className="text-2xl font-black font-mono text-primary-800">
                  Rp {estimatedTotal.toLocaleString('id-ID')}
                </span>
                <span className="text-[10px] text-gray-500 block">
                  (Dihitung kembali saat penimbangan aktual di lokasi)
                </span>
              </div>
            </div>
          </div>

          {/* STEP 2: LOKASI & KONTAK */}
          <div>
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
              <span className="w-6 h-6 rounded-full bg-primary-700 text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h3 className="text-base font-bold text-gray-900 font-heading">
                Identitas Pemohon & Alamat Penjemputan
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Nama Lengkap / Instansi *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Ibu Rina / Toko Berkah"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-gray-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Nomor WhatsApp Aktif *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="0812-xxxx-xxxx (untuk koordinasi kurir)"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-gray-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-4">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Kecamatan (Balikpapan) *
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-gray-800 bg-white"
                >
                  {BALIKPAPAN_DISTRICTS.filter(d => d !== 'Semua Kecamatan').map((d, i) => (
                    <option key={i} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-8">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Alamat Lengkap & Patokan Rumah *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nama jalan, nomor rumah, RT, patokan pagar atau ruko"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-gray-800"
                />
              </div>
            </div>
          </div>

          {/* STEP 3: JADWAL & CATATAN */}
          <div>
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
              <span className="w-6 h-6 rounded-full bg-primary-700 text-white text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h3 className="text-base font-bold text-gray-900 font-heading">
                Pilih Jadwal Penjemputan
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Tanggal Penjemputan yang Diinginkan *
                </label>
                <input
                  type="date"
                  required
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-gray-800 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Sesi Waktu Penjemputan *
                </label>
                <select
                  value={pickupTimeSlot}
                  onChange={(e) => setPickupTimeSlot(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-gray-800 bg-white"
                >
                  <option value="Pagi (09.00 - 12.00 WITA)">Pagi (09.00 - 12.00 WITA)</option>
                  <option value="Siang (13.00 - 16.00 WITA)">Siang (13.00 - 16.00 WITA)</option>
                  <option value="Sore (16.00 - 17.30 WITA)">Sore (16.00 - 17.30 WITA)</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Catatan Tambahan untuk Pengelola (Opsional)
              </label>
              <textarea
                rows={2}
                placeholder="Contoh: Sampah sudah dikarungkan, letakkan di depan pagar samping mobil."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-gray-800"
              />
            </div>
          </div>
        </div>

        {/* Action Button Footer */}
        <div className="bg-gray-50 p-6 md:p-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <ShieldCheck className="w-4 h-4 text-primary-700" />
            <span>Tanpa biaya penjemputan • Uang hasil timbangan dibayar langsung saat jemput</span>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primary-700 hover:bg-primary-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
          >
            <Truck className="w-4 h-4" />
            <span>Kirim Permintaan Penjemputan</span>
          </button>
        </div>
      </form>
    </div>
  );
}

