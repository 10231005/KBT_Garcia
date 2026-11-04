import React from 'react';
import { MapPin, Tags, Truck, CalendarCheck, Sparkles } from 'lucide-react';

const iconMap = {
  MapPin,
  Tags,
  Truck,
  CalendarCheck,
};

export default function FeatureCard({ icon, title, description }) {
  const IconComponent = iconMap[icon] || Sparkles;

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
      <div className="w-14 h-14 rounded-2xl bg-primary-100 text-primary-800 flex items-center justify-center mb-6 group-hover:bg-primary-700 group-hover:text-white transition-colors duration-300">
        <IconComponent className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3 font-heading">
        {title}
      </h3>
      <p className="text-gray-600 text-sm md:text-base leading-relaxed">
        {description}
      </p>
    </div>
  );
}
