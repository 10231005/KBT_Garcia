import React from 'react';
import SectionTitle from '../common/SectionTitle';
import TimelineStep from '../ui/TimelineStep';
import { howItWorks } from '../../data/content';

export default function HowItWorksSection() {
  return (
    <section id="cara-kerja" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Alur Sistem"
          title="Bagaimana Econnect Bekerja?"
          subtitle="Alur terpadu yang menghubungkan pengelola sampah dan masyarakat dalam 4 langkah praktis."
        />

        <div className="max-w-3xl mx-auto">
          {howItWorks.map((item, idx) => (
            <TimelineStep
              key={idx}
              step={item.step}
              icon={item.icon}
              title={item.title}
              description={item.description}
              isLast={idx === howItWorks.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

