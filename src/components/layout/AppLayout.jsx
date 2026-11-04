import React, { useState } from 'react';
import AppSidebar from './AppSidebar';
import AppTopBar from './AppTopBar';

export default function AppLayout({
  currentUser,
  activeMenu,
  setActiveMenu,
  onLogout,
  children,
  pendingOrdersCount = 0,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mapping title based on active menu
  const menuTitles = {
    directory: 'Cari Pengelola & Lokasi Bank Sampah',
    'waste-catalog': 'Jenis Sampah & Standar Harga Balikpapan',
    pickup: 'Pengajuan Penjemputan Sampah dari Rumah',
    tracking: 'Pelacakan Status & Tiket Penjemputan',
    history: currentUser?.role === 'manager'
      ? 'Riwayat Transaksi & Pembukuan Kas Digital'
      : 'Riwayat Penjemputan & Penghasilan Sampah Saya',
    dashboard: 'Ringkasan & Metrik Operasional Bank Sampah',
    orders: 'Manajemen Permintaan & Timbangan Digital',
    pricing: 'Pengaturan Tarif & Jenis Sampah Diterima',
    profile: 'Informasi Profil Bank Sampah Mitra',
    about: 'Tentang Inovasi Econnect & Tim ITK',
  };

  const currentTitle = menuTitles[activeMenu] || 'Econnect Platform';

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar on the Left */}
      <AppSidebar
        currentUser={currentUser}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        onLogout={onLogout}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        pendingOrdersCount={pendingOrdersCount}
      />

      {/* Main Content Area on the Right (offset by sidebar width on desktop) */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        <AppTopBar
          currentUser={currentUser}
          activeMenuTitle={currentTitle}
          onOpenSidebar={() => setSidebarOpen(true)}
          pendingOrdersCount={pendingOrdersCount}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
