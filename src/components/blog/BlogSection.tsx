import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Heart, 
  Bookmark, 
  Share2, 
  Clock, 
  Calendar, 
  User, 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Tag, 
  ArrowLeft,
  ThumbsUp,
  Check
} from 'lucide-react';
import { BlogPost, BlogComment } from '../../types';

// تنسيق تاريخ النشر بشكل عربي مقروء (مثال: ٢٩ أغسطس ٢٠٢٦)
const formatPublishedDate = (value: string): string => {
  const date = new Date(value);
  if (isNaN(date.getTime())) return value;
  return date.toLocaleDateString('ar-MA', { year: 'numeric', month: 'long', day: 'numeric' });
};

interface BlogSectionProps {
  posts: BlogPost[];
  onAddComment: (postId: string, commentText: string, authorName: string) => void;
  onToggleLike: (postId: string) => void;
  onViewPost: (postId: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  posts,
  onAddComment,
  onToggleLike,
  onViewPost
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePostForModal, setActivePostForModal] = useState<BlogPost | null>(null);
  const [bookmarkedPostIds, setBookmarkedPostIds] = useState<Set<string>>(new Set());
  const [copiedLink, setCopiedLink] = useState(false);

  // Comment input in modal
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');

  const categories = [
    { id: 'all', label: 'كافة المقالات' },
    { id: 'work-from-home', label: 'العمل من البيت' },
    { id: 'services', label: 'الخدمات' },
    { id: 'health-nutrition-beauty', label: 'التغذية والصحة والتجميل' },
  ];

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCat = selectedCategory === 'all' || post.category === selectedCategory;
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    return posts.find((p) => p.featured) || posts[0];
  }, [posts]);

  const handleToggleBookmark = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = new Set(bookmarkedPostIds);
    if (next.has(postId)) {
      next.delete(postId);
    } else {
      next.add(postId);
    }
    setBookmarkedPostIds(next);
  };

  const handleShare = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePostForModal || !commentName.trim() || !commentText.trim()) return;
    onAddComment(activePostForModal.id, commentText, commentName);
    
    // Update local modal state
    const newComment: BlogComment = {
      id: `c-${Date.now()}`,
      author: commentName,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      text: commentText,
      createdAt: 'الآن'
    };
    setActivePostForModal({
      ...activePostForModal,
      comments: [newComment, ...activePostForModal.comments]
    });
    setCommentText('');
  };

  return (
    <div className="py-8 space-y-10">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-900/30 via-slate-900 to-slate-900 border border-purple-500/20 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>مدونة Nexus المعرفية التخصصية</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            رؤى وأبحاث تقنية تثري المحتوى العربي
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl">
            نناقش أحدث اتجاهات الذكاء الاصطناعي التوليدي، معايير التصميم المتقدمة، وهندسة البرمجيات الآمنة.
          </p>
        </div>

        {copiedLink && (
          <div className="flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-xl text-xs font-bold border border-emerald-500/30">
            <Check className="w-4 h-4" />
            <span>تم نسخ رابط المقال بنجاح!</span>
          </div>
        )}
      </div>

      {/* Featured Spotlight Card */}
      {featuredPost && selectedCategory === 'all' && !searchQuery && (
        <div
          onClick={() => {
            setActivePostForModal(featuredPost);
            onViewPost(featuredPost.id);
          }}
          className="group relative rounded-3xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 overflow-hidden cursor-pointer shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
        >
          <div className="lg:col-span-7 aspect-video lg:aspect-auto overflow-hidden bg-slate-950">
            <img
              src={featuredPost.coverImage}
              alt={featuredPost.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 px-3 py-1 bg-amber-500/10 rounded-full border border-amber-500/20">
                  {featuredPost.categoryLabel}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{featuredPost.readTime}</span>
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-purple-300 transition-colors leading-snug">
                {featuredPost.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                {featuredPost.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={featuredPost.author.avatar}
                  alt={featuredPost.author.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-700"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-xs font-bold text-white">{featuredPost.author.name}</h4>
                  <p className="text-[11px] text-slate-400">{featuredPost.author.role}</p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 text-xs font-bold text-purple-400 group-hover:text-purple-300">
                <span>قراءة المقال</span>
                <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20 font-bold'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative sm:w-72">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            id="blog-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث في المقالات والمواضيع..."
            className="w-full bg-slate-900 border border-slate-800 focus:border-purple-500 rounded-xl pr-10 pl-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Articles Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/50 rounded-3xl border border-slate-800">
          <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">لم يتم العثور على مقالات مطابقة</h3>
          <p className="text-xs text-slate-400">جرب البحث بكلمات أخرى أو تصفح كافة التصنيفات.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => {
            const isBookmarked = bookmarkedPostIds.has(post.id);
            return (
              <div
                key={post.id}
                id={`blog-card-${post.id}`}
                onClick={() => {
                  setActivePostForModal(post);
                  onViewPost(post.id);
                }}
                className="group rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                {/* Cover Image */}
                <div className="relative aspect-16/10 overflow-hidden bg-slate-950">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="text-[11px] font-bold text-white px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-sm border border-slate-800">
                      {post.categoryLabel}
                    </span>
                  </div>

                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <button
                      onClick={(e) => handleToggleBookmark(post.id, e)}
                      className={`p-1.5 rounded-lg backdrop-blur-sm border transition-colors ${
                        isBookmarked
                          ? 'bg-amber-500 text-slate-950 border-amber-400'
                          : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:text-white'
                      }`}
                      aria-label="حفظ في المفضلة"
                    >
                      <Bookmark className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-slate-400 text-xs">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formatPublishedDate(post.publishedAt)}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readTime}</span>
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Footer Author & Engagement */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-7 h-7 rounded-full object-cover border border-slate-700"
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-xs font-semibold text-slate-300">{post.author.name}</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleLike(post.id);
                        }}
                        className="flex items-center gap-1 hover:text-rose-400 transition-colors"
                      >
                        <Heart className="w-3.5 h-3.5 fill-rose-500/20 text-rose-400" />
                        <span>{post.likesCount}</span>
                      </button>

                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                        <span>{post.comments.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Full Article Reader Modal */}
      {activePostForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-y-auto max-h-[90vh] space-y-6">
            <button
              onClick={() => setActivePostForModal(null)}
              className="absolute top-4 left-4 p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div className="space-y-3 pr-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-purple-300 px-3 py-1 bg-purple-500/20 rounded-full border border-purple-500/30">
                  {activePostForModal.categoryLabel}
                </span>
                <span className="text-xs text-slate-400">{formatPublishedDate(activePostForModal.publishedAt)}</span>
                <span className="text-xs text-slate-400">• {activePostForModal.readTime}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                {activePostForModal.title}
              </h2>

              {/* Author bar */}
              <div className="flex items-center justify-between pt-2 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <img
                    src={activePostForModal.author.avatar}
                    alt={activePostForModal.author.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-purple-500/40"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white">{activePostForModal.author.name}</h4>
                    <p className="text-xs text-slate-400">{activePostForModal.author.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleLike(activePostForModal.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 border border-rose-500/30 rounded-xl text-xs font-bold"
                  >
                    <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                    <span>{activePostForModal.likesCount} إعجاب</span>
                  </button>

                  <button
                    onClick={(e) => handleShare(activePostForModal.id, e)}
                    className="p-2 bg-slate-800 text-slate-300 hover:text-white rounded-xl"
                    aria-label="مشاركة المقال"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Article Image */}
            <div className="rounded-2xl overflow-hidden aspect-video bg-slate-950">
              <img
                src={activePostForModal.coverImage}
                alt={activePostForModal.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Article Content Paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-slate-200 leading-relaxed">
              {activePostForModal.content.map((p, idx) => (
                <p key={idx} className="leading-loose">
                  {p}
                </p>
              ))}
            </div>

            {/* Tags cloud */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800">
              {activePostForModal.tags.map((tag, idx) => (
                <span key={idx} className="text-xs bg-slate-950 text-slate-300 px-3 py-1 rounded-lg border border-slate-800">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Comments Section */}
            <div className="pt-6 border-t border-slate-800 space-y-6">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-bold text-white">التعليقات والمناقشات ({activePostForModal.comments.length})</h3>
              </div>

              {/* Add Comment Form */}
              <form onSubmit={handleSubmitComment} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    placeholder="اسمك الكريم..."
                    className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <textarea
                  required
                  rows={3}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="أضف تعليقك أو رأيك حول الموضوع..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500 resize-none"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
                  >
                    <span>نشر التعليق</span>
                    <Send className="w-3.5 h-3.5 rotate-180" />
                  </button>
                </div>
              </form>

              {/* Existing Comments */}
              <div className="space-y-3">
                {activePostForModal.comments.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-4">كن أول من يعلق على هذا المقال.</p>
                ) : (
                  activePostForModal.comments.map((comment) => (
                    <div key={comment.id} className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white">{comment.author}</span>
                        <span className="text-slate-500">{comment.createdAt}</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{comment.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
