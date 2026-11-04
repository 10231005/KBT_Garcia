import React from 'react';
import { UserPlus, Search, CheckCircle, ClipboardList, Check } from 'lucide-react';

const iconMap = {
  UserPlus,
  Search,
  CheckCircle,
  ClipboardList,
};

export default function TimelineStep({ step, icon, title, description, isLast }) {
  const IconComponent = iconMap[icon] || Check;

  return (
    <div className="relative flex flex-col md:flex-row items-start group">
      {/* Icon & Step Marker */}
      <div className="flex md:flex-col items-center md:items-center mr-6 shrink-0">
        <div className="w-12 h-12 rounded-2xl bg-primary-700 text-white flex items-center justify-center font-bold shadow-md z-10 text-base">
          {step}
        </div>
        {!isLast && (
          <div className="hidden md:block w-0.5 h-24 bg-primary-200 mt-2 mb-2" />
        )}
      </div>

      {/* Content */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 flex-1 mt-3 md:mt-0 mb-8 md:mb-6">
        <div className="flex items-center gap-3 mb-2.5">
          <div className="p-2 rounded-lg bg-primary-50 text-primary-700">
            <IconComponent className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 font-heading">
            {title}
          </h3>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
