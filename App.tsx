import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard'; // Analytics
import CompanyOverview from './components/CompanyOverview'; // Home
import ProductCatalog from './components/ProductCatalog';
import OrderManagement from './components/OrderManagement';
import Cart from './components/Cart';
import Login from './components/Login';
import { ProbabilityModule, ArchitectureModule, OopModule, DaaModule } from './components/SubjectModules';
import { DetailedProbability, DetailedCAO, DetailedDAA, DetailedOOP } from './components/DetailedAnalysis';
import { Product, CartItem, Order, OrderStatus } from './types';
import { MOCK_ORDERS } from './constants';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const total = subtotal + (subtotal * 0.18); 

    const newOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      items: [...cart],
      total: total,
      status: OrderStatus.PENDING,
      customerName: 'Vasus Brakes Admin',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setActiveView('orders');
  };

  const handleCancelOrder = (orderId: string) => {
    setOrders((prevOrders) => 
      prevOrders.map((order) => 
        order.id === orderId 
          ? { ...order, status: OrderStatus.CANCELLED } 
          : order
      )
    );
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <CompanyOverview onNavigateToCatalog={() => setActiveView('catalog')} />;
      case 'catalog':
        return <ProductCatalog addToCart={addToCart} />;
      case 'orders':
        return <OrderManagement orders={orders} onCancelOrder={handleCancelOrder} />;
      case 'analytics':
        return <Dashboard />;
      case 'cart':
        return <Cart items={cart} onRemove={removeFromCart} onPlaceOrder={handlePlaceOrder} />;
      
      // Subject Pages
      case 'probability':
        return <ProbabilityModule />;
      case 'oop':
        return <OopModule />;
      case 'coa':
        return <ArchitectureModule />;
      case 'daa':
        return <DaaModule />;

      // Detailed Analysis Pages
      case 'detailed_probability':
        return <DetailedProbability />;
      case 'detailed_oop':
        return <DetailedOOP />;
      case 'detailed_coa':
        return <DetailedCAO />;
      case 'detailed_daa':
        return <DetailedDAA />;
        
      default:
        return <CompanyOverview onNavigateToCatalog={() => setActiveView('catalog')} />;
    }
  };

  return (
    <Layout 
      activeView={activeView} 
      setActiveView={setActiveView} 
      cartItemCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;