import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Product } from '../../types';
import { SeoMeta } from './SeoMeta';

interface ProductPageProps {
  product: Product;
  onAddToCart: (product: Product, quantity?: number) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <article className="py-8 max-w-5xl mx-auto space-y-6">
      <SeoMeta title={`${product.name} | متجر منصة النخبة`} description={product.description} />
      <Link to="/products" className="inline-flex items-center gap-2 text-sm font-bold text-amber-300 hover:text-amber-200"><ArrowLeft className="w-4 h-4" /> العودة إلى المتجر</Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <img src={product.image} alt={product.name} className="w-full aspect-square object-cover rounded-2xl" referrerPolicy="no-referrer" />
        <div className="space-y-5">
          <span className="text-xs font-semibold text-amber-400 px-2.5 py-1 bg-amber-500/10 rounded-lg border border-amber-500/20">{product.categoryLabel}</span>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">{product.name}</h1>
          <p className="text-sm text-slate-300 leading-relaxed">{product.description}</p>
          <div className="bg-slate-950/70 rounded-xl p-4 border border-slate-800 space-y-1.5 text-xs">
            <h2 className="font-bold text-white mb-2">المواصفات التقنية:</h2>
            {Object.entries(product.specs).map(([key, value]) => <div key={key} className="flex justify-between gap-4 py-1 border-b border-slate-800/60 last:border-0 text-slate-300"><span className="text-slate-400">{key}:</span><span className="font-medium text-white text-left">{value}</span></div>)}
          </div>
          <div className="flex items-center justify-between pt-2">
            <div><span className="text-3xl font-black text-white">{product.price}</span><span className="text-xs text-amber-400 font-bold mr-1">د.م</span></div>
            <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-1 text-slate-400 hover:text-white" aria-label="تقليل الكمية"><Minus className="w-3.5 h-3.5" /></button><span className="text-sm font-bold text-white px-2">{quantity}</span><button onClick={() => setQuantity(quantity + 1)} className="p-1 text-slate-400 hover:text-white" aria-label="زيادة الكمية"><Plus className="w-3.5 h-3.5" /></button></div>
          </div>
          <button onClick={() => onAddToCart(product, quantity)} className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black rounded-xl flex items-center justify-center gap-2 text-sm"><ShoppingBag className="w-4 h-4" /> إضافة إلى السلة ({product.price * quantity} د.م)</button>
        </div>
      </div>
    </article>
  );
};
