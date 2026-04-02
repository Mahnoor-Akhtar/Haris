import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/products';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Grid3X3, List } from 'lucide-react';

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('featured');

  let filtered = selectedCategory ? products.filter(p => p.category === selectedCategory) : products;

  if (sortBy === 'price-low') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === 'price-high') filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  return (
    <div className="min-h-screen pt-36 lg:pt-40 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl md:text-4xl text-foreground mb-2">The Collection</h1>
          <p className="font-body text-muted-foreground">Every masterpiece, curated for royalty</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-pill font-ui text-sm whitespace-nowrap transition-all ${
                !selectedCategory ? 'text-primary-foreground font-semibold' : 'bg-secondary text-foreground hover:bg-muted'
              }`}
              style={!selectedCategory ? { background: 'var(--gradient-button)' } : {}}
            >
              All ({products.length})
            </button>
            {categories.filter(c => c.count > 0).map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-2 rounded-pill font-ui text-sm whitespace-nowrap transition-all ${
                  selectedCategory === cat.name ? 'text-primary-foreground font-semibold' : 'bg-secondary text-foreground hover:bg-muted'
                }`}
                style={selectedCategory === cat.name ? { background: 'var(--gradient-button)' } : {}}
              >
                {cat.icon} {cat.name} ({cat.count})
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-lg bg-input border border-border font-ui text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <span className="font-ui text-xs text-muted-foreground">{filtered.length} items</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 xl:gap-5">
          {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-heading text-xl text-foreground mb-2">No products found</p>
            <p className="font-body text-muted-foreground">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
