import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  ShoppingBag, 
  BookOpen, 
  Briefcase, 
  Layers, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { Product, BlogPost, JobListing, ServiceItem, NavSection } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  blogPosts: BlogPost[];
  jobs: JobListing[];
  services: ServiceItem[];
  onSelectResult: (section: NavSection, itemId?: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  products,
  blogPosts,
  jobs,
  services,
  onSelectResult
}) => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim() || query.trim().length < 2) {
      return { products: [], blogPosts: [], jobs: [], services: [] };
    }
    const q = query.toLowerCase();

    return {
      products: products.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      ).slice(0, 3),

      blogPosts: blogPosts.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.excerpt.toLowerCase().includes(q) ||
        b.tags.some(t => t.toLowerCase().includes(q))
      ).slice(0, 3),

      jobs: jobs.filter(j =>
        j.title.toLowerCase().includes(q) ||
        j.description.toLowerCase().includes(q) ||
        j.departmentLabel.toLowerCase().includes(q)
      ).slice(0, 3),

      services: services.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.categoryLabel.toLowerCase().includes(q)
      ).slice(0, 3)
    };
  }, [query, products, blogPosts, jobs, services]);

  const totalResultsCount = 
    searchResults.products.length + 
    searchResults.blogPosts.length + 
    searchResults.jobs.length + 
    searchResults.services.length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in" dir="rtl">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 p-4 sm:p-5 border-b border-slate-100 bg-slate-50">
          <Search className="w-5 h-5 text-amber-600 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن منتج، مقال، وظيفة، أو خدمة في Nexus..."
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-500 hover:text-slate-900 px-2.5 py-1 bg-slate-200 rounded-lg"
            >
              مسح
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 bg-slate-200/70 hover:bg-slate-200 rounded-xl shrink-0 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Container */}
        <div className="p-4 sm:p-6 max-h-[65vh] overflow-y-auto space-y-6">
          {!query.trim() ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                البحث الموحد في منصة Nexus الرقمية
              </h3>
              <p className="text-xs text-slate-500">
                اكتب ما تبحث عنه للوصول السريع للمنتجات، المقالات، الخدمات، أو الوظائف الشاغرة.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <span className="text-xs text-slate-400">جرب البحث عن:</span>
                {['ذكاء اصطناعي', 'لوحة مفاتيح', 'مهندس برمجيات', 'استشارات سحابية', 'Thunderbolt'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 hover:text-amber-700 hover:bg-amber-50 transition-colors border border-slate-200"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResultsCount === 0 ? (
            <div className="text-center py-10 text-slate-500 text-xs">
              لم نعثر على نتائج مطابقة لـ "{query}". جرب كلمات بحث أخرى.
            </div>
          ) : (
            <div className="space-y-5">
              {/* Products Results */}
              {searchResults.products.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>المنتجات ({searchResults.products.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {searchResults.products.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onSelectResult('ecommerce', p.id);
                          onClose();
                        }}
                        className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-amber-50/60 border border-slate-200 hover:border-amber-300 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img src={p.image} alt={p.name} className="w-10 h-10 rounded-xl object-cover" referrerPolicy="no-referrer" />
                          <div>
                            <h4 className="text-xs font-bold text-slate-900">{p.name}</h4>
                            <span className="text-[11px] text-amber-700 font-bold font-['Alexandria']">{p.price} ر.س</span>
                          </div>
                        </div>
                        <ArrowLeft className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Services Results */}
              {searchResults.services.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700">
                    <Layers className="w-3.5 h-3.5" />
                    <span>الخدمات والحلول ({searchResults.services.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {searchResults.services.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => {
                          onSelectResult('services', s.id);
                          onClose();
                        }}
                        className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200 hover:border-blue-300 cursor-pointer transition-colors"
                      >
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{s.title}</h4>
                          <p className="text-[11px] text-slate-500 line-clamp-1">{s.subtitle}</p>
                        </div>
                        <ArrowLeft className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Blog Results */}
              {searchResults.blogPosts.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-purple-700">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>المقالات والمدونة ({searchResults.blogPosts.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {searchResults.blogPosts.map((b) => (
                      <div
                        key={b.id}
                        onClick={() => {
                          onSelectResult('blog', b.id);
                          onClose();
                        }}
                        className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-purple-50/60 border border-slate-200 hover:border-purple-300 cursor-pointer transition-colors"
                      >
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{b.title}</h4>
                          <span className="text-[11px] text-slate-500">{b.publishedAt} • {b.readTime}</span>
                        </div>
                        <ArrowLeft className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Jobs Results */}
              {searchResults.jobs.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>فرص العمل ({searchResults.jobs.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {searchResults.jobs.map((j) => (
                      <div
                        key={j.id}
                        onClick={() => {
                          onSelectResult('careers', j.id);
                          onClose();
                        }}
                        className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-300 cursor-pointer transition-colors"
                      >
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{j.title}</h4>
                          <span className="text-[11px] text-slate-500">{j.departmentLabel} • {j.salaryRange}</span>
                        </div>
                        <ArrowLeft className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

