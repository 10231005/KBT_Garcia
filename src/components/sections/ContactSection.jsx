import React from 'react';
import SectionTitle from '../common/SectionTitle';
import ContactForm from '../ui/ContactForm';
import { MapPin, Mail, Phone, Clock, MessageSquareQuote } from 'lucide-react';
import { companyIdentity } from '../../data/content';

export default function ContactSection() {
  return (
    <section id="kontak" className="py-20 md:py-28 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Hubungi Kami"
          title="Mulai Kemitraan Digital Pengelolaan Sampah"
          subtitle="Apakah Anda pengelola bank sampah, pengepul, atau institusi yang ingin berkolaborasi? Hubungi kami untuk konsultasi penggunaan platform."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Kolom Informasi */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
              <h3 className="text-xl font-bold font-heading text-gray-900">
                Informasi Kontak & Lokasi
              </h3>

              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-gray-900 block">Wilayah Operasional:</span>
                    <span>{companyIdentity.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-gray-900 block">Institusi Pengembang:</span>
                    <span>{companyIdentity.institution}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageSquareQuote className="w-5 h-5 text-primary-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-gray-900 block">Mata Kuliah:</span>
                    <span>{companyIdentity.course} — {companyIdentity.year}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-primary-50 rounded-2xl border border-primary-100 text-xs text-primary-900 leading-relaxed">
                <strong>Catatan Kemitraan:</strong> Econnect hadir sebagai enabler digital yang siap membantu bank sampah dan pengepul beralih dari buku fisik ke pencatatan sistem otomatis.
              </div>
            </div>
          </div>

          {/* Kolom Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

