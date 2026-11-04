import React, { useState } from 'react';
import { 
  Recycle, 
  User, 
  Building2, 
  ArrowRight, 
  ShieldCheck, 
  Phone, 
  Lock, 
  MapPin, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

export default function LoginPage({ onLogin, partners }) {
  const [role, setRole] = useState('citizen'); // 'citizen' | 'manager'

  // Citizen login form state
  const [citizenName, setCitizenName] = useState('');
  const [citizenPhone, setCitizenPhone] = useState('');

  // Manager login form state
  const [selectedPartnerId, setSelectedPartnerId] = useState(partners[0]?.id || '');
  const [managerPassword, setManagerPassword] = useState('admin123');

  const handleCitizenSubmit = (e) => {
    e.preventDefault();
    if (!citizenName.trim() || !citizenPhone.trim()) {
      alert('Mohon masukkan Nama dan Nomor WhatsApp.');
      return;
    }
    onLogin({
      role: 'citizen',
      name: citizenName.trim(),
      phone: citizenPhone.trim(),
      district: 'Balikpapan Kota',
    });
  };

  const handleManagerSubmit = (e) => {
    e.preventDefault();
    const partner = partners.find(p => p.id === selectedPartnerId) || partners[0];
    onLogin({
      role: 'manager',
      name: partner.name,
      partnerId: partner.id,
      district: partner.district,
      type: partner.type,
    });
  };

  // Demo 1-Click Logins
  const handleDemoCitizenLogin = () => {
    onLogin({
      role: 'citizen',
      name: 'Budi Santoso',
      phone: '0812-3456-7890',
      district: 'Balikpapan Utara',
    });
  };

  const handleDemoManagerLogin = (partnerId) => {
    const partner = partners.find(p => p.id === partnerId) || partners[1] || partners[0];
    onLogin({
      role: 'manager',
      name: partner.name,
      partnerId: partner.id,
      district: partner.district,
      type: partner.type,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary-950 to-slate-900 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl w-full relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-tr from-primary-700 to-primary-500 text-white shadow-xl shadow-primary-900/40 mb-4 ring-4 ring-white/10">
            <Recycle className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-heading text-white tracking-tight">
            Econnect Balikpapan
          </h1>
          <p className="text-xs sm:text-sm text-primary-200 mt-1 max-w-md mx-auto">
            Platform Digital Penghubung Masyarakat & Pengelola Sampah Anorganik
          </p>
        </div>

        {/* Main Card with Role Switcher */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Role Switcher Tabs */}
          <div className="grid grid-cols-2 p-2 bg-gray-100/80 border-b border-gray-200 gap-2">
            <button
              type="button"
              onClick={() => setRole('citizen')}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                role === 'citizen'
                  ? 'bg-white text-primary-900 shadow-md ring-1 ring-black/5'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
              }`}
            >
              <User className="w-4 h-4 text-primary-700" />
              <span>Masyarakat (Warga)</span>
            </button>

            <button
              type="button"
              onClick={() => setRole('manager')}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                role === 'manager'
                  ? 'bg-white text-primary-900 shadow-md ring-1 ring-black/5'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
              }`}
            >
              <Building2 className="w-4 h-4 text-primary-700" />
              <span>Pengelola Sampah (Mitra)</span>
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {/* ROLE 1: MASYARAKAT LOGIN */}
            {role === 'citizen' && (
              <form onSubmit={handleCitizenSubmit} className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                      Masuk sebagai Pengguna / Warga
                    </span>
                    <span className="text-[11px] text-primary-700 font-semibold bg-primary-50 px-2 py-0.5 rounded-full">
                      Penyalur Sampah
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">
                    Cari pengelola terdekat, cek harga sampah, dan ajukan penjemputan dari rumah Anda.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Nama Lengkap / Instansi *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Budi Santoso / Ruko Berkah"
                      value={citizenName}
                      onChange={(e) => setCitizenName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-gray-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Nomor WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="0812-xxxx-xxxx"
                      value={citizenPhone}
                      onChange={(e) => setCitizenPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-gray-800 font-mono"
                    />
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 block">
                    Digunakan untuk koordinasi konfirmasi jadwal penjemputan.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-primary-700 hover:bg-primary-800 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-2"
                >
                  <span>Masuk ke Antarmuka Warga</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* 1-Click Demo Citizen */}
                <div className="pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={handleDemoCitizenLogin}
                    className="w-full py-2.5 bg-gray-50 hover:bg-primary-50 border border-gray-200 hover:border-primary-200 text-gray-700 hover:text-primary-800 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-primary-600" />
                    <span>Coba Langsung sebagai Demo Warga (Budi Santoso)</span>
                  </button>
                </div>
              </form>
            )}

            {/* ROLE 2: PENGELOLA SAMPAH LOGIN */}
            {role === 'manager' && (
              <form onSubmit={handleManagerSubmit} className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                      Masuk sebagai Pengelola Sampah (Mitra)
                    </span>
                    <span className="text-[11px] text-secondary-700 font-semibold bg-secondary-50 px-2 py-0.5 rounded-full">
                      Bank Sampah / Pengepul
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">
                    Akses dashboard operasional untuk mengonfirmasi jadwal penjemputan & pencatatan timbangan digital.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Pilih Entitas Bank Sampah / Pengepul *
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={selectedPartnerId}
                      onChange={(e) => setSelectedPartnerId(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-gray-800 bg-white"
                    >
                      {partners.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.district})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Kata Sandi Akses Petugas *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={managerPassword}
                      onChange={(e) => setManagerPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-gray-800 font-mono"
                    />
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 block">
                    Kata sandi demo awal: <code className="text-gray-700 font-bold">admin123</code>
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-2"
                >
                  <span>Masuk ke Dashboard Pengelola</span>
                  <ArrowRight className="w-4 h-4 text-accent-400" />
                </button>

                {/* 1-Click Demo Manager */}
                <div className="pt-4 border-t border-gray-100 space-y-2">
                  <span className="text-[11px] text-gray-500 font-semibold block text-center">
                    Akses Cepat Demo Pengelola:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleDemoManagerLogin('BS-02')}
                      className="py-2 px-3 bg-gray-50 hover:bg-secondary-50 border border-gray-200 text-gray-700 hover:text-secondary-800 text-[11px] font-semibold rounded-xl text-center truncate"
                      title="Bank Sampah Sampurna Berkah"
                    >
                      Sampurna Berkah (Utara)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDemoManagerLogin('BS-01')}
                      className="py-2 px-3 bg-gray-50 hover:bg-primary-50 border border-gray-200 text-gray-700 hover:text-primary-800 text-[11px] font-semibold rounded-xl text-center truncate"
                      title="Bank Sampah As-Salam"
                    >
                      As-Salam (Kota)
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Footnote */}
        <div className="mt-6 text-center text-xs text-primary-200/80">
          <p>
            Institut Teknologi Kalimantan (ITK) • Kewirausahaan Berbasis Teknologi 2026
          </p>
        </div>
      </div>
    </div>
  );
}

