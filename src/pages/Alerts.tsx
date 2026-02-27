import { restockAlerts, products } from '../data/mockData';
import { AlertTriangle, Bell, ShoppingCart, CheckCircle2 } from 'lucide-react';

export default function Alerts() {
  const urgencyOrder = { critical: 0, high: 1, medium: 2 };
  const sorted = [...restockAlerts].sort((a, b) => urgencyOrder[a.urgency] - urgencyOrder[b.urgency]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-warning" />
            Restock Alerts
          </h1>
          <p className="text-muted-foreground mt-1">Smart auto-restock engine powered by AI predictions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
          <ShoppingCart className="w-4 h-4" />
          Generate All Orders
        </button>
      </div>

      {sorted.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center">
          <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-3" />
          <p className="text-foreground font-medium">All stock levels are healthy!</p>
          <p className="text-sm text-muted-foreground">No restock alerts at this time.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sorted.map((alert, i) => (
            <div
              key={alert.id}
              className="glass rounded-xl p-5 border-l-4 opacity-0 animate-slide-in"
              style={{
                borderLeftColor: alert.urgency === 'critical' ? 'hsl(0, 72%, 51%)' : alert.urgency === 'high' ? 'hsl(38, 92%, 50%)' : 'hsl(215, 20%, 55%)',
                animationDelay: `${i * 100}ms`,
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    alert.urgency === 'critical' ? 'bg-destructive/20' : alert.urgency === 'high' ? 'bg-warning/20' : 'bg-secondary'
                  }`}>
                    <Bell className={`w-5 h-5 ${
                      alert.urgency === 'critical' ? 'text-destructive animate-pulse' : alert.urgency === 'high' ? 'text-warning' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-foreground">{alert.productName}</p>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        alert.urgency === 'critical' ? 'bg-destructive/20 text-destructive' :
                        alert.urgency === 'high' ? 'bg-warning/20 text-warning' :
                        'bg-secondary text-muted-foreground'
                      }`}>
                        {alert.urgency}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Current Stock: <span className="text-foreground font-medium">{alert.currentStock}</span> · 
                      Threshold: <span className="text-foreground font-medium">{alert.threshold}</span> · 
                      Predicted Demand: <span className="text-primary font-medium">{alert.predictedDemand}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">Supplier: {alert.supplier}</p>
                  </div>
                </div>

                <div className="text-right space-y-2">
                  <p className="text-xs text-muted-foreground">Suggested Order</p>
                  <p className="text-lg font-display font-bold text-primary">{alert.suggestedOrder} units</p>
                  <button className="text-xs px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors">
                    Create PO
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
