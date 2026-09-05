import React, { useState, useMemo } from 'react';
import { 
  Briefcase, 
  Search, 
  MapPin, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  X, 
  Send, 
  Upload, 
  FileText, 
  ArrowLeft,
  Flame,
  Globe2,
  Shield,
  Laptop
} from 'lucide-react';
import { JobListing, JobApplication } from '../../types';

interface CareersSectionProps {
  jobs: JobListing[];
  onSubmitApplication: (application: JobApplication) => void;
}

export const CareersSection: React.FC<CareersSectionProps> = ({
  jobs,
  onSubmitApplication
}) => {
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [remoteOnly, setRemoteOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeJobForModal, setActiveJobForModal] = useState<JobListing | null>(null);

  // Application form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [experienceYears, setExperienceYears] = useState('+3 سنوات');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [resumeFileName, setResumeFileName] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [applicationSubmittedId, setApplicationSubmittedId] = useState<string | null>(null);

  const departments = [
    { id: 'all', label: 'كافة الأقسام' },
    { id: 'tech', label: 'التكنولوجيا والبرمجة' },
    { id: 'marketing-sales', label: 'التسويق والمبيعات' },
    { id: 'admin', label: 'الإدارة والسكرتارية' },
    { id: 'finance', label: 'المالية والمحاسبة' },
    { id: 'design-creative', label: 'التصميم والإبداع' },
    { id: 'writing-translation', label: 'الكتابة والترجمة وصناعة المحتوى' },
    { id: 'education', label: 'التعليم والتدريب' },
    { id: 'logistics', label: 'الخدمات اللوجستية والنقل' },
    { id: 'healthcare', label: 'الخدمات الصحية والطبية' },
    { id: 'customer-support', label: 'خدمة العملاء والدعم' },
    { id: 'remote-freelance', label: 'العمل الحر والعمل عن بُعد' },
    { id: 'crafts', label: 'الحرف والمهن اليدوية' },
  ];

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesDept = selectedDept === 'all' || job.department === selectedDept;
      const matchesRemote = !remoteOnly || job.isRemote;
      const matchesSearch = 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.requirements.some(r => r.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesDept && matchesRemote && matchesSearch;
    });
  }, [jobs, selectedDept, remoteOnly, searchQuery]);

  const handleFileUploadSim = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeJobForModal || !fullName || !email || !phone) return;

    const appId = `APP-${Math.floor(100000 + Math.random() * 900000)}`;
    const applicationData: JobApplication = {
      id: appId,
      jobId: activeJobForModal.id,
      jobTitle: activeJobForModal.title,
      fullName,
      email,
      phone,
      experienceYears,
      portfolioUrl,
      linkedinUrl,
      resumeFileName: resumeFileName || 'السيرة_الذاتية.pdf',
      coverLetter,
      submittedAt: new Date().toISOString()
    };

    onSubmitApplication(applicationData);
    setApplicationSubmittedId(appId);
  };

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setPortfolioUrl('');
    setLinkedinUrl('');
    setResumeFileName('');
    setCoverLetter('');
    setApplicationSubmittedId(null);
  };

  return (
    <div className="py-8 space-y-10">
      {/* Careers Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/20 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>انضم لفريق النخبة للابتكار</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            ابنِ مستقبلك المهني مع رواد التكنولوجيا
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl">
            نوفر بيئة عمل مرنة عالمية المستوى، رواتب ومكافآت تنافسية، وتحديات تقنية تلهمك لتحقيق أقصى إمكانياتك.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2 bg-slate-950/60 px-3.5 py-2 rounded-xl border border-slate-800">
            <Laptop className="w-4 h-4 text-emerald-400" />
            <span>خيار العمل عن بُعد 100%</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-950/60 px-3.5 py-2 rounded-xl border border-slate-800">
            <Shield className="w-4 h-4 text-blue-400" />
            <span>تأمين صحي VIP ومزايا أسهم</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Department Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedDept(dept.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                selectedDept === dept.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 font-bold'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {dept.label}
            </button>
          ))}
        </div>

        {/* Remote Check & Search */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setRemoteOnly(!remoteOnly)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
              remoteOnly
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>عن بُعد فقط</span>
          </button>

          <div className="relative sm:w-64">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              id="careers-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بمسمى الوظيفة أو المهارة..."
              className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl pr-10 pl-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Jobs Listings List */}
      {filteredJobs.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/50 rounded-3xl border border-slate-800">
          <Briefcase className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">لا توجد وظائف مطابقة حالياً</h3>
          <p className="text-xs text-slate-400">تابعنا باستمرار حيث نقوم بإضافة فرص وظيفية جديدة أسبوعياً.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              id={`job-card-${job.id}`}
              className="group rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 p-6 sm:p-7 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              <div className="space-y-3 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-emerald-400 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                    {job.departmentLabel}
                  </span>
                  {job.isUrgent && (
                    <span className="text-xs font-bold text-rose-400 px-2.5 py-0.5 bg-rose-500/10 rounded-full border border-rose-500/20 flex items-center gap-1">
                      <Flame className="w-3 h-3 fill-rose-500" />
                      <span>توظيف عاجل</span>
                    </span>
                  )}
                  {job.isRemote && (
                    <span className="text-xs font-semibold text-blue-300 px-2.5 py-0.5 bg-blue-500/10 rounded-full border border-blue-500/20">
                      عن بُعد متاح
                    </span>
                  )}
                  <span className="text-xs text-slate-500">{job.postedAt}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {job.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-2">
                  {job.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{job.typeLabel} ({job.experience})</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                    <span>الراتب المقدر:</span>
                    <span className="font-['Alexandria']">{job.salaryRange}</span>
                  </div>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                <button
                  id={`apply-job-btn-${job.id}`}
                  onClick={() => {
                    resetForm();
                    setActiveJobForModal(job);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all flex items-center gap-2"
                >
                  <span>تقديم الطلب والتفاصيل</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Job Details & Application Modal */}
      {activeJobForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-y-auto max-h-[90vh] space-y-6">
            <button
              onClick={() => {
                setActiveJobForModal(null);
                resetForm();
              }}
              className="absolute top-4 left-4 p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>

            {applicationSubmittedId ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-white">تم تقديم طلبك بنجاح!</h3>
                <p className="text-sm text-slate-300">
                  الرقم المرجعي للطلب: <span className="font-bold text-amber-400 font-mono">{applicationSubmittedId}</span>
                </p>
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-right text-xs space-y-2 text-slate-300">
                  <p><span className="text-slate-400">الوظيفة:</span> <span className="font-bold text-white">{activeJobForModal.title}</span></p>
                  <p><span className="text-slate-400">المتقدم:</span> {fullName}</p>
                  <p><span className="text-slate-400">البريد الإلكتروني:</span> {email}</p>
                  <p className="text-emerald-400 pt-2 border-t border-slate-800">
                    سيقوم فريق الموارد البشرية في النخبة بمراجعة ملفك والتواصل معك خلال 48 ساعة.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveJobForModal(null);
                    resetForm();
                  }}
                  className="w-full py-3 bg-emerald-500 text-slate-950 font-bold rounded-xl text-sm"
                >
                  إغلاق وبدء استكشاف المزيد
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Header */}
                <div className="space-y-2 pr-2">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-bold text-emerald-300 px-3 py-1 bg-emerald-500/20 rounded-full">
                      {activeJobForModal.departmentLabel}
                    </span>
                    <span className="text-xs text-slate-400">{activeJobForModal.location}</span>
                  </div>
                  <h2 className="text-2xl font-black text-white">{activeJobForModal.title}</h2>
                  <p className="text-xs font-bold text-amber-400 font-['Alexandria']">{activeJobForModal.salaryRange}</p>
                </div>

                {/* Job Info Breakdown */}
                <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                  <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <h4 className="font-bold text-white text-sm">المسؤوليات الرئيسية:</h4>
                    <ul className="list-disc list-inside space-y-1 text-slate-400 pr-2">
                      {activeJobForModal.responsibilities.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <h4 className="font-bold text-white text-sm">المتطلبات والمهارات:</h4>
                    <ul className="list-disc list-inside space-y-1 text-slate-400 pr-2">
                      {activeJobForModal.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <h4 className="font-bold text-emerald-400 text-sm">المزايا والحوافز:</h4>
                    <ul className="list-disc list-inside space-y-1 text-slate-300 pr-2">
                      {activeJobForModal.benefits.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Direct Application Form */}
                <form onSubmit={handleSubmit} className="p-6 bg-slate-950 rounded-3xl border border-slate-800 space-y-4">
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-base font-bold text-white">استمارة التقديم المباشر</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">الاسم الثلاثي *</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="مثال: سارة محمد الغامدي"
                        className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">البريد الإلكتروني *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">رقم الهاتف *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="05XXXXXXXX"
                        className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">سنوات الخبرة</label>
                      <select
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none cursor-pointer"
                      >
                        <option value="حديث التخرج (0 - 1 سنة)">حديث التخرج (0 - 1 سنة)</option>
                        <option value="1 - 3 سنوات">1 - 3 سنوات</option>
                        <option value="+3 سنوات">+3 سنوات</option>
                        <option value="+5 سنوات">+5 سنوات خبرة قيادية</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">رابط معرض الأعمال / GitHub</label>
                      <input
                        type="url"
                        value={portfolioUrl}
                        onChange={(e) => setPortfolioUrl(e.target.value)}
                        placeholder="https://github.com/username"
                        className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">حساب LinkedIn</label>
                      <input
                        type="url"
                        value={linkedinUrl}
                        onChange={(e) => setLinkedinUrl(e.target.value)}
                        placeholder="https://linkedin.com/in/username"
                        className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* File Upload Simulation */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">السيرة الذاتية (CV / Resume)</label>
                    <div className="relative border-2 border-dashed border-slate-800 hover:border-emerald-500/60 rounded-2xl p-4 text-center cursor-pointer transition-colors bg-slate-900/50">
                      <input
                        type="file"
                        onChange={handleFileUploadSim}
                        accept=".pdf,.doc,.docx"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="flex flex-col items-center justify-center gap-1.5 text-xs text-slate-400">
                        <Upload className="w-5 h-5 text-emerald-400" />
                        {resumeFileName ? (
                          <span className="font-bold text-emerald-300 flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            {resumeFileName}
                          </span>
                        ) : (
                          <>
                            <span className="font-medium text-slate-300">انقر لرفع ملف السيرة الذاتية أو اسحبه هنا</span>
                            <span className="text-[10px] text-slate-500">صيغ مدعومة: PDF, DOCX (حتى 10MB)</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">نبذة عن شغفك ولماذا النخبة؟</label>
                    <textarea
                      rows={3}
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      placeholder="أخبرنا باختصار عن أبرز إنجازاتك وما يجعلك متحمساً للانضمام إلينا..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    id="submit-job-app-btn"
                    className="w-full py-3.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 text-slate-950 font-black rounded-xl text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all"
                  >
                    إرسال طلب التوظيف الآن
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
