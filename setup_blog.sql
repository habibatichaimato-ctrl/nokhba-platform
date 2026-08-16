-- ============================================
-- إعداد قاعدة بيانات المدونة لمنصة نُخبة
-- ============================================

-- 1) جدول المقالات
create table if not exists blog_posts (
  id text primary key,
  title text not null,
  excerpt text not null,
  content jsonb not null default '[]',
  cover_image text,
  author jsonb not null default '{}',
  category text not null,
  category_label text not null,
  tags jsonb not null default '[]',
  read_time text,
  published_at text,
  likes_count int not null default 0,
  views_count int not null default 0,
  featured boolean default false,
  comments jsonb not null default '[]',
  created_at timestamptz not null default now()
);

-- تفعيل الحماية (RLS) على الجدول
alter table blog_posts enable row level security;

-- السماح للجميع بقراءة المقالات فقط (لا تعديل ولا حذف من الواجهة العامة)
drop policy if exists "public can read blog posts" on blog_posts;
create policy "public can read blog posts"
on blog_posts for select
to anon
using (true);

-- 2) دالة آمنة لإضافة تعليق على مقال (بدون السماح بتعديل أي شيء آخر)
create or replace function add_blog_comment(p_post_id text, p_comment jsonb)
returns void
language plpgsql
security definer
as $$
begin
  update blog_posts
  set comments = jsonb_build_array(p_comment) || comments
  where id = p_post_id;
end;
$$;

grant execute on function add_blog_comment(text, jsonb) to anon;

-- 3) دالة آمنة لتبديل الإعجاب بمقال (بدون السماح بتعديل أي شيء آخر)
create or replace function toggle_blog_like(p_post_id text)
returns void
language plpgsql
security definer
as $$
begin
  update blog_posts
  set likes_count = case
    when likes_count % 2 = 1 then likes_count - 1
    else likes_count + 1
  end
  where id = p_post_id;
end;
$$;

grant execute on function toggle_blog_like(text) to anon;

-- ============================================
-- إدخال المقالات الحالية كبداية
-- ============================================

INSERT INTO blog_posts (id, title, excerpt, content, cover_image, author, category, category_label, tags, read_time, published_at, likes_count, views_count, featured, comments) VALUES (
  'post-1',
  'مستقبل الذكاء الاصطناعي التوليدي في بيئات العمل المؤسسية 2026',
  'كيف تعيد الوكلاء البرمجية ونماذج الذكاء الاصطناعي المستقلة تشكيل العمليات الرقمية واتخاذ القرارات الإستراتيجية في الشرق الأوسط.',
  '["يشهد قطاع الأعمال اليوم قفزة نوعية غير مسبوقة مع الانتقال من روبوتات المحادثة البسيطة إلى وكلاء الذكاء الاصطناعي القادرين على أتمتة سلاسل المهام المعقدة بدقة متناهية.","في منصة نيكسوس، رصدنا ارتفاعاً بنسبة 140% في اعتماد الشركات للحلول الذاتية في تحليل البيانات الضخمة وأتمتة العمليات المالية والخدمية.","الركيزة الأساسية لنجاح هذا التحول تكمن في الحوكمة وحماية خصوصية البيانات المحلية مع دمج نماذج اللغة المخصصة للهجات واللغة العربية."]'::jsonb,
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
  '{"name":"د. طارق الحازمي","role":"كبير باحثي الذكاء الاصطناعي","avatar":"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"}'::jsonb,
  'ai',
  'الذكاء الاصطناعي',
  '["AI","الأتمتة","المؤسسات","الابتكار"]'::jsonb,
  '6 دقائق قراءة',
  '12 أغسطس 2026',
  342,
  2840,
  true,
  '[{"id":"c-1","author":"م. خالد السبيعي","avatar":"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80","text":"مقال دقيق وشامل جداً، نلاحظ هذا التغير بشكل ملموس في بيئة العمل لدينا خاصة في تسريع تدفق البيانات.","createdAt":"منذ يومين"},{"id":"c-2","author":"سارة المنصوري","avatar":"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80","text":"نقطة حوكمة البيانات وأمان النماذج هي التحدي الأكبر حالياً، شكراً لطرح الحلول العملية.","createdAt":"منذ يوم"}]'::jsonb
) ON CONFLICT (id) DO NOTHING;

