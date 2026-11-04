import React, { useState } from 'react';
import { MapPin, Phone, Clock, Star, Truck, ChevronRight, Tag, Info, Check } from 'lucide-react';

export default function PartnerCard({ partner, onSelectPartner }) {
  const [showAllPrices, setShowAllPrices] = useState(false);

  return (
    <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm hover:shadow-lg hover:border-primary-200 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      <div className="p-6">
        {/* Top Header Badge & Type */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-100 text-primary-800">
            {partner.type}
          </span>
          <div className="flex items-center gap-1 text-xs font-bold text-gray-700 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{partner.rating}</span>
            <span className="text-gray-400 font-normal">({partner.reviewsCount})</span>
          </div>
        </div>

        {/* Partner Name */}
        <h3 className="text-xl font-bold font-heading text-gray-900 group-hover:text-primary-800 transition-colors mb-2">
          {partner.name}
        </h3>

        <p className="text-xs text-gray-600 line-clamp-2 mb-4 leading-relaxed">
          {partner.description}
        </p>

        {/* Location & Contact Meta */}
        <div className="space-y-2 text-xs text-gray-600 border-t border-gray-100 pt-3 mb-4">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
            <span className="font-medium text-gray-800">{partner.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary-600 shrink-0" />
            <span>{partner.hours}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-primary-600 shrink-0" />
            <span className="font-mono">{partner.phone}</span>
          </div>
        </div>

        {/* Accepted Waste Preview */}
        <div className="bg-gray-50 rounded-2xl p-3.5 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-primary-700" /> Tarif Sampah Diterima:
            </span>
            <span className="text-[10px] text-gray-500">Min. jemput {partner.minPickupWeight} kg</span>
          </div>

          <div className="space-y-1.5">
            {(showAllPrices ? partner.acceptedWaste : partner.acceptedWaste.slice(0, 3)).map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-gray-200/50 last:border-0">
                <span className="text-gray-700">{item.name}</span>
                <span className="font-bold font-mono text-primary-800">
                  Rp {item.price.toLocaleString('id-ID')}/{item.unit}
                </span>
              </div>
            ))}
          </div>

          {partner.acceptedWaste.length > 3 && (
            <button
              onClick={() => setShowAllPrices(!showAllPrices)}
              className="mt-2 text-xs font-semibold text-primary-700 hover:text-primary-800 hover:underline block text-center w-full"
            >
              {showAllPrices ? 'Tampilkan Lebih Sedikit' : `+ ${partner.acceptedWaste.length - 3} jenis lainnya...`}
            </button>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 bg-gray-50/80 border-t border-gray-100 flex items-center gap-2">
        <button
          onClick={() => onSelectPartner(partner)}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary-700 hover:bg-primary-800 text-white font-semibold text-sm shadow-sm hover:shadow transition-all"
        >
          <Truck className="w-4 h-4" />
          <span>Pilih & Ajukan Penjemputan</span>
        </button>
      </div>
    </div>
  );
}

