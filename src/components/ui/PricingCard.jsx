import React from 'react';
import { Check, ShieldCheck, Zap } from 'lucide-react';
import Button from '../common/Button';

export default function PricingCard({ pricing }) {
  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl border-2 border-primary-600 shadow-xl overflow-hidden relative">
      <div className="bg-primary-700 py-3 px-6 text-center text-white text-xs md:text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5">
        <Zap className="w-4 h-4 text-accent-400 fill-accent-400" /> Model Langganan Terjangkau untuk Bank Sampah & Pengepul
      </div>

      <div className="p-8 md:p-10">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 font-heading mb-2">
            {pricing.planName}
          </h3>
          <p className="text-gray-500 text-sm">
            Membantu digitalisasi operasional dan perluasan jangkauan sampah anorganik
          </p>
          <div className="mt-6 flex items-baseline justify-center gap-2">
            <span className="text-4xl md:text-5xl font-extrabold text-primary-800 font-heading">
              {pricing.priceYearly}
            </span>
            <span className="text-gray-500 font-medium text-sm md:text-base">
              / tahun
            </span>
          </div>
          <div className="mt-2 inline-block px-3 py-1 bg-primary-50 rounded-full text-xs font-semibold text-primary-800">
            {pricing.monthlyNote}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 mb-8">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
            Fitur & Keuntungan yang Didapatkan:
          </h4>
          <ul className="space-y-3.5">
            {pricing.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                <div className="w-5 h-5 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <Button href="#kontak" variant="primary" size="lg" className="w-full">
            {pricing.ctaText}
          </Button>
          <p className="text-center text-xs text-gray-500 flex items-center justify-center gap-1">
            <ShieldCheck className="w-4 h-4 text-primary-600" />
            Tanpa biaya per transaksi • Akses langsung via peramban web
          </p>
        </div>
      </div>
    </div>
  );
}

