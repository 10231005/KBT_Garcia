import React from 'react';
import SectionTitle from '../common/SectionTitle';
import StatCard from '../ui/StatCard';
import ProblemCard from '../ui/ProblemCard';
import { statistics, problemFactors } from '../../data/content';

export default function ProblemSection() {
  return (
    <section id="masalah" className="py-20 md:py-28 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Latar Belakang & Identifikasi"
          title="Tantangan Nyata Pengelolaan Sampah di Balikpapan"
          subtitle="Berdasarkan data Sistem Informasi Pengelolaan Sampah Nasional (SIPSN) serta temuan sosiometri masyarakat, penanganan sampah anorganik masih menghadapi hambatan struktural."
        />

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {statistics.map((stat, idx) => (
            <StatCard
              key={idx}
              number={stat.number}
              label={stat.label}
              description={stat.description}
            />
          ))}
        </div>

        {/* 5 Factors Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h3 className="text-2xl font-bold font-heading text-gray-900 mb-2">
            5 Faktor Kendala Utama di Lapangan
          </h3>
          <p className="text-sm text-gray-600">
            Analisis multidimensi terhadap hambatan yang dihadapi masyarakat dan pengelola sampah anorganik:
          </p>
        </div>

        {/* 5 Factors Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problemFactors.map((factor, idx) => (
            <ProblemCard
              key={idx}
              icon={factor.icon}
              title={factor.title}
              description={factor.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

