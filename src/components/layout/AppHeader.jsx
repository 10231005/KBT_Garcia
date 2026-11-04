import React from 'react';
import { Recycle, Search, Truck, PackageSearch, LayoutDashboard, Info, User, Building2 } from 'lucide-react';

export default function AppHeader({ activeTab, setActiveTab, ordersCount }) {
  const pendingOrdersCount = ordersCount?.filter(o => o.status === 'Menunggu Konfirmasi').length || 0;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      {/* Top Bar Brand & Role indicator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo Brand */}
          <div 
            onClick={() => setActiveTab('directory')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-gradient-to-tr from-primary-800 to-primary-600 flex items-center justify-center text-white shadow-md shadow-primary-700/20 group-hover:scale-105 transition-transform">
              <Recycle className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl md:text-2xl font-black font-heading tracking-tight text-gray-900">
                  Econnect
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary-100 text-primary-800">
                  MVP Balikpapan
                </span>
              </div>
              <p className="text-xs text-gray-500 hidden sm:block">
                Platform Digital Pengelolaan Sampah Anorganik
              </p>
            </div>
          </div>

          {/* Quick Access Action Badges */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setActiveTab('pickup')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-semibold rounded-xl bg-primary-50 text-primary-800 hover:bg-primary-100 transition-colors border border-primary-200"
            >
              <Truck className="w-4 h-4 text-primary-700" />
              <span>Jemput Sampah</span>
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className="relative inline-flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-semibold rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition-colors shadow-sm"
            >
              <LayoutDashboard className="w-4 h-4 text-accent-400" />
              <span className="hidden sm:inline">Portal Pengelola</span>
              <span className="sm:hidden">Pengelola</span>
              {pendingOrdersCount > 0 && (
                <span className="w-2.5 h-2.5 bg-accent-500 rounded-full animate-ping" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="bg-gray-50/80 border-t border-gray-200 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 sm:space-x-2 py-1.5 min-w-max">
            <button
              onClick={() => setActiveTab('directory')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'directory'
                  ? 'bg-primary-700 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>1. Cari Pengelola & Harga</span>
            </button>

            <button
              onClick={() => setActiveTab('pickup')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'pickup'
                  ? 'bg-primary-700 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>2. Pengajuan Penjemputan</span>
            </button>

            <button
              onClick={() => setActiveTab('tracking')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'tracking'
                  ? 'bg-primary-700 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
              }`}
            >
              <PackageSearch className="w-4 h-4" />
              <span>3. Lacak Status Penjemputan</span>
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-primary-700 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>4. Dashboard Pengelola Sampah</span>
              {pendingOrdersCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-accent-500 text-gray-950 font-black">
                  {pendingOrdersCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'about'
                  ? 'bg-primary-700 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
              }`}
            >
              <Info className="w-4 h-4" />
              <span>Tentang Econnect</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

