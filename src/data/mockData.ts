import { Product, Sale, ForecastPoint, PurchaseOrder, RestockAlert } from './types';

export const products: Product[] = [
  { id: '1', name: 'Wireless Earbuds Pro', sku: 'WEP-001', category: 'Electronics', price: 79.99, stock: 12, threshold: 25, supplier: 'TechFlow Inc.', image: '🎧' },
  { id: '2', name: 'Organic Green Tea', sku: 'OGT-002', category: 'Beverages', price: 14.99, stock: 180, threshold: 50, supplier: 'NatureBrew Co.', image: '🍵' },
  { id: '3', name: 'USB-C Hub Adapter', sku: 'UCH-003', category: 'Electronics', price: 45.99, stock: 8, threshold: 20, supplier: 'TechFlow Inc.', image: '🔌' },
  { id: '4', name: 'Running Shoes X1', sku: 'RSX-004', category: 'Sports', price: 129.99, stock: 34, threshold: 15, supplier: 'ActiveGear Ltd.', image: '👟' },
  { id: '5', name: 'Vitamin D3 Capsules', sku: 'VDC-005', category: 'Health', price: 22.99, stock: 5, threshold: 30, supplier: 'WellLife Pharma', image: '💊' },
  { id: '6', name: 'Bamboo Desk Organizer', sku: 'BDO-006', category: 'Office', price: 34.99, stock: 67, threshold: 20, supplier: 'EcoWood Supply', image: '📦' },
  { id: '7', name: 'Protein Shake Mix', sku: 'PSM-007', category: 'Health', price: 39.99, stock: 22, threshold: 35, supplier: 'ActiveGear Ltd.', image: '🥤' },
  { id: '8', name: 'LED Desk Lamp', sku: 'LDL-008', category: 'Office', price: 59.99, stock: 41, threshold: 15, supplier: 'TechFlow Inc.', image: '💡' },
];

const generateDailySales = (): Sale[] => {
  const sales: Sale[] = [];
  const now = new Date();
  for (let i = 90; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    products.forEach(p => {
      const base = Math.random() * 10 + 2;
      const seasonal = Math.sin((i / 90) * Math.PI * 2) * 3;
      const qty = Math.max(0, Math.round(base + seasonal + (Math.random() - 0.5) * 4));
      if (qty > 0) {
        sales.push({
          id: `sale-${p.id}-${i}`,
          productId: p.id,
          productName: p.name,
          quantity: qty,
          revenue: qty * p.price,
          date: date.toISOString().split('T')[0],
        });
      }
    });
  }
  return sales;
};

export const sales: Sale[] = generateDailySales();

export const generateForecast = (productId: string, days: number): ForecastPoint[] => {
  const points: ForecastPoint[] = [];
  const now = new Date();
  const productSales = sales.filter(s => s.productId === productId);
  const avgDaily = productSales.reduce((a, b) => a + b.quantity, 0) / 90;

  for (let i = -30; i <= days; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    const trend = avgDaily * (1 + Math.sin(i / 15) * 0.3);
    const noise = (Math.random() - 0.5) * avgDaily * 0.4;

    if (i <= 0) {
      const actual = productSales.find(s => s.date === dateStr);
      points.push({
        date: dateStr,
        actual: actual?.quantity ?? Math.max(0, Math.round(trend + noise)),
        predicted: Math.max(0, Math.round(trend)),
        lower: Math.max(0, Math.round(trend * 0.7)),
        upper: Math.round(trend * 1.3),
      });
    } else {
      points.push({
        date: dateStr,
        predicted: Math.max(0, Math.round(trend)),
        lower: Math.max(0, Math.round(trend * 0.65)),
        upper: Math.round(trend * 1.35),
      });
    }
  }
  return points;
};

export const restockAlerts: RestockAlert[] = products
  .filter(p => p.stock < p.threshold)
  .map(p => ({
    id: `alert-${p.id}`,
    productId: p.id,
    productName: p.name,
    currentStock: p.stock,
    threshold: p.threshold,
    predictedDemand: Math.round(Math.random() * 30 + 20),
    suggestedOrder: Math.round((p.threshold - p.stock) * 1.5 + Math.random() * 20),
    urgency: p.stock < p.threshold * 0.3 ? 'critical' : p.stock < p.threshold * 0.6 ? 'high' : 'medium',
    supplier: p.supplier,
    createdAt: new Date().toISOString(),
  }));

export const purchaseOrders: PurchaseOrder[] = [
  { id: 'PO-001', productId: '1', productName: 'Wireless Earbuds Pro', supplier: 'TechFlow Inc.', quantity: 50, status: 'pending', totalCost: 2400, createdAt: '2026-02-25', expectedDelivery: '2026-03-02' },
  { id: 'PO-002', productId: '5', productName: 'Vitamin D3 Capsules', supplier: 'WellLife Pharma', quantity: 100, status: 'approved', totalCost: 1150, createdAt: '2026-02-24', expectedDelivery: '2026-03-01' },
  { id: 'PO-003', productId: '3', productName: 'USB-C Hub Adapter', supplier: 'TechFlow Inc.', quantity: 40, status: 'shipped', totalCost: 1104, createdAt: '2026-02-20', expectedDelivery: '2026-02-28' },
];

export const dashboardStats = {
  totalProducts: products.length,
  totalRevenue: sales.reduce((a, b) => a + b.revenue, 0),
  lowStockItems: products.filter(p => p.stock < p.threshold).length,
  pendingOrders: purchaseOrders.filter(p => p.status === 'pending').length,
  forecastAccuracy: 87.3,
  avgDailySales: Math.round(sales.length / 90),
};

export const monthlySalesData = (() => {
  const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb'];
  return months.map((m, i) => ({
    month: m,
    revenue: Math.round(20000 + Math.random() * 15000 + i * 3000),
    orders: Math.round(200 + Math.random() * 100 + i * 20),
  }));
})();

export const categoryDistribution = [
  { name: 'Electronics', value: 35, fill: 'hsl(187, 80%, 48%)' },
  { name: 'Health', value: 25, fill: 'hsl(152, 69%, 40%)' },
  { name: 'Office', value: 20, fill: 'hsl(38, 92%, 50%)' },
  { name: 'Sports', value: 12, fill: 'hsl(280, 65%, 60%)' },
  { name: 'Beverages', value: 8, fill: 'hsl(340, 75%, 55%)' },
];
