import React from 'react';
import { Check, X, Minus } from 'lucide-react';

export default function ComparisonTable({ data }) {
  return (
    <div className="overflow-x-auto shadow-sm rounded-2xl border border-gray-200 bg-white">
      <table className="w-full text-left text-sm text-gray-600">
        <thead className="bg-gray-50 border-b border-gray-200 text-gray-900 font-heading">
          <tr>
            <th className="py-4 px-6 font-bold text-base">Aspek Layanan</th>
            <th className="py-4 px-6 font-bold text-base text-primary-800 bg-primary-50/70 border-x border-primary-100">
              Platform Econnect
            </th>
            <th className="py-4 px-6 font-bold text-base">Metode Tradisional (Buku/WA)</th>
            <th className="py-4 px-6 font-bold text-base">Platform Lain</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50/60 transition-colors">
              <td className="py-4 px-6 font-semibold text-gray-900">
                {item.aspect}
              </td>
              <td className="py-4 px-6 text-primary-900 bg-primary-50/40 font-medium border-x border-primary-100">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary-700 shrink-0 mt-0.5" />
                  <span>{item.econnect}</span>
                </div>
              </td>
              <td className="py-4 px-6 text-gray-600">
                <div className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>{item.traditional}</span>
                </div>
              </td>
              <td className="py-4 px-6 text-gray-600">
                <div className="flex items-start gap-2">
                  <Minus className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  <span>{item.other}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

