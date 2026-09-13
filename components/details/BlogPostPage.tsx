import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Calendar, Clock, Heart, MessageSquare, Send, Share2 } from 'lucide-react';
import DOMPurify from 'dompurify';
import { BlogComment, BlogPost, normalizeBlogContent } from '../../types';
import { SeoMeta } from './SeoMeta';

interface BlogPostPageProps {
  post: BlogPost;
  onAddComment: (postId: string, commentText: string, authorName: string) => void;
  onToggleLike: (postId: string) => void;
  onViewPost: (postId: string) => void;
}

const formatPublishedDate = (value: string): string => {
  const date = new Date(value);
  if (isNaN(date.getTime())) return value;
  return date.toLocaleDateString('ar-MA', { year: 'numeric', month: 'long', day: 'numeric' });
};

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, onAddComment, onToggleLike, onViewPost }) => {
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    onViewPost(post.id);
  }, [post.id]);

  const handleSubmitComment = (event: React.FormEvent) => {
    event.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;
    onAddComment(post.id, commentText, commentName);
    setCommentName('');
    setCommentText('');
  };

  const handleShare = async () => {
    await navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="min-h-screen min-w-0 bg-slate-950 px-0 py-4 sm:px-6 sm:py-8 lg:px-8">
      <article className="mx-auto min-w-0 max-w-4xl space-y-6 overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 p-4 shadow-2xl sm:p-8">
      <SeoMeta title={`${post.title} | منصة النخبة`} description={post.excerpt} />
      <div className="flex items-center justify-between gap-3">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-purple-300 hover:text-purple-200">
          <ArrowLeft className="w-4 h-4" /> العودة إلى المدونة
        </Link>
        {copied && <span className="text-xs text-emerald-400">تم نسخ الرابط</span>}
      </div>

      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <span className="inline-flex items-center gap-1.5 text-purple-300 px-3 py-1 bg-purple-500/20 rounded-full border border-purple-500/30">
            <BookOpen className="w-3.5 h-3.5" /> {post.categoryLabel}
          </span>
          <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{formatPublishedDate(post.publishedAt)}</span>
          <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">{post.title}</h1>
        <p className="text-base text-slate-100 leading-relaxed">{post.excerpt}</p>
        <div className="flex flex-wrap items-center justify-between gap-3 border-y border-slate-800 py-4">
          <div className="flex items-center gap-3">
            <img src={post.author.avatar} alt={post.author.name} className="w-11 h-11 rounded-full object-cover border-2 border-purple-500/40" referrerPolicy="no-referrer" />
            <div><p className="text-sm font-bold text-white">{post.author.name}</p><p className="text-xs text-slate-400">{post.author.role}</p></div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => onToggleLike(post.id)} className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/10 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-bold"><Heart className="w-4 h-4 fill-rose-500 text-rose-500" />{post.likesCount}</button>
            <button onClick={handleShare} className="p-2 bg-slate-800 text-slate-300 hover:text-white rounded-xl" aria-label="مشاركة المقال"><Share2 className="w-4 h-4" /></button>
          </div>
        </div>
      </header>

      <img src={post.coverImage} alt={post.title} className="w-full aspect-video object-cover rounded-2xl" referrerPolicy="no-referrer" />
      <div className="blog-article-content prose prose-invert max-w-none min-w-0 overflow-hidden break-words rounded-2xl border border-slate-700 bg-slate-950/70 p-4 text-sm leading-relaxed text-slate-100 sm:p-6 sm:text-base prose-headings:text-white prose-p:text-slate-100 prose-li:text-slate-100 prose-strong:text-white prose-a:font-semibold prose-a:text-amber-300 prose-a:underline prose-a:decoration-amber-300/70 hover:prose-a:text-amber-200" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(normalizeBlogContent(post.content)) }} />

      <section dir="rtl" className="overflow-hidden rounded-3xl bg-gradient-to-br from-sky-400 via-sky-500 to-blue-800 px-4 py-7 text-center shadow-xl shadow-sky-950/30 sm:px-8 sm:py-8">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-sky-500 shadow-lg">
          <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" aria-hidden="true">
            <path d="m20.7 3.3-3.1 17.1c-.2 1.2-.9 1.5-1.8.9l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5.1 9.2-8.3c.4-.4-.1-.6-.6-.2L5 14 0 12.4c-1.1-.3-1.1-1.1.2-1.6L19.7 3c.9-.3 1.7.2 1 0.3Z" fill="currentColor" />
          </svg>
        </div>
        <h2 className="mt-5 break-words text-xl font-black text-white sm:text-3xl">انضم لمجتمعنا على تليجرام! 🚀</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-blue-50 sm:text-base">احصل على القوالب المجانية، المخططات اليومية، والتحديثات الحصرية فور نزولها مباشرة على هاتفك.</p>
        <a href="https://t.me/nokhbaplatform" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-black text-blue-700 shadow-lg transition hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-white/40">انضمام للقناة مجاناً</a>
      </section>

      <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800">
        {post.tags.map((tag) => <span key={tag} className="text-xs bg-slate-950 text-slate-300 px-3 py-1 rounded-lg border border-slate-800">#{tag}</span>)}
      </div>

      <section className="pt-6 border-t border-slate-800 space-y-6">
        <h2 className="flex items-center gap-2 text-lg font-bold text-white"><MessageSquare className="w-5 h-5 text-purple-400" /> التعليقات والمناقشات ({post.comments.length})</h2>
        <form onSubmit={handleSubmitComment} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
          <input type="text" required value={commentName} onChange={(event) => setCommentName(event.target.value)} placeholder="اسمك الكريم..." className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500" />
          <textarea required rows={3} value={commentText} onChange={(event) => setCommentText(event.target.value)} placeholder="أضف تعليقك أو رأيك حول الموضوع..." className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500 resize-none" />
          <button type="submit" className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"><span>نشر التعليق</span><Send className="w-3.5 h-3.5 rotate-180" /></button>
        </form>
        <div className="space-y-3">
          {post.comments.length === 0 ? <p className="text-xs text-slate-500 text-center py-4">كن أول من يعلق على هذا المقال.</p> : post.comments.map((comment: BlogComment) => (
            <div key={comment.id} className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-1.5"><div className="flex items-center justify-between text-xs"><span className="font-bold text-white">{comment.author}</span><span className="text-slate-500">{comment.createdAt}</span></div><p className="text-xs text-slate-300 leading-relaxed">{comment.text}</p></div>
          ))}
        </div>
      </section>
      </article>
    </div>
  );
};
