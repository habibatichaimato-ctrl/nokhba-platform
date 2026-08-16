import React from 'react';
import { 
  ShoppingBag, 
  BookOpen, 
  Briefcase, 
  Layers, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Zap,
  Code2,
  Bot,
  Laptop,
  CheckCircle2
} from 'lucide-react';
import { NavSection } from '../types';

interface HeroSectionProps {
  onNavigate: (section: NavSection) => void;
  onOpenServiceRequest: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onOpenServiceRequest }) => {
  return (
    <section className="py-2">
      {/* Bento Grid 12-Column Layout */}
      <div className="grid grid-cols-12 gap-4 sm:gap-6">
        
        {/* Bento Tile 1: Hero Welcome (col-span-12 lg:col-span-8) */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-between group">
          {/* Amber Ambient Glow */}
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-amber-100/70 rounded-full blur-3xl opacity-60 pointer-events-none" />
          
          <div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold w-fit mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>مرحباً بكم في بوابتكم المتكاملة للمستقبل</span>
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 leading-tight font-['Alexandria']">
              منظومة <span className="text-amber-600">Nexus</span> الرقمية المتكاملة
            </h1>

            <p className="text-slate-500 text-sm sm:text-base max-w-xl leading-relaxed mb-6">
              بوابة موحدة تجمع بين متجر تقني متطور، حلول برمجية وذكاء اصطناعي مخصصة، فرص وظيفية استثنائية، ومدونة معرفية تثري المجتمع التقني.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <button
                id="hero-explore-store-btn"
                onClick={() => onNavigate('ecommerce')}
                className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full text-xs sm:text-sm font-bold shadow-md shadow-amber-600/20 transition-all flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>تصفح المتجر</span>
              </button>

              <button
                id="hero-request-service-btn"
                onClick={onOpenServiceRequest}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full text-xs sm:text-sm font-bold border border-slate-200 transition-all flex items-center gap-2"
              >
                <Zap className="w-4 h-4 text-amber-600" />
                <span>طلب حل تقني مخصص</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar inside Hero Bento */}
          <div className="flex flex-wrap gap-2.5 pt-4 border-t border-slate-100 text-xs font-bold text-slate-600">
            <div className="flex items-center gap-1.5 bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200">
              <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
              <span>+500 مشروع تقني منجز</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200">
              <Users className="w-3.5 h-3.5 text-blue-600" />
              <span>25K+ مستخدم ومستفيد</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>99.8% نسبة الرضا</span>
            </div>
          </div>
        </div>

        {/* Bento Tile 2: Services Spotlight (col-span-12 lg:col-span-4) */}
        <div className="col-span-12 lg:col-span-4 bg-slate-900 rounded-3xl p-6 text-white border border-slate-800 shadow-xl flex flex-col justify-between group">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Layers className="w-5 h-5" />
              </div>
              <span className="bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-full text-xs font-bold">
                خدمات وحلول
              </span>
            </div>

            <h3 className="text-xl font-bold mb-2">حلول تقنية وهندسية مخصصة</h3>
            <p className="text-slate-400 text-xs sm:text-sm mb-4 leading-relaxed">
              بناء المنصات المؤسسية، أنظمة الذكاء الاصطناعي، وتأمين البنى السحابية.
            </p>

            <div className="space-y-2 mb-4">
              <div 
                onClick={() => onNavigate('services')}
                className="bg-slate-800/90 rounded-2xl p-3 hover:bg-amber-600/20 transition-all border border-slate-700 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                  <Bot className="w-4 h-4 text-amber-400" />
                  <span>حلول ونماذج الذكاء الاصطناعي</span>
                </div>
                <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
              </div>

              <div 
                onClick={() => onNavigate('services')}
                className="bg-slate-800/90 rounded-2xl p-3 hover:bg-amber-600/20 transition-all border border-slate-700 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                  <Code2 className="w-4 h-4 text-blue-400" />
                  <span>تطوير التطبيقات والمنصات السحابية</span>
                </div>
                <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('services')}
            className="text-amber-400 hover:text-amber-300 text-xs font-bold flex items-center gap-1.5 pt-2 border-t border-slate-800 transition-colors"
          >
            <span>استكشف كافة الخدمات والحلول</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bento Tile 3: E-Commerce Store (col-span-12 md:col-span-6 lg:col-span-4) */}
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

            <h3 className="text-lg font-bold text-slate-900 mb-1">أحدث عتاد المطورين والذكاء الاصطناعي</h3>
            <p className="text-slate-500 text-xs mb-4">محطات عمل فائقة وملحقات تقنية معتمدة مع ضمان شامل.</p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
                <span className="font-bold text-slate-800">محطة عمل Nexus AI Master</span>
                <span className="font-black text-amber-700 font-['Alexandria']">14,999 ر.س</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
                <span className="font-bold text-slate-800">شاشة Nexus UltraView 5K</span>
                <span className="font-black text-amber-700 font-['Alexandria']">4,599 ر.س</span>
              </div>
            </div>
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

        {/* Bento Tile 4: Blog & Articles (col-span-12 md:col-span-6 lg:col-span-4) */}
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

            <h3 className="text-lg font-bold text-slate-900 mb-1">المدونة والمعرفة التقنية</h3>
            <p className="text-slate-500 text-xs mb-4">أحدث المقالات الهندسية والتحليلات المتخصصة.</p>

            <div className="space-y-2.5 mb-4">
              <div 
                onClick={() => onNavigate('blog')}
                className="border-r-4 border-amber-500 pr-3 py-1 cursor-pointer group"
              >
                <h4 className="text-xs font-bold text-slate-800 group-hover:text-amber-600 transition-colors line-clamp-1">
                  مستقبل وكلاء الذكاء الاصطناعي في بيئات العمل
                </h4>
                <span className="text-[11px] text-slate-400">قراءة في 6 دقائق • منذ يومين</span>
              </div>

              <div 
                onClick={() => onNavigate('blog')}
                className="border-r-4 border-blue-500 pr-3 py-1 cursor-pointer group"
              >
                <h4 className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                  بناء البنى التحتية السحابية المقاومة للاختراق
                </h4>
                <span className="text-[11px] text-slate-400">قراءة في 8 دقائق • منذ 4 أيام</span>
              </div>
            </div>
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

        {/* Bento Tile 5: Careers Spotlight (col-span-12 lg:col-span-4) */}
        <div className="col-span-12 lg:col-span-4 bg-amber-500 rounded-3xl p-6 text-slate-900 shadow-sm border border-amber-400 relative overflow-hidden flex flex-col justify-between">
          {/* Watermark Background */}
          <div className="absolute -bottom-6 -left-6 text-7xl font-black text-amber-600/20 select-none pointer-events-none font-['Alexandria']">
            CAREERS
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

            <h3 className="text-xl font-black mb-1 font-['Alexandria']">انضم إلى فريق Nexus</h3>
            <p className="text-slate-900/80 text-xs font-medium mb-4 leading-relaxed">
              فرص هندسية واستشارية ببيئة مرنة ومزايا تنافسية واستقطاب دولي.
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-white/50 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-slate-950">
                هندسة AI
              </span>
              <span className="bg-white/50 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-slate-950">
                تطوير Frontend
              </span>
              <span className="bg-white/50 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-slate-950">
                أمن سيبراني
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

