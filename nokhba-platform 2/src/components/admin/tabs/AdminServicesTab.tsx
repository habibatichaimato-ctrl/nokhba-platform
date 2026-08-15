import React, { useState } from 'react';
import { 
  Layers, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  FileText, 
  Mail, 
  Phone, 
  User, 
  X, 
  AlertTriangle 
} from 'lucide-react';
import { ServiceItem, ServiceQuoteRequest } from '../../../types';

interface AdminServicesTabProps {
  services: ServiceItem[];
  quotes: ServiceQuoteRequest[];
  onAddService: (service: ServiceItem) => void;
  onUpdateService: (service: ServiceItem) => void;
  onDeleteService: (serviceId: string) => void;
}

export const AdminServicesTab: React.FC<AdminServicesTabProps> = ({
  services,
  quotes,
  onAddService,
  onUpdateService,
  onDeleteService
}) => {
  const [subTab, setSubTab] = useState<'catalog' | 'quotes'>('catalog');
  const [searchQuery, setSearchQuery] = useState('');

  // Service Modal
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [deletingServiceId, setDeletingServiceId] = useState<string | null>(null);

  // Quote detail modal
  const [selectedQuote, setSelectedQuote] = useState<ServiceQuoteRequest | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'cloud' as ServiceItem['category'],
    categoryLabel: 'الحوسبة السحابية والبنى التحتية',
    startingPrice: 15000,
    deliveryTime: '2 - 4 أسابيع عمل',
    iconName: 'Cloud',
    features: 'استشارات معمارية متقدمة\nتنفيذ حلول الاستمرارية العالية\nدعم فني ومراقبة على مدار الساعة',
    deliverables: 'مخطط البنية التحتية الشامل\nنصوص النشر البرمجي التلقائي IaC\nتقرير الأمان واختبارات الجاهزية',
    popular: false
  });

  const filteredServices = services.filter((s) => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredQuotes = quotes.filter((q) => 
    q.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.serviceType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingService(null);
    setFormData({
      title: '',
      description: 'حلول استشارية متخصصة لتصميم وهيكلة النظم الرقمية فائقة الاعتمادية.',
      category: 'cloud',
      categoryLabel: 'الحوسبة السحابية والبنى التحتية',
      startingPrice: 18000,
      deliveryTime: '3 أسابيع عمل',
      iconName: 'Server',
      features: 'تصميم البنى التحتية الموزعة\nأتمتة خطوط النشر CI/CD\nمراقبة الأداء واختبارات الضغط',
      deliverables: 'وثائق معمارية كاملة\nشفرات البناء البرمجي Terraform/Docker\nجلسات تدريب وتسليم للفريق',
      popular: false
    });
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (service: ServiceItem) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      category: service.category,
      categoryLabel: service.categoryLabel,
      startingPrice: service.startingPrice,
      deliveryTime: service.deliveryTime,
      iconName: service.iconName,
      features: service.features.join('\n'),
      deliverables: service.deliverables.join('\n'),
      popular: !!service.popular
    });
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const catLabels: Record<string, string> = {
      cloud: 'الحوسبة السحابية والبنى التحتية',
      ai: 'تطوير حلول الذكاء الاصطناعي',
      security: 'الأمن السيبراني والامتثال',
      custom: 'تطوير البرمجيات والمنظومات المخصصة'
    };

    const payload: ServiceItem = {
      id: editingService ? editingService.id : `serv-${Date.now()}`,
      title: formData.title,
      subtitle: formData.description.slice(0, 80) + '...',
      description: formData.description,
      category: formData.category,
      categoryLabel: catLabels[formData.category] || 'حلول تقنية',
      startingPrice: Number(formData.startingPrice),
      deliveryTime: formData.deliveryTime,
      iconName: formData.iconName,
      features: formData.features.split('\n').filter(Boolean),
      deliverables: formData.deliverables.split('\n').filter(Boolean),
      tags: [formData.category, 'حلول_مؤسسات'],
      popular: formData.popular
    };

    if (editingService) {
      onUpdateService(payload);
    } else {
      onAddService(payload);
    }

    setIsFormModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deletingServiceId) {
      onDeleteService(deletingServiceId);
      setDeletingServiceId(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold w-fit mb-2 border border-amber-200">
            <Layers className="w-3.5 h-3.5" />
            <span>إدارة الخدمات وعروض الأسعار</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Alexandria']">
            كتالوج الحلول والطلبات الواردة
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            تحديث حزم الخدمات الاستشارية ومعالجة نماذج عروض الأسعار من العملاء
          </p>
        </div>

        {subTab === 'catalog' && (
          <button
            onClick={handleOpenAdd}
            className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md shadow-amber-600/20 transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة خدمة جديدة</span>
          </button>
        )}
      </div>

      {/* Sub tabs */}
      <div className="flex rounded-2xl bg-white border border-slate-200 p-1.5 shadow-sm text-xs font-bold w-fit">
        <button
          onClick={() => setSubTab('catalog')}
          className={`px-5 py-2 rounded-xl transition-all flex items-center gap-2 ${
            subTab === 'catalog'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>قائمة الخدمات المعروضة ({services.length})</span>
        </button>
        <button
          onClick={() => setSubTab('quotes')}
          className={`px-5 py-2 rounded-xl transition-all flex items-center gap-2 ${
            subTab === 'quotes'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>طلبات عروض الأسعار ({quotes.length})</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={subTab === 'catalog' ? 'بحث باسم الخدمة أو التصنيف...' : 'بحث باسم الشركة أو العميل...'}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Tab 1: Services Catalog */}
      {subTab === 'catalog' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                <tr>
                  <th className="p-4">الخدمة</th>
                  <th className="p-4">التصنيف</th>
                  <th className="p-4">السعر المبدئي</th>
                  <th className="p-4">مدة التنفيذ</th>
                  <th className="p-4">المخرجات</th>
                  <th className="p-4 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredServices.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-slate-400 text-xs">
                      لا توجد خدمات مطابقة.
                    </td>
                  </tr>
                ) : (
                  filteredServices.map((service) => (
                    <tr key={service.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{service.title}</span>
                          {service.popular && (
                            <span className="text-[10px] px-2 py-0.2 rounded bg-amber-100 text-amber-800 font-bold border border-amber-200">
                              شائعة
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400 line-clamp-1">{service.description}</span>
                      </td>

                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold border border-slate-200">
                          {service.categoryLabel}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="font-black text-slate-900 text-sm font-['Alexandria']">
                          {service.startingPrice.toLocaleString()} <span className="text-xs text-amber-600 font-bold">ر.س</span>
                        </div>
                      </td>

                      <td className="p-4 text-slate-600 font-medium">
                        {service.deliveryTime}
                      </td>

                      <td className="p-4 text-slate-500 text-[11px]">
                        {service.deliverables.length} مخرجات أساسية
                      </td>

                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleOpenEdit(service)}
                            title="تعديل الخدمة"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-amber-700 hover:bg-amber-50 border border-slate-200 transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeletingServiceId(service.id)}
                            title="حذف الخدمة"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-700 hover:bg-rose-50 border border-slate-200 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Quote Requests */}
      {subTab === 'quotes' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                <tr>
                  <th className="p-4">اسم العميل والشركة</th>
                  <th className="p-4">نوع الخدمة المطلوبة</th>
                  <th className="p-4">الميزانية المتوقعة</th>
                  <th className="p-4">الجدول الزمني</th>
                  <th className="p-4">تاريخ الطلب</th>
                  <th className="p-4 text-center">التفاصيل</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredQuotes.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-slate-400 text-xs">
                      لا توجد طلبات عروض أسعار جديدة.
                    </td>
                  </tr>
                ) : (
                  filteredQuotes.map((q) => (
                    <tr key={q.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-slate-900 text-sm">{q.fullName}</div>
                        <span className="text-[11px] text-slate-500 font-semibold">{q.companyName}</span>
                      </td>

                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold border border-amber-200">
                          {q.serviceType}
                        </span>
                      </td>

                      <td className="p-4 font-bold text-slate-800 font-['Alexandria']">
                        {q.budgetRange}
                      </td>

                      <td className="p-4 text-slate-600">
                        {q.timeline}
                      </td>

                      <td className="p-4 text-slate-500 text-[11px]">
                        {q.submittedAt}
                      </td>

                      <td className="p-4 text-center">
                        <button
                          onClick={() => setSelectedQuote(q)}
                          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1"
                        >
                          <FileText className="w-3.5 h-3.5 text-amber-400" />
                          <span>عرض كراسة الطلب</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Service Modal */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in" dir="rtl">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            <div className="bg-slate-900 p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-['Alexandria']">
                    {editingService ? 'تعديل بيانات الخدمة' : 'إضافة خدمة وحل تقني جديد'}
                  </h3>
                  <p className="text-xs text-slate-400">تحديد نطاق الأعمال والتسعير المبدئي</p>
                </div>
              </div>
              <button
                onClick={() => setIsFormModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-xl"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">عنوان الخدمة *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="مثال: التدقيق الأمني واختبارات الاختراق"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">التصنيف *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-bold"
                  >
                    <option value="cloud">الحوسبة السحابية والبنى التحتية</option>
                    <option value="ai">تطوير حلول الذكاء الاصطناعي</option>
                    <option value="security">الأمن السيبراني والامتثال</option>
                    <option value="custom">تطوير البرمجيات والمنظومات المخصصة</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">يبدأ السعر من (ر.س) *</label>
                  <input
                    type="number"
                    required
                    min={100}
                    value={formData.startingPrice}
                    onChange={(e) => setFormData({ ...formData, startingPrice: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-['Alexandria']"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">مدة التسليم المتوقعة *</label>
                  <input
                    type="text"
                    required
                    value={formData.deliveryTime}
                    onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                    placeholder="3 - 5 أسابيع"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">الوصف الشامل للخدمة *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">الميزات المتضمنة (سطر لكل ميزة) *</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">المخرجات النهائية والتسليمات *</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.deliverables}
                    onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={formData.popular}
                    onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                    className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                  />
                  <span>تمييز الخدمة كخيار شائع ومطلوب بكثرة (Popular Badge)</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsFormModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-md shadow-amber-600/20"
                >
                  {editingService ? 'حفظ التعديلات' : 'نشر الخدمة في المنصة'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Quote Detail Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in" dir="rtl">
          <div className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            <div className="bg-slate-900 p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-['Alexandria']">طلب استشارة من: {selectedQuote.companyName}</h3>
                  <p className="text-xs text-slate-400">مسؤول التواصل: {selectedQuote.fullName}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedQuote(null)}
                className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-xl"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-slate-400 font-semibold block mb-1">البريد الإلكتروني:</span>
                  <span className="font-bold text-slate-900 select-all">{selectedQuote.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block mb-1">رقم الهاتف:</span>
                  <span className="font-bold text-slate-900 select-all" dir="ltr">{selectedQuote.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block mb-1">الميزانية المقدرة:</span>
                  <span className="font-bold text-slate-900 font-['Alexandria']">{selectedQuote.budgetRange}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block mb-1">الجدول الزمني:</span>
                  <span className="font-bold text-slate-900">{selectedQuote.timeline}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-700">شرح وتفاصيل متطلبات المشروع:</span>
                <p className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {selectedQuote.projectDescription}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">تاريخ الإرسال: {selectedQuote.submittedAt}</span>
                <button
                  onClick={() => setSelectedQuote(null)}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl"
                >
                  إغلاق
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deletingServiceId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in" dir="rtl">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 border border-slate-200 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 font-['Alexandria']">تأكيد حذف الخدمة</h4>
              <p className="text-xs text-slate-500 mt-1">هل أنت متأكد من رغبتك في حذف هذه الخدمة من كتالوج الموقع؟</p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeletingServiceId(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
              >
                تراجع
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl"
              >
                تأكيد الحذف
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
