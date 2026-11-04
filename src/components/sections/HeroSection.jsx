import React from 'react';
import { ArrowRight, Recycle, MapPin, Sparkles } from 'lucide-react';
import { heroContent } from '../../data/content';
import Button from '../common/Button';

export default function HeroSection() {
  return (
    <section id="beranda" className="pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-primary-50/60 via-white to-white overflow-hidden relative">
      {/* Decorative background blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-secondary-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 text-primary-900 text-xs md:text-sm font-semibold mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-primary-700" />
            <span>Platform Digital Pengelolaan Sampah Anorganik Balikpapan</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading text-gray-900 tracking-tight leading-tight md:leading-none mb-6">
            {heroContent.tagline}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 font-medium mb-6 leading-snug">
            {heroContent.subtitle}
          </p>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            {heroContent.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="#harga" variant="primary" size="lg" className="w-full sm:w-auto shadow-primary-700/20">
              {heroContent.ctaPrimary} <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
            <Button href="#solusi" variant="outline" size="lg" className="w-full sm:w-auto">
              {heroContent.ctaSecondary}
            </Button>
          </div>

          {/* Micro badges */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-primary-600" />
              <span>Fokus Wilayah Kota Balikpapan</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Recycle className="w-4 h-4 text-primary-600" />
              <span>Dukung Ekonomi Sirkular & Daur Ulang</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

