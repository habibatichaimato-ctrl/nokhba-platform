import React, { useState, useEffect, useMemo } from 'react';
import { 
  NavSection, 
  CartItem, 
  Product, 
  BlogPost, 
  JobListing, 
  JobApplication, 
  ToastMessage,
  AdminTab,
  AdminUser,
  OrderDetails,
  AdminNotification
} from './types';
import { mockProducts, mockBlogPosts, mockJobListings } from './data/mockData';
import { supabase } from './lib/supabaseClient';
import { mockAdminUsers } from './data/mockAdminData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModal';
import { HeroSection } from './components/HeroSection';
import { PlatformStatsBento } from './components/PlatformStatsBento';
import { EcommerceSection } from './components/ecommerce/EcommerceSection';
import { BlogSection } from './components/blog/BlogSection';
import { CareersSection } from './components/careers/CareersSection';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { ToastContainer } from './components/Toast';

// Admin Components
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminOverviewTab } from './components/admin/tabs/AdminOverviewTab';
import { AdminProductsTab } from './components/admin/tabs/AdminProductsTab';
import { AdminBlogTab } from './components/admin/tabs/AdminBlogTab';
import { AdminCareersTab } from './components/admin/tabs/AdminCareersTab';
import { AdminUsersTab } from './components/admin/tabs/AdminUsersTab';
import { AdminSettingsTab } from './components/admin/tabs/AdminSettingsTab';
import { AdminVisitsTab } from './components/admin/tabs/AdminVisitsTab';
import { useVisitorTracking } from './hooks/useVisitorTracking';
import { ShieldCheck, Lock, ArrowLeft } from 'lucide-react';

// تنسيق الوقت النسبي بالعربية (منذ 10 دقائق، أمس...) لاستخدامه في التنبيهات الحقيقية
const formatRelativeTime = (value: string): string => {
  const date = new Date(value);
  if (isNaN(date.getTime())) return value;
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'الآن';
  if (diffMin < 60) return `منذ ${diffMin} دقيقة`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `منذ ${diffHours} ساعة`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return 'أمس';
  return `منذ ${diffDays} يوم`;
};

