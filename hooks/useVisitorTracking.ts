import { useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

let visitorTrackingStarted = false;

interface VisitorLocation {
  country: string | null;
  country_code: string | null;
  city: string | null;
  timezone: { id: string } | null;
}

// نحاول معرفة دولة/مدينة الزائر، لكن بمهلة قصوى (2.5 ثانية) حتى لا تتحكم خدمة خارجية
// في مصير تسجيل الزيارة. أي فشل هنا (تعطل الخدمة، حظر من إضافة خصوصية، بطء الشبكة...)
// يُرجع كائناً فارغاً بهدوء تام، ولا يوقف عملية التسجيل إطلاقاً.
const fetchVisitorLocation = async (): Promise<Partial<VisitorLocation>> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 2500);

  try {
    const response = await fetch('https://ipwho.is/', { signal: controller.signal });
    if (!response.ok) return {};

    const data: VisitorLocation = await response.json();
    return {
      country: data.country || null,
      country_code: data.country_code || null,
      city: data.city || null,
      timezone: data.timezone || null
    };
  } catch {
    // معرفة الموقع الجغرافي معلومة إضافية وليست شرطاً لتسجيل الزيارة
    return {};
  } finally {
    clearTimeout(timeoutId);
  }
};

export const useVisitorTracking = (): void => {
  useEffect(() => {
    if (visitorTrackingStarted || sessionStorage.getItem('nokhba_visit_logged')) return;
    visitorTrackingStarted = true;
    sessionStorage.setItem('nokhba_visit_logged', 'pending');

    const trackVisitor = async () => {
      // الخطوة 1: محاولة إثراء البيانات بالدولة/المدينة (لا تعطّل ما يلي إن فشلت)
      const location = await fetchVisitorLocation();

      // الخطوة 2: تسجيل الزيارة في قاعدة البيانات - يحدث دائماً، بالدولة إن توفرت أو بدونها
      try {
        const { error } = await supabase.from('visits').insert({
          country: location.country ?? null,
          country_code: location.country_code ?? null,
          city: location.city ?? null,
          timezone: location.timezone?.id ?? null,
          page_path: window.location.pathname,
          referrer: document.referrer || null
        });

        if (error) {
          console.error('تعذر تسجيل الزيارة في قاعدة البيانات:', error.message);
          sessionStorage.removeItem('nokhba_visit_logged');
          visitorTrackingStarted = false;
          return;
        }

        sessionStorage.setItem('nokhba_visit_logged', 'true');
      } catch (err) {
        console.error('خطأ غير متوقع أثناء تسجيل الزيارة:', err);
        sessionStorage.removeItem('nokhba_visit_logged');
        visitorTrackingStarted = false;
      }
    };

    trackVisitor();
  }, []);
};
