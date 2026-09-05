import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  Heart, 
  MessageSquare, 
  Calendar, 
  User, 
  X, 
  AlertTriangle,
  Sparkles,
  Upload,
  Loader2
} from 'lucide-react';
import { BlogPost } from '../../../types';
import { supabase } from '../../../lib/supabaseClient';

interface AdminBlogTabProps {
  posts: BlogPost[];
  onAddPost: (post: BlogPost) => void;
  onUpdatePost: (post: BlogPost) => void;
  onDeletePost: (postId: string) => void;
}

// تنسيق تاريخ النشر بشكل عربي مقروء (مثال: ٢٩ أغسطس ٢٠٢٦)
const formatPublishedDate = (value: string): string => {
  const date = new Date(value);
  if (isNaN(date.getTime())) return value;
  return date.toLocaleDateString('ar-MA', { year: 'numeric', month: 'long', day: 'numeric' });
};

export const AdminBlogTab: React.FC<AdminBlogTabProps> = ({
  posts,
  onAddPost,
  onUpdatePost,
  onDeletePost
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    contentParagraphs: '',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    category: 'work-from-home' as BlogPost['category'],
    authorName: 'د. خالد العمري',
    authorRole: 'باحث ومستشار نظم ذكاء اصطناعي',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    readTime: '6 دقائق قراءة',
    tags: 'ذكاء اصطناعي, هندسة النظم, تعلم الآلة',
    featured: false
  });

  const categories = [
    { id: 'all', label: 'كافة التصنيفات' },
    { id: 'work-from-home', label: 'العمل من البيت' },
    { id: 'services', label: 'الخدمات' },
    { id: 'health-nutrition-beauty', label: 'التغذية والصحة والتجميل' },
  ];

  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchesSearch = 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.author.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = categoryFilter === 'all' || p.category === categoryFilter;

      return matchesSearch && matchesCat;
    });
  }, [posts, searchQuery, categoryFilter]);

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage) || 1;
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleOpenAdd = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      excerpt: '',
      contentParagraphs: 'المقدمة وشرح الفكرة الرئيسية للمقال...\n\nالتحليل العميق والتطبيقات الهندسية العملية...\n\nالخلاصة والتوصيات المستقبلية للمطورين.',
      coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      category: 'work-from-home',
      authorName: 'سارة المنصوري',
      authorRole: 'كبير مهندسي المنصات السحابية',
      authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      readTime: '5 دقائق قراءة',
      tags: 'تقنية, برمجة, ابتكار',
      featured: false
    });
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      contentParagraphs: post.content.join('\n\n'),
      coverImage: post.coverImage,
      category: post.category,
      authorName: post.author.name,
      authorRole: post.author.role,
      authorAvatar: post.author.avatar,
      readTime: post.readTime,
      tags: post.tags.join(', '),
      featured: !!post.featured
    });
    setIsFormModalOpen(true);
  };

  const handleImageFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `blog-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(fileName, file);

      if (uploadError) {
        console.error('تعذر رفع الصورة:', uploadError.message);
        alert('حدث خطأ أثناء رفع الصورة، حاولي مرة أخرى.');
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('blog-images')
        .getPublicUrl(fileName);

      setFormData((prev) => ({ ...prev, coverImage: publicUrlData.publicUrl }));
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const categoryObj = categories.find((c) => c.id === formData.category);
    const categoryLabel = categoryObj ? categoryObj.label : 'تقنية';

    const postPayload: BlogPost = {
      id: editingPost ? editingPost.id : `post-${Date.now()}`,
      title: formData.title,
      excerpt: formData.excerpt,
      content: (() => {
        const raw = formData.contentParagraphs.trim();
        // نحاول الفصل أولاً بسطرين فارغين (الطريقة المفضلة)
        let paragraphs = raw.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
        // لو النص كله التصق كفقرة واحدة (نسي المستخدم ترك سطر فارغ)، نفصل كل سطر لحاله كفقرة
        if (paragraphs.length <= 1) {
          paragraphs = raw.split('\n').map((p) => p.trim()).filter(Boolean);
        }
        return paragraphs;
      })(),
      coverImage: formData.coverImage,
      author: {
        name: formData.authorName,
        role: formData.authorRole,
        avatar: formData.authorAvatar
      },
      category: formData.category,
      categoryLabel,
      tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
      readTime: formData.readTime,
      publishedAt: editingPost ? editingPost.publishedAt : new Date().toISOString(),
      likesCount: editingPost ? editingPost.likesCount : 0,
      viewsCount: editingPost ? editingPost.viewsCount : 0,
      featured: formData.featured,
      comments: editingPost ? editingPost.comments : []
    };

    if (editingPost) {
      onUpdatePost(postPayload);
    } else {
      onAddPost(postPayload);
    }

    setIsFormModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deletingPostId) {
      onDeletePost(deletingPostId);
      setDeletingPostId(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header & Main Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-800 text-xs font-bold w-fit mb-2 border border-purple-200">
            <BookOpen className="w-3.5 h-3.5" />
            <span>إدارة مقالات المعرفة والمدونة</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Alexandria']">
            المحتوى والأبحاث التخصصية
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            نشر المقالات التقنية، مراجعة التفاعل، وتعديل المواد التعليمية
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md shadow-purple-600/20 transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>نشر مقال جديد</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="بحث بعنوان المقال أو الكاتب..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:border-purple-500"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>

          <span className="text-xs text-slate-500 font-semibold px-2">
            إجمالي المقالات: <strong>{filteredPosts.length}</strong>
          </span>
        </div>
      </div>

      {/* Blog Posts Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
              <tr>
                <th className="p-4">عنوان المقال</th>
                <th className="p-4">الكاتب</th>
                <th className="p-4">التصنيف</th>
                <th className="p-4">المشاهدات والتفاعل</th>
                <th className="p-4">تاريخ النشر</th>
                <th className="p-4 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedPosts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400 text-xs">
                    لا توجد مقالات مطابقة لبحثك.
                  </td>
                </tr>
              ) : (
                paginatedPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-14 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm line-clamp-1">
                              {post.title}
                            </span>
                            {post.featured && (
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-100 text-purple-800 font-bold border border-purple-200">
                                مقال رئيسي
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400 line-clamp-1">{post.excerpt}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-6 h-6 rounded-full object-cover shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <span className="font-semibold text-slate-800">{post.author.name}</span>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-800 text-[11px] font-bold border border-purple-200">
                        {post.categoryLabel}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-3 text-slate-500 font-semibold text-[11px]">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5 text-slate-400" /> {post.viewsCount}
                        </span>
                        <span className="flex items-center gap-1 text-rose-600">
                          <Heart className="w-3.5 h-3.5 fill-rose-500" /> {post.likesCount}
                        </span>
                        <span className="flex items-center gap-1 text-blue-600">
                          <MessageSquare className="w-3.5 h-3.5" /> {post.comments.length}
                        </span>
                      </div>
                    </td>

                    <td className="p-4 text-slate-500 text-[11px]">
                      {formatPublishedDate(post.publishedAt)}
                    </td>

                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenEdit(post)}
                          title="تعديل المقال"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-purple-700 hover:bg-purple-50 border border-slate-200 transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingPostId(post.id)}
                          title="حذف المقال"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-700 hover:bg-rose-50 border border-slate-200 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 bg-slate-50">
          <span>الصفحة {currentPage} من {totalPages}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-white border border-slate-200 rounded-lg font-bold disabled:opacity-40"
            >
              السابق
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-white border border-slate-200 rounded-lg font-bold disabled:opacity-40"
            >
              التالي
            </button>
          </div>
        </div>
      </div>

      {/* Add / Edit Article Modal */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in" dir="rtl">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            <div className="bg-slate-900 p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-['Alexandria']">
                    {editingPost ? 'تعديل المقال' : 'نشر مقال تخصصي جديد'}
                  </h3>
                  <p className="text-xs text-slate-400">صياغة ونشر محتوى بحثي عالي الجودة</p>
                </div>
              </div>
              <button
                onClick={() => setIsFormModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-xl"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">عنوان المقال *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="مثال: استراتيجيات بناء النظم السحابية الذاتية..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">التصنيف *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-purple-500 font-bold"
                  >
                    <option value="work-from-home">العمل من البيت</option>
                    <option value="services">الخدمات</option>
                    <option value="health-nutrition-beauty">التغذية والصحة والتجميل</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">وقت القراءة المتوقع</label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">صورة غلاف المقال *</label>
                <div className="flex items-center gap-3">
                  {formData.coverImage && (
                    <img
                      src={formData.coverImage}
                      alt="معاينة"
                      className="w-16 h-16 rounded-xl object-cover border border-slate-200"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <label className="flex-1 cursor-pointer">
                    <div className="w-full bg-slate-50 border border-dashed border-slate-300 rounded-xl px-3 py-3 text-xs text-slate-600 flex items-center justify-center gap-2 hover:border-purple-500 hover:bg-purple-50 transition-colors">
                      {isUploadingImage ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>جارٍ الرفع...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          <span>{formData.coverImage ? 'تغيير الصورة' : 'رفع صورة من الجهاز'}</span>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileSelect}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">المقتطف التعريفي (Excerpt) *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="ملخص مكثف وجذاب يظهر في بطاقة المقال..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">محتوى المقال (افصل بين الفقرات بسطرين فارغين) *</label>
                <textarea
                  rows={6}
                  required
                  value={formData.contentParagraphs}
                  onChange={(e) => setFormData({ ...formData, contentParagraphs: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-purple-500 font-mono leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600">اسم الكاتب</label>
                  <input
                    type="text"
                    value={formData.authorName}
                    onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg p-1.5 text-xs text-slate-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600">صفة الكاتب</label>
                  <input
                    type="text"
                    value={formData.authorRole}
                    onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg p-1.5 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded text-purple-600 focus:ring-purple-500 w-4 h-4"
                  />
                  <span>تمييز كمقال الغلاف الرئيسي (Featured Post)</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsFormModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md shadow-purple-600/20"
                >
                  {editingPost ? 'حفظ التعديلات' : 'نشر المقال الآن'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deletingPostId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in" dir="rtl">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 border border-slate-200 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 font-['Alexandria']">تأكيد حذف المقال</h4>
              <p className="text-xs text-slate-500 mt-1">هل أنت متأكد من رغبتك في حذف هذا المقال نهائياً من المدونة؟</p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeletingPostId(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
              >
                تراجع
              </button>
              <button
                onClick={handleConfirmDelete}
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
