import React from 'react';
import SectionTitle from '../common/SectionTitle';
import TeamCard from '../ui/TeamCard';
import { vision, missions, teamMembers, companyIdentity } from '../../data/content';
import { Eye, Compass, Users } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="tentang" className="py-20 md:py-28 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Tentang Perusahaan"
          title="Visi, Misi & Profil Tim Econnect"
          subtitle="Dikembangkan oleh mahasiswa Institut Teknologi Kalimantan sebagai inovasi kewirausahaan berbasis teknologi di Kota Balikpapan."
        />

        {/* Visi & Misi Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          {/* Visi */}
          <div className="lg:col-span-5 bg-gradient-to-br from-primary-800 to-primary-950 text-white p-8 md:p-10 rounded-3xl shadow-lg flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-accent-400 mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold font-heading mb-4">Visi Kami</h3>
              <p className="text-primary-50 text-base md:text-lg leading-relaxed">
                "{vision}"
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 text-xs text-primary-200">
              {companyIdentity.institution} • {companyIdentity.year}
            </div>
          </div>

          {/* Misi */}
          <div className="lg:col-span-7 bg-primary-50/50 p-8 md:p-10 rounded-3xl border border-primary-100 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-700 mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-gray-900 mb-4">Misi Kami</h3>
              <ul className="space-y-3.5 text-sm md:text-base text-gray-700">
                {missions.map((mission, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary-200/80 text-primary-900 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{mission}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Tim Kami */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl md:text-3xl font-bold font-heading text-gray-900 mb-3 flex items-center justify-center gap-2">
              <Users className="w-6 h-6 text-primary-700" />
              Susunan Tim Inti (Kelompok 4)
            </h3>
            <p className="text-sm md:text-base text-gray-600">
              Tim multidisiplin yang mengelola aspek teknologi, operasional, pemasaran, dan keuangan Econnect.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {teamMembers.map((member, idx) => (
              <TeamCard key={idx} member={member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

