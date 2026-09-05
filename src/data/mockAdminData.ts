import { AdminUser, AdminNotification, AdminActivityLog } from '../types';

export const mockAdminUsers: AdminUser[] = [
  {
    id: 'u-1',
    name: 'سارة المنصوري',
    email: 'admin@nexus.dev',
    role: 'super_admin',
    roleLabel: 'مدير عام المنظومة',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    status: 'active',
    lastLogin: 'منذ 5 دقائق',
    createdAt: '2025-01-10'
  },
  {
    id: 'u-2',
    name: 'طارق الكندي',
    email: 'tariq@nexus.dev',
    role: 'editor',
    roleLabel: 'محرر ومسؤول محتوى',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: 'active',
    lastLogin: 'منذ ساعتين',
    createdAt: '2025-02-15'
  },
  {
    id: 'u-3',
    name: 'فيصل الغامدي',
    email: 'faisal@nexus.dev',
    role: 'moderator',
    roleLabel: 'مسؤول المبيعات والمنتجات',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    status: 'active',
    lastLogin: 'أمس، 4:30 م',
    createdAt: '2025-03-01'
  },
  {
    id: 'u-4',
    name: 'ريم العتيبي',
    email: 'reem@nexus.dev',
    role: 'support',
    roleLabel: 'مسؤولة التوظيف والدعم',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    status: 'active',
    lastLogin: 'منذ يومين',
    createdAt: '2025-03-20'
  }
];

export const mockAdminNotifications: AdminNotification[] = [
  {
    id: 'notif-1',
    title: 'طلب شراء جديد',
    message: 'تم إتمام عملية شراء بقيمة 4,899 د.م (محطة عمل Nexus Pro).',
    time: 'منذ 10 دقائق',
    read: false,
    type: 'order'
  },
  {
    id: 'notif-2',
    title: 'طلب توظيف جديد',
    message: 'قدم مهندس جديد على وظيفة "Senior Full-Stack Engineer".',
    time: 'منذ 45 دقيقة',
    read: false,
    type: 'career'
  },
  {
    id: 'notif-3',
    title: 'طلب عرض سعر استشاري',
    message: 'تم استلام طلب جديد لاستشارة أمنية سحابية من شركة التقنية الحديثة.',
    time: 'منذ ساعتين',
    read: false,
    type: 'service'
  },
  {
    id: 'notif-4',
    title: 'تحديث أمني ناجح',
    message: 'تم تحديث قواعد الأمان ومزامنة شهادات التشفير SSL بنجاح.',
    time: 'منذ يوم',
    read: true,
    type: 'system'
  }
];

export const mockActivityLogs: AdminActivityLog[] = [
  {
    id: 'act-1',
    adminName: 'سارة المنصوري',
    action: 'تحديث مواصفات المنتج',
    target: 'Nexus AI Neural Core',
    timestamp: 'منذ 15 دقيقة',
    category: 'product'
  },
  {
    id: 'act-2',
    adminName: 'طارق الكندي',
    action: 'نشر مقال جديد',
    target: 'بناء النظم الموزعة في العصر السحابي',
    timestamp: 'منذ ساعة',
    category: 'blog'
  },
  {
    id: 'act-3',
    adminName: 'ريم العتيبي',
    action: 'تحديث حالة متقدم لوظيفة',
    target: 'خالد الصالح (مهندس ذكاء اصطناعي)',
    timestamp: 'منذ 3 ساعات',
    category: 'job'
  },
  {
    id: 'act-4',
    adminName: 'سارة المنصوري',
    action: 'تعديل إعدادات التشفير',
    target: 'بروتوكول المصادقة الثنائية 2FA',
    timestamp: 'أمس، 2:15 م',
    category: 'security'
  }
];
