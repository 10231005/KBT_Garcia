import React from 'react';
import { Users, Monitor, GitBranch, Package, TrendingUp, AlertCircle } from 'lucide-react';

const iconMap = {
  Users,
  Monitor,
  GitBranch,
  Package,
  TrendingUp,
};

export default function ProblemCard({ icon, title, description }) {
  const IconComponent = iconMap[icon] || AlertCircle;

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary-100 transition-all duration-200">
      <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center mb-5">
        <IconComponent className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2.5 font-heading">
        {title}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
