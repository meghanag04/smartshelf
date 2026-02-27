export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  threshold: number;
  supplier: string;
  image: string;
}

export interface Sale {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  revenue: number;
  date: string;
}

export interface ForecastPoint {
  date: string;
  actual?: number;
  predicted: number;
  lower: number;
  upper: number;
}

export interface RestockAlert {
  id: string;
  productId: string;
  productName: string;
  currentStock: number;
  threshold: number;
  predictedDemand: number;
  suggestedOrder: number;
  urgency: 'critical' | 'high' | 'medium';
  supplier: string;
  createdAt: string;
}

export interface PurchaseOrder {
  id: string;
  productId: string;
  productName: string;
  supplier: string;
  quantity: number;
  status: 'pending' | 'approved' | 'shipped' | 'delivered';
  totalCost: number;
  createdAt: string;
  expectedDelivery: string;
}
