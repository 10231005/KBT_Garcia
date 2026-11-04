import React from 'react';
import SectionTitle from '../common/SectionTitle';
import FeatureCard from '../ui/FeatureCard';
import { features } from '../../data/content';

export default function FeatureSection() {
  return (
    <section id="fitur" className="py-20 md:py-28 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Fitur Platform"
          title="Fitur Utama Econnect untuk Pengguna & Pengelola"
          subtitle="Dirancang untuk menyederhanakan alur penjemputan sampah anorganik, meningkatkan transparansi harga, serta mempermudah pencatatan."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <FeatureCard
              key={idx}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

