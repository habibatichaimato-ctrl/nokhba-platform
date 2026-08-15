import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, ArrowLeft, KeyRound, AlertCircle, Sparkles, X } from 'lucide-react';
import { AdminUser } from '../../types';
import { mockAdminUsers } from '../../data/mockAdminData';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AdminUser) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [email, setEmail] = useState('admin@nexus.dev');
  const [password, setPassword] = useState('••••••••');
  const [pinCode, setPinCode] = useState('');
  const [loginMethod, setLoginMethod] = useState<'password' | 'pin'>('password');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Demo authentication logic
      const foundUser = mockAdminUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());

      if (loginMethod === 'pin') {
        if (pinCode === '2026' || pinCode === '1234' || pinCode === '9999') {
          onLoginSuccess(mockAdminUsers[0]);
          return;
        } else {
          setError('رمز PIN غير صحيح. جرب الرمز السريع: 2026');
          return;
        }
      }

      if (foundUser || email.includes('nexus.dev') || email === 'admin@nexus.dev') {
        onLoginSuccess(foundUser || mockAdminUsers[0]);
      } else {
        setError('بيانات الاعتماد غير متطابقة مع سجلات المشرفين المعتمدين.');
      }
    }, 600);
  };

  const handleQuickDemoAccess = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(mockAdminUsers[0]);
    }, 350);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in" dir="rtl">
      <div className="relative w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
        
        {/* Top Header Banner */}
        <div className="bg-slate-900 p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-xl transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-400 font-['Alexandria']">بوابة الإدارة الآمنة</span>
              <h3 className="text-lg font-bold text-white font-['Alexandria']">تسجيل دخول المشرفين</h3>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            لوحة التحكم مخصصة لمدراء ومحرري منصة Nexus الرقمية لإدارة البيانات والمحتوى.
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Switcher */}
          <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-bold">
            <button
              type="button"
              onClick={() => setLoginMethod('password')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                loginMethod === 'password' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              البريد وكلمة المرور
            </button>
            <button
              type="button"
              onClick={() => setLoginMethod('pin')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                loginMethod === 'pin' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              رمز المشرف السريع (PIN)
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginMethod === 'password' ? (
              <>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">البريد الإلكتروني الإداري</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="admin@nexus.dev"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700">كلمة المرور</label>
                    <span className="text-[11px] text-amber-600 font-semibold cursor-pointer">مشفّرة بنظام 256-bit</span>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">رمز الدخول الآمن للمشرف (PIN Code)</label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    maxLength={6}
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    placeholder="أدخل رمز المشرف (مثال: 2026)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-3.5 py-2.5 text-center tracking-widest text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <p className="text-[11px] text-slate-400">رمز المشرف الافتراضي التجريبي: <strong>2026</strong></p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg shadow-amber-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>التحقق والدخول للوحة التحكم</span>
                  <ArrowLeft className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Access Button */}
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={handleQuickDemoAccess}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-850 text-amber-400 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 border border-slate-800"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>دخول سريع فوري كمدير عام (سارة المنصوري)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
