import { Product, BlogPost, JobListing, ServiceItem } from '../types';

export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'محطة العمل الذكية Nexus Studio Pro',
    nameEn: 'Nexus Studio Pro Hub',
    description: 'محطة إرساء وتوصيل متعددة المنافذ بقدرة 100W مع دعم شاشات 4K المزدوجة ونقل بيانات فائق السرعة بسرعة 40Gbps.',
    price: 499,
    originalPrice: 650,
    category: 'accessories',
    categoryLabel: 'ملحقات تقنية',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 128,
    inStock: true,
    featured: true,
    specs: {
      'المنافذ': '12 منفذ (Thunderbolt 4, HDMI 2.1, USB-C, SD 4.0)',
      'إمداد الطاقة': '100W Power Delivery',
      'دعم الشاشات': 'شاشتان بدقة 4K @ 60Hz أو شاشة 8K',
      'الخامة': 'ألومنيوم مؤكسد من الفئة الفضائية',
      'الضمان': 'سنتان شامل'
    },
    tags: ['أفضل مبيعاً', 'Thunderbolt', 'إنتاجية']
  },
  {
    id: 'prod-2',
    name: 'لوحة مفاتيح ميكانيكية لاسلكية Nexus Apex',
    nameEn: 'Nexus Apex Mechanical Keyboard',
    description: 'لوحة مفاتيح مخصصة للمطورين والمصممين بمفاتيح قابلة للتبديل السريع وإضاءة RGB ذكية وبطارية تدوم حتى 200 ساعة.',
    price: 349,
    originalPrice: 420,
    category: 'accessories',
    categoryLabel: 'ملحقات تقنية',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewsCount: 94,
    inStock: true,
    featured: true,
    specs: {
      'نوع المفاتيح': 'Gateron Pro Yellow (Hot-Swappable)',
      'التوصيل': 'Bluetooth 5.2 / 2.4GHz / USB-C',
      'التخطيط': '75% مع عجلة تحكم في الصوت متعددة الوظائف',
      'البطارية': '4000mAh',
      'التوافق': 'macOS / Windows / Linux'
    },
    tags: ['ميكانيكية', 'لاسلكي', 'إضاءة RGB']
  },
  {
    id: 'prod-3',
    name: 'مساعد الذكاء الاصطناعي المنزلي Nexus Core AI',
    nameEn: 'Nexus Core AI Smart Assistant',
    description: 'جهاز ذكاء اصطناعي محلي معالجة بدون إنترنت لحماية الخصوصية، تحكم متكامل بالأجهزة الذكية مع شاشة OLED تفاعلية.',
    price: 890,
    originalPrice: 1100,
    category: 'smart-devices',
    categoryLabel: 'أجهزة ذكية',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    rating: 4.95,
    reviewsCount: 76,
    inStock: true,
    featured: true,
    specs: {
      'المعالج': 'Nexus Neural NPU 16 TOPS',
      'الذاكرة': '8GB LPDDR5',
      'بروتوكولات الدعم': 'Matter / Zigbee 3.0 / Thread / Wi-Fi 6E',
      'الشاشة': '3.5 بوصة AMOLED دائرية تعمل باللمس',
      'الخصوصية': 'معالجة لغوية وصوتية محلية 100%'
    },
    tags: ['جديد', 'ذكاء اصطناعي', 'حماية الخصوصية']
  },
  {
    id: 'prod-4',
    name: 'سماعات رأس عازلة للضوضاء Nexus Silence Pro',
    nameEn: 'Nexus Silence Pro Headphones',
    description: 'سماعات احترافية بعزل ضوضاء هجين وصوت مكاني ثلاثي الأبعاد مع ميكروفونات استوديو لعقد الاجتماعات النقية.',
    price: 720,
    originalPrice: 850,
    category: 'wearables',
    categoryLabel: 'أجهزة قابلة للارتداء',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    rating: 4.7,
    reviewsCount: 210,
    inStock: true,
    featured: false,
    specs: {
      'مشغلات الصوت': '40mm Beryllium Drivers',
      'إلغاء الضوضاء': 'Hybrid Active Noise Cancelling حتى 45dB',
      'عمر البطارية': '45 ساعة تشغيل متواصل',
      'الشحن السريع': '10 دقائق شحن تعطي 5 ساعات استماع',
      'الترميز المدعوم': 'LDAC, aptX Adaptive, AAC'
    },
    tags: ['صوت عالي الدقة', 'عزل ضوضاء']
  },
  {
    id: 'prod-5',
    name: 'مفتاح أمان مادي Nexus Security Key FIDO2',
    nameEn: 'Nexus FIDO2 Hardware Key',
    description: 'مفتاح حماية ثنائي بيومتري بالأصمة لمنع الاختراقات وتأمين الحسابات السحابية ومصادقة WebAuthn/FIDO2.',
    price: 189,
    originalPrice: 220,
    category: 'hardware',
    categoryLabel: 'عتاد وأمان',
    image: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 312,
    inStock: true,
    featured: false,
    specs: {
      'المصادقة': 'بصمة إصبع مدمجة + NFC + USB-C',
      'المعايير': 'FIDO2 Level 3, WebAuthn, U2F, PIV',
      'مقاومة الماء': 'معيار IP68 ضد الغبار والماء',
      'الهيكل': 'مغنيسيوم عالي الصلابة'
    },
    tags: ['أمن سيبراني', 'حماية الحسابات']
  },
  {
    id: 'prod-6',
    name: 'حزمة رخص وتطوير برمجيات Nexus Dev Suite Enterprise',
    nameEn: 'Nexus Dev Suite License',
    description: 'اشتراك سنوي شامل لأدوات التحليل البرمجي، واجهات برمجة التطبيقات المتقدمة، وخدمات CI/CD السحابية الآمنة.',
    price: 1250,
    originalPrice: 1500,
    category: 'software',
    categoryLabel: 'برمجيات وأدوات',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    rating: 4.85,
    reviewsCount: 45,
    inStock: true,
    featured: false,
    specs: {
      'عدد المستخدمين': 'فريق حتى 10 مطورين',
      'سعة السحابة': '1TB مساحة استضافة وبناء سحابي',
      'الدعم الفني': 'دعم هندسي أولوية 24/7 SLA',
      'تحديثات': 'تحديثات مجانية مستمرة'
    },
    tags: ['ترخيص مؤسسي', 'برمجيات']
  }
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: 'post-1',
    title: 'مستقبل الذكاء الاصطناعي التوليدي في بيئات العمل المؤسسية 2026',
    excerpt: 'كيف تعيد الوكلاء البرمجية ونماذج الذكاء الاصطناعي المستقلة تشكيل العمليات الرقمية واتخاذ القرارات الإستراتيجية في الشرق الأوسط.',
    content: [
      'يشهد قطاع الأعمال اليوم قفزة نوعية غير مسبوقة مع الانتقال من روبوتات المحادثة البسيطة إلى وكلاء الذكاء الاصطناعي القادرين على أتمتة سلاسل المهام المعقدة بدقة متناهية.',
      'في منصة نيكسوس، رصدنا ارتفاعاً بنسبة 140% في اعتماد الشركات للحلول الذاتية في تحليل البيانات الضخمة وأتمتة العمليات المالية والخدمية.',
      'الركيزة الأساسية لنجاح هذا التحول تكمن في الحوكمة وحماية خصوصية البيانات المحلية مع دمج نماذج اللغة المخصصة للهجات واللغة العربية.'
    ],
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    author: {
      name: 'د. طارق الحازمي',
      role: 'كبير باحثي الذكاء الاصطناعي',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
    },
    category: 'ai',
    categoryLabel: 'الذكاء الاصطناعي',
    tags: ['AI', 'الأتمتة', 'المؤسسات', 'الابتكار'],
    readTime: '6 دقائق قراءة',
    publishedAt: '12 أغسطس 2026',
    likesCount: 342,
    viewsCount: 2840,
    featured: true,
    comments: [
      {
        id: 'c-1',
        author: 'م. خالد السبيعي',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        text: 'مقال دقيق وشامل جداً، نلاحظ هذا التغير بشكل ملموس في بيئة العمل لدينا خاصة في تسريع تدفق البيانات.',
        createdAt: 'منذ يومين'
      },
      {
        id: 'c-2',
        author: 'سارة المنصوري',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        text: 'نقطة حوكمة البيانات وأمان النماذج هي التحدي الأكبر حالياً، شكراً لطرح الحلول العملية.',
        createdAt: 'منذ يوم'
      }
    ]
  },
  {
    id: 'post-2',
    title: 'أفضل الممارسات لبناء أنظمة تصميم (Design Systems) متجاوبة مع RTL',
    excerpt: 'دليل هندسي وتصميمي شامل لتوحيد واجهات المستخدم وتجربة الاستخدام في التطبيقات متعددة اللغات مع التركيز على اللغة العربية.',
    content: [
      'يتطلب تصميم الواجهات الداعمة للغة العربية (RTL) أكثر من مجرد عكس اتجاه النصوص، بل يتطلب فهماً عميقاً للتسلسل البصري وحركة العين في الثقافة العربية.',
      'في هذا الدليل نستعرض كيفية التعامل مع الأيقونات الاتجاهية، الهوامش الرياضية الدقيقة، واختيار الخطوط التيبوغرافية التي تحافظ على التوازن البصري.'
    ],
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80',
    author: {
      name: 'ريم العتيبي',
      role: 'رئيسة تصميم المنتجات الرقمية',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80'
    },
    category: 'design',
    categoryLabel: 'تصميم الواجهات UI/UX',
    tags: ['UI/UX', 'Design Systems', 'RTL', 'تطوير الويب'],
    readTime: '8 دقائق قراءة',
    publishedAt: '10 أغسطس 2026',
    likesCount: 188,
    viewsCount: 1950,
    featured: false,
    comments: [
      {
        id: 'c-3',
        author: 'فهد العمراني',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        text: 'مقال أكثر من رائع! التحدي الأكبر كان دائماً الأيقونات التناظرية وغير التناظرية.',
        createdAt: 'منذ 3 أيام'
      }
    ]
  },
  {
    id: 'post-3',
    title: 'الأمن السيبراني السحابي: استراتيجية Zero Trust لحماية الأصول التقنية',
    excerpt: 'خطوات عملية لحماية البنية التحتية السحابية من التهديدات المتقدمة وتطبيق معايير الثقة الصفرية الصارمة.',
    content: [
      'تقوم فلسفة "انعدام الثقة" أو Zero Trust على مبدأ بسيط وحازم: لا تثق بأي مستخدم أو جهاز افتراضياً، وتحقق دائماً وبشكل مستمر.',
      'تطبيق المصادقة متعددة العوامل بالعتاد وتشفير البيانات المتنقلة والساكنة يمثل خط الدفاع الحاسم لأي مؤسسة حديثة.'
    ],
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80',
    author: {
      name: 'م. يوسف الغامدي',
      role: 'مستشار الأمن السحابي',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80'
    },
    category: 'cybersecurity',
    categoryLabel: 'الأمن السيبراني',
    tags: ['Zero Trust', 'Cloud Security', 'الحماية', 'DevSecOps'],
    readTime: '5 دقائق قراءة',
    publishedAt: '05 أغسطس 2026',
    likesCount: 220,
    viewsCount: 1720,
    featured: false,
    comments: []
  },
  {
    id: 'post-4',
    title: 'تطوير تطبيقات الويب الفائقة السرعة باستخدام بنية Micro-Frontends الحديثة',
    excerpt: 'كيفية تجزئة الأنظمة البرمجية الكبيرة إلى مكونات مستقلة وقابلة للتوسع والنشر اللحظي بدون توقف الخدمات.',
    content: [
      'مع نمو الفرق البرمجية وتوسع الأنظمة، تصبح التطبيقات الأحادية عائقاً أمام سرعة الإطلاق والابتكار.',
      'تمنح معمارية Micro-Frontends كل فريق حرية اختيار الأدوات والمكتبات المناسبة مع توحيد تجربة المستخدم النهائية.'
    ],
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
    author: {
      name: 'حمزة النجار',
      role: 'مهندس برمجيات أول',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80'
    },
    category: 'development',
    categoryLabel: 'البرمجة والتطوير',
    tags: ['React', 'Micro-Frontends', 'Architecture', 'TypeScript'],
    readTime: '7 دقائق قراءة',
    publishedAt: '01 أغسطس 2026',
    likesCount: 295,
    viewsCount: 2410,
    featured: false,
    comments: []
  }
];

