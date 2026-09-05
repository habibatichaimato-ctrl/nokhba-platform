import React, { useState } from 'react';
import { 
  Layers, 
  Code2, 
  Bot, 
  Palette, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  ArrowLeft, 
  X, 
  Send, 
  PhoneCall, 
  Briefcase, 
  DollarSign, 
  FileCheck2,
  Calendar,
  Building
} from 'lucide-react';
import { ServiceItem, ServiceRequest } from '../../types';

interface ServicesSectionProps {
  services: ServiceItem[];
  onRequestServiceSubmit: (request: ServiceRequest) => void;
  isWizardOpen: boolean;
  onCloseWizard: () => void;
  onOpenWizardWithService?: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onRequestServiceSubmit,
  isWizardOpen,
  onCloseWizard,
  onOpenWizardWithService
}) => {
  const [selectedService, setSelectedService] = useState<ServiceItem>(services[0]);
  const [activeStep, setActiveStep] = useState<number>(1);

  // Form State
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [budgetRange, setBudgetRange] = useState('15,000 - 30,000 د.م');
  const [timeline, setTimeline] = useState('خلال 1 - 2 شهر');
  const [projectScope, setProjectScope] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [requestSubmittedId, setRequestSubmittedId] = useState<string | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-6 h-6" />;
      case 'Bot':
        return <Bot className="w-6 h-6" />;
      case 'Palette':
        return <Palette className="w-6 h-6" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6" />;
      default:
        return <Layers className="w-6 h-6" />;
    }
  };

  const handleOpenWizard = (service: ServiceItem) => {
    setSelectedService(service);
    if (onOpenWizardWithService) {
      onOpenWizardWithService(service);
    }
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !email || !phone || !projectScope) return;

    const reqId = `SRV-${Math.floor(100000 + Math.random() * 900000)}`;
    const requestData: ServiceRequest = {
      id: reqId,
      serviceId: selectedService.id,
      serviceTitle: selectedService.title,
      clientName,
      companyName,
      email,
      phone,
      budgetRange,
      timeline,
      projectScope,
      additionalNotes,
      submittedAt: new Date().toISOString()
    };

    onRequestServiceSubmit(requestData);
    setRequestSubmittedId(reqId);
  };

  const resetWizard = () => {
    setActiveStep(1);
    setClientName('');
    setCompanyName('');
    setEmail('');
    setPhone('');
    setProjectScope('');
    setAdditionalNotes('');
    setRequestSubmittedId(null);
  };

  return (
    <div className="py-8 space-y-10">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-900 border border-blue-500/20 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>خدمات وحلول النخبة الهندسية</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            حلول برمجية وذكاء اصطناعي مخصصة لنمو مؤسستك
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl">
            نساعد الشركات الناشئة والمؤسسات الكبرى على بناء منتجات رقمية فائقة التطور، تسريع التحول الرقمي، وتأمين بنيتها التحتية.
          </p>
        </div>

        <button
          onClick={() => {
            resetWizard();
            onOpenWizardWithService?.(services[0]);
          }}
          className="px-6 py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all shrink-0 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>طلب عرض سعر واستشارة مخصصة</span>
        </button>
      </div>

      {/* Services Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            id={`service-card-${service.id}`}
            className="group relative rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="p-3.5 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:bg-blue-500 group-hover:text-slate-950 transition-colors">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-blue-400">{service.categoryLabel}</span>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {service.popular && (
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    الأكثر طلباً
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {service.description}
              </p>

              {/* Features List */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  أبرز ما تتضمنه الخدمة:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables */}
              <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-1.5 text-xs">
                <span className="font-bold text-amber-400">المخرجات والتسليمات النهائية:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-400">
                  {service.deliverables.map((deliv, idx) => (
                    <li key={idx}>{deliv}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pricing & CTA */}
            <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-1 text-xs text-slate-400 mb-0.5">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  <span>المدة المقدرة: {service.deliveryTime}</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs text-slate-400">تبدأ من:</span>
                  <span className="text-lg font-black text-white font-['Alexandria']">{service.startingPrice.toLocaleString()}</span>
                  <span className="text-xs text-amber-400 font-bold">د.م</span>
                </div>
              </div>

              <button
                id={`request-service-btn-${service.id}`}
                onClick={() => handleOpenWizard(service)}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all flex items-center gap-2"
              >
                <span>طلب هذه الخدمة</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Multi-Step Service Quotation Request Modal */}
      {isWizardOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-y-auto max-h-[90vh] space-y-6">
            <button
              onClick={() => {
                onCloseWizard();
                resetWizard();
              }}
              className="absolute top-4 left-4 p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>

            {requestSubmittedId ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mx-auto border border-blue-500/40">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-white">تم استلام طلب الخدمة بنجاح!</h3>
                <p className="text-sm text-slate-300">
                  الرقم المرجعي للطلب: <span className="font-bold text-amber-400 font-mono">{requestSubmittedId}</span>
                </p>
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-right text-xs space-y-2 text-slate-300">
                  <p><span className="text-slate-400">نوع الخدمة:</span> <span className="font-bold text-white">{selectedService.title}</span></p>
                  <p><span className="text-slate-400">صاحب الطلب:</span> {clientName} {companyName ? `(${companyName})` : ''}</p>
                  <p><span className="text-slate-400">الميزانية المقدرة:</span> <span className="text-amber-400 font-bold">{budgetRange}</span></p>
                  <p className="text-blue-400 pt-2 border-t border-slate-800">
                    سيقوم مهندس الحلول في النخبة بمراجعة متطلبات المشروع وإعداد عرض فني ومالي مفصل خلال 24 ساعة عمل.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onCloseWizard();
                    resetWizard();
                  }}
                  className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl text-sm"
                >
                  العودة للمنصة
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitRequest} className="space-y-6">
                {/* Header & Steps Indicator */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <h3 className="text-xl font-bold text-white">طلب عرض سعر لخدمة مخصصة</h3>
                  </div>
                  <p className="text-xs text-slate-400">
                    املأ البيانات لنقوم بتحليل المتطلبات وتقديم أنسب الحلول التقنية لمشروعك.
                  </p>

                  {/* Steps Bar */}
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <button
                      type="button"
                      onClick={() => setActiveStep(1)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-colors ${
                        activeStep === 1
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-950 text-slate-400 border border-slate-800'
                      }`}
                    >
                      1. الخدمة والنطاق
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveStep(2)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-colors ${
                        activeStep === 2
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-950 text-slate-400 border border-slate-800'
                      }`}
                    >
                      2. الميزانية والجدول
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveStep(3)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-colors ${
                        activeStep === 3
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-950 text-slate-400 border border-slate-800'
                      }`}
                    >
                      3. بيانات التواصل
                    </button>
                  </div>
                </div>

                {/* Step 1: Select Service & Scope */}
                {activeStep === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">اختر نوع الخدمة الرئيسية *</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {services.map((srv) => (
                          <button
                            key={srv.id}
                            type="button"
                            onClick={() => setSelectedService(srv)}
                            className={`p-3 rounded-2xl border text-right transition-all flex items-start gap-2.5 ${
                              selectedService.id === srv.id
                                ? 'bg-blue-500/20 border-blue-500 text-white'
                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                            }`}
                          >
                            <div className="mt-0.5">{getServiceIcon(srv.iconName)}</div>
                            <div>
                              <h4 className="text-xs font-bold text-white">{srv.title}</h4>
                              <span className="text-[11px] text-amber-400 font-medium">تبدأ من {srv.startingPrice.toLocaleString()} د.م</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">وصف مختصر لمتطلبات المشروع *</label>
                      <textarea
                        required
                        rows={3}
                        value={projectScope}
                        onChange={(e) => setProjectScope(e.target.value)}
                        placeholder="ما هي أهداف المشروع؟ ما الميزات الأساسية المطلوبة؟"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500 resize-none"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setActiveStep(2)}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
                      >
                        <span>التالي: الميزانية والجدول</span>
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Budget & Timeline */}
                {activeStep === 2 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">الميزانية المقدرة للاستثمار *</label>
                      <div className="grid grid-cols-2 gap-2.5">
                        {[
                          '10,000 - 20,000 د.م',
                          '20,000 - 40,000 د.م',
                          '40,000 - 80,000 د.م',
                          '+80,000 د.م (مشاريع مؤسسية ضخمة)'
                        ].map((b) => (
                          <button
                            key={b}
                            type="button"
                            onClick={() => setBudgetRange(b)}
                            className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                              budgetRange === b
                                ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                                : 'bg-slate-950 border-slate-800 text-slate-400'
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">الجدول الزمني المستهدف للإطلاق *</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          'عاجل (خلال شهر)',
                          'خلال 1 - 2 شهر',
                          'خلال 3 - 6 أشهر'
                        ].map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setTimeline(t)}
                            className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                              timeline === t
                                ? 'bg-blue-500/20 border-blue-500 text-blue-300 font-bold'
                                : 'bg-slate-950 border-slate-800 text-slate-400'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">ملاحظات إضافية أو تقنيات مفضلة</label>
                      <input
                        type="text"
                        value={additionalNotes}
                        onChange={(e) => setAdditionalNotes(e.target.value)}
                        placeholder="مثال: نفضل الربط مع بوابة دفع محددة، أو استخدام سحابة GCP"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={() => setActiveStep(1)}
                        className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl"
                      >
                        السابق
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveStep(3)}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
                      >
                        <span>التالي: بيانات التواصل</span>
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Client Info & Submit */}
                {activeStep === 3 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">الاسم الكامل *</label>
                        <input
                          type="text"
                          required
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="مثال: عبد الله السعدون"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">اسم الشركة أو الجهة</label>
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="مثال: شركة الابتكار الرقمي"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">البريد الإلكتروني للعمل *</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@company.com"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">رقم الهاتف / الواتساب *</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="05XXXXXXXX"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* Summary box */}
                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs space-y-1 text-slate-300">
                      <div className="flex justify-between">
                        <span className="text-slate-400">الخدمة المختارة:</span>
                        <span className="font-bold text-white">{selectedService.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">الميزانية المقدرة:</span>
                        <span className="font-bold text-amber-400">{budgetRange}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">الجدول الزمني:</span>
                        <span className="font-bold text-blue-400">{timeline}</span>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={() => setActiveStep(2)}
                        className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl"
                      >
                        السابق
                      </button>

                      <button
                        type="submit"
                        id="submit-service-quote-btn"
                        className="px-6 py-3 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 flex items-center gap-2"
                      >
                        <span>إرسال طلب العرض والاستشارة</span>
                        <Send className="w-4 h-4 rotate-180" />
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
