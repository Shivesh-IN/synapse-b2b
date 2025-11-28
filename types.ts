export enum ProductCategory {
  DISC_PADS = 'Disc Brake Pads',
  BRAKE_SHOE = 'Brake Shoe',
  EV = 'EV'
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  stock: number;
  description: string;
  vehicleCompatibility: string[];
  imageUrl: string;
  tags?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export enum OrderStatus {
  PENDING = 'Pending',
  PROCESSING = 'Processing',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled'
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  customerName: string;
}

export interface SalesDataPoint {
  month: string;
  revenue: number;
  orders: number;
}

export interface InsightData {
  trendAnalysis: string;
  forecastedDemand: string;
  restockRecommendations: string[];
  riskFactor: string;
}