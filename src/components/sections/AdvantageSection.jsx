import React from 'react';
import SectionTitle from '../common/SectionTitle';
import ComparisonTable from '../ui/ComparisonTable';
import { advantages } from '../../data/content';

export default function AdvantageSection() {
  return (
    <section id="keunggulan" className="py-20 md:py-28 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Diferensiasi & Keunggulan"
          title="Mengapa Memilih Econnect?"
          subtitle={advantages.intro}
        />

        <div className="mt-8">
          <ComparisonTable data={advantages.comparison} />
        </div>
      </div>
    </section>
  );
}