export const mockJobListings: JobListing[] = [
  {
    id: 'job-1',
    title: 'مطور واجهات أمامية أول (Senior Full-Stack Engineer)',
    department: 'engineering',
    departmentLabel: 'الهندسة والبرمجيات',
    location: 'الرياض، المملكة العربية السعودية / عن بُعد',
    type: 'full-time',
    typeLabel: 'دوام كامل',
    experience: '+4 سنوات خبرة',
    salaryRange: '22,000 - 30,000 ر.س / شهرياً',
    description: 'نبحث عن مهندس برمجيات أول للانضمام إلى فريق المنصات الأساسية في Nexus للمساهمة في بناء بنية تحتية سحابية فائقة الأداء وتطوير بوابات رقمية تخدم ملايين المستخدمين.',
    responsibilities: [
      'تصميم وتطوير واجهات مستخدم تفاعلية وعالية الأداء باستخدام React و TypeScript و Next.js',
      'بناء واجهات برمجة تطبيقات RESTful و GraphQL سريعة وقابلة للتوسع باستخدام Node.js/Go',
      'كتابة اختبارات أوتوماتيكية شاملة وضمان جودة الكود والأمان وفق أعلى المعايير',
      'توجيه المهندسين المبتدئين والمشاركة الفعالة في مراجعات الكود والمعمارية البرمجية'
    ],
    requirements: [
      'خبرة عملية مثبتة لا تقل عن 4 سنوات في تطوير تطبيقات الويب الحديثة',
      'إتقان عميق لـ TypeScript و React و State Management وأنظمة التصميم',
      'معرفة ممتازة بقواعد البيانات (PostgreSQL / Redis / MongoDB) والبيئات السحابية (GCP / AWS)',
      'شغف بالدقة البصرية والاهتمام البالغ بتجربة المستخدم وسرعة الاستجابة'
    ],
    benefits: [
      'مرونة كاملة في العمل عن بُعد أو من مكاتبنا الفاخرة في الرياض',
      'تأمين صحي عائلي شامل فئة VIP (بوبا)',
      'ميزانية سنوية مخصصة للتعلم والتطوير وحضور المؤتمرات العالمية (15,000 ر.س)',
      'حوافز ومكافآت أداء سنوية وخطة تملك أسهم للموظفين (ESOP)'
    ],
    isUrgent: true,
    isRemote: true,
    postedAt: 'منذ 3 أيام'
  },
  {
    id: 'job-2',
    title: 'مصمم تجربة وواجهات مستخدم (Lead UI/UX Designer)',
    department: 'design',
    departmentLabel: 'التصميم وتجربة المستخدم',
    location: 'دبي، الإمارات العربية المتحدة / هجين',
    type: 'full-time',
    typeLabel: 'دوام كامل',
    experience: '+5 سنوات خبرة',
    salaryRange: '25,000 - 34,000 د.إ / شهرياً',
    description: 'نقود تشكيل الهوية البصرية وتجربة الاستخدام لكافة منتجات Nexus الرقمية. ستقود فريق التصميم لوضع معايير هندسية وجمالية مبتكرة للأسواق العربية والعالمية.',
    responsibilities: [
      'قيادة صياغة وتطوير نظام التصميم (Nexus Design System) الشامل للمنصة وتطبيقات الجوال',
      'إجراء بحوث المستخدم واختبارات القابلية للتشغيل وتحويل الرؤى إلى تدفقات ونماذج أولية مبهرة',
      'التعاون الوثيق مع مدراء المنتجات وفرق الهندسة لضمان التطبيق الأمثل للمخرجات التصميمية'
    ],
    requirements: [
      'معرض أعمال استثنائي يوضح حلول تصميمية لتطبيقات معقدة تدعم اللغتين العربية والإنجليزية',
      'إتقان Figma، أدوات النمذجة الحركية (Protopie / Framer)، وفهم مبادئ الكود الأمامي',
      'مهارات تواصل وقيادة ممتازة والقدرة على شرح القرارات التصميمية استناداً إلى البيانات'
    ],
    benefits: [
      'بيئة عمل إبداعية ملهمة مع أحدث أجهزة Apple وشاشات احترافية',
      'ساعات عمل مرنة ومكافأة سنوية مجزية',
      'تذاكر سفر سنوية وتأمين صحي دولي'
    ],
    isUrgent: false,
    isRemote: false,
    postedAt: 'منذ أسبوع'
  },
  {
    id: 'job-3',
    title: 'مهندس ذكاء اصطناعي وتعلم آلي (AI/ML Engineer)',
    department: 'engineering',
    departmentLabel: 'الهندسة والبرمجيات',
    location: 'الرياض / عن بُعد بالكامل',
    type: 'full-time',
    typeLabel: 'دوام كامل',
    experience: '+3 سنوات خبرة',
    salaryRange: '26,000 - 36,000 ر.س / شهرياً',
    description: 'المساهمة في بناء وتدريب وتطويع نماذج الذكاء الاصطناعي التوليدية المخصصة لحلول الأعمال ومحركات التوصية في Nexus Platform.',
    responsibilities: [
      'تطوير وتطبيق تقنيات استرجاع المعلومات المعزز بالتوليد (RAG) وتخصيص نماذج LLMs',
      'بناء أنابيب معالجة البيانات وتدريب النماذج ومراقبة أدائها في بيئات الإنتاج السحابية',
      'تحسين زمن استجابة الاستدلال (Inference Latency) وتحسين التكلفة التشغيلية للنماذج'
    ],
    requirements: [
      'درجة البكالوريوس أو الماجستير في علوم الحاسب أو الذكاء الاصطناعي أو مجال ذي صلة',
      'خبرة عملية مع PyTorch أو TensorFlow ومكتبات HuggingFace و LangChain و vLLM',
      'خبرة في قواعد البيانات المتجهة (Vector Databases مثل Qdrant / Pinecone / pgvector)'
    ],
    benefits: [
      'عمل عن بعد 100% مع دعم إنشاء بيئة مكتبك المنزلي بالكامل',
      'وصول غير محدود لأحدث مسرعات الحوسبة السحابية (H100 / A100 Clusters)',
      'بدلات تعليم ومؤتمرات سنوية'
    ],
    isUrgent: true,
    isRemote: true,
    postedAt: 'منذ يومين'
  },
  {
    id: 'job-4',
    title: 'مدير تسويق رقمي ونمو (Growth & Marketing Lead)',
    department: 'marketing',
    departmentLabel: 'التسويق والنمو',
    location: 'الرياض، المملكة العربية السعودية',
    type: 'full-time',
    typeLabel: 'دوام كامل',
    experience: '+4 سنوات خبرة',
    salaryRange: '18,000 - 25,000 ر.س / شهرياً',
    description: 'قيادة حملات التسويق الرقمي واستراتيجيات اكتساب العملاء والنمو لمنصة المتجر الإلكتروني والخدمات التقنية.',
    responsibilities: [
      'تخطيط وتنفيذ حملات الأداء الرقمي (Meta, Google Ads, TikTok, LinkedIn) مع تحسين ROI',
      'إدارة استراتيجيات تحسين محركات البحث (SEO) وتسويق المحتوى العربي الاحترافي',
      'تحليل مسارات التحويل وتطبيق تجارب A/B لزيادة معدلات التحويل والاحتفاظ'
    ],
    requirements: [
      'سجل مثبت في مضاعفة أرقام النمو والتحويل في منصات التجارة الإلكترونية أو SaaS',
      'إتقان أدوات التحليلات (GA4, Mixpanel, Hotjar) ومنصات إدارة الإعلانات الرقمية'
    ],
    benefits: [
      'مكافآت شهرية وسنوية مرتبطة مباشرة بتحقيق أهداف النمو',
      'تأمين طبي فئة ممتازة وبدل مواصلات وسكن'
    ],
    isUrgent: false,
    isRemote: false,
    postedAt: 'منذ 5 أيام'
  }
];

