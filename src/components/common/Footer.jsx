import React from 'react';
import { Recycle, Shield, CheckCircle, MapPin, Mail, ExternalLink } from 'lucide-react';
import { navLinks, companyIdentity, legalBasis, footerContent } from '../../data/content';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Kolom 1: Profil Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white shadow-md">
                <Recycle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-bold font-heading text-white tracking-tight block">
                  {companyIdentity.name}
                </span>
                <span className="text-xs text-primary-400 font-semibold tracking-wider uppercase block">
                  {companyIdentity.location}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              {footerContent.description}
            </p>
            <div className="text-xs text-gray-400 space-y-1 pt-2 border-t border-gray-800">
              <p className="font-semibold text-gray-300">{companyIdentity.institution}</p>
              <p>Mata Kuliah: {companyIdentity.course} ({companyIdentity.year})</p>
            </div>
          </div>

          {/* Kolom 2: Navigasi Cepat */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 tracking-wide font-heading">
              Navigasi Halaman
            </h3>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="hover:text-primary-400 transition-colors inline-flex items-center gap-1.5"
                  >
                    <span className="text-xs text-primary-500">›</span> {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Identitas Usaha & Target */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 tracking-wide font-heading">
              Identitas Usaha
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="font-medium text-gray-300 min-w-20">Jenis Usaha:</span>
                <span>{companyIdentity.type}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-medium text-gray-300 min-w-20">Bidang:</span>
                <span>{companyIdentity.field}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-medium text-gray-300 min-w-20">Produk:</span>
                <span>{companyIdentity.product}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-medium text-gray-300 min-w-20">Target Utama:</span>
                <span className="text-primary-400 font-medium">{companyIdentity.target}</span>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Dasar Hukum */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 tracking-wide font-heading flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary-400" /> Dasar Hukum
            </h3>
            <ul className="space-y-3 text-xs text-gray-400">
              {legalBasis.map((law, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-primary-400 mt-0.5 shrink-0" />
                  <span>{law}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Baris Bawah */}
        <div className="pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
          <p>{footerContent.copyright}</p>
        </div>
      </div>
    </footer>
  );
}

