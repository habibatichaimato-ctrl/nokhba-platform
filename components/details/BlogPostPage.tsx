import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Calendar, Check, Clock, ExternalLink, Heart, MessageSquare, Send, Share2 } from 'lucide-react';
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

const DIRECT_AD_URL = 'https://omg10.com/4/11793552';

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, onAddComment, onToggleLike, onViewPost }) => {
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [copied, setCopied] = useState(false);
  const [isContentUnlocked, setIsContentUnlocked] = useState(false);

  const articleContent = useMemo(() => {
    const sanitizedContent = DOMPurify.sanitize(normalizeBlogContent(post.content));
    const parsedDocument = new DOMParser().parseFromString(sanitizedContent, 'text/html');
    const contentNodes = Array.from(parsedDocument.body.children);
    const firstParagraph = contentNodes.find((node) => node.tagName.toLowerCase() === 'p');
    const firstNode = firstParagraph || contentNodes[0];

    return {
      firstParagraph: firstNode?.outerHTML || '<p>لا يوجد محتوى متاح حالياً.</p>',
      remainingContent: contentNodes
        .filter((node) => node !== firstNode)
        .map((node) => node.outerHTML)
        .join('')
    };
  }, [post.content]);

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
    <div className="min-h-screen bg-slate-950 px-4 py-8 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-4xl space-y-6 rounded-3xl border border-slate-700 bg-slate-900 p-5 shadow-2xl sm:p-8">
      <SeoMeta title={`${post.title} | منصة النخبة`} description={post.excerpt} />
      <div className="flex items-center justify-between gap-3">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-purple-300 hover:text-purple-200">
          <ArrowLeft className="w-4 h-4" /> العودة إلى المدونة
        </Link>
        {copied && <span className="text-xs text-emerald-400">تم نسخ الرابط</span>}
      </div>

      <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-white">جاهز للقراءة؟</p>
          <p className="text-xs text-slate-300 mt-1">اضغط هنا لفتح المقال كاملاً في تبويب جديد.</p>
        </div>
        <a
          href={DIRECT_AD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 shrink-0 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-black text-slate-950 hover:bg-amber-400 transition-colors"
        >
          <span>الانتقال للقراءة</span>
          <ExternalLink className="w-4 h-4" />
        </a>
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
        <div className="flex items-center justify-between gap-3 border-y border-slate-800 py-4">
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
      <div className="relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-950/70 p-4 sm:p-6">
        <div className="blog-article-content prose prose-invert max-w-none text-sm leading-relaxed text-slate-100 sm:text-base prose-headings:text-white prose-p:text-slate-100 prose-li:text-slate-100 prose-strong:text-white prose-a:font-semibold prose-a:text-amber-300 prose-a:underline prose-a:decoration-amber-300/70 hover:prose-a:text-amber-200" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(articleContent.firstParagraph) }} />

        {articleContent.remainingContent && !isContentUnlocked && (
          <div className="relative mt-4 min-h-[22rem] overflow-hidden rounded-xl">
            <div
              className="pointer-events-none select-none blur-md opacity-70 prose prose-invert max-w-none text-sm leading-relaxed text-slate-100 sm:text-base prose-headings:text-white prose-p:text-slate-100 prose-li:text-slate-100 prose-strong:text-white prose-a:text-amber-300"
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(articleContent.remainingContent) }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/75 to-slate-950/95 backdrop-blur-md" />
            <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8">
              <div className="w-full max-w-xl rounded-3xl border border-amber-500/50 bg-slate-900/90 p-6 text-center shadow-xl shadow-amber-950/30 backdrop-blur-sm sm:p-8">
                <h2 className="text-xl font-black text-white sm:text-2xl">🔓 افتح المقال كاملاً وحمل الملحقات</h2>
                <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-100">اضغط على الزر أدناه لفتح باقي محتوى المقال ورابط تحميل الملفات المباشر في تبويب جديد.</p>
                <a
                  href={DIRECT_AD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsContentUnlocked(true)}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-4 text-sm font-black text-slate-950 shadow-lg shadow-orange-900/40 transition-transform hover:scale-[1.02] hover:from-amber-400 hover:to-orange-500 animate-pulse"
                >
                  <span>افتح المحتوى الآن</span>
                  <ExternalLink className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        )}

        {articleContent.remainingContent && isContentUnlocked && (
          <div className="blog-article-content prose prose-invert max-w-none pt-4 text-sm leading-relaxed text-slate-100 sm:text-base prose-headings:text-white prose-p:text-slate-100 prose-li:text-slate-100 prose-strong:text-white prose-a:font-semibold prose-a:text-amber-300 prose-a:underline prose-a:decoration-amber-300/70 hover:prose-a:text-amber-200" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(articleContent.remainingContent) }} />
        )}
      </div>

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
