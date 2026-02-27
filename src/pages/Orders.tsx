import { purchaseOrders } from '../data/mockData';
import { ClipboardList, Clock, CheckCircle2, Truck, Package } from 'lucide-react';

const statusConfig = {
  pending: { label: 'Pending', icon: Clock, className: 'bg-warning/20 text-warning' },
  approved: { label: 'Approved', icon: CheckCircle2, className: 'bg-primary/20 text-primary' },
  shipped: { label: 'Shipped', icon: Truck, className: 'bg-accent text-accent-foreground' },
  delivered: { label: 'Delivered', icon: Package, className: 'bg-success/20 text-success' },
};

export default function Orders() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-3">
          <ClipboardList className="w-8 h-8 text-primary" />
          Purchase Orders
        </h1>
        <p className="text-muted-foreground mt-1">Track and manage auto-generated orders</p>
      </div>

      <div className="glass rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {['Order ID', 'Product', 'Supplier', 'Quantity', 'Total', 'Status', 'Expected'].map(h => (
                <th key={h} className="text-left text-xs font-medium uppercase tracking-wider text-muted-foreground px-5 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {purchaseOrders.map((po, i) => {
              const status = statusConfig[po.status];
              return (
                <tr key={po.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors opacity-0 animate-slide-in" style={{ animationDelay: `${i * 80}ms` }}>
                  <td className="px-5 py-4 text-sm font-mono text-primary">{po.id}</td>
                  <td className="px-5 py-4 text-sm font-medium text-foreground">{po.productName}</td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{po.supplier}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-foreground">{po.quantity}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-foreground">${po.totalCost.toLocaleString()}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${status.className}`}>
                      <status.icon className="w-3 h-3" />
                      {status.label}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{po.expectedDelivery}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