export const mockServices: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'تطوير المنصات والتطبيقات الرقمية الشاملة',
    subtitle: 'بناء حلول برمجية مخصصة وعالية الأداء تلبي احتياجات نمو أعمالك',
    description: 'نقوم بهندسة وتطوير تطبيقات الويب والهواتف الذكية المؤسسية من الصفر بأحدث التقنيات مع بنية تحتية سحابية آمنة تضمن أعلى معايير الاستقرار والسرعة وتجربة مستخدم لا تضاهى.',
    iconName: 'Code2',
    category: 'software',
    categoryLabel: 'تطوير البرمجيات',
    startingPrice: 15000,
    deliveryTime: '4 - 8 أسابيع',
    features: [
      'معمارية سحابية قابلة للتوسع اللانهائي',
      'واجهات تفاعلية تدعم اللغة العربية والإنجليزية ببراعة',
      'لوحات تحكم إدارية متقدمة مع تقارير وإحصائيات فورية',
      'تكامل كامل مع بوابات الدفع الإلكتروني (مدى، آبل باي، فيزا)',
      'كود نظيف موثق بالكامل مع اختبارات جودة آلية'
    ],
    deliverables: [
      'الكود المصدري الكامل للمشروع (Full Source Code)',
      'توثيق تقني معماري وشرح واجهات برمجة التطبيقات (API Docs)',
      'نشر المشروع على بيئة الإنتاج السحابية (AWS / GCP / Cloudflare)',
      'دعم فني وصيانة مجانية لمدة 3 أشهر بعد الإطلاق'
    ],
    tags: ['Full Stack', 'Web & Mobile', 'Cloud Native', 'API'],
    popular: true
  },
  {
    id: 'srv-2',
    title: 'حلول الذكاء الاصطناعي وأتمتة العمليات الذكية',
    subtitle: 'دمج تقنيات الذكاء الاصطناعي التوليدي والوكلاء الذاتية لرفع كفاءة أعمالك',
    description: 'نساعد الشركات على توظيف أحدث نماذج الذكاء الاصطناعي (LLMs) ونظم استرجاع المعرفة المخصصة (RAG) لأتمتة خدمة العملاء، تحليل الوثائق الضخمة، وتوليد التقارير التنبؤية.',
    iconName: 'Bot',
    category: 'ai',
    categoryLabel: 'ذكاء اصطناعي وأتمتة',
    startingPrice: 18000,
    deliveryTime: '3 - 6 أسابيع',
    features: [
      'وكلاء ذكاء اصطناعي مخصصين مدربين على بيانات ومعارف شركتك',
      'نظام دردشة ومساعدة افتراضي يدعم اللهجات العربية بدقة بالغة',
      'أتمتة استخراج وتصنيف البيانات من الفواتير والعقود والملفات',
      'حماية تامة وسرية مطلقة للبيانات دون مشاركتها مع أطراف ثالثة'
    ],
    deliverables: [
      'نماذج ووكلاء ذكاء اصطناعي جاهزة للعمل ومربوطة بنظامك',
      'لوحة مراقبة للأداء وجودة الإجابات ومعدلات الاستخدام',
      'جلسات تدريبية لفريق العمل ودليل استخدام تفصيلي'
    ],
    tags: ['GenAI', 'LLMs', 'RAG', 'Automation'],
    popular: true
  },
  {
    id: 'srv-3',
    title: 'تصميم أنظمة الهوية وتجربة المستخدم UI/UX Systems',
    subtitle: 'تحويل الأفكار المعقدة إلى واجهات جذابة وسلسة تسحر عملائك',
    description: 'نبتكر تجارب استخدام فريدة مدروسة بعناية تستند إلى سيكولوجية المستخدم وبحوث السوق، مع بناء أنظمة تصميم متكاملة (Design Systems) تسرّع دورة التطوير وتحافظ على اتساق هويتك.',
    iconName: 'Palette',
    category: 'design',
    categoryLabel: 'التصميم وتجربة المستخدم',
    startingPrice: 9500,
    deliveryTime: '2 - 4 أسابيع',
    features: [
      'بحوث ميدانية للمستخدمين وتحليل المنافسين ومسارات التجربة',
      'نماذج تفاعلية عالية الدقة (Interactive Prototypes) على Figma',
      'نظام تصميم شامل يضم كافة المكونات (Buttons, Inputs, Modals, Cards)',
      'دعم كامل لاتجاه RTL والخطوط العربية الحديثة والوضع المظلم'
    ],
    deliverables: [
      'ملفات Figma المصدرية المنظمة وفق أفضل المعايير العالمية',
      'مكتبة المكونات الرقمية مع إرشادات الاستخدام وتناسق الألوان',
      'تصدير الأصول الرقمية والأيقونات بجودة عالية'
    ],
    tags: ['UI/UX', 'Figma', 'Design System', 'Prototyping'],
    popular: false
  },
  {
    id: 'srv-4',
    title: 'الاستشارات السحابية والأمن السيبراني المؤسسي',
    subtitle: 'تدقيق أمني شامل وترقية البنية التحتية السحابية وفق معايير الحماية العالمية',
    description: 'نقدم تقييمات واختبارات اختراق دورية (Penetration Testing) وتصميم بنية تحتية سحابية عالية التوافر (High Availability) تضمن الامتثال لضوابط الهيئة الوطنية للأمن السيبراني (NCA).',
    iconName: 'ShieldCheck',
    category: 'security',
    categoryLabel: 'الأمن السحابي والاستشارات',
    startingPrice: 12000,
    deliveryTime: '2 - 5 أسابيع',
    features: [
      'فحص واختبار الثغرات الأمنية للتطبيقات والخوادم السحابية',
      'تهيئة بنية تحتية مقاومة لهجمات حجب الخدمة (DDoS Mitigation)',
      'إعداد سياسات النسخ الاحتياطي التلقائي والتعافي من الكوارث (DRP)',
      'تقرير امتثال وتوصيات فورية لإغلاق أي فجوات أمنية'
    ],
    deliverables: [
      'تقرير أمني تنفيذي وفني تفصيلي مع تصنيف درجات الخطورة',
      'خطة عمل علاجية ومساعدة الفرق الهندسية في تطبيق الإصلاحات',
      'شهادة تدقيق أمني من Nexus Cyber Team'
    ],
    tags: ['Cybersecurity', 'Cloud Ops', 'Penetration Testing', 'NCA'],
    popular: false
  }
];
