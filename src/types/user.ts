export type UserRole = 'customer' | 'seller' | 'admin';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type ProductAnalytics = {
  totalSales: number;
  stockLevel: number;
  revenue: number;
  lastRestocked: string;
};

export type DashboardStats = {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  lowStockProducts: number;
};