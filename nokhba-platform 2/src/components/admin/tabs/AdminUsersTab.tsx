import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  ShieldCheck, 
  Edit3, 
  Trash2, 
  UserCheck, 
  UserX, 
  Key, 
  X, 
  AlertTriangle,
  Lock,
  Mail,
  Calendar
} from 'lucide-react';
import { AdminUser } from '../../../types';
import { mockAdminUsers } from '../../../data/mockAdminData';

interface AdminUsersTabProps {
  currentAdmin: AdminUser;
}

export const AdminUsersTab: React.FC<AdminUsersTabProps> = ({ currentAdmin }) => {
  const [users, setUsers] = useState<AdminUser[]>(mockAdminUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    role: 'editor' as AdminUser['role'],
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
  });

  const roleLabels: Record<string, string> = {
    super_admin: 'مدير عام المنظومة',
    editor: 'محرر ومسؤول محتوى',
    moderator: 'مسؤول المبيعات والمنتجات',
    support: 'مسؤول التوظيف والدعم'
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch = 
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleToggleStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' }
          : u
      )
    );
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: AdminUser = {
      id: `u-${Date.now()}`,
      name: newUserData.name,
      email: newUserData.email,
      role: newUserData.role,
      roleLabel: roleLabels[newUserData.role] || 'مشرف',
      avatar: newUserData.avatar,
      status: 'active',
      lastLogin: 'لم يسجل الدخول بعد',
      createdAt: 'اليوم'
    };

    setUsers([newUser, ...users]);
    setIsAddModalOpen(false);
    setNewUserData({
      name: '',
      email: '',
      role: 'editor',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
    });
  };

  const handleDeleteUser = () => {
    if (deletingUserId) {
      setUsers((prev) => prev.filter((u) => u.id !== deletingUserId));
      setDeletingUserId(null);
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
            تحديد مستويات الوصول، إنشاء حسابات المشرفين، ومراقبة نشاط تسجيل الدخول
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

      {/* Users Table */}
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
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                          <span>{user.name}</span>
                          {user.id === currentAdmin.id && (
                            <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.2 rounded border border-amber-300">
                              أنت
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400">{user.email}</span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                      user.role === 'super_admin'
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : user.role === 'editor'
                        ? 'bg-purple-50 text-purple-800 border-purple-200'
                        : user.role === 'moderator'
                        ? 'bg-blue-50 text-blue-800 border-blue-200'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    }`}>
                      {user.roleLabel}
                    </span>
                  </td>

                  <td className="p-4">
                    {user.status === 'active' ? (
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
                    {user.lastLogin}
                  </td>

                  <td className="p-4 text-slate-500 text-[11px]">
                    {user.createdAt}
                  </td>

                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleToggleStatus(user.id)}
                        title={user.status === 'active' ? 'تعطيل الحساب' : 'تفعيل الحساب'}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-amber-700 hover:bg-amber-50 border border-slate-200 transition-colors"
                      >
                        <Lock className="w-4 h-4" />
                      </button>
                      {user.id !== currentAdmin.id && (
                        <button
                          onClick={() => setDeletingUserId(user.id)}
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

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in" dir="rtl">
          <div className="relative w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col">
            
            <div className="bg-slate-900 p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-['Alexandria']">إضافة مشرف جديد</h3>
                  <p className="text-xs text-slate-400">تعيين الصلاحيات والوصول للمنصة</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-xl"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">الاسم الكامل *</label>
                <input
                  type="text"
                  required
                  value={newUserData.name}
                  onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                  placeholder="مثال: م. أحمد الشمري"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">البريد الإلكتروني المهني *</label>
                <input
                  type="email"
                  required
                  value={newUserData.email}
                  onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                  placeholder="ahmed@nexus.dev"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 text-left"
                  dir="ltr"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">الدور والصلاحيات *</label>
                <select
                  value={newUserData.role}
                  onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value as any })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 font-bold"
                >
                  <option value="super_admin">مدير عام المنظومة (كامل الصلاحيات)</option>
                  <option value="editor">محرر ومسؤول محتوى المدونة</option>
                  <option value="moderator">مسؤول المنتجات والمبيعات</option>
                  <option value="support">مسؤول التوظيف والدعم</option>
                </select>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/20"
                >
                  إنشاء الحساب
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deletingUserId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in" dir="rtl">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 border border-slate-200 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 font-['Alexandria']">تأكيد سحب الصلاحيات</h4>
              <p className="text-xs text-slate-500 mt-1">هل أنت متأكد من رغبتك في حذف حساب هذا المشرف نهائياً؟</p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeletingUserId(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
              >
                تراجع
              </button>
              <button
                onClick={handleDeleteUser}
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
