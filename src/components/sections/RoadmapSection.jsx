import React from 'react';
import SectionTitle from '../common/SectionTitle';
import { roadmap } from '../../data/content';
import { Target, CheckCircle2 } from 'lucide-react';

export default function RoadmapSection() {
  return (
    <section id="roadmap" className="py-20 md:py-28 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Peta Jalan Produk"
          title="Roadmap Pengembangan Econnect"
          subtitle="Tahapan sistematis dari perancangan konsep hingga penerapan berskala luas sesuai dokumentasi rencana bisnis."
        />

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 gap-6">
            {roadmap.map((item) => (
              <div
                key={item.phase}
                className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-primary-300 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-800 font-bold flex items-center justify-center shrink-0 text-lg font-heading">
                    {item.phase}
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 font-heading mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold text-gray-700">Fokus:</span> {item.focus}
                    </p>
                  </div>
                </div>

                <div className="bg-primary-50 px-4 py-3 rounded-xl shrink-0 md:max-w-xs text-xs md:text-sm text-primary-900 border border-primary-100 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary-700 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold block text-primary-950">Hasil Target:</span>
                    <span>{item.result}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

