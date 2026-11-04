import React from 'react';

export default function TeamCard({ member }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col text-center items-center">
      <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary-800 to-primary-600 text-white flex items-center justify-center font-bold text-2xl font-heading shadow-md mb-4 border-2 border-white ring-4 ring-primary-50">
        {member.initials}
      </div>
      <h3 className="text-lg font-bold text-gray-900 font-heading mb-1">
        {member.name}
      </h3>
      <span className="text-xs font-semibold text-primary-700 uppercase tracking-wider mb-3 px-3 py-1 bg-primary-50 rounded-full">
        {member.role}
      </span>
      <p className="text-xs text-gray-600 leading-relaxed mt-1">
        {member.description}
      </p>
    </div>
  );
}

