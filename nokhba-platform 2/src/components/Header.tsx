import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Briefcase, 
  BookOpen, 
  Layers, 
  Store, 
  Menu, 
  X, 
  Sparkles,
  PhoneCall,
  ArrowLeft,
  Headphones,
  ShieldCheck
} from 'lucide-react';
import { NavSection } from '../types';

interface HeaderProps {
  activeSection: NavSection;
  onNavigate: (section: NavSection) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenServiceRequest: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenServiceRequest
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavSection; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string }[] = [
    { id: 'ecommerce', label: 'المتجر الإلكتروني', icon: Store, badge: 'خصم 20%' },
    { id: 'services', label: 'الخدمات والحلول', icon: Layers, badge: 'مخصص' },
    { id: 'careers', label: 'بوابة الوظائف', icon: Briefcase, badge: 'توظيف نشط' },
    { id: 'blog', label: 'المدونة والمعرفة', icon: BookOpen },
  ];

  const handleNavClick = (section: NavSection) => {
    onNavigate(section);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900 text-white border-b border-amber-500/30 shadow-md">
      {/* Top micro bar */}
      <div className="bg-slate-950 border-b border-slate-800/60 py-1.5 px-4 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>مرحباً بك في منصة Nexus الرقمية المتكاملة</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>ضمان جودة وأمان 100%</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-xs">
            <span className="hidden sm:flex items-center gap-1">
              <Headphones className="w-3.5 h-3.5 text-amber-400" />
              <span>الدعم الفني: 800-NEXUS</span>
            </span>
            <span className="text-slate-700">|</span>
            <span className="text-amber-400 font-bold">كود الخصم: NEXUS20</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Brand Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-right group focus:outline-none"
          >
            <div className="text-2xl sm:text-3xl font-black tracking-tighter text-amber-500 font-['Alexandria'] flex items-center gap-1">
              <span>NEXUS</span>
              <span className="text-white text-lg sm:text-xl font-normal">PLATFORM</span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                activeSection === 'home'
                  ? 'bg-amber-600 text-white font-bold shadow-sm'
                  : 'text-slate-300 hover:text-amber-400'
              }`}
            >
              الرئيسية
            </button>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-amber-600 text-white font-bold shadow-sm'
                      : 'text-slate-300 hover:text-amber-400'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && !isActive && (
                    <span className="text-[10px] px-2 py-0.2 rounded-full bg-slate-800 text-amber-400 border border-amber-500/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Global Search Pill Button */}
            <button
              id="global-search-trigger"
              onClick={onOpenSearch}
              className="relative flex items-center gap-2 bg-slate-800/90 hover:bg-slate-750 border border-slate-700 text-slate-300 hover:text-white rounded-full py-1.5 px-4 sm:px-6 text-xs transition-all"
              aria-label="البحث في المنصة"
            >
              <Search className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">بحث في المنصة...</span>
              <kbd className="hidden md:inline-block text-[10px] bg-slate-900 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700 mr-1">
                ⌘K
              </kbd>
            </button>

            {/* Shopping Cart Trigger */}
            <button
              id="cart-drawer-trigger"
              onClick={onOpenCart}
              className="relative p-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full text-slate-200 hover:text-white transition-all focus:outline-none"
              aria-label="عربة التسوق"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-slate-950 text-[10px] font-black rounded-full flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin Dashboard Button */}
            <button
              id="admin-dashboard-btn"
              onClick={() => handleNavClick('admin')}
              className={`hidden md:flex items-center gap-1.5 py-1.5 px-3.5 rounded-full text-xs font-bold transition-all border ${
                activeSection === 'admin'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                  : 'bg-slate-800/80 hover:bg-slate-750 text-amber-400 border-amber-500/30'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>لوحة الإدارة</span>
            </button>

            {/* Request Service Pill CTA */}
            <button
              id="header-cta-service"
              onClick={onOpenServiceRequest}
              className="hidden sm:flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold py-2 px-5 rounded-full transition-all shadow-md shadow-amber-600/20"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>طلب خدمة</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full text-slate-200 hover:text-white focus:outline-none"
              aria-label="القائمة الجانبية"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 pt-4 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`flex items-center justify-between w-full px-4 py-3 rounded-2xl text-sm font-bold text-right transition-colors ${
                activeSection === 'home'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-900 text-slate-200 hover:bg-slate-850'
              }`}
            >
              <span>الصفحة الرئيسية</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-2xl text-sm font-bold text-right transition-colors ${
                    isActive
                      ? 'bg-amber-600 text-white font-black'
                      : 'bg-slate-900 text-slate-200 hover:bg-slate-850'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-amber-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950 text-amber-400 border border-amber-500/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2 space-y-2">
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-850 text-amber-400 border border-amber-500/30 font-bold rounded-2xl flex items-center justify-center gap-2 text-sm"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>دخول لوحة تحكم المشرفين (Admin)</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenServiceRequest();
              }}
              className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-amber-600/20 text-sm"
            >
              <PhoneCall className="w-4 h-4" />
              <span>طلب خدمة مخصصة أو استشارة</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

