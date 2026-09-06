import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Shield, 
  Database, 
  Cpu, 
  Globe, 
  Save, 
  CheckCircle2, 
  Download,
  AlertTriangle
} from 'lucide-react';
import { supabase } from '../../../lib/supabaseClient';

interface PlatformSettingsData {
  platformName: string;
  supportEmail: string;
  currency: string;
  vatRate: number;
  maintenanceMode: boolean;
}

interface AdminSettingsTabProps {
  settings: PlatformSettingsData;
  onSave: (updated: PlatformSettingsData) => void;
  addToast: (type: 'success' | 'info' | 'warning' | 'error', title: string, message: string) => void;
}

export const AdminSettingsTab: React.FC<AdminSettingsTabProps> = ({ settings, onSave, addToast }) => {
  const [formData, setFormData] = useState<PlatformSettingsData>(settings);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // قياس سرعة استجابة قاعدة البيانات فعلياً عبر استعلام خفيف حقيقي
  const [dbLatency, setDbLatency] = useState<number | null>(null);
  const [dbStatus, setDbStatus] = useState<'checking' | 'ok' | 'error'>('checking');

  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  useEffect(() => {
    const checkLatency = async () => {
      const start = performance.now();
      const { error } = await supabase.from('platform_settings').select('id').eq('id', 1).single();
      const elapsed = Math.round(performance.now() - start);
      setDbLatency(elapsed);
      setDbStatus(error ? 'error' : 'ok');
    };
    checkLatency();
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // نسخة احتياطية حقيقية: تُصدّر كل بيانات المنصة الفعلية من Supabase (وليس ملفاً وهمياً)
  const [isBackingUp, setIsBackingUp] = useState(false);

  const handleRealBackup = async () => {
    setIsBackingUp(true);
    try {
      const tables = ['products', 'blog_posts', 'jobs', 'orders', 'job_applications'];
      const backup: Record<string, any> = {
        exportedAt: new Date().toISOString(),
        platform: formData.platformName
      };

      for (const table of tables) {
        const { data, error } = await supabase.from(table).select('*');
        if (error) {
          console.error(`تعذر جلب بيانات جدول ${table}:`, error.message);
        }
        backup[table] = error ? [] : data;
      }

      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const fileName = `nexus_backup_${Date.now()}.json`;
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      addToast('success', 'تم تنزيل النسخة الاحتياطية', `تحققي من مجلد التنزيلات لديك عن ملف باسم ${fileName}`);
    } catch (err: any) {
      console.error('تعذر إنشاء النسخة الاحتياطية:', err?.message || err);
      addToast('error', 'فشل إنشاء النسخة الاحتياطية', 'حدث خطأ غير متوقع أثناء التجهيز، يرجى المحاولة مرة أخرى.');
    } finally {
      setIsBackingUp(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold w-fit mb-2 border border-slate-200">
            <Settings className="w-3.5 h-3.5" />
            <span>تهيئة النظام العامة</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Alexandria']">
            إعدادات المنصة المركزية
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            إدارة المعايير العامة ووضع الصيانة، محفوظة فعلياً في قاعدة البيانات
          </p>
        </div>

        {savedSuccess && (
          <div className="p-2.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>تم إرسال الحفظ إلى قاعدة البيانات</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: General & Business Settings */}
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
                  value={formData.platformName}
                  onChange={(e) => setFormData({ ...formData, platformName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">بريد الدعم والمراسلات</label>
                <input
                  type="email"
                  value={formData.supportEmail}
                  onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 text-left"
                  dir="ltr"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">العملة الافتراضية</label>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold"
                >
                  <option value="MAD">درهم مغربي (MAD)</option>
                  <option value="SAR">ريال سعودي (SAR)</option>
                  <option value="AED">درهم إماراتي (AED)</option>
                  <option value="USD">دولار أمريكي (USD)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">نسبة ضريبة القيمة المضافة (VAT %)</label>
                <input
                  type="number"
                  value={formData.vatRate}
                  onChange={(e) => setFormData({ ...formData, vatRate: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-['Alexandria']"
                />
              </div>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              ملاحظة: العملة ونسبة الضريبة تُحفظ هنا كإعداد مرجعي، لكنها لا تُطبَّق تلقائياً بعد على أسعار المتجر — يحتاج ذلك ربطاً إضافياً في صفحة المتجر إذا رغبتِ بذلك لاحقاً.
            </p>
          </div>

          {/* Operational Toggles Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <Shield className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-bold text-slate-900 font-['Alexandria']">حالة التشغيل</h3>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800">وضع الصيانة (Maintenance Mode)</h4>
                <p className="text-[11px] text-slate-500">حجب الواجهة العامة فعلياً عن الزوار، مع بقاء لوحة الإدارة مفتوحة لك دائماً</p>
              </div>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, maintenanceMode: !formData.maintenanceMode })}
                className={`w-12 h-6 rounded-full transition-colors relative p-0.5 shrink-0 ${formData.maintenanceMode ? 'bg-rose-600' : 'bg-slate-300'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${formData.maintenanceMode ? 'translate-x-0' : '-translate-x-6'}`} />
              </button>
            </div>

            {formData.maintenanceMode && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-[11px] text-rose-800 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>تنبيه: بمجرد الحفظ، سيتوقف الموقع العام فوراً عن الظهور لأي زائر حتى تُعطّلي هذا الخيار من جديد.</span>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-md shadow-amber-600/20 transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>حفظ التعديلات في قاعدة البيانات</span>
            </button>
          </div>

        </div>

        {/* Right Column: Infrastructure & System Health */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Services Health */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Cpu className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-bold text-slate-900 font-['Alexandria']">حالة الخدمات الفعلية</h3>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`w-2.5 h-2.5 rounded-full ${dbStatus === 'ok' ? 'bg-emerald-500 animate-pulse' : dbStatus === 'error' ? 'bg-rose-500' : 'bg-slate-300'}`} />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">قاعدة البيانات (Supabase)</span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {dbStatus === 'checking' && 'جارٍ القياس الآن...'}
                      {dbStatus === 'ok' && `زمن استجابة حقيقي: ${dbLatency}ms`}
                      {dbStatus === 'error' && 'تعذر الاتصال الآن'}
                    </span>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${dbStatus === 'ok' ? 'bg-emerald-100 text-emerald-800' : dbStatus === 'error' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-600'}`}>
                  {dbStatus === 'ok' ? 'متصلة' : dbStatus === 'error' ? 'غير متصلة' : '...'}
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">تشفير النقل (HTTPS/SSL)</span>
                    <span className="text-[10px] text-slate-400 font-mono">مفعّل تلقائياً عبر استضافة GitHub Pages</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  مؤمن
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">مساعد الذكاء الاصطناعي (Gemini)</span>
                    <span className="text-[10px] text-slate-400 font-mono">غير مُفعّل في الكود حالياً</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  غير نشط
                </span>
              </div>
            </div>
          </div>

          {/* Backup & Export */}
          <div className="bg-slate-900 rounded-3xl p-6 text-white border border-slate-800 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white font-['Alexandria']">النسخ الاحتياطي الحقيقي</h3>
              <p className="text-xs text-slate-400 mt-1">تصدير كل بيانات المنصة الفعلية من قاعدة البيانات (المنتجات، المقالات، الوظائف، الطلبات) بصيغة JSON</p>
            </div>

            <button
              type="button"
              onClick={handleRealBackup}
              disabled={isBackingUp}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-750 text-amber-400 font-bold text-xs rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-wait"
            >
              <Download className="w-4 h-4" />
              <span>{isBackingUp ? 'جارٍ التجهيز، انتظري قليلاً...' : 'تنزيل نسخة احتياطية حقيقية (JSON)'}</span>
            </button>
          </div>

        </div>

      </form>

    </div>
  );
};