export default function App() {
  // تسجيل زيارة المنصة تلقائياً (مرة واحدة لكل جلسة متصفح)، دون التأثير على بقية التطبيق
  useVisitorTracking();

  const [activeSection, setActiveSection] = useState<NavSection>('home');

  // إعدادات المنصة الحقيقية (اسم المنصة، البريد، العملة، الضريبة، وضع الصيانة)
  const [platformSettings, setPlatformSettings] = useState({
    platformName: 'Nexus Platform',
    supportEmail: 'contact@nexus.dev',
    currency: 'MAD',
    vatRate: 15,
    maintenanceMode: false
  });

  // تحميل إعدادات المنصة الحقيقية (متاحة للجميع، لأن وضع الصيانة يجب أن يظهر حتى للزوار غير المسجّلين)
  useEffect(() => {
    const loadSettings = async () => {
      const { data, error } = await supabase
        .from('platform_settings')
        .select('*')
        .eq('id', 1)
        .single();

      if (error) {
        console.error('تعذر تحميل إعدادات المنصة:', error.message);
        return;
      }

      if (data) {
        setPlatformSettings({
          platformName: data.platform_name,
          supportEmail: data.support_email,
          currency: data.currency,
          vatRate: Number(data.vat_rate),
          maintenanceMode: data.maintenance_mode
        });
      }
    };
    loadSettings();
  }, []);

  // حفظ إعدادات المنصة الحقيقية في قاعدة البيانات
  const handleSavePlatformSettings = (updated: typeof platformSettings) => {
    setPlatformSettings(updated);

    supabase.from('platform_settings').update({
      platform_name: updated.platformName,
      support_email: updated.supportEmail,
      currency: updated.currency,
      vat_rate: updated.vatRate,
      maintenance_mode: updated.maintenanceMode,
      updated_at: new Date().toISOString()
    }).eq('id', 1).then(({ error }) => {
      if (error) {
        console.error('تعذر حفظ إعدادات المنصة:', error.message);
        addToast('error', 'فشل حفظ الإعدادات', 'لم يتم حفظ التعديلات في قاعدة البيانات، يرجى المحاولة مرة أخرى.');
        return;
      }
      addToast('success', 'تم حفظ الإعدادات', 'تم تحديث إعدادات المنصة بنجاح في قاعدة البيانات.');
    });
  };
  
  // Platform Core Entities State
  const [products, setProducts] = useState<Product[]>(mockProducts);

  // تحميل المنتجات من قاعدة البيانات الحقيقية (Supabase) عند فتح الموقع
  useEffect(() => {
    const loadProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('تعذر تحميل المنتجات من قاعدة البيانات:', error.message);
        return;
      }

      if (data) {
        const mapped: Product[] = data.map((row: any) => ({
          id: row.id,
          name: row.name,
          nameEn: row.name_en,
          description: row.description,
          price: row.price,
          originalPrice: row.original_price,
          category: row.category,
          categoryLabel: row.category_label,
          image: row.image,
          rating: row.rating,
          reviewsCount: row.reviews_count,
          inStock: row.in_stock,
          featured: row.featured,
          specs: row.specs,
          tags: row.tags
        }));
        setProducts(mapped);
      }
    };

    loadProducts();
  }, []);

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(mockBlogPosts);

  // تحميل المقالات من قاعدة البيانات الحقيقية (Supabase) عند فتح الموقع
  useEffect(() => {
    const loadBlogPosts = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('تعذر تحميل المقالات من قاعدة البيانات:', error.message);
        return;
      }

      if (data) {
        const mapped: BlogPost[] = data.map((row: any) => ({
          id: row.id,
          title: row.title,
          excerpt: row.excerpt,
          content: row.content,
          coverImage: row.cover_image,
          author: row.author,
          category: row.category,
          categoryLabel: row.category_label,
          tags: row.tags,
          readTime: row.read_time,
          publishedAt: row.published_at,
          likesCount: row.likes_count,
          viewsCount: row.views_count,
          featured: row.featured,
          comments: row.comments
        }));
        setBlogPosts(mapped);
      }
    };

    loadBlogPosts();
  }, []);

  const [jobs, setJobs] = useState<JobListing[]>(mockJobListings);

  // تحميل الوظائف من قاعدة البيانات الحقيقية (Supabase) عند فتح الموقع
  useEffect(() => {
    const loadJobs = async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('تعذر تحميل الوظائف من قاعدة البيانات:', error.message);
        return;
      }

      if (data) {
        const mapped: JobListing[] = data.map((row: any) => ({
          id: row.id,
          title: row.title,
          department: row.department,
          departmentLabel: row.department_label,
          location: row.location,
          type: row.type,
          typeLabel: row.type_label,
          experience: row.experience,
          salaryRange: row.salary_range,
          description: row.description,
          responsibilities: row.responsibilities,
          requirements: row.requirements,
          benefits: row.benefits,
          isUrgent: row.is_urgent,
          isRemote: row.is_remote,
          postedAt: row.posted_at
        }));
        setJobs(mapped);
      }
    };

    loadJobs();
  }, []);


  // Incoming User Submissions for ATS
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);

  // Admin Auth & Navigation
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  const [orders, setOrders] = useState<OrderDetails[]>([]);
  const [teamAdmins, setTeamAdmins] = useState<AdminUser[]>([]);
  const [readNotificationIds, setReadNotificationIds] = useState<Set<string>>(new Set());

  // تحميل طلبات التوظيف من قاعدة البيانات الحقيقية (Supabase) - تظهر فقط للأدمن المسجل دخوله
  useEffect(() => {
    const loadJobApplications = async () => {
      const { data, error } = await supabase
        .from('job_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('تعذر تحميل طلبات التوظيف من قاعدة البيانات:', error.message);
        return;
      }

      if (data) {
        const mapped: JobApplication[] = data.map((row: any) => ({
          id: row.id,
          jobId: row.job_id,
          jobTitle: row.job_title,
          fullName: row.full_name,
          email: row.email,
          phone: row.phone,
          experienceYears: row.experience_years,
          portfolioUrl: row.portfolio_url,
          linkedinUrl: row.linkedin_url,
          resumeFileName: row.resume_file_name,
          coverLetter: row.cover_letter,
          submittedAt: row.submitted_at
        }));
        setJobApplications(mapped);
      }
    };

    if (currentAdmin) {
      loadJobApplications();
    }
  }, [currentAdmin]);

  const [adminTab, setAdminTab] = useState<AdminTab>('overview');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [adminAuthChecked, setAdminAuthChecked] = useState(false);

  // دالة مساعدة: تجلب بيانات الأدمن الحقيقية من جدول admins
  const loadAdminProfile = async (userId: string, userEmail: string) => {
    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('id', userId)
      .single();

    if (error || !data) {
      console.error('تعذر جلب بيانات الأدمن من قاعدة البيانات:', error?.message);
      // قيمة احتياطية إذا لم يوجد سجل بعد في جدول admins
      setCurrentAdmin({
        id: userId,
        name: userEmail.split('@')[0] || 'مشرف',
        email: userEmail,
        role: 'support',
        roleLabel: 'غير محدد',
        avatar: '',
        status: 'active',
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString()
      });
      return;
    }

    setCurrentAdmin({
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
      roleLabel: data.role_label,
      avatar: data.avatar,
      status: data.status,
      lastLogin: data.last_login,
      createdAt: data.created_at
    });

    loadOrders();
    loadTeamAdmins();
    loadReadNotifications(userId);
  };

  // تحميل قائمة معرّفات التنبيهات التي سبق لهذا الأدمن تحديداً أن قرأها
  const loadReadNotifications = async (adminId: string) => {
    const { data, error } = await supabase
      .from('read_notifications')
      .select('notification_id')
      .eq('admin_id', adminId);

    if (error) {
      console.error('تعذر تحميل حالة قراءة التنبيهات:', error.message);
      return;
    }

    if (data) {
      setReadNotificationIds(new Set(data.map((row: any) => row.notification_id)));
    }
  };

  // تعيين مجموعة تنبيهات كمقروءة بشكل دائم، لكل أدمن على حدة
  const handleMarkAllNotificationsRead = (ids: string[]) => {
    if (!currentAdmin || ids.length === 0) return;

    setReadNotificationIds((prev) => new Set([...prev, ...ids]));

    const rows = ids.map((id) => ({ admin_id: currentAdmin.id, notification_id: id }));
    supabase.from('read_notifications').upsert(rows, { onConflict: 'admin_id,notification_id' }).then(({ error }) => {
      if (error) {
        console.error('تعذر حفظ حالة قراءة التنبيهات:', error.message);
        addToast('error', 'فشل الحفظ', 'تعذر حفظ حالة قراءة التنبيهات بشكل دائم، يرجى المحاولة مرة أخرى.');
      }
    });
  };

  // تحميل قائمة المشرفين الحقيقية من جدول admins
  const loadTeamAdmins = async () => {
    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('تعذر تحميل قائمة المشرفين:', error.message);
      return;
    }

    if (data) {
      const mapped: AdminUser[] = data.map((row: any) => ({
        id: row.id,
        name: row.name,
        email: row.email,
        role: row.role,
        roleLabel: row.role_label,
        avatar: row.avatar,
        status: row.status,
        lastLogin: row.last_login,
        createdAt: row.created_at
      }));
      setTeamAdmins(mapped);
    }
  };

  // تفعيل/تعطيل حساب مشرف (فقط المدير العام يقدر على مشرف آخر بموجب RLS)
  const handleToggleAdminStatus = (adminId: string, currentStatus: 'active' | 'inactive') => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    setTeamAdmins((prev) => prev.map((a) => (a.id === adminId ? { ...a, status: newStatus } : a)));

    supabase.from('admins').update({ status: newStatus }).eq('id', adminId).then(({ error }) => {
      if (error) {
        console.error('تعذر تحديث حالة المشرف:', error.message);
        addToast('error', 'فشل تحديث الحالة', 'لم يتم حفظ التغيير في قاعدة البيانات، يرجى المحاولة مرة أخرى.');
        loadTeamAdmins();
        return;
      }
      addToast('success', 'تم تحديث الحالة', 'تم تحديث حالة المشرف بنجاح.');
    });
  };

  // حذف مشرف من جدول admins (لا يحذف حساب الدخول نفسه، فقط صلاحيته)
  const handleDeleteAdmin = (adminId: string) => {
    setTeamAdmins((prev) => prev.filter((a) => a.id !== adminId));

    supabase.from('admins').delete().eq('id', adminId).then(({ error }) => {
      if (error) {
        console.error('تعذر حذف المشرف:', error.message);
        addToast('error', 'فشل حذف المشرف', 'لم يتم حذف المشرف من قاعدة البيانات، يرجى المحاولة مرة أخرى.');
        loadTeamAdmins();
        return;
      }
      addToast('warning', 'تم سحب الصلاحيات', 'تم حذف المشرف من جدول الإدارة بنجاح.');
    });
  };

  // تحميل الطلبات الحقيقية من قاعدة البيانات (متاح للأدمن فقط بموجب RLS)
  const loadOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('تعذر تحميل الطلبات من قاعدة البيانات:', error.message);
      return;
    }

    if (data) {
      const mapped: OrderDetails[] = data.map((row: any) => ({
        id: row.id,
        items: row.items,
        subtotal: row.subtotal,
        discount: row.discount,
        total: row.total,
        customer: {
          name: row.customer_name,
          email: row.customer_email,
          phone: row.customer_phone,
          city: row.customer_city,
          address: row.customer_address,
          paymentMethod: row.payment_method
        },
        createdAt: row.created_at
      }));
      setOrders(mapped);
    }
  };

  // التحقق من وجود جلسة دخول حقيقية عند فتح الموقع
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        loadAdminProfile(data.session.user.id, data.session.user.email || '');
      }
      setAdminAuthChecked(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        loadAdminProfile(session.user.id, session.user.email || '');
      } else {
        setCurrentAdmin(null);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('nexus_cart');
      return saved ? JSON.parse(saved) : [
        { product: mockProducts[0], quantity: 1 }
      ];
    } catch {
      return [{ product: mockProducts[0], quantity: 1 }];
    }
  });

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persist Products, Blogs, Jobs to LocalStorage for full persistence
  useEffect(() => {
    try {
      localStorage.setItem('nexus_blogs', JSON.stringify(blogPosts));
      localStorage.setItem('nexus_cart', JSON.stringify(cart));
    } catch {}
  }, [products, blogPosts, jobs, cart]);

  // Keyboard shortcut for search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsCartOpen(false);
        setIsLoginModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addToast = (type: 'success' | 'info' | 'warning' | 'error', title: string, message: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleNavigate = (section: NavSection) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
    addToast('success', 'تمت الإضافة إلى السلة', `تمت إضافة "${product.name}" بنجاح.`);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    addToast('info', 'تم التحديث', 'تم إزالة المنتج من سلة التسوق.');
  };

  const handleCheckout = (orderDetails: OrderDetails) => {
    supabase.from('orders').insert({
      id: orderDetails.id,
      items: orderDetails.items,
      subtotal: orderDetails.subtotal,
      discount: orderDetails.discount,
      total: orderDetails.total,
      customer_name: orderDetails.customer.name,
      customer_email: orderDetails.customer.email,
      customer_phone: orderDetails.customer.phone,
      customer_city: orderDetails.customer.city,
      customer_address: orderDetails.customer.address,
      payment_method: orderDetails.customer.paymentMethod,
      created_at: orderDetails.createdAt
    }).then(({ error }) => {
      if (error) {
        console.error('تعذر حفظ الطلب في قاعدة البيانات:', error.message);
        addToast('error', 'فشل تأكيد الطلب', 'حدث خطأ أثناء حفظ طلبك، يرجى المحاولة مرة أخرى.');
        return;
      }
      setCart([]);
      addToast('success', 'طلب مؤكد', `تم تسجيل طلبك رقم ${orderDetails.id} وسنقوم بالتوصيل قريباً.`);
    });
  };

  // Blog Handlers
  const handleToggleLike = (postId: string) => {
    setBlogPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isCurrentlyLiked = p.likesCount % 2 === 1;
          return {
            ...p,
            likesCount: isCurrentlyLiked ? p.likesCount - 1 : p.likesCount + 1
          };
        }
        return p;
      })
    );
    // حفظ الإعجاب في قاعدة البيانات الحقيقية بشكل دائم
    supabase.rpc('toggle_blog_like', { p_post_id: postId }).then(({ error }) => {
      if (error) console.error('تعذر حفظ الإعجاب:', error.message);
    });
    addToast('success', 'تفاعل مع المقال', 'شكراً لتفاعلك وإبداء إعجابك بالمحتوى!');
  };

  // زيادة عدد المشاهدات الحقيقي في قاعدة البيانات عند فتح أي زائر لتفاصيل المقال
  const handleViewPost = (postId: string) => {
    setBlogPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, viewsCount: p.viewsCount + 1 } : p))
    );
    supabase.rpc('increment_blog_views', { p_post_id: postId }).then(({ error }) => {
      if (error) console.error('تعذر تحديث عدد المشاهدات:', error.message);
    });
  };

  const handleAddComment = (postId: string, text: string, authorName: string) => {
    const newComment = {
      id: `c-${Date.now()}`,
      author: authorName,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      text,
      createdAt: 'الآن'
    };

    setBlogPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [newComment, ...p.comments]
          };
        }
        return p;
      })
    );
    // حفظ التعليق في قاعدة البيانات الحقيقية بشكل دائم
    supabase.rpc('add_blog_comment', { p_post_id: postId, p_comment: newComment }).then(({ error }) => {
      if (error) console.error('تعذر حفظ التعليق:', error.message);
    });
    addToast('success', 'تم نشر التعليق', 'تمت إضافة تعليقك إلى المقال بنجاح.');
  };

  // Career Application Handler
  const handleSubmitJobApplication = (app: JobApplication) => {
    setJobApplications((prev) => [app, ...prev]);
    // حفظ طلب التوظيف في قاعدة البيانات الحقيقية بشكل دائم
    supabase.from('job_applications').insert({
      id: app.id,
      job_id: app.jobId,
      job_title: app.jobTitle,
      full_name: app.fullName,
      email: app.email,
      phone: app.phone,
      experience_years: app.experienceYears,
      portfolio_url: app.portfolioUrl,
      linkedin_url: app.linkedinUrl,
      resume_file_name: app.resumeFileName,
      cover_letter: app.coverLetter,
      submitted_at: app.submittedAt
    }).then(({ error }) => {
      if (error) console.error('تعذر حفظ طلب التوظيف:', error.message);
    });
    addToast('success', 'تم تقديم طلب التوظيف', `شكراً ${app.fullName}، تم استلام ملفك لوظيفة "${app.jobTitle}".`);
  };

  // Product CRUD (Admin)
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    // حفظ المنتج في قاعدة البيانات الحقيقية بشكل دائم
    supabase.from('products').insert({
      id: newProduct.id,
      name: newProduct.name,
      name_en: newProduct.nameEn,
      description: newProduct.description,
      price: newProduct.price,
      original_price: newProduct.originalPrice,
      category: newProduct.category,
      category_label: newProduct.categoryLabel,
      image: newProduct.image,
      rating: newProduct.rating,
      reviews_count: newProduct.reviewsCount,
      in_stock: newProduct.inStock,
      featured: newProduct.featured,
      specs: newProduct.specs,
      tags: newProduct.tags
    }).then(({ error }) => {
      if (error) {
        console.error('تعذر حفظ المنتج في قاعدة البيانات:', error.message);
        addToast('error', 'فشلت إضافة المنتج', 'لم يتم حفظ المنتج في قاعدة البيانات، يرجى المحاولة مرة أخرى.');
        return;
      }
      addToast('success', 'تمت إضافة المنتج', `تم نشر "${newProduct.name}" بنجاح في متجر Nexus.`);
    });
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
    // تحديث المنتج في قاعدة البيانات الحقيقية بشكل دائم
    supabase.from('products').update({
      name: updatedProduct.name,
      name_en: updatedProduct.nameEn,
      description: updatedProduct.description,
      price: updatedProduct.price,
      original_price: updatedProduct.originalPrice,
      category: updatedProduct.category,
      category_label: updatedProduct.categoryLabel,
      image: updatedProduct.image,
      rating: updatedProduct.rating,
      reviews_count: updatedProduct.reviewsCount,
      in_stock: updatedProduct.inStock,
      featured: updatedProduct.featured,
      specs: updatedProduct.specs,
      tags: updatedProduct.tags
    }).eq('id', updatedProduct.id).then(({ error }) => {
      if (error) {
        console.error('تعذر تحديث المنتج في قاعدة البيانات:', error.message);
        addToast('error', 'فشل تحديث المنتج', 'لم يتم حفظ التعديلات في قاعدة البيانات، يرجى المحاولة مرة أخرى.');
        return;
      }
      addToast('success', 'تم تحديث المنتج', `تم حفظ التعديلات على "${updatedProduct.name}".`);
    });
  };

  const handleDeleteProduct = (productId: string) => {
    const p = products.find((item) => item.id === productId);
    setProducts((prev) => prev.filter((item) => item.id !== productId));
    // حذف المنتج من قاعدة البيانات الحقيقية بشكل دائم
    supabase.from('products').delete().eq('id', productId).then(({ error }) => {
      if (error) {
        console.error('تعذر حذف المنتج من قاعدة البيانات:', error.message);
        addToast('error', 'فشل حذف المنتج', 'لم يتم حذف المنتج من قاعدة البيانات، يرجى المحاولة مرة أخرى.');
        return;
      }
      addToast('warning', 'تم حذف المنتج', `تم حذف "${p?.name || 'المنتج'}" من قاعدة البيانات.`);
    });
  };

  // Blog CRUD (Admin)
  const handleAddPost = (newPost: BlogPost) => {
    setBlogPosts((prev) => [newPost, ...prev]);
    supabase.from('blog_posts').insert({
      id: newPost.id,
      title: newPost.title,
      excerpt: newPost.excerpt,
      content: newPost.content,
      cover_image: newPost.coverImage,
      author: newPost.author,
      category: newPost.category,
      category_label: newPost.categoryLabel,
      tags: newPost.tags,
      read_time: newPost.readTime,
      published_at: newPost.publishedAt,
      likes_count: newPost.likesCount,
      views_count: newPost.viewsCount,
      featured: newPost.featured,
      comments: newPost.comments
    }).then(({ error }) => {
      if (error) {
        console.error('تعذر حفظ المقال في قاعدة البيانات:', error.message);
        addToast('error', 'فشل نشر المقال', 'لم يتم حفظ المقال في قاعدة البيانات، يرجى المحاولة مرة أخرى.');
        return;
      }
      addToast('success', 'تم نشر المقال', `تم نشر مقال "${newPost.title}" بنجاح.`);
    });
  };

  const handleUpdatePost = (updatedPost: BlogPost) => {
    setBlogPosts((prev) => prev.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
    supabase.from('blog_posts').update({
      title: updatedPost.title,
      excerpt: updatedPost.excerpt,
      content: updatedPost.content,
      cover_image: updatedPost.coverImage,
      author: updatedPost.author,
      category: updatedPost.category,
      category_label: updatedPost.categoryLabel,
      tags: updatedPost.tags,
      read_time: updatedPost.readTime,
      published_at: updatedPost.publishedAt,
      featured: updatedPost.featured
    }).eq('id', updatedPost.id).then(({ error }) => {
      if (error) {
        console.error('تعذر تحديث المقال في قاعدة البيانات:', error.message);
        addToast('error', 'فشل تحديث المقال', 'لم يتم حفظ التعديلات في قاعدة البيانات، يرجى المحاولة مرة أخرى.');
        return;
      }
      addToast('success', 'تم تحديث المقال', `تم حفظ تعديلات مقال "${updatedPost.title}".`);
    });
  };

  const handleDeletePost = (postId: string) => {
    const post = blogPosts.find((p) => p.id === postId);
    setBlogPosts((prev) => prev.filter((p) => p.id !== postId));
    supabase.from('blog_posts').delete().eq('id', postId).then(({ error }) => {
      if (error) {
        console.error('تعذر حذف المقال من قاعدة البيانات:', error.message);
        addToast('error', 'فشل حذف المقال', 'لم يتم حذف المقال من قاعدة البيانات، يرجى المحاولة مرة أخرى.');
        return;
      }
      addToast('warning', 'تم حذف المقال', `تم حذف "${post?.title || 'المقال'}" من المدونة.`);
    });
  };

  // Job CRUD (Admin)
  const handleAddJob = (newJob: JobListing) => {
    setJobs((prev) => [newJob, ...prev]);
    supabase.from('jobs').insert({
      id: newJob.id,
      title: newJob.title,
      department: newJob.department,
      department_label: newJob.departmentLabel,
      location: newJob.location,
      type: newJob.type,
      type_label: newJob.typeLabel,
      experience: newJob.experience,
      salary_range: newJob.salaryRange,
      description: newJob.description,
      responsibilities: newJob.responsibilities,
      requirements: newJob.requirements,
      benefits: newJob.benefits,
      is_urgent: newJob.isUrgent,
      is_remote: newJob.isRemote,
      posted_at: newJob.postedAt
    }).then(({ error }) => {
      if (error) {
        console.error('تعذر حفظ الوظيفة في قاعدة البيانات:', error.message);
        addToast('error', 'فشل طرح الشاغر', 'لم يتم حفظ الوظيفة في قاعدة البيانات، يرجى المحاولة مرة أخرى.');
        return;
      }
      addToast('success', 'تم طرح الشاغر', `تم نشر وظيفة "${newJob.title}" في بوابة التوظيف.`);
    });
  };

  const handleUpdateJob = (updatedJob: JobListing) => {
    setJobs((prev) => prev.map((j) => (j.id === updatedJob.id ? updatedJob : j)));
    supabase.from('jobs').update({
      title: updatedJob.title,
      department: updatedJob.department,
      department_label: updatedJob.departmentLabel,
      location: updatedJob.location,
      type: updatedJob.type,
      type_label: updatedJob.typeLabel,
      experience: updatedJob.experience,
      salary_range: updatedJob.salaryRange,
      description: updatedJob.description,
      responsibilities: updatedJob.responsibilities,
      requirements: updatedJob.requirements,
      benefits: updatedJob.benefits,
      is_urgent: updatedJob.isUrgent,
      is_remote: updatedJob.isRemote
    }).eq('id', updatedJob.id).then(({ error }) => {
      if (error) {
        console.error('تعذر تحديث الوظيفة في قاعدة البيانات:', error.message);
        addToast('error', 'فشل تحديث الشاغر', 'لم يتم حفظ التعديلات في قاعدة البيانات، يرجى المحاولة مرة أخرى.');
        return;
      }
      addToast('success', 'تم تحديث الشاغر', `تم حفظ التعديلات على وظيفة "${updatedJob.title}".`);
    });
  };

  const handleDeleteJob = (jobId: string) => {
    const job = jobs.find((j) => j.id === jobId);
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
    supabase.from('jobs').delete().eq('id', jobId).then(({ error }) => {
      if (error) {
        console.error('تعذر حذف الوظيفة من قاعدة البيانات:', error.message);
        addToast('error', 'فشل حذف الشاغر', 'لم يتم حذف الوظيفة من قاعدة البيانات، يرجى المحاولة مرة أخرى.');
        return;
      }
      addToast('warning', 'تم حذف الشاغر', `تم إزالة وظيفة "${job?.title || 'الشاغر'}".`);
    });
  };

  const totalCartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // وضع الصيانة الحقيقي: يحجب الموقع العام عن الزوار فقط، ولوحة الإدارة تبقى مفتوحة دائماً
  if (platformSettings.maintenanceMode && activeSection !== 'admin') {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center gap-4" dir="rtl">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-3xl font-black font-['Alexandria']">
          N
        </div>
        <h1 className="text-2xl font-extrabold font-['Alexandria']">الموقع تحت الصيانة حالياً</h1>
        <p className="text-slate-400 max-w-md text-sm">
          نعمل حالياً على تحسين منصة نيكسوس. سنعود قريباً جداً، شكراً لصبركم.
        </p>
        <button
          onClick={() => setActiveSection('admin')}
          className="mt-4 text-xs text-slate-500 hover:text-amber-400 underline"
        >
          دخول لوحة الإدارة
        </button>
      </div>
    );
  }

  // If Admin Section is selected
  if (activeSection === 'admin') {
    if (!currentAdmin) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center" dir="rtl">
          <ToastContainer toasts={toasts} onDismiss={removeToast} />
          
          <div className="max-w-md w-full bg-slate-950/80 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white font-['Alexandria']">بوابة الإدارة المركزية</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">
                يتطلب الوصول إلى لوحة التحكم صلاحيات إدارية مؤكدة.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-amber-600/25 transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>تسجيل دخول المشرفين (Admin Login)</span>
              </button>

              <button
                onClick={() => handleNavigate('home')}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-850 text-slate-300 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>العودة إلى الواجهة العامة للمنصة</span>
              </button>
            </div>
          </div>

          <AdminLoginModal
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
          />
        </div>
      );
    }

    // بناء قائمة تنبيهات حقيقية من آخر الطلبات، طلبات التوظيف، وعروض الأسعار الفعلية
    const adminNotifications: AdminNotification[] = [
      ...orders.map((o) => ({
        id: `order-${o.id}`,
        title: 'طلب شراء جديد',
        message: `تم إتمام عملية شراء بقيمة ${o.total.toLocaleString()} د.م من ${o.customer.name}.`,
        time: formatRelativeTime(o.createdAt),
        read: readNotificationIds.has(`order-${o.id}`),
        type: 'order' as const,
        _sortDate: o.createdAt
      })),
      ...jobApplications.map((j) => ({
        id: `job-${j.id}`,
        title: 'طلب توظيف جديد',
        message: `قدّم ${j.fullName} طلباً جديداً على وظيفة "${j.jobTitle}".`,
        time: formatRelativeTime(j.submittedAt),
        read: readNotificationIds.has(`job-${j.id}`),
        type: 'career' as const,
        _sortDate: j.submittedAt
      }))
    ]
      .sort((a, b) => new Date(b._sortDate).getTime() - new Date(a._sortDate).getTime())
      .slice(0, 10)
      .map(({ _sortDate, ...rest }) => rest);

    return (
      <div className="min-h-screen bg-slate-100 text-slate-900 font-sans" dir="rtl">
        <ToastContainer toasts={toasts} onDismiss={removeToast} />
        
        <AdminLayout
          currentTab={adminTab}
          onSelectTab={setAdminTab}
          currentAdmin={currentAdmin}
          notifications={adminNotifications}
          onMarkAllNotificationsRead={() => handleMarkAllNotificationsRead(adminNotifications.map((n) => n.id))}
          onLogout={() => {
            supabase.auth.signOut();
            addToast('info', 'تسجيل خروج', 'تم تسجيل خروجك من لوحة التحكم بنجاح.');
          }}
          onReturnToPublic={() => handleNavigate('home')}
        >
          {adminTab === 'overview' && (
            <AdminOverviewTab
              products={products}
              blogPosts={blogPosts}
              jobs={jobs}
              orders={orders}
              onNavigateTab={setAdminTab}
              onOpenAddProductModal={() => setAdminTab('products')}
              onOpenAddBlogModal={() => setAdminTab('blog')}
              onOpenAddJobModal={() => setAdminTab('careers')}
            />
          )}

          {adminTab === 'products' && (
            <AdminProductsTab
              products={products}
              onAddProduct={handleAddProduct}
              onUpdateProduct={handleUpdateProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          )}

          {adminTab === 'blog' && (
            <AdminBlogTab
              posts={blogPosts}
              onAddPost={handleAddPost}
              onUpdatePost={handleUpdatePost}
              onDeletePost={handleDeletePost}
            />
          )}

          {adminTab === 'careers' && (
            <AdminCareersTab
              jobs={jobs}
              applications={jobApplications}
              onAddJob={handleAddJob}
              onUpdateJob={handleUpdateJob}
              onDeleteJob={handleDeleteJob}
            />
          )}

          {adminTab === 'visits' && <AdminVisitsTab />}

          {adminTab === 'users' && (
            <AdminUsersTab
              currentAdmin={currentAdmin}
              admins={teamAdmins}
              onToggleStatus={handleToggleAdminStatus}
              onDeleteAdmin={handleDeleteAdmin}
            />
          )}

          {adminTab === 'settings' && (
            <AdminSettingsTab
              settings={platformSettings}
              onSave={handleSavePlatformSettings}
              addToast={addToast}
            />
          )}
        </AdminLayout>

        <AdminLoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
      </div>
    );
  }

  // Regular Public Portal Rendering
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-amber-500 selection:text-slate-950 font-sans" dir="rtl">
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Main Header */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        cartCount={totalCartItemCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6">
        {activeSection === 'home' && (
          <div className="space-y-12">
            <HeroSection
              onNavigate={handleNavigate}
            />

            {/* Platform Stats Bento Grid */}
            <PlatformStatsBento
              productsCount={products.length}
              blogPostsCount={blogPosts.length}
              jobsCount={jobs.length}
              onNavigate={handleNavigate}
            />

            {/* Quick Section Spotlights on Home */}
            <div className="space-y-12 pb-8">
              {/* Featured E-commerce Highlight */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Alexandria']">أبرز منتجات المتجر الإلكتروني</h3>
                    <p className="text-xs sm:text-sm text-slate-500">عتاد محطات العمل وأجهزة الذكاء الاصطناعي الأكثر طلباً</p>
                  </div>
                  <button
                    onClick={() => handleNavigate('ecommerce')}
                    className="text-xs sm:text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors flex items-center gap-1"
                  >
                    <span>عرض كافة المنتجات</span>
                    <span>←</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.slice(0, 3).map((product) => (
                    <div
                      key={product.id}
                      className="rounded-3xl bg-white border border-slate-200 p-5 flex flex-col justify-between space-y-4 hover:border-amber-500/50 hover:shadow-md transition-all"
                    >
                      <div className="aspect-16/10 rounded-2xl overflow-hidden bg-slate-100">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md font-bold border border-amber-200">{product.categoryLabel}</span>
                        <h4 className="text-sm font-bold text-slate-900 mt-2 line-clamp-1">{product.name}</h4>
                        <p className="text-xs text-slate-500 line-clamp-2 mt-1">{product.description}</p>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                        <span className="text-base font-black text-slate-900 font-['Alexandria']">{product.price} <span className="text-xs text-amber-600 font-bold">د.م</span></span>
                        <button
                          onClick={() => handleAddToCart(product, 1)}
                          className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors"
                        >
                          + أضف للسلة
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 1: E-commerce */}
        {activeSection === 'ecommerce' && (
          <EcommerceSection
            products={products}
            cart={cart}
            onAddToCart={handleAddToCart}
            onUpdateCartQuantity={handleUpdateCartQuantity}
            onRemoveFromCart={handleRemoveFromCart}
            onCheckout={handleCheckout}
            isCartOpen={isCartOpen}
            onCloseCart={() => setIsCartOpen(false)}
          />
        )}

        {/* Section 2: Blog */}
        {activeSection === 'blog' && (
          <BlogSection
            posts={blogPosts}
            onAddComment={handleAddComment}
            onToggleLike={handleToggleLike}
            onViewPost={handleViewPost}
          />
        )}

        {/* Section 3: Careers */}
        {activeSection === 'careers' && (
          <CareersSection
            jobs={jobs}
            onSubmitApplication={handleSubmitJobApplication}
          />
        )}
      </main>

      {/* Global Unified Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        blogPosts={blogPosts}
        jobs={jobs}
        onSelectResult={(section) => {
          handleNavigate(section);
        }}
      />

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onSubscribeNewsletter={(email) => {
          addToast('success', 'تم الاشتراك في النشرة', `تم تسجيل البريد ${email} بنجاح في النشرة الأسبوعية.`);
        }}
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
      />

      <LegalModal type={legalModalType} onClose={() => setLegalModalType(null)} />
    </div>
  );
}

