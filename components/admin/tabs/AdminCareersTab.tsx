import React, { useState } from 'react';
import { 
  Briefcase, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Users, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  FileText, 
  Mail, 
  Phone, 
  ExternalLink,
  X,
  AlertTriangle
} from 'lucide-react';
import { JobListing, JobApplication } from '../../../types';

interface AdminCareersTabProps {
  jobs: JobListing[];
  applications: JobApplication[];
  onAddJob: (job: JobListing) => void;
  onUpdateJob: (job: JobListing) => void;
  onDeleteJob: (jobId: string) => void;
}

export const AdminCareersTab: React.FC<AdminCareersTabProps> = ({
  jobs,
  applications,
  onAddJob,
  onUpdateJob,
  onDeleteJob
}) => {
  const [subTab, setSubTab] = useState<'listings' | 'applicants'>('listings');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Job Form Modal
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobListing | null>(null);
  const [deletingJobId, setDeletingJobId] = useState<string | null>(null);

  // Selected Applicant for full review
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    department: 'tech' as JobListing['department'],
    departmentLabel: 'التكنولوجيا والبرمجة',
    location: 'الرياض / دبي (أو عن بُعد)',
    type: 'full-time' as JobListing['type'],
    typeLabel: 'دوام كامل',
    experience: '+3 سنوات خبرة',
    salaryRange: '20,000 - 32,000 د.م / شهرياً',
    description: '',
    responsibilities: 'قيادة وتطوير البنية الهندسية\nكتابة كود نظيف وموثق\nالتعاون مع فرق المنتج والأمن',
    requirements: 'إتقان TypeScript و React\nخبرة سابقة في النظم الموزعة\nمهارات تواصل عالية',
    benefits: 'تأمين طبي VIP شامل\nميزانية تدريب وتعلم سنوية\nخيارات عمل مرنة وعن بُعد',
    isUrgent: false,
    isRemote: true
  });

  const filteredJobs = jobs.filter((j) => 
    j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.departmentLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredApplications = applications.filter((app) => 
    app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingJob(null);
    setFormData({
      title: '',
      department: 'tech',
      departmentLabel: 'التكنولوجيا والبرمجة',
      location: 'الرياض (أو عن بُعد بالكامل)',
      type: 'full-time',
      typeLabel: 'دوام كامل',
      experience: '+4 سنوات خبرة',
      salaryRange: '24,000 - 38,000 د.م / شهرياً',
      description: 'نبحث عن مهندس متمرس للانضمام لفريق بناء البنية التحتية لمنصة Nexus...',
      responsibilities: 'تطوير الخدمات الأساسية والواجهات\nتحسين الأداء والأمان ومعدلات الاستجابة\nإجراء مراجعات الكود ورفع الجودة الهندسية',
      requirements: 'خبرة عميقة في React, Node.js, TypeScript\nفهم قوي للبنى السحابية الموزعة\nشغف بالذكاء الاصطناعي وهندسة البيانات',
      benefits: 'تأمين صحي ممتاز للأسرة\nمكافآت أداء سنوية\nمرونة تامة في ساعات العمل',
      isUrgent: true,
      isRemote: true
    });
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (job: JobListing) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      department: job.department,
      departmentLabel: job.departmentLabel,
      location: job.location,
      type: job.type,
      typeLabel: job.typeLabel,
      experience: job.experience,
      salaryRange: job.salaryRange,
      description: job.description,
      responsibilities: job.responsibilities.join('\n'),
      requirements: job.requirements.join('\n'),
      benefits: job.benefits.join('\n'),
      isUrgent: !!job.isUrgent,
      isRemote: !!job.isRemote
    });
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const deptLabels: Record<string, string> = {
      tech: 'التكنولوجيا والبرمجة',
      'marketing-sales': 'التسويق والمبيعات',
      admin: 'الإدارة والسكرتارية',
      finance: 'المالية والمحاسبة',
      'design-creative': 'التصميم والإبداع',
      'writing-translation': 'الكتابة والترجمة وصناعة المحتوى',
      education: 'التعليم والتدريب',
      logistics: 'الخدمات اللوجستية والنقل',
      healthcare: 'الخدمات الصحية والطبية',
      'customer-support': 'خدمة العملاء والدعم',
      'remote-freelance': 'العمل الحر والعمل عن بُعد',
      crafts: 'الحرف والمهن اليدوية'
    };

    const typeLabels: Record<string, string> = {
      'full-time': 'دوام كامل',
      'part-time': 'دوام جزئي',
      'contract': 'عقد استشاري',
      'remote': 'عن بُعد بالكامل'
    };

    const jobPayload: JobListing = {
      id: editingJob ? editingJob.id : `job-${Date.now()}`,
      title: formData.title,
      department: formData.department,
      departmentLabel: deptLabels[formData.department] || 'عام',
      location: formData.location,
      type: formData.type,
      typeLabel: typeLabels[formData.type] || 'دوام كامل',
      experience: formData.experience,
      salaryRange: formData.salaryRange,
      description: formData.description,
      responsibilities: formData.responsibilities.split('\n').filter(Boolean),
      requirements: formData.requirements.split('\n').filter(Boolean),
      benefits: formData.benefits.split('\n').filter(Boolean),
      isUrgent: formData.isUrgent,
      isRemote: formData.isRemote,
      postedAt: editingJob ? editingJob.postedAt : 'الآن'
    };

    if (editingJob) {
      onUpdateJob(jobPayload);
    } else {
      onAddJob(jobPayload);
    }

    setIsFormModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deletingJobId) {
      onDeleteJob(deletingJobId);
      setDeletingJobId(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold w-fit mb-2 border border-emerald-200">
            <Briefcase className="w-3.5 h-3.5" />
            <span>بوابة التوظيف وإدارة المرشحين (ATS)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Alexandria']">
            شواغر العمل والمتقدمين
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            إدارة الفرص الوظيفية المتاحة واستعراض السير الذاتية الواردة
          </p>
        </div>

        <div className="flex items-center gap-2">
          {subTab === 'listings' && (
            <button
              onClick={handleOpenAdd}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>طرح وظيفة جديدة</span>
            </button>
          )}
        </div>
      </div>

      {/* Sub-tab switcher */}
      <div className="flex rounded-2xl bg-white border border-slate-200 p-1.5 shadow-sm text-xs font-bold w-fit">
        <button
          onClick={() => setSubTab('listings')}
          className={`px-5 py-2 rounded-xl transition-all flex items-center gap-2 ${
            subTab === 'listings'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>الوظائف الشاغرة ({jobs.length})</span>
        </button>
        <button
          onClick={() => setSubTab('applicants')}
          className={`px-5 py-2 rounded-xl transition-all flex items-center gap-2 ${
            subTab === 'applicants'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>طلبات التوظيف المستلمة ({applications.length})</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={subTab === 'listings' ? 'بحث بالمسمى الوظيفي أو القسم...' : 'بحث باسم المتقدم أو الوظيفة...'}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Tab Content 1: Job Listings Table */}
      {subTab === 'listings' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                <tr>
                  <th className="p-4">المسمى الوظيفي</th>
                  <th className="p-4">القسم</th>
                  <th className="p-4">نطاق الراتب</th>
                  <th className="p-4">الموقع وطبيعة العمل</th>
                  <th className="p-4">تاريخ النشر</th>
                  <th className="p-4 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredJobs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-slate-400 text-xs">
                      لا توجد شواغر مطابقة لمعايير البحث.
                    </td>
                  </tr>
                ) : (
                  filteredJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{job.title}</span>
                          {job.isUrgent && (
                            <span className="text-[10px] px-2 py-0.2 rounded-full bg-rose-50 text-rose-700 font-bold border border-rose-200">
                              عاجل
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400">{job.experience}</span>
                      </td>

                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                          {job.departmentLabel}
                        </span>
                      </td>

                      <td className="p-4 font-bold text-slate-800 font-['Alexandria']">
                        {job.salaryRange}
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{job.location}</span>
                        </div>
                      </td>

                      <td className="p-4 text-slate-500 text-[11px]">
                        {job.postedAt}
                      </td>

                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleOpenEdit(job)}
                            title="تعديل الشاغر"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeletingJobId(job.id)}
                            title="حذف الشاغر"
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

      {/* Tab Content 2: Applicants ATS Table */}
      {subTab === 'applicants' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                <tr>
                  <th className="p-4">اسم المرشح</th>
                  <th className="p-4">الوظيفة المتقدم لها</th>
                  <th className="p-4">الخبرة</th>
                  <th className="p-4">بيانات الاتصال</th>
                  <th className="p-4">تاريخ التقديم</th>
                  <th className="p-4 text-center">الملف الكامل</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApplications.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-slate-400 text-xs">
                      لا توجد طلبات توظيف واردة حالياً.
                    </td>
                  </tr>
                ) : (
                  filteredApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-slate-900 text-sm">{app.fullName}</div>
                        <span className="text-[11px] text-slate-400">{app.email}</span>
                      </td>

                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold border border-slate-200">
                          {app.jobTitle}
                        </span>
                      </td>

                      <td className="p-4 font-semibold text-slate-700">
                        {app.experienceYears} سنوات
                      </td>

                      <td className="p-4 text-slate-600" dir="ltr">
                        {app.phone}
                      </td>

                      <td className="p-4 text-slate-500 text-[11px]">
                        {app.submittedAt}
                      </td>

                      <td className="p-4 text-center">
                        <button
                          onClick={() => setSelectedApplication(app)}
                          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1"
                        >
                          <FileText className="w-3.5 h-3.5 text-amber-400" />
                          <span>معاينة السيرة والبيانات</span>
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

      {/* Add / Edit Job Modal */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in" dir="rtl">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            <div className="bg-slate-900 p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-['Alexandria']">
                    {editingJob ? 'تعديل الشاغر الوظيفي' : 'طرح فرصة وظيفية جديدة'}
                  </h3>
                  <p className="text-xs text-slate-400">استقطاب الكفاءات الهندسية والاستشارية</p>
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
                  <label className="text-xs font-bold text-slate-700">المسمى الوظيفي *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="مثال: Senior Cloud Solutions Architect"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">القسم *</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 font-bold"
                  >
                    <option value="tech">التكنولوجيا والبرمجة</option>
                    <option value="marketing-sales">التسويق والمبيعات</option>
                    <option value="admin">الإدارة والسكرتارية</option>
                    <option value="finance">المالية والمحاسبة</option>
                    <option value="design-creative">التصميم والإبداع</option>
                    <option value="writing-translation">الكتابة والترجمة وصناعة المحتوى</option>
                    <option value="education">التعليم والتدريب</option>
                    <option value="logistics">الخدمات اللوجستية والنقل</option>
                    <option value="healthcare">الخدمات الصحية والطبية</option>
                    <option value="customer-support">خدمة العملاء والدعم</option>
                    <option value="remote-freelance">العمل الحر والعمل عن بُعد</option>
                    <option value="crafts">الحرف والمهن اليدوية</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">الموقع *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">نطاق الراتب *</label>
                  <input
                    type="text"
                    required
                    value={formData.salaryRange}
                    onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })}
                    placeholder="25,000 - 35,000 د.م"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 font-['Alexandria']"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">سنوات الخبرة</label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">نبذة تعريفية عن الدور *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">المسؤوليات الرئيسية (سطر لكل نقطة) *</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.responsibilities}
                    onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">المتطلبات والمهارات (سطر لكل نقطة) *</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={formData.isUrgent}
                    onChange={(e) => setFormData({ ...formData, isUrgent: e.target.checked })}
                    className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                  />
                  <span>شاغر عاجل (Urgent Hiring Badge)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={formData.isRemote}
                    onChange={(e) => setFormData({ ...formData, isRemote: e.target.checked })}
                    className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                  />
                  <span>متاح للعمل عن بُعد بالكامل</span>
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
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20"
                >
                  {editingJob ? 'حفظ التعديلات' : 'نشر الشاغر الآن'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Applicant Details Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in" dir="rtl">
          <div className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            <div className="bg-slate-900 p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-['Alexandria']">{selectedApplication.fullName}</h3>
                  <p className="text-xs text-slate-400">متقدم لوظيفة: {selectedApplication.jobTitle}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedApplication(null)}
                className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-xl"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              
              <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-slate-400 font-semibold block mb-1">البريد الإلكتروني:</span>
                  <span className="font-bold text-slate-900 select-all">{selectedApplication.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block mb-1">رقم الهاتف:</span>
                  <span className="font-bold text-slate-900 select-all" dir="ltr">{selectedApplication.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block mb-1">سنوات الخبرة:</span>
                  <span className="font-bold text-slate-900">{selectedApplication.experienceYears} سنوات</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block mb-1">تاريخ الإرسال:</span>
                  <span className="font-bold text-slate-900">{selectedApplication.submittedAt}</span>
                </div>
              </div>

              {selectedApplication.portfolioUrl && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-500 font-semibold">رابط معرض الأعمال / GitHub:</span>
                  <a
                    href={selectedApplication.portfolioUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-emerald-600 hover:underline flex items-center gap-1"
                  >
                    <span>فتح الرابط</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}

              {selectedApplication.coverLetter && (
                <div className="space-y-1">
                  <span className="font-bold text-slate-700">رسالة التقديم (Cover Letter):</span>
                  <p className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {selectedApplication.coverLetter}
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">الملف المرفق: {selectedApplication.resumeFileName || 'resume.pdf'}</span>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl"
                >
                  إغلاق
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Delete Job Dialog */}
      {deletingJobId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in" dir="rtl">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 border border-slate-200 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 font-['Alexandria']">تأكيد حذف الشاغر</h4>
              <p className="text-xs text-slate-500 mt-1">هل أنت متأكد من رغبتك في إغلاق وحذف هذا الشاغر الوظيفي؟</p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeletingJobId(null)}
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
