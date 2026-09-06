import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2.5">
            {type === 'privacy' ? (
              <ShieldCheck className="w-5 h-5 text-amber-600" />
            ) : (
              <FileText className="w-5 h-5 text-amber-600" />
            )}
            <h2 className="text-lg font-bold text-slate-900 font-['Alexandria']">
              {type === 'privacy' ? 'سياسة الخصوصية' : 'الشروط والأحكام'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-5 text-sm leading-relaxed text-slate-600">
          {type === 'privacy' ? <PrivacyContent /> : <TermsContent />}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 text-center shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition-colors"
          >
            فهمت، إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

const PrivacyContent: React.FC = () => (
  <>
    <p className="text-xs text-slate-400">آخر تحديث: {new Date().toLocaleDateString('ar')}</p>

    <p>
      تحترم <strong>منصة نيكسوس (Nexus Platform)</strong> (يُشار إليها فيما يلي بـ "المنصة"، "نحن") خصوصية مستخدميها، وتلتزم بحماية بياناتهم الشخصية وفق هذه السياسة.
    </p>

    <h3 className="font-bold text-slate-900 text-base pt-2">١. البيانات التي نجمعها</h3>
    <ul className="list-disc pr-5 space-y-1">
      <li>بيانات الحساب: الاسم، البريد الإلكتروني، رقم الهاتف.</li>
      <li>بيانات الطلبات: عنوان التوصيل، المدينة، تفاصيل المنتجات المطلوبة.</li>
      <li>بيانات التوظيف: السيرة الذاتية، رابط ملف الأعمال، سنوات الخبرة عند التقديم على وظيفة.</li>
      <li>بيانات التصفح: نوع الجهاز والمتصفح، لأغراض تحسين الأداء فقط.</li>
    </ul>

    <h3 className="font-bold text-slate-900 text-base pt-2">٢. كيف نستخدم بياناتك</h3>
    <ul className="list-disc pr-5 space-y-1">
      <li>تنفيذ ومتابعة طلبات الشراء وتوصيلها.</li>
      <li>التواصل معك بخصوص طلبات التوظيف أو عروض الأسعار للخدمات.</li>
      <li>إرسال النشرة البريدية عند اشتراكك الطوعي بها فقط.</li>
      <li>تحسين المنصة وتجربة الاستخدام.</li>
    </ul>

    <h3 className="font-bold text-slate-900 text-base pt-2">٣. مشاركة البيانات</h3>
    <p>
      لا نبيع بياناتك الشخصية لأي طرف ثالث. قد تتم مشاركة بيانات التوصيل فقط مع شركات الشحن المعتمدة لغرض إيصال طلبك، وبيانات الدفع مع مزوّد خدمة الدفع الإلكتروني المعتمد.
    </p>

    <h3 className="font-bold text-slate-900 text-base pt-2">٤. حماية البيانات</h3>
    <p>
      تُخزَّن بياناتك على خوادم مشفّرة (SSL) وقواعد بيانات محمية بصلاحيات وصول مقيّدة، ولا يمكن لأي زائر عادي الاطلاع عليها.
    </p>

    <h3 className="font-bold text-slate-900 text-base pt-2">٥. حقوقك</h3>
    <p>
      يحق لك في أي وقت طلب الاطلاع على بياناتك المخزّنة لدينا، تصحيحها، أو طلب حذفها نهائياً، عبر التواصل معنا على البريد الإلكتروني الموضح في أسفل الموقع.
    </p>

    <h3 className="font-bold text-slate-900 text-base pt-2">٦. ملفات تعريف الارتباط (Cookies)</h3>
    <p>
      نستخدم ملفات تعريف ارتباط أساسية لتشغيل سلة التسوق وجلسة تسجيل الدخول فقط، وليس لأغراض تتبع إعلاني.
    </p>

    <h3 className="font-bold text-slate-900 text-base pt-2">٧. التعديلات على هذه السياسة</h3>
    <p>
      قد يتم تحديث هذه السياسة من وقت لآخر، وسيُنشر أي تعديل جوهري على هذه الصفحة مع تاريخ التحديث.
    </p>
  </>
);

const TermsContent: React.FC = () => (
  <>
    <p className="text-xs text-slate-400">آخر تحديث: {new Date().toLocaleDateString('ar')}</p>

    <p>
      يُرجى قراءة هذه الشروط بعناية قبل استخدام منصة نيكسوس. استخدامك للمنصة يعني موافقتك الكاملة على هذه الشروط.
    </p>

    <h3 className="font-bold text-slate-900 text-base pt-2">١. عن المنصة</h3>
    <p>
      <strong>منصة نيكسوس (Nexus Platform)</strong> هي منصة رقمية تجمع متجراً إلكترونياً، مدونة، بوابة توظيف، وخدمات تقنية.
    </p>

    <h3 className="font-bold text-slate-900 text-base pt-2">٢. الحسابات</h3>
    <ul className="list-disc pr-5 space-y-1">
      <li>يجب تقديم معلومات صحيحة وحديثة عند إنشاء حساب أو تقديم طلب.</li>
      <li>أنت مسؤول عن الحفاظ على سرية بيانات دخولك إن وُجدت.</li>
    </ul>

    <h3 className="font-bold text-slate-900 text-base pt-2">٣. الطلبات والدفع</h3>
    <ul className="list-disc pr-5 space-y-1">
      <li>الأسعار المعروضة نهائية وتشمل ما هو موضح في صفحة المنتج، ما لم يُذكر خلاف ذلك.</li>
      <li>يُعتبر الطلب مؤكَّداً فقط بعد ظهور رسالة تأكيد الطلب.</li>
      <li>نحتفظ بالحق في رفض أو إلغاء أي طلب في حالة نفاد الكمية أو خطأ واضح في السعر أو الوصف.</li>
    </ul>

    <h3 className="font-bold text-slate-900 text-base pt-2">٤. التوصيل والإرجاع</h3>
    <p>
      تختلف مدة التوصيل حسب المدينة والمنتج. لطلبات الإرجاع أو الاستبدال، يُرجى التواصل معنا خلال المدة الموضحة عند الشراء مع الاحتفاظ بالمنتج بحالته الأصلية.
    </p>

    <h3 className="font-bold text-slate-900 text-base pt-2">٥. طلبات التوظيف</h3>
    <p>
      تقديمك على أي وظيفة عبر المنصة لا يشكّل التزاماً بالتوظيف من طرفنا. يحتفظ فريق التوظيف بحق التواصل مع المرشحين المناسبين فقط.
    </p>

    <h3 className="font-bold text-slate-900 text-base pt-2">٦. الملكية الفكرية</h3>
    <p>
      جميع المحتويات المنشورة على المنصة (نصوص، تصاميم، شعارات) محمية بحقوق الملكية الفكرية، ولا يجوز نسخها أو إعادة نشرها دون إذن كتابي مسبق.
    </p>

    <h3 className="font-bold text-slate-900 text-base pt-2">٧. حدود المسؤولية</h3>
    <p>
      نبذل قصارى جهدنا لضمان دقة المعلومات المعروضة، لكننا لا نتحمل مسؤولية أي أضرار غير مباشرة ناتجة عن استخدام المنصة خارج نطاق سيطرتنا المعقول.
    </p>

    <h3 className="font-bold text-slate-900 text-base pt-2">٨. القانون الواجب التطبيق</h3>
    <p>
      تخضع هذه الشروط وتُفسَّر وفقاً لقوانين <strong>المملكة المغربية</strong>، وأي نزاع يُحال إلى المحاكم المختصة فيها.
    </p>
  </>
);
