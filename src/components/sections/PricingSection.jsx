import React from 'react';
import SectionTitle from '../common/SectionTitle';
import PricingCard from '../ui/PricingCard';
import { pricing } from '../../data/content';

export default function PricingSection() {
  return (
    <section id="harga" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Rencana Berlangganan"
          title="Investasi Terjangkau untuk Pertumbuhan Pengelola"
          subtitle="Model bisnis berbasis Software-as-a-Service (SaaS) yang ekonomis untuk bank sampah dan pengepul lokal di Kota Balikpapan."
        />

        <PricingCard pricing={pricing} />
      </div>
    </section>
  );
}

