export type NavSection = 'home' | 'ecommerce' | 'blog' | 'careers' | 'services' | 'admin';

export type AdminTab = 'overview' | 'products' | 'blog' | 'careers' | 'services' | 'users' | 'settings';

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
  type: 'order' | 'career' | 'service' | 'system';
}

export interface AdminActivityLog {
  id: string;
  adminName: string;
  action: string;
  target: string;
  timestamp: string;
  category: 'product' | 'blog' | 'job' | 'service' | 'user' | 'security';
}

export interface Product {
  id: string;
  name: string;
  nameEn?: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'smart-devices' | 'accessories' | 'software' | 'hardware' | 'wearables';
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
  category: 'ai' | 'development' | 'design' | 'business' | 'cybersecurity';
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
  department: 'engineering' | 'design' | 'product' | 'marketing' | 'sales' | 'security';
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

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  category: 'software' | 'cloud' | 'ai' | 'design' | 'security' | 'consulting';
  categoryLabel: string;
  startingPrice: number;
  deliveryTime: string;
  features: string[];
  deliverables: string[];
  tags: string[];
  popular?: boolean;
}

export interface ServiceQuoteRequest {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  serviceType: string;
  budgetRange: string;
  timeline: string;
  projectDescription: string;
  submittedAt: string;
}

export interface ServiceRequest {
  id: string;
  serviceId?: string;
  serviceTitle: string;
  clientName: string;
  companyName?: string;
  email: string;
  phone: string;
  budgetRange?: string;
  budget?: string;
  timeline: string;
  projectScope?: string;
  projectDetails?: string;
  additionalNotes?: string;
  submittedAt: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}
