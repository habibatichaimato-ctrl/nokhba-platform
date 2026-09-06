import React, { useEffect, useState } from 'react';
import { CalendarDays, Clock3, Eye, Globe2, MapPin, RefreshCw } from 'lucide-react';
import { supabase } from '../../../lib/supabaseClient';

interface VisitRow {
  country: string | null;
  city: string | null;
  created_at: string;
}

interface VisitStats {
  today: number;
  week: number;
  month: number;
}

interface CountryCount {
  country: string;
  count: number;
}

const getPeriodStart = (period: 'today' | 'week' | 'month'): string => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  if (period === 'week') {
    const day = date.getDay();
    const daysSinceMonday = day === 0 ? 6 : day - 1;
    date.setDate(date.getDate() - daysSinceMonday);
  }

  if (period === 'month') {
    date.setDate(1);
  }

  return date.toISOString();
};

const formatDateTime = (value: string): string => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString('ar-MA', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
};

export const AdminVisitsTab: React.FC = () => {
  const [stats, setStats] = useState<VisitStats>({ today: 0, week: 0, month: 0 });
  const [countryCounts, setCountryCounts] = useState<CountryCount[]>([]);
  const [latestVisits, setLatestVisits] = useState<VisitRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadVisitDetails = async () => {
    setIsLoading(true);
    setHasError(false);

    const runCountQuery = (start: string) =>
      supabase
        .from('visits')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', start);

    const todayStart = getPeriodStart('today');
    const weekStart = getPeriodStart('week');
    const monthStart = getPeriodStart('month');

    const countriesQuery = supabase.from('visits').select('country');

    const latestQuery = supabase
      .from('visits')
      .select('country, city, created_at')
      .order('created_at', { ascending: false })
      .limit(20);

    const [todayResult, weekResult, monthResult, countriesResult, latestResult] = await Promise.all([
      runCountQuery(todayStart),
      runCountQuery(weekStart),
      runCountQuery(monthStart),
      countriesQuery,
      latestQuery
    ]);

    if (todayResult.error) console.error('تعذر تحميل زيارات اليوم:', todayResult.error.message);
    if (weekResult.error) console.error('تعذر تحميل زيارات الأسبوع:', weekResult.error.message);
    if (monthResult.error) console.error('تعذر تحميل زيارات الشهر:', monthResult.error.message);
    if (countriesResult.error) console.error('تعذر تحميل توزيع الدول:', countriesResult.error.message);
    if (latestResult.error) console.error('تعذر تحميل آخر الزيارات:', latestResult.error.message);

    if (todayResult.error || weekResult.error || monthResult.error || countriesResult.error || latestResult.error) {
      setHasError(true);
      setIsLoading(false);
      return;
    }

    const groupedCountries = (countriesResult.data || []).reduce<Record<string, number>>((counts, row) => {
      const country = row.country?.trim() || 'غير محدد';
      counts[country] = (counts[country] || 0) + 1;
      return counts;
    }, {});

    setStats({
      today: todayResult.count || 0,
      week: weekResult.count || 0,
      month: monthResult.count || 0
    });
    setCountryCounts(
      Object.entries(groupedCountries)
        .map(([country, count]) => ({ country, count }))
        .sort((a, b) => b.count - a.count)
    );
    setLatestVisits((latestResult.data || []) as VisitRow[]);
    setIsLoading(false);
  };

  useEffect(() => {
    loadVisitDetails();
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-600 mb-1">
            <Eye className="w-4 h-4" />
            <span className="text-xs font-bold">تحليلات الجمهور</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Alexandria']">تفاصيل الزيارات</h2>
          <p className="text-xs text-slate-500 mt-1">متابعة الزيارات المسجلة من مختلف مناطق الموقع.</p>
        </div>
        <button
          onClick={loadVisitDetails}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50 text-xs font-bold transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>تحديث البيانات</span>
        </button>
      </div>

      {hasError && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-700">
          تعذر تحميل تفاصيل الزيارات حالياً. تحقق من صلاحيات جدول visits ثم أعد المحاولة.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'زيارات اليوم', value: stats.today, icon: Clock3, color: 'amber' },
          { label: 'زيارات هذا الأسبوع', value: stats.week, icon: CalendarDays, color: 'blue' },
          { label: 'زيارات هذا الشهر', value: stats.month, icon: Eye, color: 'indigo' }
        ].map((item) => {
          const Icon = item.icon;
          const colorClasses = item.color === 'amber'
            ? 'bg-amber-50 text-amber-700 border-amber-200'
            : item.color === 'blue'
              ? 'bg-blue-50 text-blue-700 border-blue-200'
              : 'bg-indigo-50 text-indigo-700 border-indigo-200';
          return (
            <div key={item.label} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-2xl border ${colorClasses}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-slate-400">محدث الآن</span>
              </div>
              <span className="text-xs font-medium text-slate-500">{item.label}</span>
              <div className="text-2xl font-black text-slate-900 font-['Alexandria'] mt-1">
                {isLoading ? '—' : item.value.toLocaleString('ar-MA')}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <section className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <Globe2 className="w-4 h-4 text-amber-600" />
            <h3 className="text-base font-bold text-slate-900 font-['Alexandria']">التوزيع حسب الدولة</h3>
          </div>
          <div className="space-y-3">
            {countryCounts.length === 0 && !isLoading && <p className="text-xs text-slate-400">لا توجد زيارات مسجلة بعد.</p>}
            {countryCounts.map((item) => (
              <div key={item.country} className="flex items-center justify-between gap-3 text-xs">
                <span className="font-semibold text-slate-700 truncate">{item.country}</span>
                <span className="shrink-0 rounded-lg bg-amber-50 border border-amber-200 px-2.5 py-1 font-bold text-amber-700">
                  {item.count.toLocaleString('ar-MA')} زيارة
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="lg:col-span-3 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 mb-5">
            <MapPin className="w-4 h-4 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900 font-['Alexandria']">آخر 20 زيارة</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400">
                  <th className="pb-3 font-semibold">الدولة</th>
                  <th className="pb-3 font-semibold">المدينة</th>
                  <th className="pb-3 font-semibold">التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {latestVisits.map((visit, index) => (
                  <tr key={`${visit.created_at}-${index}`} className="border-b border-slate-50 last:border-0">
                    <td className="py-3 font-semibold text-slate-700">{visit.country || 'غير محدد'}</td>
                    <td className="py-3 text-slate-500">{visit.city || 'غير محدد'}</td>
                    <td className="py-3 whitespace-nowrap text-slate-400">{formatDateTime(visit.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {latestVisits.length === 0 && !isLoading && <p className="pt-4 text-xs text-slate-400">لا توجد زيارات مسجلة بعد.</p>}
          </div>
        </section>
      </div>
    </div>
  );
};
