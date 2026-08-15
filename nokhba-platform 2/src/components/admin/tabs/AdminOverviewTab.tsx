import React from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  BookOpen, 
  Briefcase, 
  Layers, 
  Users, 
  DollarSign, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  FileText, 
  Activity,
  ArrowLeft
} from 'lucide-react';
import { Product, BlogPost, JobListing, ServiceItem, AdminActivityLog, AdminTab } from '../../../types';
import { mockActivityLogs } from '../../../data/mockAdminData';

interface AdminOverviewTabProps {
  products: Product[];
  blogPosts: BlogPost[];
  jobs: JobListing[];
  services: ServiceItem[];
  onNavigateTab: (tab: AdminTab) => void;
  onOpenAddProductModal: () => void;
  onOpenAddBlogModal: () => void;
  onOpenAddJobModal: () => void;
}

export const AdminOverviewTab: React.FC<AdminOverviewTabProps> = ({
  products,
  blogPosts,
  jobs,
  services,
  onNavigateTab,
  onOpenAddProductModal,
  onOpenAddBlogModal,
  onOpenAddJobModal
}) => {
  // Estimated simulated revenue from products
  const estimatedRevenue = products.reduce((acc, p) => acc + p.price * 8, 48250);
  const inStockCount = products.filter((p) => p.inStock).length;
  const outOfStockCount = products.length - inStockCount;

  // Monthly sales simulation bars
  const monthlyStats = [
    { month: 'يناير', sales: 65, revenue: 14200 },
    { month: 'فبراير', sales: 78, revenue: 19400 },
    { month: 'مارس', sales: 90, revenue: 24800 },
    { month: 'أبريل', sales: 82, revenue: 22100 },
    { month: 'مايو', sales: 110, revenue: 31500 },
    { month: 'يونيو', sales: 135, revenue: 38900 },
    { month: 'يوليو', sales: 155, revenue: 44200 },
    { month: 'أغسطس', sales: 172, revenue: 48250 },
  ];

  const maxRevenue = Math.max(...monthlyStats.map((m) => m.revenue));

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner & Quick Actions */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/30">
            <Activity className="w-3.5 h-3.5" />
            <span>لوحة المراقبة والإدارة المركزية</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-['Alexandria']">
            أهلاً بك في غرفة عمليات منصة Nexus
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            تحكم كامل في كافة العمليات: إدارة المتجر، نشر وتحديث المقالات، متابعة المرشحين للوظائف، ومعالجة طلبات الخدمات الاستشارية.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 relative z-10 w-full lg:w-auto">
          <button
            onClick={onOpenAddProductModal}
            className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-md shadow-amber-600/20 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة منتج</span>
          </button>
          <button
            onClick={onOpenAddBlogModal}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white font-bold text-xs rounded-xl border border-slate-700 transition-all flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4 text-purple-400" />
            <span>نشر مقال</span>
          </button>
          <button
            onClick={onOpenAddJobModal}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white font-bold text-xs rounded-xl border border-slate-700 transition-all flex items-center gap-1.5"
          >
            <Briefcase className="w-4 h-4 text-emerald-400" />
            <span>طرح وظيفة</span>
          </button>
        </div>
      </div>

      {/* 5 Core Stat Cards (Bento style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
        
        {/* Stat 1: Revenue */}
        <div 
          onClick={() => onNavigateTab('products')}
          className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:border-amber-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5 border border-emerald-200">
              <ArrowUpRight className="w-3 h-3" /> +18.4%
            </span>
          </div>
          <span className="text-xs font-medium text-slate-500">إجمالي المبيعات التقديرية</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 font-['Alexandria'] mt-1">
            {estimatedRevenue.toLocaleString()} <span className="text-xs font-bold text-amber-600">ر.س</span>
          </div>
        </div>

        {/* Stat 2: Products Count */}
        <div 
          onClick={() => onNavigateTab('products')}
          className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:border-amber-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-700 border border-blue-200 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
              {inStockCount} متوفر
            </span>
          </div>
          <span className="text-xs font-medium text-slate-500">المنتجات في المتجر</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 font-['Alexandria'] mt-1">
            {products.length} <span className="text-xs font-semibold text-slate-500">منتج</span>
          </div>
        </div>

        {/* Stat 3: Blog Posts */}
        <div 
          onClick={() => onNavigateTab('blog')}
          className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:border-purple-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-2xl bg-purple-50 text-purple-700 border border-purple-200 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
              محتوى نشط
            </span>
          </div>
          <span className="text-xs font-medium text-slate-500">المقالات المنشورة</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 font-['Alexandria'] mt-1">
            {blogPosts.length} <span className="text-xs font-semibold text-slate-500">مقال</span>
          </div>
        </div>

        {/* Stat 4: Careers */}
        <div 
          onClick={() => onNavigateTab('careers')}
          className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              توظيف مباشر
            </span>
          </div>
          <span className="text-xs font-medium text-slate-500">فرص العمل الشاغرة</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 font-['Alexandria'] mt-1">
            {jobs.length} <span className="text-xs font-semibold text-slate-500">شواغر</span>
          </div>
        </div>

        {/* Stat 5: Services */}
        <div 
          onClick={() => onNavigateTab('services')}
          className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:border-amber-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Layers className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              حلول جاهزة
            </span>
          </div>
          <span className="text-xs font-medium text-slate-500">الخدمات الاستشارية</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 font-['Alexandria'] mt-1">
            {services.length} <span className="text-xs font-semibold text-slate-500">خدمات</span>
          </div>
        </div>

      </div>

      {/* Main Grid: Visual Analytics Chart + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (Chart): Revenue & Transactions Trend (col-span-8) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-600" />
                <h3 className="text-base font-bold text-slate-900 font-['Alexandria']">
                  مؤشر الإيرادات وحركة المتجر لعام 2026
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                توزيع المبيعات التراكمية الشهرية والنمو في طلبات العتاد البرمجي
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
                معدل التحويل: 4.8%
              </span>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                متوسط السلة: 3,420 ر.س
              </span>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="pt-6">
            <div className="h-56 flex items-end gap-3 sm:gap-4 justify-between border-b border-slate-100 pb-2">
              {monthlyStats.map((item, idx) => {
                const heightPercent = Math.round((item.revenue / maxRevenue) * 100);
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 bg-slate-900 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-xl shadow-lg pointer-events-none whitespace-nowrap z-20">
                      <span>{item.revenue.toLocaleString()} ر.س ({item.sales} طلب)</span>
                    </div>

                    <div className="w-full bg-slate-100 rounded-xl h-full flex items-end p-1">
                      <div 
                        style={{ height: `${heightPercent}%` }}
                        className="w-full bg-amber-500 group-hover:bg-amber-600 rounded-lg transition-all duration-500 shadow-sm"
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 group-hover:text-slate-900 transition-colors">
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-3">
              <span>* البيانات محدثة ومزامنة مع مستودعات Nexus المركزية</span>
              <span className="text-emerald-600 font-semibold font-['Alexandria']">نمو مستمر +24% على أساس فصلي</span>
            </div>
          </div>

          {/* Mini Health Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>حالة الخوادم و API</span>
              </div>
              <span className="text-xs text-slate-500">جاهزية بنسبة 99.98%</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-1">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>متوسط معالجة الطلبات</span>
              </div>
              <span className="text-xs text-slate-500">أقل من 3.2 دقيقة</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-1">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>المزامنة التلقائية</span>
              </div>
              <span className="text-xs text-slate-500">مكتملة ومؤمنة SSL</span>
            </div>
          </div>
        </div>

        {/* Right Column (Activity Log): System Activity & Quick Nav (col-span-4) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Recent Operations */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" />
                <h3 className="text-sm font-bold text-slate-900 font-['Alexandria']">سجل العمليات الأخير</h3>
              </div>
              <span className="text-[11px] text-slate-400 font-semibold">مباشر</span>
            </div>

            <div className="space-y-3">
              {mockActivityLogs.map((log) => (
                <div key={log.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">{log.adminName}</span>
                    <span className="text-[10px] text-slate-400">{log.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    <strong className="text-amber-700">{log.action}:</strong> {log.target}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigateTab('settings')}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors text-center"
            >
              عرض كامل سجلات الأمان
            </button>
          </div>

          {/* Quick Shortcuts Bento */}
          <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-3xl p-6 border border-amber-200 space-y-3">
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
              إجراءات إدارية سريعة
            </h4>
            <div className="space-y-2">
              <button
                onClick={() => onNavigateTab('products')}
                className="w-full p-2.5 bg-white rounded-xl border border-amber-200 text-xs font-bold text-slate-800 hover:text-amber-700 flex items-center justify-between transition-colors shadow-xs"
              >
                <span>فحص المنتجات التي نفدت من المخزون ({outOfStockCount})</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onNavigateTab('careers')}
                className="w-full p-2.5 bg-white rounded-xl border border-amber-200 text-xs font-bold text-slate-800 hover:text-emerald-700 flex items-center justify-between transition-colors shadow-xs"
              >
                <span>مراجعة طلبات التوظيف الجديدة</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onNavigateTab('services')}
                className="w-full p-2.5 bg-white rounded-xl border border-amber-200 text-xs font-bold text-slate-800 hover:text-blue-700 flex items-center justify-between transition-colors shadow-xs"
              >
                <span>عروض الأسعار والاستشارات المعلقة</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
