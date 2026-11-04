import React from 'react';

export default function StatCard({ number, label, description }) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      <div>
        <div className="text-4xl md:text-5xl font-extrabold text-primary-700 tracking-tight font-heading mb-2">
          {number}
        </div>
        <div className="text-lg font-bold text-gray-900 mb-2">
          {label}
        </div>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

