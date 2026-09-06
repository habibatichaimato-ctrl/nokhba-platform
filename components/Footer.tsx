import React, { useState } from 'react';
import { 
  Send, 
  Mail, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  ArrowUpLeft, 
  ShieldCheck, 
  CreditCard, 
  Sparkles,
  Globe
} from 'lucide-react';
import { NavSection } from '../types';

interface FooterProps {
  onNavigate: (section: NavSection) => void;
  onSubscribeNewsletter: (email: string) => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSubscribeNewsletter, onOpenPrivacy, onOpenTerms }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    onSubscribeNewsletter(email);
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 pt-12 pb-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter Bento Card */}
        <div className="relative rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 mb-12 overflow-hidden shadow-xl text-white">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>النشرة البريدية المتخصصة</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2 font-['Alexandria']">
                ابقَ على اطلاع دائم بأحدث التقنيات والفرص
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl">
                اشترك في نشرة Nexus الأسبوعية لتصلك مقالات تقنية حصرية، عروض المتجر الخاصة، وفرص العمل الاستثنائية فور طرحها.
              </p>
            </div>

            <div className="lg:col-span-5">
              {isSubscribed ? (
                <div className="flex items-center gap-3 p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl text-emerald-300 text-xs sm:text-sm font-semibold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>شكراً لاشتراكك! تم تسجيل بريدك الإلكتروني بنجاح في نشرة نيكسوس.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      id="newsletter-email-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="أدخل بريدك الإلكتروني..."
                      required
                      className="w-full bg-slate-800 border border-slate-700 focus:border-amber-500 rounded-xl pr-10 pl-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                  <button
                    type="submit"
                    id="newsletter-submit-btn"
                    className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-amber-600/20 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <span>اشتراك</span>
                    <Send className="w-3.5 h-3.5 rotate-180" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 4 Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-2xl font-black text-amber-600 font-['Alexandria'] flex items-center gap-1">
              <span>NEXUS</span>
              <span className="text-slate-900 font-bold">PLATFORM</span>
            </div>

            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-sm">
              منصة نيكسوس تجمع بين التسوق الإلكتروني التقني المتطور، المقالات التخصصية، الحلول الهندسية المخصصة، وأكبر شبكة لفرص العمل التقنية في الشرق الأوسط.
            </p>

            <div className="space-y-1.5 pt-2 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>أگادير، المغرب</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <a href="mailto:habibatichaimato@gmail.com" className="hover:text-amber-600 transition-colors">
                  habibatichaimato@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <a href="tel:+212657447997" dir="ltr" className="hover:text-amber-600 transition-colors">
                  +212 657 447 997
                </a>
              </div>
            </div>
          </div>

          {/* Section 1: Store */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 border-r-2 border-amber-500 pr-2">
              المتجر الإلكتروني
            </h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <button onClick={() => onNavigate('ecommerce')} className="hover:text-amber-600 transition-colors flex items-center gap-1.5">
                  <ArrowUpLeft className="w-3 h-3 text-slate-400" />
                  <span>محطات العمل وملحقاتها</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ecommerce')} className="hover:text-amber-600 transition-colors flex items-center gap-1.5">
                  <ArrowUpLeft className="w-3 h-3 text-slate-400" />
                  <span>أجهزة الذكاء الاصطناعي</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ecommerce')} className="hover:text-amber-600 transition-colors flex items-center gap-1.5">
                  <ArrowUpLeft className="w-3 h-3 text-slate-400" />
                  <span>لوحات المفاتيح الاحترافية</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ecommerce')} className="hover:text-amber-600 transition-colors flex items-center gap-1.5">
                  <ArrowUpLeft className="w-3 h-3 text-slate-400" />
                  <span>مفاتيح الأمان البيومترية</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ecommerce')} className="hover:text-amber-600 transition-colors flex items-center gap-1.5">
                  <ArrowUpLeft className="w-3 h-3 text-slate-400" />
                  <span>تراخيص برمجيات المؤسسات</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Section 2: Jobs */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 border-r-2 border-amber-500 pr-2">
              التوظيف
            </h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <button onClick={() => onNavigate('careers')} className="hover:text-amber-600 transition-colors flex items-center gap-1.5 text-amber-700 font-bold">
                  <ArrowUpLeft className="w-3 h-3 text-amber-600" />
                  <span>الوظائف الشاغرة</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('careers')} className="hover:text-amber-600 transition-colors flex items-center gap-1.5">
                  <ArrowUpLeft className="w-3 h-3 text-slate-400" />
                  <span>فرص العمل عن بُعد</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Section 3: Blog & Knowledge */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 border-r-2 border-amber-500 pr-2">
              المدونة والمعرفة
            </h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-amber-600 transition-colors flex items-center gap-1.5">
                  <ArrowUpLeft className="w-3 h-3 text-slate-400" />
                  <span>أحدث أبحاث الذكاء الاصطناعي</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-amber-600 transition-colors flex items-center gap-1.5">
                  <ArrowUpLeft className="w-3 h-3 text-slate-400" />
                  <span>معايير تصميم واجهات RTL</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-amber-600 transition-colors flex items-center gap-1.5">
                  <ArrowUpLeft className="w-3 h-3 text-slate-400" />
                  <span>أمن السحابة واستراتيجيات Zero Trust</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-amber-600 transition-colors flex items-center gap-1.5">
                  <ArrowUpLeft className="w-3 h-3 text-slate-400" />
                  <span>دليل بناء الأنظمة البرمجية</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Payments, Security */}
        <div className="pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <span>© {new Date().getFullYear()} منصة نيكسوس الرقمية (Nexus Platform). جميع الحقوق محفوظة.</span>
          </div>

          {/* Legal links */}
          <div className="flex flex-wrap items-center gap-3 text-slate-500 text-xs">
            <button onClick={onOpenPrivacy} className="hover:text-amber-600 hover:underline transition-colors">
              سياسة الخصوصية
            </button>
            <span className="text-slate-300">|</span>
            <button onClick={onOpenTerms} className="hover:text-amber-600 hover:underline transition-colors">
              الشروط والأحكام
            </button>
          </div>

          {/* Trust badges & payment methods */}
          <div className="flex flex-wrap items-center gap-4 text-slate-500 text-xs">
            <button
              onClick={() => onNavigate('admin')}
              className="flex items-center gap-1 text-amber-700 hover:text-amber-800 font-bold hover:underline"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>لوحة التحكم الإدارية (Admin)</span>
            </button>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>تشفير آمن SSL 256-bit</span>
            </span>
            <span className="flex items-center gap-1">
              <CreditCard className="w-3.5 h-3.5 text-blue-600" />
              <span>دعم مدى، Visa، Apple Pay</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
