import {
  Package, DollarSign, AlertTriangle, TrendingUp, ShoppingCart, Target
} from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import StatCard from '../components/StatCard';
import { dashboardStats, monthlySalesData, categoryDistribution, restockAlerts, products } from '../data/mockData';

export default function Dashboard() {
  const stats = [
    { title: 'Total Products', value: dashboardStats.totalProducts, change: '+3 this week', changeType: 'positive' as const, icon: Package },
    { title: 'Monthly Revenue', value: `$${(dashboardStats.totalRevenue / 1000).toFixed(1)}k`, change: '+12.5% vs last month', changeType: 'positive' as const, icon: DollarSign },
    { title: 'Low Stock Items', value: dashboardStats.lowStockItems, change: 'Needs attention', changeType: 'negative' as const, icon: AlertTriangle },
    { title: 'Forecast Accuracy', value: `${dashboardStats.forecastAccuracy}%`, change: '+2.1% improvement', changeType: 'positive' as const, icon: Target },
    { title: 'Daily Avg Sales', value: dashboardStats.avgDailySales, change: 'Across all products', changeType: 'neutral' as const, icon: ShoppingCart },
    { title: 'Pending Orders', value: dashboardStats.pendingOrders, change: 'Awaiting approval', changeType: 'neutral' as const, icon: TrendingUp },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">AI-powered inventory intelligence at a glance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <StatCard key={stat.title} {...stat} delay={i * 80} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 glass rounded-xl p-6">
          <h3 className="font-display font-semibold text-foreground mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlySalesData}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(187, 80%, 48%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(187, 80%, 48%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 16%)" />
              <XAxis dataKey="month" stroke="hsl(215, 20%, 55%)" fontSize={12} />
              <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(222, 44%, 10%)',
                  border: '1px solid hsl(222, 30%, 16%)',
                  borderRadius: '8px',
                  color: 'hsl(210, 40%, 96%)',
                  fontSize: '12px',
                }}
              />
              <Area type="monotone" dataKey="revenue" stroke="hsl(187, 80%, 48%)" fill="url(#revenueGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Pie */}
        <div className="glass rounded-xl p-6">
          <h3 className="font-display font-semibold text-foreground mb-4">Categories</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={categoryDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" stroke="none">
                {categoryDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(222, 44%, 10%)',
                  border: '1px solid hsl(222, 30%, 16%)',
                  borderRadius: '8px',
                  color: 'hsl(210, 40%, 96%)',
                  fontSize: '12px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {categoryDistribution.map(cat => (
              <div key={cat.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.fill }} />
                  <span className="text-muted-foreground">{cat.name}</span>
                </div>
                <span className="text-foreground font-medium">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Restock Alerts */}
      <div className="glass rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold text-foreground">⚠️ Restock Alerts</h3>
          <span className="text-xs bg-destructive/20 text-destructive px-2 py-1 rounded-full font-medium">{restockAlerts.length} active</span>
        </div>
        <div className="space-y-3">
          {restockAlerts.map(alert => (
            <div key={alert.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border">
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${
                  alert.urgency === 'critical' ? 'bg-destructive animate-pulse' :
                  alert.urgency === 'high' ? 'bg-warning' : 'bg-muted-foreground'
                }`} />
                <div>
                  <p className="text-sm font-medium text-foreground">{alert.productName}</p>
                  <p className="text-xs text-muted-foreground">Stock: {alert.currentStock} / Threshold: {alert.threshold}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Suggested order</p>
                <p className="text-sm font-semibold text-primary">{alert.suggestedOrder} units</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
