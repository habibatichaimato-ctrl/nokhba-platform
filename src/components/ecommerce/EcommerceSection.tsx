import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, 
  Search, 
  
  Check, 
  Eye, 
  Filter, 
  Plus, 
  Minus, 
  Trash2, 
  X, 
  Sparkles, 
  Tag, 
  ShieldCheck, 
  Truck, 
  CreditCard,
  CheckCircle2,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { Product, CartItem } from '../../types';

interface EcommerceSectionProps {
  products: Product[];
  cart: CartItem[];
  onAddToCart: (product: Product, quantity?: number) => void;
  onUpdateCartQuantity: (productId: string, quantity: number) => void;
  onRemoveFromCart: (productId: string) => void;
  onCheckout: (orderDetails: any) => void;
  isCartOpen: boolean;
  onCloseCart: () => void;
}

export const EcommerceSection: React.FC<EcommerceSectionProps> = ({
  products,
  cart,
  onAddToCart,
  onUpdateCartQuantity,
  onRemoveFromCart,
  onCheckout,
  isCartOpen,
  onCloseCart
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [modalQuantity, setModalQuantity] = useState<number>(1);
  const [promoCode, setPromoCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoError, setPromoError] = useState<string>('');
  const [promoSuccess, setPromoSuccess] = useState<string>('');
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false);

  // Checkout Form State
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCity, setCustomerCity] = useState('الدار البيضاء');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple-pay' | 'cod'>('card');
  const [orderCompletedId, setOrderCompletedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'كافة المنتجات' },
    { id: 'skincare', label: 'العناية بالبشرة والتجميل' },
    { id: 'personal-care', label: 'العناية الشخصية' },
    { id: 'supplements', label: 'المكملات الغذائية والصحة' },
    { id: 'home-products', label: 'المنتجات المنزلية' },
    { id: 'food', label: 'الأغذية والأطعمة' },
  ];

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
        const matchesSearch = 
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.nameEn && p.nameEn.toLowerCase().includes(searchQuery.toLowerCase())) ||
          p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  // Cart Calculations
  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    return (subtotal * discountPercent) / 100;
  }, [subtotal, discountPercent]);

  const finalTotal = useMemo(() => {
    return Math.max(0, subtotal - discountAmount);
  }, [subtotal, discountAmount]);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');
    if (promoCode.trim().toUpperCase() === 'NEXUS20') {
      setDiscountPercent(20);
      setPromoSuccess('تم تطبيق خصم 20% بنجاح!');
    } else if (promoCode.trim().toUpperCase() === 'NEXUS10') {
      setDiscountPercent(10);
      setPromoSuccess('تم تطبيق خصم 10% بنجاح!');
    } else {
      setPromoError('رمز القسيمة غير صالح. جرب كود NEXUS20');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) return;
    const newOrderId = `NEX-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderData = {
      id: newOrderId,
      items: cart,
      subtotal,
      discount: discountAmount,
      total: finalTotal,
      customer: {
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
        city: customerCity,
        address: customerAddress,
        paymentMethod
      },
      createdAt: new Date().toISOString()
    };
    onCheckout(orderData);
    setOrderCompletedId(newOrderId);
  };

  return (
    <div className="py-8 space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/20 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold mb-3">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>متجر Nexus للتقنيات الفائقة</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            عتاد تقني متطور لرواد الأعمال والمطورين
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl">
            أجهزة مصممة لرفع الإنتاجية، تأمين العمليات السحابية، ودمج الذكاء الاصطناعي مع شحن فوري وضمان سنتين.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-300">
          <div className="flex items-center gap-2 bg-slate-950/60 px-3.5 py-2 rounded-xl border border-slate-800">
            <Truck className="w-4 h-4 text-amber-400" />
            <span>شحن مجاني للطلبات فوق 300 د.م</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-950/60 px-3.5 py-2 rounded-xl border border-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>ضمان استبدال فوري سنتين</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              id="ecommerce-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن منتج أو مواصفة..."
              className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-xl pr-10 pl-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
            />
          </div>

          <select
            id="ecommerce-sort-select"
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="featured">المميز أولاً</option>
            <option value="price-asc">السعر: من الأقل</option>
            <option value="price-desc">السعر: من الأعلى</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/50 rounded-3xl border border-slate-800">
          <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">لم يتم العثور على منتجات مطابقة</h3>
          <p className="text-xs text-slate-400">جرب تغيير كلمات البحث أو اختيار تصنيف آخر.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              id={`product-card-${product.id}`}
              className="group rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Product Image Box */}
              <div className="relative aspect-4/3 overflow-hidden bg-slate-950">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                {/* Badges */}
                <div className="absolute top-3 right-3 flex flex-wrap gap-1.5">
                  {product.originalPrice && (
                    <span className="bg-rose-500 text-white text-[11px] font-black px-2 py-0.5 rounded-lg shadow">
                      خصم {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  )}
                  {product.featured && (
                    <span className="bg-amber-500 text-slate-950 text-[11px] font-bold px-2 py-0.5 rounded-lg shadow">
                      الأكثر طلباً
                    </span>
                  )}
                </div>

                {/* Quick View Button on Image */}
                <button
                  onClick={() => {
                    setSelectedProductForModal(product);
                    setModalQuantity(1);
                  }}
                  className="absolute bottom-3 left-3 bg-slate-900/90 hover:bg-amber-500 hover:text-slate-950 text-white p-2 rounded-xl border border-slate-700 shadow-md transition-colors text-xs font-semibold flex items-center gap-1.5"
                  aria-label="معاينة تفاصيل المنتج"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>تفاصيل</span>
                </button>
              </div>

              {/* Product Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs text-slate-400 mb-1.5">
                    <span className="font-medium text-amber-400/90">{product.categoryLabel}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1 mb-1.5">
                    {product.name}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                    {product.description}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {product.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-950 text-slate-400 px-2 py-0.5 rounded-md border border-slate-800">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price and Add to Cart Action */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-black text-white font-['Alexandria']">{product.price}</span>
                      <span className="text-xs text-amber-400 font-bold">د.م</span>
                    </div>
                    {product.originalPrice && (
                      <span className="text-[11px] text-slate-500 line-through">
                        {product.originalPrice} د.م
                      </span>
                    )}
                  </div>

                  <button
                    id={`add-to-cart-btn-${product.id}`}
                    onClick={() => onAddToCart(product, 1)}
                    className="px-3.5 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>أضف للسلة</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Quick View / Detail Modal */}
      {selectedProductForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProductForModal(null)}
              className="absolute top-4 left-4 p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="rounded-2xl overflow-hidden aspect-square bg-slate-950">
                <img
                  src={selectedProductForModal.image}
                  alt={selectedProductForModal.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-4">
                <span className="text-xs font-semibold text-amber-400 px-2.5 py-1 bg-amber-500/10 rounded-lg border border-amber-500/20">
                  {selectedProductForModal.categoryLabel}
                </span>

                <h3 className="text-xl font-bold text-white">
                  {selectedProductForModal.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedProductForModal.description}
                </p>

                {/* Specs Table */}
                <div className="bg-slate-950/70 rounded-xl p-3 border border-slate-800 space-y-1.5 text-xs">
                  <h4 className="font-bold text-white mb-2">المواصفات التقنية:</h4>
                  {Object.entries(selectedProductForModal.specs).map(([key, val]) => (
                    <div key={key} className="flex justify-between py-1 border-b border-slate-800/60 last:border-0 text-slate-300">
                      <span className="text-slate-400">{key}:</span>
                      <span className="font-medium text-white">{val}</span>
                    </div>
                  ))}
                </div>

                {/* Price and Quantity */}
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-2xl font-black text-white font-['Alexandria']">{selectedProductForModal.price}</span>
                    <span className="text-xs text-amber-400 font-bold mr-1">د.م</span>
                  </div>

                  <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                    <button
                      onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-bold text-white px-2">{modalQuantity}</span>
                    <button
                      onClick={() => setModalQuantity(modalQuantity + 1)}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onAddToCart(selectedProductForModal, modalQuantity);
                    setSelectedProductForModal(null);
                  }}
                  className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 flex items-center justify-center gap-2 text-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>إضافة إلى السلة ({selectedProductForModal.price * modalQuantity} د.م)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shopping Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-start bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md bg-slate-900 border-l border-slate-800 h-full p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
            {/* Top header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg font-bold text-white">سلة التسوق</h3>
                  <span className="text-xs bg-slate-800 text-amber-400 px-2 py-0.5 rounded-full font-bold">
                    {cart.reduce((c, item) => c + item.quantity, 0)} عناصر
                  </span>
                </div>
                <button
                  onClick={onCloseCart}
                  className="p-2 text-slate-400 hover:text-white bg-slate-800/80 rounded-xl"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Items List */}
              {cart.length === 0 ? (
                <div className="text-center py-16 text-slate-400 space-y-3">
                  <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
                  <p className="font-semibold text-sm">سلتك فارغة حالياً</p>
                  <p className="text-xs text-slate-500">تصفح المتجر وأضف منتجاتك المفضلة.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[45vh] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-3 p-3 bg-slate-950/80 border border-slate-800 rounded-2xl"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0 bg-slate-900"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">{item.product.name}</h4>
                        <div className="text-xs text-amber-400 font-semibold font-['Alexandria']">
                          {item.product.price} د.م
                        </div>
                        <div className="flex items-center gap-2 mt-1.5">
                          <button
                            onClick={() => onUpdateCartQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 bg-slate-800 text-slate-300 rounded hover:bg-slate-700"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-white">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateCartQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 bg-slate-800 text-slate-300 rounded hover:bg-slate-700"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => onRemoveFromCart(item.product.id)}
                        className="p-2 text-slate-500 hover:text-rose-400 transition-colors"
                        aria-label="حذف من السلة"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer Calculation */}
            {cart.length > 0 && (
              <div className="pt-4 border-t border-slate-800 space-y-4">
                {/* Coupon Code Input */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="كود الخصم (مثال: NEXUS20)"
                    className="flex-1 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-2 text-xs text-white uppercase placeholder:normal-case placeholder-slate-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold rounded-xl"
                  >
                    تطبيق
                  </button>
                </form>

                {promoSuccess && <p className="text-xs text-emerald-400">{promoSuccess}</p>}
                {promoError && <p className="text-xs text-rose-400">{promoError}</p>}

                {/* Subtotals */}
                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span>المجموع الفرعي:</span>
                    <span className="font-bold text-white font-['Alexandria']">{subtotal} د.م</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>خصم القسيمة ({discountPercent}%):</span>
                      <span className="font-bold font-['Alexandria']">-{discountAmount.toFixed(0)} د.م</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>الشحن والتوصيل:</span>
                    <span className="font-bold text-emerald-400">مجاني (عرض Nexus)</span>
                  </div>
                  <div className="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
                    <span>الإجمالي النهائي:</span>
                    <span className="text-amber-400 font-['Alexandria']">{finalTotal.toFixed(0)} د.م</span>
                  </div>
                </div>

                <button
                  id="checkout-drawer-btn"
                  onClick={() => {
                    onCloseCart();
                    setIsCheckoutModalOpen(true);
                  }}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black rounded-xl shadow-lg shadow-amber-500/20 text-sm flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>متابعة إتمام الطلب</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout Dialog Modal */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => {
                setIsCheckoutModalOpen(false);
                setOrderCompletedId(null);
              }}
              className="absolute top-4 left-4 p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>

            {orderCompletedId ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-white">تم استلام طلبك بنجاح!</h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  رقم الطلب الخاص بك: <span className="font-bold text-amber-400 font-mono">{orderCompletedId}</span>
                </p>
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-right text-xs space-y-1.5 text-slate-300">
                  <p><span className="text-slate-400">العميل:</span> {customerName}</p>
                  <p><span className="text-slate-400">الهاتف:</span> {customerPhone}</p>
                  <p><span className="text-slate-400">العنوان:</span> {customerCity} - {customerAddress}</p>
                  <p><span className="text-slate-400">المبلغ الإجمالي:</span> <span className="text-amber-400 font-bold">{finalTotal.toFixed(0)} د.م</span></p>
                </div>
                <button
                  onClick={() => {
                    setIsCheckoutModalOpen(false);
                    setOrderCompletedId(null);
                  }}
                  className="w-full py-3 bg-amber-500 text-slate-950 font-bold rounded-xl text-sm"
                >
                  العودة للمتجر
                </button>
              </div>
            ) : (
              <form onSubmit={handlePlaceOrder} className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-5 h-5 text-amber-400" />
                  <h3 className="text-xl font-bold text-white">إتمام عملية الشراء</h3>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">الاسم الكامل *</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="مثال: فيصل القحطاني"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">رقم الجوال *</label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="05XXXXXXXX"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">المدينة *</label>
                      <select
                        value={customerCity}
                        onChange={(e) => setCustomerCity(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none cursor-pointer"
                      >
                        <option value="الدار البيضاء">الدار البيضاء</option>
                        <option value="الرباط">الرباط</option>
                        <option value="فاس">فاس</option>
                        <option value="مراكش">مراكش</option>
                        <option value="طنجة">طنجة</option>
                        <option value="أكادير">أكادير</option>
                        <option value="مكناس">مكناس</option>
                        <option value="وجدة">وجدة</option>
                        <option value="القنيطرة">القنيطرة</option>
                        <option value="تطوان">تطوان</option>
                        <option value="الجديدة">الجديدة</option>
                        <option value="بني ملال">بني ملال</option>
                        <option value="خريبكة">خريبكة</option>
                        <option value="سلا">سلا</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">عنوان التوصيل التفصيلي *</label>
                    <input
                      type="text"
                      required
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder="الحي، اسم الشارع، رقم المبنى"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">طريقة الدفع</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 ${
                          paymentMethod === 'card'
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>بطاقة / مدى</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('apple-pay')}
                        className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 ${
                          paymentMethod === 'apple-pay'
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>Apple Pay</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 ${
                          paymentMethod === 'cod'
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        <Truck className="w-4 h-4" />
                        <span>عند الاستلام</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between text-sm font-bold text-white mt-4">
                  <span>المبلغ الواجب سداده:</span>
                  <span className="text-amber-400 font-['Alexandria']">{finalTotal.toFixed(0)} د.م</span>
                </div>

                <button
                  type="submit"
                  id="submit-order-btn"
                  className="w-full py-3 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-slate-950 font-black rounded-xl text-sm shadow-lg shadow-amber-500/20"
                >
                  تأكيد ودفع الطلب الآن
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
