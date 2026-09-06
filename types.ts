// متغيرات معلومات النشر الحقيقية، يتم حقنها فعلياً وقت البناء من vite.config.ts
declare global {
  const __BUILD_DATE__: string;
  const __BUILD_COMMIT__: string;
}

export type NavSection = 'home' | 'ecommerce' | 'blog' | 'careers' | 'admin';

export type AdminTab = 'overview' | 'products' | 'blog' | 'careers' | 'users' | 'settings' | 'visits';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'editor' | 'moderator' | 'support';
  roleLabel: string;
  avatar: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  createdAt: string;
}

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'order' | 'career' | 'system';
}

export interface AdminActivityLog {
  id: string;
  adminName: string;
  action: string;
  target: string;
  timestamp: string;
  category: 'product' | 'blog' | 'job' | 'user' | 'security';
}

export interface Product {
  id: string;
  name: string;
  nameEn?: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'skincare' | 'personal-care' | 'supplements' | 'home-products' | 'food';
  categoryLabel: string;
  image: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  featured?: boolean;
  specs: { [key: string]: string };
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderDetails {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    city: string;
    address: string;
    paymentMethod: 'card' | 'apple-pay' | 'cod' | 'transfer';
  };
  createdAt: string;
}

export interface BlogComment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  category: 'work-from-home' | 'services' | 'health-nutrition-beauty';
  categoryLabel: string;
  tags: string[];
  readTime: string;
  publishedAt: string;
  likesCount: number;
  viewsCount: number;
  featured?: boolean;
  comments: BlogComment[];
}

export interface JobListing {
  id: string;
  title: string;
  department: 'tech' | 'marketing-sales' | 'admin' | 'finance' | 'design-creative' | 'writing-translation' | 'education' | 'logistics' | 'healthcare' | 'customer-support' | 'remote-freelance' | 'crafts';
  departmentLabel: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  typeLabel: string;
  experience: string;
  salaryRange: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  isUrgent?: boolean;
  isRemote?: boolean;
  postedAt: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  experienceYears: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  resumeFileName?: string;
  coverLetter?: string;
  submittedAt: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}