INSERT INTO blog_posts (id, title, excerpt, content, cover_image, author, category, category_label, tags, read_time, published_at, likes_count, views_count, featured, comments) VALUES (
  'post-2',
  'أفضل الممارسات لبناء أنظمة تصميم (Design Systems) متجاوبة مع RTL',
  'دليل هندسي وتصميمي شامل لتوحيد واجهات المستخدم وتجربة الاستخدام في التطبيقات متعددة اللغات مع التركيز على اللغة العربية.',
  '["يتطلب تصميم الواجهات الداعمة للغة العربية (RTL) أكثر من مجرد عكس اتجاه النصوص، بل يتطلب فهماً عميقاً للتسلسل البصري وحركة العين في الثقافة العربية.","في هذا الدليل نستعرض كيفية التعامل مع الأيقونات الاتجاهية، الهوامش الرياضية الدقيقة، واختيار الخطوط التيبوغرافية التي تحافظ على التوازن البصري."]'::jsonb,
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80',
  '{"name":"ريم العتيبي","role":"رئيسة تصميم المنتجات الرقمية","avatar":"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80"}'::jsonb,
  'design',
  'تصميم الواجهات UI/UX',
  '["UI/UX","Design Systems","RTL","تطوير الويب"]'::jsonb,
  '8 دقائق قراءة',
  '10 أغسطس 2026',
  188,
  1950,
  false,
  '[{"id":"c-3","author":"فهد العمراني","avatar":"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80","text":"مقال أكثر من رائع! التحدي الأكبر كان دائماً الأيقونات التناظرية وغير التناظرية.","createdAt":"منذ 3 أيام"}]'::jsonb
) ON CONFLICT (id) DO NOTHING;

INSERT INTO blog_posts (id, title, excerpt, content, cover_image, author, category, category_label, tags, read_time, published_at, likes_count, views_count, featured, comments) VALUES (
  'post-3',
  'الأمن السيبراني السحابي: استراتيجية Zero Trust لحماية الأصول التقنية',
  'خطوات عملية لحماية البنية التحتية السحابية من التهديدات المتقدمة وتطبيق معايير الثقة الصفرية الصارمة.',
  '["تقوم فلسفة \"انعدام الثقة\" أو Zero Trust على مبدأ بسيط وحازم: لا تثق بأي مستخدم أو جهاز افتراضياً، وتحقق دائماً وبشكل مستمر.","تطبيق المصادقة متعددة العوامل بالعتاد وتشفير البيانات المتنقلة والساكنة يمثل خط الدفاع الحاسم لأي مؤسسة حديثة."]'::jsonb,
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80',
  '{"name":"م. يوسف الغامدي","role":"مستشار الأمن السحابي","avatar":"https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80"}'::jsonb,
  'cybersecurity',
  'الأمن السيبراني',
  '["Zero Trust","Cloud Security","الحماية","DevSecOps"]'::jsonb,
  '5 دقائق قراءة',
  '05 أغسطس 2026',
  220,
  1720,
  false,
  '[]'::jsonb
) ON CONFLICT (id) DO NOTHING;

INSERT INTO blog_posts (id, title, excerpt, content, cover_image, author, category, category_label, tags, read_time, published_at, likes_count, views_count, featured, comments) VALUES (
  'post-4',
  'تطوير تطبيقات الويب الفائقة السرعة باستخدام بنية Micro-Frontends الحديثة',
  'كيفية تجزئة الأنظمة البرمجية الكبيرة إلى مكونات مستقلة وقابلة للتوسع والنشر اللحظي بدون توقف الخدمات.',
  '["مع نمو الفرق البرمجية وتوسع الأنظمة، تصبح التطبيقات الأحادية عائقاً أمام سرعة الإطلاق والابتكار.","تمنح معمارية Micro-Frontends كل فريق حرية اختيار الأدوات والمكتبات المناسبة مع توحيد تجربة المستخدم النهائية."]'::jsonb,
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
  '{"name":"حمزة النجار","role":"مهندس برمجيات أول","avatar":"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80"}'::jsonb,
  'development',
  'البرمجة والتطوير',
  '["React","Micro-Frontends","Architecture","TypeScript"]'::jsonb,
  '7 دقائق قراءة',
  '01 أغسطس 2026',
  295,
  2410,
  false,
  '[]'::jsonb
) ON CONFLICT (id) DO NOTHING;

