
import React, { useState } from 'react';
import { LayoutDashboard, ShoppingBag, Package, TrendingUp, LogOut, Menu, X, BookOpen, ChevronDown, ChevronRight, Binary, Calculator, Cpu, Network, PieChart } from 'lucide-react';
import ChatBot from './ChatBot';

interface LayoutProps {
  children: React.ReactNode;
  activeView: string;
  setActiveView: (view: string) => void;
  cartItemCount: number;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, setActiveView, cartItemCount }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const [isDetailedOpen, setIsDetailedOpen] = useState(false);

  const mainNavItems = [
    { id: 'dashboard', label: 'Company Overview', icon: LayoutDashboard },
    { id: 'catalog', label: 'Product Catalog', icon: ShoppingBag },
    { id: 'orders', label: 'Order History', icon: Package },
    { id: 'analytics', label: 'Forecasting', icon: TrendingUp },
  ];

  const subjectItems = [
    { id: 'probability', label: 'Probability & Random Process', icon: Calculator },
    { id: 'oop', label: 'Object Oriented Prog.', icon: Binary },
    { id: 'coa', label: 'Computer Architecture & Org.', icon: Cpu },
    { id: 'daa', label: 'Design Analysis of Algorithms', icon: Network },
  ];

  const detailedItems = [
    { id: 'detailed_probability', label: 'Probability Analysis', icon: Calculator },
    { id: 'detailed_oop', label: 'OOP Architecture', icon: Binary },
    { id: 'detailed_coa', label: 'CAO Performance', icon: Cpu },
    { id: 'detailed_daa', label: 'Algorithm Efficiency', icon: Network },
  ];

  const handleNavClick = (id: string) => {
    setActiveView(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-72 bg-white border-r border-slate-200">
        <div className="p-6 border-b border-slate-100">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">SYNAPSE</h1>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">Vasus Brakes India</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {mainNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors mb-1 ${
                activeView === item.id
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          ))}

          {/* Subject Integration */}
          <div className="pt-4 mt-4 border-t border-slate-100">
            <button
              onClick={() => setIsSubjectOpen(!isSubjectOpen)}
              className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 mr-3" />
                <span>Subject Integration</span>
              </div>
              {isSubjectOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>

            {isSubjectOpen && (
              <div className="ml-4 mt-1 space-y-1 border-l-2 border-slate-100 pl-2">
                {subjectItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center w-full px-4 py-2 text-sm rounded-lg transition-colors ${
                      activeView === item.id
                        ? 'bg-slate-100 text-slate-900 font-semibold'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <item.icon className="w-4 h-4 mr-3 opacity-70" />
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Detailed Analysis */}
          <div className="pt-2 mt-2">
            <button
              onClick={() => setIsDetailedOpen(!isDetailedOpen)}
              className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <div className="flex items-center">
                <PieChart className="w-5 h-5 mr-3" />
                <span>Detailed Analysis</span>
              </div>
              {isDetailedOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>

            {isDetailedOpen && (
              <div className="ml-4 mt-1 space-y-1 border-l-2 border-slate-100 pl-2">
                {detailedItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center w-full px-4 py-2 text-sm rounded-lg transition-colors ${
                      activeView === item.id
                        ? 'bg-slate-100 text-slate-900 font-semibold'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <item.icon className="w-4 h-4 mr-3 opacity-70" />
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
             onClick={() => window.location.reload()}
             className="flex items-center w-full px-4 py-2 text-sm font-medium text-slate-500 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 p-4 flex justify-between items-center shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">SYNAPSE</h1>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white pt-20 px-6 overflow-y-auto">
          <nav className="space-y-2">
            {mainNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center w-full p-4 text-lg font-medium rounded-xl ${
                  activeView === item.id ? 'bg-slate-900 text-white' : 'text-slate-600 bg-slate-50'
                }`}
              >
                <item.icon className="w-6 h-6 mr-4" />
                {item.label}
              </button>
            ))}
            
            <div className="pt-4 pb-2 text-sm font-semibold text-slate-400 uppercase tracking-wider">Subject Integration</div>
            {subjectItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center w-full p-4 text-lg font-medium rounded-xl ${
                  activeView === item.id ? 'bg-slate-100 text-slate-900' : 'text-slate-600'
                }`}
              >
                <item.icon className="w-5 h-5 mr-4" />
                {item.label}
              </button>
            ))}

            <div className="pt-4 pb-2 text-sm font-semibold text-slate-400 uppercase tracking-wider">Detailed Analysis</div>
            {detailedItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center w-full p-4 text-lg font-medium rounded-xl ${
                  activeView === item.id ? 'bg-slate-100 text-slate-900' : 'text-slate-600'
                }`}
              >
                <item.icon className="w-5 h-5 mr-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto md:p-8 p-4 pt-24 md:pt-8 relative scroll-smooth">
        {/* Sticky Cart Action */}
        <div className="sticky top-0 z-10 flex justify-end mb-6 pointer-events-none gap-4">
          <div className="pointer-events-auto flex items-center gap-3">
             <ChatBot />
             <button 
                onClick={() => setActiveView('cart')}
                className="relative bg-slate-900 text-white p-3 rounded-full shadow-xl hover:bg-slate-800 transition-transform active:scale-95 border border-slate-700"
             >
               <ShoppingBag className="w-6 h-6" />
               {cartItemCount > 0 && (
                 <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-slate-900">
                   {cartItemCount}
                 </span>
               )}
             </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pb-20">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
