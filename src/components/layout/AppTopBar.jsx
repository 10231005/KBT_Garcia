import React from 'react';
import { Menu, MapPin, Building2, User, Sparkles } from 'lucide-react';

export default function AppTopBar({
  currentUser,
  activeMenuTitle,
  onOpenSidebar,
  pendingOrdersCount = 0,
}) {
  return (
    <header className="h-20 bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      {/* Left: Mobile hamburger & Page Title */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={onOpenSidebar}
          className="p-2.5 rounded-2xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden focus:outline-none"
          aria-label="Buka menu navigasi"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold font-heading text-slate-900 tracking-tight">
              {activeMenuTitle}
            </h1>
          </div>
          <p className="text-[11px] text-slate-500 hidden sm:block">
            {currentUser?.role === 'manager'
              ? `Workspace Operasional Mitra: ${currentUser?.name}`
              : 'Layanan Pengumpulan & Penjemputan Sampah Anorganik'}
          </p>
        </div>
      </div>

      {/* Right: Location Badge & Status */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
          <MapPin className="w-3.5 h-3.5 text-primary-700" />
          <span>Kota Balikpapan</span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-200 text-primary-800 text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-primary-600 animate-pulse" />
          <span className="truncate max-w-[140px] sm:max-w-none">
            {currentUser?.role === 'manager' ? 'Mode Mitra' : 'Mode Warga'}
          </span>
        </div>
      </div>
    </header>
  );
}

