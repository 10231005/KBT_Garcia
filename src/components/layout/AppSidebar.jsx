import React from 'react';
import { 
  Recycle, 
  Search, 
  Truck, 
  PackageSearch, 
  LayoutDashboard, 
  ClipboardList, 
  Tags, 
  Building2, 
  Info, 
  LogOut, 
  User, 
  X,
  History,
  Layers
} from 'lucide-react';

export default function AppSidebar({
  currentUser,
  activeMenu,
  setActiveMenu,
  onLogout,
  isOpen,
  onClose,
  pendingOrdersCount = 0,
}) {
  // Navigation menus based on role
  const citizenMenus = [
    {
      id: 'directory',
      label: 'Cari Pengelola',
      icon: Search,
      badge: null,
    },
    {
      id: 'waste-catalog',
      label: 'Jenis Sampah & Harga',
      icon: Tags,
      badge: null,
    },
    {
      id: 'pickup',
      label: 'Ajukan Penjemputan',
      icon: Truck,
      badge: null,
    },
    {
      id: 'tracking',
      label: 'Lacak Status Pesanan',
      icon: PackageSearch,
      badge: null,
    },
    {
      id: 'history',
      label: 'Riwayat Penjemputan',
      icon: History,
      badge: null,
    },
    {
      id: 'about',
      label: 'Tentang Econnect',
      icon: Info,
      badge: null,
    },
  ];

  const managerMenus = [
    {
      id: 'dashboard',
      label: 'Ringkasan Operasional',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'orders',
      label: 'Kelola Permintaan Jemput',
      icon: ClipboardList,
      badge: pendingOrdersCount > 0 ? pendingOrdersCount : null,
    },
    {
      id: 'history',
      label: 'Riwayat & Pembukuan Kas',
      icon: History,
      badge: null,
    },
    {
      id: 'pricing',
      label: 'Tarif & Jenis Sampah',
      icon: Tags,
      badge: null,
    },
    {
      id: 'profile',
      label: 'Profil Bank Sampah',
      icon: Building2,
      badge: null,
    },
    {
      id: 'about',
      label: 'Tentang Econnect',
      icon: Info,
      badge: null,
    },
  ];

  const menus = currentUser?.role === 'manager' ? managerMenus : citizenMenus;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-900 text-slate-100 flex flex-col justify-between transition-transform duration-300 ease-in-out border-r border-slate-800 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top: Brand & User Profile */}
        <div>
          {/* Brand Header */}
          <div className="h-20 px-6 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary-600 to-primary-500 flex items-center justify-center text-white shadow-lg shadow-primary-700/30">
                <Recycle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-black font-heading tracking-tight text-white block">
                  Econnect
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary-400 block -mt-0.5">
                  Balikpapan MVP
                </span>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile Info Card */}
          <div className="p-4 mx-4 my-4 rounded-2xl bg-slate-800/60 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 shadow-inner ${
                currentUser?.role === 'manager'
                  ? 'bg-secondary-900 text-secondary-300 border border-secondary-700/50'
                  : 'bg-primary-900 text-primary-300 border border-primary-700/50'
              }`}>
                {currentUser?.role === 'manager' ? (
                  <Building2 className="w-5 h-5" />
                ) : (
                  <User className="w-5 h-5" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-white truncate font-heading">
                  {currentUser?.name}
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    currentUser?.role === 'manager' ? 'bg-secondary-400' : 'bg-primary-400'
                  }`} />
                  <span className="text-[11px] font-medium text-slate-400 truncate">
                    {currentUser?.role === 'manager' ? 'Mitra Pengelola' : 'Masyarakat Warga'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Menus List */}
          <nav className="px-4 space-y-1 mt-2">
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Navigasi Layanan
            </div>
            {menus.map((item) => {
              const IconComp = item.icon;
              const isActive = activeMenu === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveMenu(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all group ${
                    isActive
                      ? 'bg-primary-700 text-white shadow-md shadow-primary-900/30 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComp className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-primary-400'
                    }`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom: Logout / Switch Role */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/80">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold text-rose-300 hover:text-white bg-rose-500/10 hover:bg-rose-600 transition-all border border-rose-500/20"
          >
            <LogOut className="w-4 h-4" />
            <span>Ganti Akun / Keluar</span>
          </button>
          <div className="mt-3 text-center text-[10px] text-slate-400">
            Kewirausahaan Berbasis Teknologi • ITK
          </div>
        </div>
      </aside>
    </>
  );
}
