import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  BookOpen, 
  Briefcase, 
  Layers, 
  Users, 
  Settings, 
  LogOut, 
  Globe, 
  Bell, 
  Search, 
  Menu, 
  X, 
  ShieldCheck, 
  ChevronLeft, 
  ExternalLink,
  CheckCheck
} from 'lucide-react';
import { AdminTab, AdminUser, AdminNotification } from '../../types';
import { mockAdminNotifications } from '../../data/mockAdminData';

interface AdminLayoutProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  currentAdmin: AdminUser;
  onLogout: () => void;
  onReturnToPublic: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onSelectTab,
  currentAdmin,
  onLogout,
  onReturnToPublic,
  children
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState<AdminNotification[]>(mockAdminNotifications);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navItems = [
    { id: 'overview' as AdminTab, label: 'لوحة الإحصائيات', icon: LayoutDashboard, badge: null },
    { id: 'products' as AdminTab, label: 'إدارة المتجر والمنتجات', icon: ShoppingBag, badge: null },
    { id: 'blog' as AdminTab, label: 'إدارة المقالات والمحتوى', icon: BookOpen, badge: null },
    { id: 'careers' as AdminTab, label: 'الشواغر والمرشحين (ATS)', icon: Briefcase, badge: 'جديد' },
    { id: 'services' as AdminTab, label: 'الخدمات وطلبات الأسعار', icon: Layers, badge: null },
    { id: 'users' as AdminTab, label: 'المستخدمين والصلاحيات', icon: Users, badge: null },
    { id: 'settings' as AdminTab, label: 'إعدادات النظام والأمان', icon: Settings, badge: null },
  ];

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const getTabTitle = (tab: AdminTab) => {
    switch (tab) {
      case 'overview': return 'نظرة عامة وإحصائيات المنصة';
      case 'products': return 'إدارة عتاد ومنتجات المتجر';
      case 'blog': return 'إدارة مقالات المعرفة والمدونة';
      case 'careers': return 'بوابة التوظيف وإدارة المرشحين';
      case 'services': return 'كتالوج الحلول وعروض الأسعار';
      case 'users': return 'المستخدمين ومستويات الأمان';
      case 'settings': return 'إعدادات المنصة المركزية';
      default: return 'لوحة التحكم';
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex text-slate-900 font-sans antialiased" dir="rtl">
      
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`
        fixed top-0 bottom-0 right-0 z-50 w-72 bg-slate-900 text-white flex flex-col justify-between transition-transform duration-300 ease-in-out border-l border-slate-800
        ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        
        {/* Top Branding */}
        <div>
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-black font-['Alexandria'] text-lg">
                N
              </div>
              <div>
                <h1 className="font-extrabold text-base text-white tracking-wide font-['Alexandria']">
                  NEXUS <span className="text-amber-500 text-xs font-semibold">ADMIN</span>
                </h1>
                <span className="text-[11px] text-slate-400 font-medium">بوابة الإدارة الشاملة</span>
              </div>
            </div>

            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1 text-slate-400 hover:text-white lg:hidden rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-220px)]">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
              الوحدات الإدارية
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/25'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Profile & Return Link */}
        <div className="p-4 border-t border-slate-800 space-y-3 bg-slate-950/50">
          
          <button
            onClick={onReturnToPublic}
            className="w-full py-2.5 px-3 bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white text-xs font-bold rounded-xl transition-all flex items-center justify-between border border-slate-700"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-amber-400" />
              <span>العودة للموقع العام</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <div className="flex items-center justify-between p-2 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center gap-2.5">
              <img
                src={currentAdmin.avatar}
                alt={currentAdmin.name}
                className="w-8 h-8 rounded-full object-cover border border-amber-500/40"
                referrerPolicy="no-referrer"
              />
              <div className="text-right">
                <span className="text-xs font-bold text-white block leading-tight">{currentAdmin.name}</span>
                <span className="text-[10px] text-amber-400">{currentAdmin.roleLabel}</span>
              </div>
            </div>

            <button
              onClick={onLogout}
              title="تسجيل الخروج"
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>

      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:mr-72">
        
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-slate-600 hover:text-slate-900 lg:hidden rounded-xl bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <div className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                <span>لوحة التحكم</span>
                <ChevronLeft className="w-3 h-3" />
                <span className="text-amber-600 font-bold">{getTabTitle(currentTab)}</span>
              </div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 font-['Alexandria'] hidden sm:block">
                {getTabTitle(currentTab)}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Quick Return to Public Site Button */}
            <button
              onClick={onReturnToPublic}
              className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors hidden md:flex items-center gap-1.5 border border-slate-200"
            >
              <Globe className="w-3.5 h-3.5 text-amber-600" />
              <span>معاينة الموقع العام</span>
            </button>

            {/* Notifications Popover */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 relative transition-colors"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotificationsOpen && (
                <div className="absolute left-0 mt-2 w-80 sm:w-96 bg-white rounded-3xl border border-slate-200 shadow-2xl p-4 z-50 animate-in fade-in space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <Bell className="w-4 h-4 text-amber-600" />
                      <h4 className="text-xs font-bold text-slate-900 font-['Alexandria']">التنبيهات الإدارية</h4>
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllRead}
                        className="text-[11px] text-amber-600 hover:underline font-bold flex items-center gap-1"
                      >
                        <CheckCheck className="w-3.5 h-3.5" />
                        <span>تعيين الكل كمقروء</span>
                      </button>
                    )}
                  </div>

                  <div className="space-y-2 max-h-72 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-3 rounded-2xl text-xs space-y-1 transition-colors border ${
                          n.read ? 'bg-slate-50 border-slate-100 text-slate-600' : 'bg-amber-50/70 border-amber-200 text-slate-900'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-slate-400 font-normal">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-500">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Admin Avatar badge */}
            <div className="flex items-center gap-2 pl-2 border-r border-slate-200 mr-1">
              <img
                src={currentAdmin.avatar}
                alt={currentAdmin.name}
                className="w-8 h-8 rounded-full object-cover border border-amber-500"
                referrerPolicy="no-referrer"
              />
              <div className="text-right hidden sm:block">
                <span className="text-xs font-bold text-slate-900 block leading-tight">{currentAdmin.name}</span>
                <span className="text-[10px] text-slate-400 font-semibold">{currentAdmin.roleLabel}</span>
              </div>
            </div>

          </div>

        </header>

        {/* Main Content View */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>

        {/* Admin Footer */}
        <footer className="py-4 px-8 border-t border-slate-200 text-center text-xs text-slate-400 bg-white flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>منصة Nexus الرقمية &copy; {new Date().getFullYear()} - بيئة الإدارة الآمنة</span>
          <span className="text-[11px] text-slate-500 font-medium">الإصدار 2.4.0 (Enterprise Architecture)</span>
        </footer>

      </div>

    </div>
  );
};
