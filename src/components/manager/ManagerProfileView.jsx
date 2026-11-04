import React from 'react';
import { Building2, MapPin, Phone, Clock, Scale, Star, ShieldCheck } from 'lucide-react';

export default function ManagerProfileView({ currentPartner }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex items-start justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-secondary-50 text-secondary-800 border border-secondary-200 flex items-center justify-center font-bold text-2xl font-heading shadow-sm">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-secondary-700 bg-secondary-50 px-2.5 py-0.5 rounded-full border border-secondary-200 inline-block mb-1">
                {currentPartner.type}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
                {currentPartner.name}
              </h2>
              <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="font-bold text-slate-800">{currentPartner.rating}</span>
                <span>({currentPartner.reviewsCount} ulasan warga Balikpapan)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
            <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider block">
              Lokasi & Alamat Operasional
            </span>
            <div className="flex items-start gap-2 text-slate-800">
              <MapPin className="w-4 h-4 text-primary-700 shrink-0 mt-0.5" />
              <span>{currentPartner.address} ({currentPartner.district})</span>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
            <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider block">
              Kontak Petugas / WhatsApp
            </span>
            <div className="flex items-center gap-2 text-slate-800 font-mono">
              <Phone className="w-4 h-4 text-primary-700 shrink-0" />
              <span>{currentPartner.phone}</span>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
            <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider block">
              Jam & Hari Operasional Penjemputan
            </span>
            <div className="flex items-center gap-2 text-slate-800">
              <Clock className="w-4 h-4 text-primary-700 shrink-0" />
              <span>{currentPartner.hours}</span>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
            <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider block">
              Ketentuan Armada Jemput
            </span>
            <div className="flex items-center gap-2 text-slate-800">
              <Scale className="w-4 h-4 text-primary-700 shrink-0" />
              <span>Minimal penjemputan: <strong>{currentPartner.minPickupWeight} kg</strong></span>
            </div>
          </div>
        </div>

        <div>
          <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider block mb-1">
            Deskripsi Layanan & Visi Mitra
          </span>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
            {currentPartner.description}
          </p>
        </div>

        <div className="p-4 bg-primary-50 rounded-2xl border border-primary-100 text-xs text-primary-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-primary-700 shrink-0" />
          <span>Terdaftar sebagai mitra resmi Econnect dalam implementasi ekonomi sirkular Kota Balikpapan.</span>
        </div>
      </div>
    </div>
  );
}

