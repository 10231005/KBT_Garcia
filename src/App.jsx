import React, { useState, useEffect } from 'react';
import LoginPage from './components/auth/LoginPage';
import AppLayout from './components/layout/AppLayout';

// Citizen Views
import CitizenDirectoryView from './components/citizen/CitizenDirectoryView';
import WastePriceCatalogView from './components/citizen/WastePriceCatalogView';
import CitizenPickupView from './components/citizen/CitizenPickupView';
import CitizenTrackingView from './components/citizen/CitizenTrackingView';
import CitizenHistoryView from './components/citizen/CitizenHistoryView';

// Manager Views
import ManagerDashboardView from './components/manager/ManagerDashboardView';
import ManagerOrdersView from './components/manager/ManagerOrdersView';
import ManagerHistoryView from './components/manager/ManagerHistoryView';
import ManagerPricingView from './components/manager/ManagerPricingView';
import ManagerProfileView from './components/manager/ManagerProfileView';

// Shared View
import AboutProjectView from './components/about/AboutProjectView';

import { INITIAL_PARTNERS, INITIAL_ORDERS } from './data/initialData';

export default function App() {
  // Current User State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('econnect_currentUser');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Partners state
  const [partners, setPartners] = useState(() => {
    try {
      const saved = localStorage.getItem('econnect_partners');
      return saved ? JSON.parse(saved) : INITIAL_PARTNERS;
    } catch {
      return INITIAL_PARTNERS;
    }
  });

  // Orders state
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('econnect_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Active Menu
  const [activeMenu, setActiveMenu] = useState(() => {
    return currentUser?.role === 'manager' ? 'dashboard' : 'directory';
  });

  // Pre-filled pickup data
  const [prefilledPickupData, setPrefilledPickupData] = useState(null);

  // Tracking target order ID
  const [trackingOrderId, setTrackingOrderId] = useState('');

  // Persist Current User
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('econnect_currentUser', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('econnect_currentUser');
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  // Persist Partners
  useEffect(() => {
    try {
      localStorage.setItem('econnect_partners', JSON.stringify(partners));
    } catch (e) {
      console.error(e);
    }
  }, [partners]);

  // Persist Orders
  useEffect(() => {
    try {
      localStorage.setItem('econnect_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Login Action
  const handleLogin = (userData) => {
    setCurrentUser(userData);
    if (userData.role === 'manager') {
      setActiveMenu('dashboard');
    } else {
      setActiveMenu('directory');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Logout Action
  const handleLogout = () => {
    setCurrentUser(null);
    setPrefilledPickupData(null);
  };

  // Citizen selects partner from directory
  const handleSelectPartnerForPickup = (partner, wasteType = '', weight = 10) => {
    setPrefilledPickupData({
      partner,
      wasteType,
      weight,
    });
    setActiveMenu('pickup');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Citizen submits new pickup order
  const handleSubmitOrder = (newOrder) => {
    setOrders(prev => [newOrder, ...prev]);
  };

  // Citizen navigates to tracking
  const handleGoToTracking = (orderId) => {
    setTrackingOrderId(orderId);
    setActiveMenu('tracking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Manager updates order status
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return { ...o, status: newStatus };
      }
      return o;
    }));
  };

  // Manager completes order with actual scale weight
  const handleCompleteOrder = (orderId, actualWeight, finalAmount) => {
    const completedAt = new Date().toISOString().replace('T', ' ').substring(0, 16);
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: 'Selesai',
          actualWeight,
          finalAmount,
          completedAt,
        };
      }
      return o;
    }));
  };

  // Manager updates partner waste prices
  const handleUpdatePartnerWastePrices = (partnerId, updatedWasteList) => {
    setPartners(prev => prev.map(p => {
      if (p.id === partnerId) {
        return { ...p, acceptedWaste: updatedWasteList };
      }
      return p;
    }));
  };

  // If not logged in, show Login Page
  if (!currentUser) {
    return (
      <LoginPage
        onLogin={handleLogin}
        partners={partners}
      />
    );
  }

  // Get current partner data for manager
  const currentPartner = partners.find(p => p.id === currentUser.partnerId) || partners[0];
  const pendingOrdersCount = orders.filter(o => o.partnerId === currentPartner?.id && o.status === 'Menunggu Konfirmasi').length;

  return (
    <AppLayout
      currentUser={currentUser}
      activeMenu={activeMenu}
      setActiveMenu={setActiveMenu}
      onLogout={handleLogout}
      pendingOrdersCount={pendingOrdersCount}
    >
      {/* CITIZEN VIEWS */}
      {currentUser.role === 'citizen' && (
        <>
          {activeMenu === 'directory' && (
            <CitizenDirectoryView
              partners={partners}
              onSelectPartnerForPickup={handleSelectPartnerForPickup}
            />
          )}

          {activeMenu === 'waste-catalog' && (
            <WastePriceCatalogView
              onGoToDirectory={() => setActiveMenu('directory')}
            />
          )}

          {activeMenu === 'pickup' && (
            <CitizenPickupView
              partners={partners}
              prefilledData={prefilledPickupData}
              currentUser={currentUser}
              onSubmitOrder={handleSubmitOrder}
              onGoToTracking={handleGoToTracking}
            />
          )}

          {activeMenu === 'tracking' && (
            <CitizenTrackingView
              orders={orders}
              initialOrderId={trackingOrderId}
            />
          )}

          {activeMenu === 'history' && (
            <CitizenHistoryView
              orders={orders}
              currentUser={currentUser}
              onGoToTracking={handleGoToTracking}
              onGoToPickup={() => setActiveMenu('pickup')}
            />
          )}

          {activeMenu === 'about' && (
            <AboutProjectView />
          )}
        </>
      )}

      {/* MANAGER VIEWS */}
      {currentUser.role === 'manager' && (
        <>
          {activeMenu === 'dashboard' && (
            <ManagerDashboardView
              currentPartner={currentPartner}
              orders={orders}
              onNavigateToOrders={() => setActiveMenu('orders')}
              onUpdateOrderStatus={handleUpdateOrderStatus}
              onOpenScaleModal={(order) => setActiveMenu('orders')}
            />
          )}

          {activeMenu === 'orders' && (
            <ManagerOrdersView
              currentPartner={currentPartner}
              orders={orders}
              onUpdateOrderStatus={handleUpdateOrderStatus}
              onCompleteOrder={handleCompleteOrder}
            />
          )}

          {activeMenu === 'history' && (
            <ManagerHistoryView
              currentPartner={currentPartner}
              orders={orders}
            />
          )}

          {activeMenu === 'pricing' && (
            <ManagerPricingView
              currentPartner={currentPartner}
              onUpdatePartnerWastePrices={handleUpdatePartnerWastePrices}
            />
          )}

          {activeMenu === 'profile' && (
            <ManagerProfileView
              currentPartner={currentPartner}
            />
          )}

          {activeMenu === 'about' && (
            <AboutProjectView />
          )}
        </>
      )}
    </AppLayout>
  );
}
