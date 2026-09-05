import React from 'react';
import { 
  ShoppingBag, 
  BookOpen, 
  Briefcase, 
  ArrowLeft, 
  Sparkles
} from 'lucide-react';
import { NavSection } from '../types';

interface HeroSectionProps {
  onNavigate: (section: NavSection) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-2">
      {/* Bento Grid 12-Column Layout */}
      <div className="grid grid-cols-12 gap-4 sm:gap-6">
        
        {/* Bento Tile 1: Hero Welcome (full width) */}
        <div className="col-span-12 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-between group">
          {/* Amber Ambient Glow */}
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-amber-100/70 rounded-full blur-3xl opacity-60 pointer-events-none" />
          
          <div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold w-fit mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>مرحباً بكم في منصة النخبة</span>
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 leading-tight font-['Alexandria']">
              متجر <span className="text-amber-600">النخبة</span> ومحتواك المفيد
            </h1>

            <p className="text-slate-500 text-sm sm:text-base max-w-xl leading-relaxed mb-6">
              منصة تجمع منتجات موثوقة للعناية والصحة، مقالات معرفية مفيدة، وفرص عمل حقيقية نطرحها بانتظام.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                id="hero-explore-store-btn"
                onClick={() => onNavigate('ecommerce')}
                className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full text-xs sm:text-sm font-bold shadow-md shadow-amber-600/20 transition-all flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>تصفح المتجر</span>
              </button>

              <button
                id="hero-careers-btn"
                onClick={() => onNavigate('careers')}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full text-xs sm:text-sm font-bold border border-slate-200 transition-all flex items-center gap-2"
              >
                <Briefcase className="w-4 h-4 text-amber-600" />
                <span>استعرض الوظائف الشاغرة</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bento Tile 2: E-Commerce Store */}
        <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700 border border-amber-200">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full text-xs font-bold border border-slate-200">
                المتجر
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-1">منتجات العناية والصحة</h3>
            <p className="text-slate-500 text-xs mb-4">تشكيلة من المنتجات الموثوقة بجودة عالية.</p>
          </div>

          <button
            id="bento-store-cta"
            onClick={() => onNavigate('ecommerce')}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
          >
            <span>زيارة المتجر الإلكتروني</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bento Tile 3: Blog & Articles */}
        <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="p-2.5 rounded-xl bg-purple-100 text-purple-700 border border-purple-200">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full text-xs font-bold border border-slate-200">
                المدونة
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-1">المدونة والمعرفة</h3>
            <p className="text-slate-500 text-xs mb-4">أحدث المقالات المفيدة والنصائح.</p>
          </div>

          <button
            id="bento-blog-cta"
            onClick={() => onNavigate('blog')}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <span>استعراض كافة المقالات</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bento Tile 4: Careers Spotlight */}
        <div className="col-span-12 lg:col-span-4 bg-amber-500 rounded-3xl p-6 text-slate-900 shadow-sm border border-amber-400 relative overflow-hidden flex flex-col justify-between">
          {/* Watermark Background */}
          <div className="absolute -bottom-6 -left-6 text-7xl font-black text-amber-600/20 select-none pointer-events-none font-['Alexandria']">
            JOBS
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="p-2.5 rounded-xl bg-white/40 backdrop-blur-sm text-slate-950">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="bg-slate-950 text-white px-2.5 py-0.5 rounded-full text-xs font-bold">
                فرص عمل نشطة
              </span>
            </div>

            <h3 className="text-xl font-black mb-1 font-['Alexandria']">انضم إلينا</h3>
            <p className="text-slate-900/80 text-xs font-medium mb-4 leading-relaxed">
              تصفّحي أحدث الشواغر المتاحة حالياً وقدّمي طلبك مباشرة.
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-white/50 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-slate-950">
                دوام كامل
              </span>
              <span className="bg-white/50 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-slate-950">
                دوام جزئي
              </span>
              <span className="bg-white/50 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-slate-950">
                عمل عن بعد
              </span>
            </div>
          </div>

          <button
            id="bento-careers-cta"
            onClick={() => onNavigate('careers')}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-850 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-md"
          >
            <span>استعرض الشواغر وقدم طلبك</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
