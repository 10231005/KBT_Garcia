import React from 'react';
import SectionTitle from '../common/SectionTitle';
import { Globe, Link as LinkIcon, ShieldCheck, Cog, CheckCircle } from 'lucide-react';
import { solutionContent } from '../../data/content';

const iconMap = {
  Globe,
  Link: LinkIcon,
  ShieldCheck,
  Cog,
};

export default function SolutionSection() {
  return (
    <section id="solusi" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Solusi Teknologi"
          title={solutionContent.title}
          subtitle="Menghubungkan masyarakat pengumpul dengan pengelola secara terstruktur, transparan, dan efisien."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Paragraphs description */}
          <div className="lg:col-span-7 space-y-6 text-gray-700 leading-relaxed text-base md:text-lg">
            {solutionContent.paragraphs.map((para, idx) => (
              <p key={idx} className="bg-primary-50/30 p-5 rounded-2xl border-l-4 border-primary-600">
                {para}
              </p>
            ))}
          </div>

          {/* Highlights & Principles */}
          <div className="lg:col-span-5 bg-gradient-to-br from-primary-900 to-primary-700 text-white p-8 md:p-10 rounded-3xl shadow-xl">
            <h3 className="text-xl font-bold font-heading mb-6 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-accent-400" />
              Prinsip & Nilai Tambah Econnect
            </h3>
            <div className="space-y-6">
              {solutionContent.highlights.map((item, idx) => {
                const IconComp = iconMap[item.icon] || CheckCircle;
                return (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-white/10 text-white shrink-0 mt-0.5">
                      <IconComp className="w-5 h-5 text-accent-400" />
                    </div>
                    <p className="text-sm md:text-base font-medium leading-snug">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
