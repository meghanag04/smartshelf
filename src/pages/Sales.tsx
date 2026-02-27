import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { sales, products, monthlySalesData } from '../data/mockData';
import { TrendingUp, DollarSign, ShoppingCart } from 'lucide-react';

export default function Sales() {
  const totalRevenue = sales.reduce((a, b) => a + b.revenue, 0);
  const totalUnits = sales.reduce((a, b) => a + b.quantity, 0);

  // Top products by revenue
  const productRevenue = products.map(p => {
    const rev = sales.filter(s => s.productId === p.id).reduce((a, b) => a + b.revenue, 0);
    return { name: p.name, revenue: Math.round(rev), image: p.image };
  }).sort((a, b) => b.revenue - a.revenue);

  // Daily sales last 14 days
  const now = new Date();
  const dailySales = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - (13 - i));
    const dateStr = d.toISOString().split('T')[0];
    const daySales = sales.filter(s => s.date === dateStr);
    return {
      date: d.toLocaleDateString('en', { month: 'short', day: 'numeric' }),
      units: daySales.reduce((a, b) => a + b.quantity, 0),
      revenue: Math.round(daySales.reduce((a, b) => a + b.revenue, 0)),
    };
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Sales Analytics</h1>
        <p className="text-muted-foreground mt-1">Track performance across all products</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Revenue (90d)', value: `$${(totalRevenue / 1000).toFixed(1)}k`, icon: DollarSign },
          { label: 'Units Sold (90d)', value: totalUnits.toLocaleString(), icon: ShoppingCart },
          { label: 'Avg Daily Revenue', value: `$${Math.round(totalRevenue / 90).toLocaleString()}`, icon: TrendingUp },
        ].map((s, i) => (
          <div key={s.label} className="glass rounded-xl p-5 opacity-0 animate-slide-in" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
                <p className="text-2xl font-display font-bold text-foreground mt-1">{s.value}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Sales Chart */}
        <div className="glass rounded-xl p-6">
          <h3 className="font-display font-semibold text-foreground mb-4">Daily Sales (Last 14 Days)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={dailySales}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 16%)" />
              <XAxis dataKey="date" stroke="hsl(215, 20%, 55%)" fontSize={10} />
              <YAxis stroke="hsl(215, 20%, 55%)" fontSize={10} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(222, 44%, 10%)', border: '1px solid hsl(222, 30%, 16%)', borderRadius: '8px', color: 'hsl(210, 40%, 96%)', fontSize: '12px' }} />
              <Bar dataKey="revenue" fill="hsl(187, 80%, 48%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="glass rounded-xl p-6">
          <h3 className="font-display font-semibold text-foreground mb-4">Top Selling Products</h3>
          <div className="space-y-3">
            {productRevenue.slice(0, 6).map((p, i) => (
              <div key={p.name} className="flex items-center gap-3">
                <span className="text-xs font-mono text-muted-foreground w-4">{i + 1}</span>
                <span className="text-lg">{p.image}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                  <div className="mt-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${(p.revenue / productRevenue[0].revenue) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm font-semibold text-foreground">${(p.revenue / 1000).toFixed(1)}k</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
