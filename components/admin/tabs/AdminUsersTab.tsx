import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  ShieldCheck, 
  Trash2, 
  UserCheck, 
  UserX, 
  X, 
  AlertTriangle,
  Lock,
  Copy,
  CheckCircle2
} from 'lucide-react';
import { AdminUser } from '../../../types';

interface AdminUsersTabProps {
  currentAdmin: AdminUser;
  admins: AdminUser[];
  onToggleStatus: (adminId: string, currentStatus: 'active' | 'inactive') => void;
  onDeleteAdmin: (adminId: string) => void;
}

const roleLabels: Record<string, string> = {
  super_admin: 'مدير عام المنظومة',
  editor: 'محرر ومسؤول محتوى',
  moderator: 'مسؤول المبيعات والمنتجات',
  support: 'مسؤول التوظيف والدعم'
};

// تنسيق التاريخ بشكل عربي مقروء
const formatDate = (value: string): string => {
  if (!value) return '—';
  const date = new Date(value);
  if (isNaN(date.getTime())) return value;
  return date.toLocaleDateString('ar-MA', { year: 'numeric', month: 'long', day: 'numeric' });
};

export const AdminUsersTab: React.FC<AdminUsersTabProps> = ({ currentAdmin, admins, onToggleStatus, onDeleteAdmin }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deletingAdminId, setDeletingAdminId] = useState<string | null>(null);
  const [generatedSql, setGeneratedSql] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const [newAdminData, setNewAdminData] = useState({
    email: '',
    role: 'editor' as AdminUser['role']
  });

  const isSuperAdmin = currentAdmin.role === 'super_admin';

  const filteredAdmins = admins.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleGenerateSql = (e: React.FormEvent) => {
    e.preventDefault();
    const email = newAdminData.email.trim();
    const role = newAdminData.role;
    const roleLabel = roleLabels[role];

    const sql = `-- بعد إنشاء حساب هذا الشخص يدوياً في Supabase (Authentication > Add user) بنفس هذا البريد،\n-- نفّذي هذا السكريبت لمنحه صلاحية الدخول إلى لوحة الإدارة:\n\ninsert into admins (id, name, email, role, role_label, status)\nselect id, split_part(email, '@', 1), email, '${role}', '${roleLabel}', 'active'\nfrom auth.users\nwhere email = '${email}'\non conflict (id) do nothing;`;

    setGeneratedSql(sql);
  };

  const handleCopy = () => {
    if (generatedSql) {
      navigator.clipboard.writeText(generatedSql);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const closeAddFlow = () => {
    setIsAddModalOpen(false);
    setGeneratedSql(null);
    setNewAdminData({ email: '', role: 'editor' });
  };

  const confirmDelete = () => {
    if (deletingAdminId) {
      onDeleteAdmin(deletingAdminId);
      setDeletingAdminId(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold w-fit mb-2 border border-blue-200">
            <Users className="w-3.5 h-3.5" />
            <span>إدارة صلاحيات الفريق والمشرفين</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Alexandria']">
            المستخدمين وأدوار الأمان (RBAC)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            تحديد مستويات الوصول، إضافة مشرفين جدد، ومراقبة نشاط تسجيل الدخول
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة مشرف جديد</span>
        </button>
      </div>

      {/* Filter and search */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث بالاسم أو البريد الإلكتروني..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="all">كل الأدوار الإدارية</option>
            <option value="super_admin">مدير عام</option>
            <option value="editor">محرر محتوى</option>
            <option value="moderator">مسؤول منتجات ومبيعات</option>
            <option value="support">مسؤول توظيف ودعم</option>
          </select>
        </div>
      </div>

      {!isSuperAdmin && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-800 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>يمكنك عرض قائمة الفريق فقط. تفعيل/تعطيل أو حذف مشرف متاح للمدير العام فقط.</span>
        </div>
      )}

      {/* Admins Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
              <tr>
                <th className="p-4">المشرف</th>
                <th className="p-4">الدور والصلاحية</th>
                <th className="p-4">الحالة</th>
                <th className="p-4">آخر تسجيل دخول</th>
                <th className="p-4">تاريخ الإنشاء</th>
                <th className="p-4 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAdmins.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400 text-xs">
                    لا يوجد مشرفون مطابقون لبحثك
                  </td>
                </tr>
              )}
              {filteredAdmins.map((admin) => (
                <tr key={admin.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 font-bold shrink-0">
                        {admin.name?.charAt(0)?.toUpperCase() || '؟'}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                          <span>{admin.name}</span>
                          {admin.id === currentAdmin.id && (
                            <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.2 rounded border border-amber-300">
                              أنت
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400">{admin.email}</span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                      admin.role === 'super_admin'
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : admin.role === 'editor'
                        ? 'bg-purple-50 text-purple-800 border-purple-200'
                        : admin.role === 'moderator'
                        ? 'bg-blue-50 text-blue-800 border-blue-200'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    }`}>
                      {admin.roleLabel}
                    </span>
                  </td>

                  <td className="p-4">
                    {admin.status === 'active' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>نشط ومفعّل</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                        <UserX className="w-3.5 h-3.5" />
                        <span>معطّل مؤقتاً</span>
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-slate-500 text-[11px]">
                    {formatDate(admin.lastLogin)}
                  </td>

                  <td className="p-4 text-slate-500 text-[11px]">
                    {formatDate(admin.createdAt)}
                  </td>

                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onToggleStatus(admin.id, admin.status)}
                        disabled={!isSuperAdmin}
                        title={admin.status === 'active' ? 'تعطيل الحساب' : 'تفعيل الحساب'}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-amber-700 hover:bg-amber-50 border border-slate-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Lock className="w-4 h-4" />
                      </button>
                      {admin.id !== currentAdmin.id && isSuperAdmin && (
                        <button
                          onClick={() => setDeletingAdminId(admin.id)}
                          title="حذف المشرف"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-700 hover:bg-rose-50 border border-slate-200 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Admin Assistant Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in" dir="rtl">
          <div className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

            <div className="bg-slate-900 p-5 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-['Alexandria']">إضافة مشرف جديد</h3>
                  <p className="text-xs text-slate-400">عملية من خطوتين لضمان الأمان</p>
                </div>
              </div>
              <button onClick={closeAddFlow} className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-xl">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 space-y-4">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl text-[11px] text-blue-800 leading-relaxed">
                لأسباب أمنية، لا يمكن إنشاء حساب دخول جديد مباشرة من الموقع. أنشئي حساب الشخص أولاً من{' '}
                <span className="font-bold">Supabase → Authentication → Add user</span>
                {', '}ثم استخدمي هذا المساعد لتوليد سكريبت ربطه بلوحة الإدارة بالدور المناسب.
              </div>

              {!generatedSql ? (
                <form onSubmit={handleGenerateSql} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">البريد الإلكتروني للمشرف (نفس بريد حساب Supabase) *</label>
                    <input
                      type="email"
                      required
                      value={newAdminData.email}
                      onChange={(e) => setNewAdminData({ ...newAdminData, email: e.target.value })}
                      placeholder="ahmed@example.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 text-left"
                      dir="ltr"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">الدور والصلاحيات *</label>
                    <select
                      value={newAdminData.role}
                      onChange={(e) => setNewAdminData({ ...newAdminData, role: e.target.value as any })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 font-bold"
                    >
                      <option value="super_admin">مدير عام المنظومة (كامل الصلاحيات)</option>
                      <option value="editor">محرر ومسؤول محتوى المدونة</option>
                      <option value="moderator">مسؤول المنتجات والمبيعات</option>
                      <option value="support">مسؤول التوظيف والدعم</option>
                    </select>
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button type="button" onClick={closeAddFlow} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl">
                      إلغاء
                    </button>
                    <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/20">
                      توليد السكريبت
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-slate-600">
                    ١. تأكدي أنك أنشأتِ حساب <span className="font-bold" dir="ltr">{newAdminData.email}</span> في Supabase Authentication.<br />
                    ٢. انسخي هذا السكريبت ونفّذيه في Supabase SQL Editor:
                  </p>
                  <div className="relative">
                    <pre className="bg-slate-900 text-emerald-300 text-[10px] p-4 rounded-2xl overflow-x-auto whitespace-pre-wrap text-left" dir="ltr">
                      {generatedSql}
                    </pre>
                    <button
                      onClick={handleCopy}
                      className="absolute top-2 left-2 p-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg"
                      title="نسخ"
                    >
                      {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    بعد التنفيذ الناجح، أغلقي هذه النافذة وحدّثي الصفحة ليظهر المشرف الجديد في القائمة.
                  </p>
                  <div className="flex justify-end">
                    <button onClick={closeAddFlow} className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl">
                      تم، إغلاق
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deletingAdminId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in" dir="rtl">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 border border-slate-200 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 font-['Alexandria']">تأكيد سحب الصلاحيات</h4>
              <p className="text-xs text-slate-500 mt-1">
                سيتم حذف صلاحية هذا الشخص من لوحة الإدارة (حساب دخوله في Supabase يبقى موجوداً، فقط يفقد الوصول للوحة).
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button onClick={() => setDeletingAdminId(null)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl">
                تراجع
              </button>
              <button onClick={confirmDelete} className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl">
                تأكيد الحذف
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
