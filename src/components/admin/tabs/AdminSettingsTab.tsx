import React, { useState } from 'react';
import { 
  Settings, 
  Shield, 
  Lock, 
  Database, 
  Cpu, 
  Globe, 
  BellRing, 
  Save, 
  CheckCircle2, 
  Key, 
  RefreshCw, 
  Download,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

export const AdminSettingsTab: React.FC = () => {
  const [platformName, setPlatformName] = useState('Nexus Platform');
  const [supportEmail, setSupportEmail] = useState('contact@nexus.dev');
  const [currency, setCurrency] = useState('SAR');
  const [vatRate, setVatRate] = useState('15');
  
  // Toggles
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [aiAssistantEnabled, setAiAssistantEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold w-fit mb-2 border border-slate-200">
            <Settings className="w-3.5 h-3.5" />
            <span>تهيئة النظام وتفضيلات الأمان</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Alexandria']">
            إعدادات المنصة المركزية
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            إدارة المعايير العامة، وتكامل الذكاء الاصطناعي، وبروتوكولات التشفير
          </p>
        </div>

        {savedSuccess && (
          <div className="p-2.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>تم حفظ كافة الإعدادات بنجاح في قاعدة البيانات</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: General & Business Settings (col-span-7) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* General Config Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <Globe className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-bold text-slate-900 font-['Alexandria']">الهوية والبيانات العامة</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">اسم المنصة الرسمي</label>
                <input
                  type="text"
                  value={platformName}
                  onChange={(e) => setPlatformName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">بريد الدعم والمراسلات</label>
                <input
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 text-left"
                  dir="ltr"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">العملة الافتراضية</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold"
                >
                  <option value="SAR">ريال سعودي (SAR)</option>
                  <option value="AED">درهم إماراتي (AED)</option>
                  <option value="USD">دولار أمريكي (USD)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">نسبة ضريبة القيمة المضافة (VAT %)</label>
                <input
                  type="number"
                  value={vatRate}
                  onChange={(e) => setVatRate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-['Alexandria']"
                />
              </div>
            </div>
          </div>

          {/* Operational Toggles Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <Shield className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-bold text-slate-900 font-['Alexandria']">حالة التشغيل والأمان</h3>
            </div>

            <div className="space-y-3 divide-y divide-slate-100">
              
              <div className="flex items-center justify-between pt-2">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">المصادقة الثنائية الإلزامية (2FA)</h4>
                  <p className="text-[11px] text-slate-500">إلزام جميع المشرفين بإدخال رمز تحقق مؤقت عند الدخول</p>
                </div>
                <button
                  type="button"
                  onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${twoFactorAuth ? 'bg-emerald-600' : 'bg-slate-300'}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transition-transform ${twoFactorAuth ? 'translate-x-0' : '-translate-x-6'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between pt-3">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">مساعد الذكاء الاصطناعي التفاعلي</h4>
                  <p className="text-[11px] text-slate-500">تفعيل خوارزميات Gemini لاقتراح المحتوى ومساعدة الزوار</p>
                </div>
                <button
                  type="button"
                  onClick={() => setAiAssistantEnabled(!aiAssistantEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${aiAssistantEnabled ? 'bg-amber-600' : 'bg-slate-300'}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transition-transform ${aiAssistantEnabled ? 'translate-x-0' : '-translate-x-6'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between pt-3">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">وضع الصيانة المؤقت (Maintenance Mode)</h4>
                  <p className="text-[11px] text-slate-500">حجب الواجهة العامة وعرض شاشة الصيانة للمستخدمين</p>
                </div>
                <button
                  type="button"
                  onClick={() => setMaintenanceMode(!maintenanceMode)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${maintenanceMode ? 'bg-rose-600' : 'bg-slate-300'}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transition-transform ${maintenanceMode ? 'translate-x-0' : '-translate-x-6'}`} />
                </button>
              </div>

            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-md shadow-amber-600/20 transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>حفظ التعديلات</span>
            </button>
          </div>

        </div>

        {/* Right Column: Infrastructure & System Health (col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Services Health */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Cpu className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-bold text-slate-900 font-['Alexandria']">تكامل الخدمات السحابية</h3>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Google Gemini 2.5 Flash</span>
                    <span className="text-[10px] text-slate-400 font-mono">SDK v2.4 Connected</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  متصل
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">قاعدة البيانات السحابية</span>
                    <span className="text-[10px] text-slate-400 font-mono">Latency: 18ms (Region: me-central)</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  ممتاز
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">شهادة التشفير SSL / TLS</span>
                    <span className="text-[10px] text-slate-400 font-mono">256-bit AES Valid until 2027</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  مؤمن
                </span>
              </div>
            </div>
          </div>

          {/* Backup & Export */}
          <div className="bg-slate-900 rounded-3xl p-6 text-white border border-slate-800 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white font-['Alexandria']">النسخ الاحتياطي وتصدير البيانات</h3>
              <p className="text-xs text-slate-400 mt-1">تصدير كامل قاعدة بيانات المتجر والمحتوى بصيغة JSON</p>
            </div>

            <button
              type="button"
              onClick={() => {
                const dummyData = { exportedAt: new Date().toISOString(), platform: 'Nexus Portal', version: '2.0' };
                const blob = new Blob([JSON.stringify(dummyData, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `nexus_backup_${Date.now()}.json`;
                a.click();
              }}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-750 text-amber-400 font-bold text-xs rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>تنزيل نسخة احتياطية فورية (JSON Backup)</span>
            </button>
          </div>

        </div>

      </form>

    </div>
  );
};
