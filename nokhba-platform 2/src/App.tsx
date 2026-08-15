import React, { useState, useEffect } from 'react';
import { 
  NavSection, 
  CartItem, 
  Product, 
  BlogPost, 
  JobListing, 
  ServiceItem, 
  JobApplication, 
  ServiceRequest, 
  ToastMessage,
  AdminTab,
  AdminUser,
  ServiceQuoteRequest
} from './types';
import { mockProducts, mockBlogPosts, mockJobListings, mockServices } from './data/mockData';
import { supabase } from './lib/supabaseClient';
import { mockAdminUsers } from './data/mockAdminData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { PlatformStatsBento } from './components/PlatformStatsBento';
import { EcommerceSection } from './components/ecommerce/EcommerceSection';
import { BlogSection } from './components/blog/BlogSection';
import { CareersSection } from './components/careers/CareersSection';
import { ServicesSection } from './components/services/ServicesSection';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { ToastContainer } from './components/Toast';

// Admin Components
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminOverviewTab } from './components/admin/tabs/AdminOverviewTab';
import { AdminProductsTab } from './components/admin/tabs/AdminProductsTab';
import { AdminBlogTab } from './components/admin/tabs/AdminBlogTab';
import { AdminCareersTab } from './components/admin/tabs/AdminCareersTab';
import { AdminServicesTab } from './components/admin/tabs/AdminServicesTab';
import { AdminUsersTab } from './components/admin/tabs/AdminUsersTab';
import { AdminSettingsTab } from './components/admin/tabs/AdminSettingsTab';
import { ShieldCheck, Lock, ArrowLeft } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<NavSection>('home');
  
  // Platform Core Entities State
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('nexus_products');
      return saved ? JSON.parse(saved) : mockProducts;
    } catch {
      return mockProducts;
    }
  });

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

  const [jobs, setJobs] = useState<JobListing[]>(() => {
    try {
      const saved = localStorage.getItem('nexus_jobs');
      return saved ? JSON.parse(saved) : mockJobListings;
    } catch {
      return mockJobListings;
    }
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved = localStorage.getItem('nexus_services');
      return saved ? JSON.parse(saved) : mockServices;
    } catch {
      return mockServices;
    }
  });

  // Incoming User Submissions for ATS & Quotes
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([
    {
      id: 'app-init-1',
      jobId: 'job-1',
      jobTitle: 'Senior Cloud Architect',
      fullName: 'خالد إبراهيم الصالح',
      email: 'khaled.saleh@example.com',
      phone: '+966 50 123 4567',
      experienceYears: '6',
      portfolioUrl: 'https://github.com/khaled-architect',
      coverLetter: 'أمتلك خبرة عميقة في تصميم النظم الموزعة وإدارة حلول Kubernetes وأرغب بالانضمام لفريقكم الرائد.',
      resumeFileName: 'Khaled_Saleh_CV_2026.pdf',
      submittedAt: 'منذ يومين'
    },
    {
      id: 'app-init-2',
      jobId: 'job-2',
      jobTitle: 'AI Solutions Engineer',
      fullName: 'سارة عبدالرحمن',
      email: 'sarah.abdul@example.com',
      phone: '+971 55 987 6543',
      experienceYears: '4',
      portfolioUrl: 'https://huggingface.co/sarah-ai',
      coverLetter: 'مهندسة ذكاء اصطناعي شغوفة ببناء نماذج اللغة وتطبيقات الاسترجاع المعزز RAG.',
      resumeFileName: 'Sarah_Abdulrahman_Resume.pdf',
      submittedAt: 'منذ 3 ساعات'
    }
  ]);

  const [serviceQuotes, setServiceQuotes] = useState<ServiceQuoteRequest[]>([
    {
      id: 'quote-init-1',
      fullName: 'عبدالله السبيعي',
      email: 'a.subaie@fintech-sa.com',
      phone: '+966 54 555 1212',
      companyName: 'شركة الابتكار المالي المحدودة',
      serviceType: 'الأمن السيبراني والامتثال',
      budgetRange: '75,000 - 150,000 ر.س',
      timeline: 'خلال شهرين',
      projectDescription: 'نرغب في إجراء فحص أمني شامل واختبار اختراق لمنظومتنا المصرفية استعداداً لتدقيق الامتثال.',
      submittedAt: 'أمس، 11:30 ص'
    }
  ]);

  // Admin Auth & Navigation
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(mockAdminUsers[0]);
  const [adminTab, setAdminTab] = useState<AdminTab>('overview');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

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
  const [isServiceWizardOpen, setIsServiceWizardOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persist Products, Blogs, Jobs, Services to LocalStorage for full persistence
  useEffect(() => {
    try {
      localStorage.setItem('nexus_products', JSON.stringify(products));
      localStorage.setItem('nexus_blogs', JSON.stringify(blogPosts));
      localStorage.setItem('nexus_jobs', JSON.stringify(jobs));
      localStorage.setItem('nexus_services', JSON.stringify(services));
      localStorage.setItem('nexus_cart', JSON.stringify(cart));
    } catch {}
  }, [products, blogPosts, jobs, services, cart]);

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
        setIsServiceWizardOpen(false);
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

  const handleCheckout = (orderDetails: any) => {
    setCart([]);
    addToast('success', 'طلب مؤكد', `تم تسجيل طلبك رقم ${orderDetails.id} وسنقوم بالتوصيل قريباً.`);
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
    addToast('success', 'تم تقديم طلب التوظيف', `شكراً ${app.fullName}، تم استلام ملفك لوظيفة "${app.jobTitle}".`);
  };

  // Service Request Handler
  const handleServiceRequestSubmit = (req: ServiceRequest) => {
    const newQuote: ServiceQuoteRequest = {
      id: req.id,
      fullName: req.clientName,
      email: req.email,
      phone: req.phone,
      companyName: req.companyName || 'شركة خاصة',
      serviceType: req.serviceTitle,
      budgetRange: req.budget,
      timeline: req.timeline,
      projectDescription: req.projectDetails,
      submittedAt: 'الآن'
    };
    setServiceQuotes((prev) => [newQuote, ...prev]);
    addToast('success', 'تم إرسال طلب الخدمة', `تم تسجيل طلب "${req.serviceTitle}" برقم مرجعي ${req.id}.`);
  };

  // Product CRUD (Admin)
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    addToast('success', 'تمت إضافة المنتج', `تم نشر "${newProduct.name}" بنجاح في متجر Nexus.`);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
    addToast('success', 'تم تحديث المنتج', `تم حفظ التعديلات على "${updatedProduct.name}".`);
  };

  const handleDeleteProduct = (productId: string) => {
    const p = products.find((item) => item.id === productId);
    setProducts((prev) => prev.filter((item) => item.id !== productId));
    addToast('warning', 'تم حذف المنتج', `تم حذف "${p?.name || 'المنتج'}" من قاعدة البيانات.`);
  };

  // Blog CRUD (Admin)
  const handleAddPost = (newPost: BlogPost) => {
    setBlogPosts((prev) => [newPost, ...prev]);
    addToast('success', 'تم نشر المقال', `تم نشر مقال "${newPost.title}" بنجاح.`);
  };

  const handleUpdatePost = (updatedPost: BlogPost) => {
    setBlogPosts((prev) => prev.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
    addToast('success', 'تم تحديث المقال', `تم حفظ تعديلات مقال "${updatedPost.title}".`);
  };

  const handleDeletePost = (postId: string) => {
    const post = blogPosts.find((p) => p.id === postId);
    setBlogPosts((prev) => prev.filter((p) => p.id !== postId));
    addToast('warning', 'تم حذف المقال', `تم حذف "${post?.title || 'المقال'}" من المدونة.`);
  };

  // Job CRUD (Admin)
  const handleAddJob = (newJob: JobListing) => {
    setJobs((prev) => [newJob, ...prev]);
    addToast('success', 'تم طرح الشاغر', `تم نشر وظيفة "${newJob.title}" في بوابة التوظيف.`);
  };

  const handleUpdateJob = (updatedJob: JobListing) => {
    setJobs((prev) => prev.map((j) => (j.id === updatedJob.id ? updatedJob : j)));
    addToast('success', 'تم تحديث الشاغر', `تم حفظ التعديلات على وظيفة "${updatedJob.title}".`);
  };

  const handleDeleteJob = (jobId: string) => {
    const job = jobs.find((j) => j.id === jobId);
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
    addToast('warning', 'تم حذف الشاغر', `تم إزالة وظيفة "${job?.title || 'الشاغر'}".`);
  };

  // Service CRUD (Admin)
  const handleAddService = (newService: ServiceItem) => {
    setServices((prev) => [newService, ...prev]);
    addToast('success', 'تمت إضافة الخدمة', `تم إدراج خدمة "${newService.title}" في الكتالوج.`);
  };

  const handleUpdateService = (updatedService: ServiceItem) => {
    setServices((prev) => prev.map((s) => (s.id === updatedService.id ? updatedService : s)));
    addToast('success', 'تم تحديث الخدمة', `تم تحديث بيانات "${updatedService.title}".`);
  };

  const handleDeleteService = (serviceId: string) => {
    const s = services.find((srv) => srv.id === serviceId);
    setServices((prev) => prev.filter((srv) => srv.id !== serviceId));
    addToast('warning', 'تم حذف الخدمة', `تم إزالة خدمة "${s?.title || 'الخدمة'}".`);
  };

  const totalCartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

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
            onLoginSuccess={(user) => {
              setCurrentAdmin(user);
              setIsLoginModalOpen(false);
              addToast('success', 'تم التحقق بنجاح', `مرحباً بك يا ${user.name} في لوحة التحكم.`);
            }}
          />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-slate-100 text-slate-900 font-sans" dir="rtl">
        <ToastContainer toasts={toasts} onDismiss={removeToast} />
        
        <AdminLayout
          currentTab={adminTab}
          onSelectTab={setAdminTab}
          currentAdmin={currentAdmin}
          onLogout={() => {
            setCurrentAdmin(null);
            addToast('info', 'تسجيل خروج', 'تم تسجيل خروجك من لوحة التحكم بنجاح.');
          }}
          onReturnToPublic={() => handleNavigate('home')}
        >
          {adminTab === 'overview' && (
            <AdminOverviewTab
              products={products}
              blogPosts={blogPosts}
              jobs={jobs}
              services={services}
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

          {adminTab === 'services' && (
            <AdminServicesTab
              services={services}
              quotes={serviceQuotes}
              onAddService={handleAddService}
              onUpdateService={handleUpdateService}
              onDeleteService={handleDeleteService}
            />
          )}

          {adminTab === 'users' && (
            <AdminUsersTab
              currentAdmin={currentAdmin}
            />
          )}

          {adminTab === 'settings' && (
            <AdminSettingsTab />
          )}
        </AdminLayout>

        <AdminLoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLoginSuccess={(user) => {
            setCurrentAdmin(user);
            setIsLoginModalOpen(false);
            addToast('success', 'تم التحقق بنجاح', `مرحباً بك يا ${user.name} في لوحة التحكم.`);
          }}
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
        onOpenServiceRequest={() => setIsServiceWizardOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6">
        {activeSection === 'home' && (
          <div className="space-y-12">
            <HeroSection
              onNavigate={handleNavigate}
              onOpenServiceRequest={() => setIsServiceWizardOpen(true)}
            />

            {/* Platform Stats Bento Grid */}
            <PlatformStatsBento
              productsCount={products.length}
              blogPostsCount={blogPosts.length}
              jobsCount={jobs.length}
              servicesCount={services.length}
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
                        <span className="text-base font-black text-slate-900 font-['Alexandria']">{product.price} <span className="text-xs text-amber-600 font-bold">ر.س</span></span>
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

              {/* Featured Services Highlight */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Alexandria']">الخدمات والحلول التقنية المتميزة</h3>
                    <p className="text-xs sm:text-sm text-slate-500">هندسة متقدمة لدعم نمو وأمان الشركات</p>
                  </div>
                  <button
                    onClick={() => handleNavigate('services')}
                    className="text-xs sm:text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors flex items-center gap-1"
                  >
                    <span>استكشف كل الخدمات</span>
                    <span>←</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services.slice(0, 2).map((srv) => (
                    <div
                      key={srv.id}
                      className="rounded-3xl bg-white border border-slate-200 p-6 space-y-4 hover:border-amber-500/50 hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <span className="text-xs text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md font-bold border border-blue-200">{srv.categoryLabel}</span>
                        <h4 className="text-lg font-bold text-slate-900">{srv.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{srv.description}</p>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <span className="text-xs text-slate-500">تبدأ من <strong className="text-slate-900 text-sm font-['Alexandria']">{srv.startingPrice.toLocaleString()} ر.س</strong></span>
                        <button
                          onClick={() => {
                            handleNavigate('services');
                            setIsServiceWizardOpen(true);
                          }}
                          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors"
                        >
                          طلب الخدمة
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
          />
        )}

        {/* Section 3: Careers */}
        {activeSection === 'careers' && (
          <CareersSection
            jobs={jobs}
            onSubmitApplication={handleSubmitJobApplication}
          />
        )}

        {/* Section 4: Services */}
        {activeSection === 'services' && (
          <ServicesSection
            services={services}
            onRequestServiceSubmit={handleServiceRequestSubmit}
            isWizardOpen={isServiceWizardOpen}
            onCloseWizard={() => setIsServiceWizardOpen(false)}
            onOpenWizardWithService={(srv) => {
              setIsServiceWizardOpen(true);
            }}
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
        services={services}
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
      />
    </div>
  );
}

