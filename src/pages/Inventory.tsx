import { useState } from 'react';
import { products as initialProducts } from '../data/mockData';
import { Product } from '../data/types';
import { Search, Plus, Edit2, Trash2, ArrowUpDown } from 'lucide-react';

export default function Inventory() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'stock' | 'price'>('name');
  const prods = [...initialProducts]
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sortBy === 'name' ? a.name.localeCompare(b.name) : sortBy === 'stock' ? a.stock - b.stock : b.price - a.price);

  const stockStatus = (p: Product) => {
    if (p.stock <= p.threshold * 0.3) return { label: 'Critical', className: 'bg-destructive/20 text-destructive' };
    if (p.stock < p.threshold) return { label: 'Low', className: 'bg-warning/20 text-warning' };
    return { label: 'Healthy', className: 'bg-success/20 text-success' };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Inventory</h1>
          <p className="text-muted-foreground mt-1">{initialProducts.length} products tracked</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products or SKU..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="flex items-center gap-1">
          {(['name', 'stock', 'price'] as const).map(s => (
            <button
              key={s}
              onClick={() => setSortBy(s)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                sortBy === s ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="glass rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-medium uppercase tracking-wider text-muted-foreground px-5 py-3">Product</th>
              <th className="text-left text-xs font-medium uppercase tracking-wider text-muted-foreground px-5 py-3">SKU</th>
              <th className="text-left text-xs font-medium uppercase tracking-wider text-muted-foreground px-5 py-3">Category</th>
              <th className="text-right text-xs font-medium uppercase tracking-wider text-muted-foreground px-5 py-3">Price</th>
              <th className="text-right text-xs font-medium uppercase tracking-wider text-muted-foreground px-5 py-3">Stock</th>
              <th className="text-left text-xs font-medium uppercase tracking-wider text-muted-foreground px-5 py-3">Status</th>
              <th className="text-right text-xs font-medium uppercase tracking-wider text-muted-foreground px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {prods.map((p, i) => {
              const status = stockStatus(p);
              return (
                <tr key={p.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors opacity-0 animate-slide-in" style={{ animationDelay: `${i * 50}ms` }}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{p.image}</span>
                      <span className="text-sm font-medium text-foreground">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-xs font-mono text-muted-foreground">{p.sku}</td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{p.category}</td>
                  <td className="px-5 py-4 text-sm text-foreground text-right font-medium">${p.price}</td>
                  <td className="px-5 py-4 text-right">
                    <span className="text-sm font-semibold text-foreground">{p.stock}</span>
                    <span className="text-xs text-muted-foreground"> / {p.threshold}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${status.className}`}>
                      {status.label}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
