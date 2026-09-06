import React from 'react';
import { 
  ShoppingBag, 
  BookOpen, 
  Briefcase, 
  TrendingUp, 
  ArrowLeft, 
  Sparkles, 
  Users,
  Globe2
} from 'lucide-react';
import { NavSection } from '../types';

interface PlatformStatsBentoProps {
  productsCount: number;
  blogPostsCount: number;
  jobsCount: number;
  onNavigate: (section: NavSection) => void;
}

export const PlatformStatsBento: React.FC<PlatformStatsBentoProps> = ({
  productsCount,
  blogPostsCount,
  jobsCount,
  onNavigate
}) => {
  return (
    <section id="platform-stats-bento-section" className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold w-fit mb-2 border border-amber-200">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>نبض المنصة المباشر</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Alexandria']">
            إحصائيات منظومة Nexus بالأرقام
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            بيانات حية تعكس حجم المحتوى والعتاد والحلول والفرص المتاحة عبر المنصة
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>تحديث فوري ومستمر للمنظومة</span>
        </div>
      </div>

      {/* Bento Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
        
        {/* Bento Card 1: Products Stat (col-span-12 md:col-span-4) */}
        <div 
          id="stat-card-products"
          onClick={() => onNavigate('ecommerce')}
          className="md:col-span-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:border-amber-500/50 hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold border border-amber-200">
                المتجر الإلكتروني
              </span>
            </div>

            <div className="space-y-1 mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-slate-900 font-['Alexandria'] tracking-tight">
                  {productsCount}
                </span>
                <span className="text-sm font-bold text-amber-600 font-['Alexandria']">منتج وعتاد تقني</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                أجهزة ذكاء اصطناعي، محطات عمل متقدمة، وملحقات موثوقة مع ضمان شامل.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium border border-slate-200">
                عتاد الذكاء الاصطناعي
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium border border-slate-200">
                محطات العمل
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium border border-slate-200">
                ملحقات المطورين
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-bold text-amber-700 group-hover:text-amber-800">
            <span>تصفح كافة المنتجات في المتجر</span>
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Bento Card 2: Blog Posts Stat (col-span-12 md:col-span-4) */}
        <div 
          id="stat-card-blog"
          onClick={() => onNavigate('blog')}
          className="md:col-span-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:border-purple-500/50 hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-2xl bg-purple-50 text-purple-700 border border-purple-200 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-800 text-[11px] font-bold border border-purple-200">
                المدونة والمعرفة
              </span>
            </div>

            <div className="space-y-1 mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-slate-900 font-['Alexandria'] tracking-tight">
                  {blogPostsCount}
                </span>
                <span className="text-sm font-bold text-purple-700 font-['Alexandria']">مقال وبحث تخصصي</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                تحليلات عميقة في هندسة البرمجيات، الذكاء الاصطناعي، وتأمين البنى التحتية.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium border border-slate-200">
                أبحاث الذكاء الاصطناعي
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium border border-slate-200">
                الأمن السيبراني
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium border border-slate-200">
                تصميم النظم
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-bold text-purple-700 group-hover:text-purple-800">
            <span>استعراض مقالات المدونة</span>
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Bento Card 3: Job Listings Stat (col-span-12 md:col-span-4) */}
        <div 
          id="stat-card-careers"
          onClick={() => onNavigate('careers')}
          className="md:col-span-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:border-emerald-500/50 hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Briefcase className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                بوابة التوظيف
              </span>
            </div>

            <div className="space-y-1 mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-slate-900 font-['Alexandria'] tracking-tight">
                  {jobsCount}
                </span>
                <span className="text-sm font-bold text-emerald-700 font-['Alexandria']">فرصة وظيفية نشطة</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                شواغر وظيفية هندسية واستشارية مع دعم العمل عن بُعد ومزايا تنافسية عالمياً.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium border border-slate-200">
                عمل عن بُعد
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium border border-slate-200">
                رواتب تنافسية
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium border border-slate-200">
                توظيف مباشر
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
            <span>استكشف الوظائف المتاحة وقدم</span>
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          </div>
        </div>

      </div>
    </section>
  );
};
