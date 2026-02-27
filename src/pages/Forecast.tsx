import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { products, generateForecast } from '../data/mockData';
import { Brain, TrendingUp, Calendar } from 'lucide-react';

export default function Forecast() {
  const [selectedProduct, setSelectedProduct] = useState(products[0].id);
  const [days, setDays] = useState(30);
  const forecastData = generateForecast(selectedProduct, days);
  const product = products.find(p => p.id === selectedProduct)!;

  const totalPredicted = forecastData.filter(f => !f.actual && f.predicted).reduce((a, b) => a + b.predicted, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-3">
          <Brain className="w-8 h-8 text-primary" />
          AI Demand Forecast
        </h1>
        <p className="text-muted-foreground mt-1">Machine learning powered demand predictions</p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={selectedProduct}
          onChange={e => setSelectedProduct(e.target.value)}
          className="px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        >
          {products.map(p => (
            <option key={p.id} value={p.id}>{p.image} {p.name}</option>
          ))}
        </select>

        <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
          {[7, 30, 90].map(d => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                days === d ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {d} days
            </button>
          ))}
        </div>
      </div>

      {/* AI Insight Card */}
      <div className="glass rounded-xl p-5 border-l-4 border-l-primary">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center mt-0.5">
            <Brain className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">AI Recommendation</p>
            <p className="text-sm text-muted-foreground mt-1">
              Based on historical trends, <span className="text-foreground font-medium">{product.name}</span> is projected to need{' '}
              <span className="text-primary font-semibold">{totalPredicted} units</span> over the next {days} days.
              {product.stock < totalPredicted && (
                <span className="text-warning"> Current stock ({product.stock}) is insufficient. Consider restocking immediately.</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Forecast Chart */}
      <div className="glass rounded-xl p-6">
        <h3 className="font-display font-semibold text-foreground mb-1">Demand Forecast</h3>
        <p className="text-xs text-muted-foreground mb-4">Actual vs Predicted with confidence interval</p>
        <ResponsiveContainer width="100%" height={360}>
          <AreaChart data={forecastData}>
            <defs>
              <linearGradient id="confGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(187, 80%, 48%)" stopOpacity={0.15} />
                <stop offset="100%" stopColor="hsl(187, 80%, 48%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 16%)" />
            <XAxis dataKey="date" stroke="hsl(215, 20%, 55%)" fontSize={10} tickFormatter={d => d.slice(5)} />
            <YAxis stroke="hsl(215, 20%, 55%)" fontSize={10} />
            <Tooltip contentStyle={{ backgroundColor: 'hsl(222, 44%, 10%)', border: '1px solid hsl(222, 30%, 16%)', borderRadius: '8px', color: 'hsl(210, 40%, 96%)', fontSize: '12px' }} />
            <Area type="monotone" dataKey="upper" stroke="none" fill="url(#confGrad)" />
            <Area type="monotone" dataKey="lower" stroke="none" fill="hsl(222, 44%, 8%)" />
            <Area type="monotone" dataKey="actual" stroke="hsl(152, 69%, 40%)" fill="none" strokeWidth={2} dot={false} />
            <Area type="monotone" dataKey="predicted" stroke="hsl(187, 80%, 48%)" fill="none" strokeWidth={2} strokeDasharray="6 3" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-6 mt-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-4 h-0.5 bg-success rounded" /> Actual
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-4 h-0.5 bg-primary rounded border-dashed" style={{ borderTop: '2px dashed hsl(187, 80%, 48%)' }} /> Predicted
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-4 h-3 bg-primary/15 rounded" /> Confidence
          </div>
        </div>
      </div>
    </div>
  );
}
