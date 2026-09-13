import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, FileText, MapPin, Send, Upload } from 'lucide-react';
import { JobApplication, JobListing } from '../../types';
import { SeoMeta } from './SeoMeta';

interface JobPageProps {
  job: JobListing;
  onSubmitApplication: (application: JobApplication) => void;
}

export const JobPage: React.FC<JobPageProps> = ({ job, onSubmitApplication }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [experienceYears, setExperienceYears] = useState('+3 سنوات');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [resumeFileName, setResumeFileName] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [applicationSubmittedId, setApplicationSubmittedId] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!fullName || !email || !phone) return;
    const applicationId = `APP-${Math.floor(100000 + Math.random() * 900000)}`;
    onSubmitApplication({ id: applicationId, jobId: job.id, jobTitle: job.title, fullName, email, phone, experienceYears, portfolioUrl, linkedinUrl, resumeFileName: resumeFileName || 'السيرة_الذاتية.pdf', coverLetter, submittedAt: new Date().toISOString() });
    setApplicationSubmittedId(applicationId);
  };

  return (
    <article className="py-8 max-w-4xl mx-auto space-y-6">
      <SeoMeta title={`${job.title} | وظائف منصة النخبة`} description={job.description} />
      <Link to="/careers" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-300 hover:text-emerald-200"><ArrowLeft className="w-4 h-4" /> العودة إلى الوظائف</Link>
      {applicationSubmittedId ? (
        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 text-center space-y-4"><CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" /><h1 className="text-2xl font-black text-white">تم تقديم طلبك بنجاح!</h1><p className="text-sm text-slate-300">الرقم المرجعي للطلب: <span className="font-bold text-amber-400 font-mono">{applicationSubmittedId}</span></p></div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-7">
          <header className="space-y-3"><div className="flex flex-wrap gap-2"><span className="text-xs font-bold text-emerald-300 px-3 py-1 bg-emerald-500/20 rounded-full">{job.departmentLabel}</span><span className="text-xs text-slate-400 inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span></div><h1 className="text-3xl sm:text-4xl font-black text-white">{job.title}</h1><p className="text-sm font-bold text-amber-400">{job.salaryRange} · {job.typeLabel} · {job.experience}</p><p className="text-sm text-slate-300 leading-relaxed">{job.description}</p></header>
          <div className="space-y-4 text-sm text-slate-300"><InfoList title="المسؤوليات الرئيسية" items={job.responsibilities} /><InfoList title="المتطلبات والمهارات" items={job.requirements} /><InfoList title="المزايا والحوافز" items={job.benefits} /></div>
          <form onSubmit={handleSubmit} className="p-6 bg-slate-950 rounded-3xl border border-slate-800 space-y-4"><div className="flex items-center gap-2"><Send className="w-4 h-4 text-emerald-400" /><h2 className="text-base font-bold text-white">استمارة التقديم المباشر</h2></div><div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><Field label="الاسم الثلاثي *" value={fullName} onChange={setFullName} required /><Field label="البريد الإلكتروني *" type="email" value={email} onChange={setEmail} required /><Field label="رقم الهاتف *" value={phone} onChange={setPhone} required /><label className="block text-xs font-semibold text-slate-300">سنوات الخبرة<select value={experienceYears} onChange={(event) => setExperienceYears(event.target.value)} className="mt-1 w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"><option>حديث التخرج (0 - 1 سنة)</option><option>1 - 3 سنوات</option><option>+3 سنوات</option><option>+5 سنوات خبرة قيادية</option></select></label></div><div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><Field label="رابط معرض الأعمال / GitHub" type="url" value={portfolioUrl} onChange={setPortfolioUrl} /><Field label="حساب LinkedIn" type="url" value={linkedinUrl} onChange={setLinkedinUrl} /></div><label className="block text-xs font-semibold text-slate-300">السيرة الذاتية<input type="file" accept=".pdf,.doc,.docx" onChange={(event) => setResumeFileName(event.target.files?.[0]?.name || '')} className="mt-1 block w-full text-xs text-slate-400" /><span className="flex items-center gap-1 mt-1 text-[10px] text-slate-500"><Upload className="w-3.5 h-3.5" />{resumeFileName || 'صيغ مدعومة: PDF, DOCX'}</span></label><label className="block text-xs font-semibold text-slate-300">نبذة عن شغفك ولماذا Nexus؟<textarea rows={3} value={coverLetter} onChange={(event) => setCoverLetter(event.target.value)} className="mt-1 w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white resize-none" /></label><button type="submit" className="w-full py-3.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 text-slate-950 font-black rounded-xl text-sm">إرسال طلب التوظيف الآن</button></form>
        </div>
      )}
    </article>
  );
};

const InfoList: React.FC<{ title: string; items: string[] }> = ({ title, items }) => <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-2"><h2 className="font-bold text-white">{title}:</h2><ul className="list-disc list-inside space-y-1 text-slate-400">{items.map((item) => <li key={item}>{item}</li>)}</ul></div>;

const Field: React.FC<{ label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean }> = ({ label, value, onChange, type = 'text', required = false }) => <label className="block text-xs font-semibold text-slate-300">{label}<input type={type} required={required} value={value} onChange={(event) => onChange(event.target.value)} className="mt-1 w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" /></label>;
