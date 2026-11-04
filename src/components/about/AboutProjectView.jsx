import React from 'react';
import { 
  Recycle, 
  ShieldCheck, 
  Users, 
  Eye, 
  Compass, 
  GraduationCap, 
  CheckCircle2, 
  BookOpen 
} from 'lucide-react';
import { vision, missions, teamMembers, companyIdentity, legalBasis } from '../../data/content';

export default function AboutProjectView() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-100 text-primary-800 mb-2">
          <BookOpen className="w-3.5 h-3.5" /> Dokumentasi & Profil Proyek
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
          Tentang Platform Econnect
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-2">
          Inovasi digital pengelolaan sampah anorganik di Kota Balikpapan oleh mahasiswa Institut Teknologi Kalimantan (2026).
        </p>
      </div>

      {/* Visi & Misi */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-5 bg-gradient-to-br from-primary-900 to-primary-800 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-accent-400 mb-4">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold font-heading mb-3">Visi Econnect</h3>
            <p className="text-xs sm:text-sm text-primary-100 leading-relaxed">
              "{vision}"
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-primary-300">
            Fokus: Inovasi Digital • Keberlanjutan Lingkungan • Ekonomi Sirkular
          </div>
        </div>

        <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-800 mb-4">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold font-heading text-slate-900 mb-3">5 Butir Misi</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              {missions.map((m, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Tim Kelompok 4 */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h3 className="text-xl font-bold font-heading text-slate-900 flex items-center justify-center gap-2">
            <Users className="w-5 h-5 text-primary-700" />
            Susunan Tim Inti (Kelompok 4)
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Mata Kuliah: {companyIdentity.course} ({companyIdentity.year}) • {companyIdentity.institution}
          </p>
          <p className="text-xs font-semibold text-slate-700 mt-0.5">
            Dosen Pengampu: Claudia Olla Mandayu S.Ars., M.Ars.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-2">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary-800 to-primary-600 text-white flex items-center justify-center font-bold text-base font-heading shadow-sm mb-2.5">
                {member.initials}
              </div>
              <h4 className="text-xs font-bold text-slate-900 font-heading mb-1">
                {member.name}
              </h4>
              <span className="text-[10px] font-bold text-primary-700 uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary-100 mb-2">
                {member.role}
              </span>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Dasar Hukum */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900 mb-4 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-primary-700" />
          Landasan Hukum Pengelolaan & Perdagangan Elektronik
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {legalBasis.map((law, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-2.5 text-xs text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-primary-700 shrink-0 mt-0.5" />
              <span>{law}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

