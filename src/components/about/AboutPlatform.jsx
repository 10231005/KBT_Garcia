import React from 'react';
import { 
  Recycle, 
  ShieldCheck, 
  Users, 
  Eye, 
  Compass, 
  BookOpen, 
  GraduationCap, 
  Award,
  CheckCircle2
} from 'lucide-react';
import { vision, missions, teamMembers, companyIdentity, legalBasis } from '../../data/content';

export default function AboutPlatform() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 pb-20 space-y-12">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-100 text-primary-800 mb-2">
          <BookOpen className="w-3.5 h-3.5" /> Profil & Dokumentasi Proyek
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-gray-900 tracking-tight">
          Tentang Inovasi Platform Econnect
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mt-2">
          Karya mahasiswa Institut Teknologi Kalimantan dalam mata kuliah Kewirausahaan Berbasis Teknologi (2026) untuk mewujudkan pengelolaan sampah anorganik yang berkelanjutan di Balikpapan.
        </p>
      </div>

      {/* Visi & Misi Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 bg-gradient-to-br from-primary-900 to-primary-800 text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-accent-400 mb-6">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold font-heading mb-4">Visi Platform</h3>
            <p className="text-primary-100 text-base leading-relaxed">
              "{vision}"
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 text-xs text-primary-300">
            Fokus: Inovasi Digital • Keberlanjutan Lingkungan • Ekonomi Sirkular
          </div>
        </div>

        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-700 mb-6">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold font-heading text-gray-900 mb-4">5 Butir Misi</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              {missions.map((m, idx) => (
                <li key={idx} className="flex items-start gap-3">
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

      {/* Identitas Bisnis & Institusi */}
      <div className="bg-primary-50/70 rounded-3xl p-6 md:p-8 border border-primary-100">
        <h3 className="text-xl font-bold font-heading text-gray-900 mb-6 flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-primary-700" />
          Keterangan Akademik & Institusi
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs sm:text-sm">
          <div className="bg-white p-4 rounded-2xl border border-primary-100">
            <span className="text-gray-400 block mb-1">Mata Kuliah:</span>
            <span className="font-bold text-gray-900">{companyIdentity.course} ({companyIdentity.year})</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-primary-100">
            <span className="text-gray-400 block mb-1">Perguruan Tinggi:</span>
            <span className="font-bold text-gray-900">{companyIdentity.institution}</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-primary-100">
            <span className="text-gray-400 block mb-1">Dosen Pengampu:</span>
            <span className="font-bold text-gray-900">Claudia Olla Mandayu S.Ars., M.Ars.</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-primary-100">
            <span className="text-gray-400 block mb-1">Wilayah Pengembangan:</span>
            <span className="font-bold text-primary-800">{companyIdentity.location}</span>
          </div>
        </div>
      </div>

      {/* Profil Tim Inti (Kelompok 4) */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h3 className="text-2xl font-bold font-heading text-gray-900 flex items-center justify-center gap-2">
            <Users className="w-6 h-6 text-primary-700" />
            Susunan Tim Inti (Kelompok 4)
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Mahasiswa Institut Teknologi Kalimantan pelaksana proyek Econnect
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary-800 to-primary-600 text-white flex items-center justify-center font-bold text-xl font-heading shadow-md mb-3">
                {member.initials}
              </div>
              <h4 className="text-sm font-bold text-gray-900 font-heading mb-1">
                {member.name}
              </h4>
              <span className="text-[10px] font-bold text-primary-700 uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary-50 mb-2">
                {member.role}
              </span>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Dasar Hukum Regulasi */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold font-heading text-gray-900 mb-4 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-primary-700" />
          Landasan Hukum Pengelolaan & Perdagangan Elektronik
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {legalBasis.map((law, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-3 text-xs text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-primary-700 shrink-0 mt-0.5" />
              <span>{law}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

