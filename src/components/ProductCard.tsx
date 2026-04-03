import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Eye } from 'lucide-react';
import { useStore, Product } from '@/store/useStore';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const isWished = wishlist.includes(product.id);

  const badgeStyles: Record<string, string> = {
    sale: 'bg-destructive text-destructive-foreground',
    new: 'bg-primary text-primary-foreground',
    bestseller: 'bg-green-700 text-green-50',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative rounded-card overflow-hidden bg-card border border-border hover:border-primary/40 transition-all duration-300"
      style={{ boxShadow: 'var(--shadow-card)' }}
      whileHover={{ y: -8, boxShadow: 'var(--shadow-card-hover)' }}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          loading="lazy"
        />

        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-3 left-3 px-2 py-0.5 rounded text-[0.65rem] font-ui font-semibold uppercase ${badgeStyles[product.badge]}`}>
            {product.badge}
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
          className="absolute top-3 right-3 p-2 rounded-full bg-background/60 glass-effect hover:bg-background/80 transition-colors"
        >
          <span className={`font-ui text-[10px] uppercase tracking-wide ${isWished ? 'text-primary' : 'text-foreground'}`}>
            {isWished ? 'Saved' : 'Save'}
          </span>
        </button>

        {/* 3D Badge */}
        {product.has3D && (
          <span className="absolute bottom-3 left-3 px-2 py-1 rounded text-[0.6rem] font-ui font-bold bg-primary/90 text-primary-foreground flex items-center gap-1">
            <span className="text-xs">👑</span> 3D
          </span>
        )}

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-all duration-300 flex items-center justify-center">
          <Link
            to={`/product/${product.id}`}
            className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 px-4 py-2 rounded-pill bg-background/80 glass-effect font-ui text-sm text-foreground flex items-center gap-2 hover:bg-background"
          >
            <Eye size={16} /> Quick View
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <p className="font-ui text-[0.7rem] text-muted-foreground uppercase tracking-wider mb-1">{product.category}</p>
        <h3 className="font-heading text-[0.9rem] text-foreground leading-tight line-clamp-2 mb-2">{product.name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={12} className={i < Math.floor(product.rating) ? 'fill-primary text-primary' : 'text-muted-foreground'} />
          ))}
          <span className="font-ui text-[0.7rem] text-muted-foreground ml-1">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-ui font-bold text-primary">${product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="font-ui text-xs text-muted-foreground line-through">${product.originalPrice.toLocaleString()}</span>
          )}
        </div>

        {/* Color dots */}
        <div className="flex items-center gap-1 mb-3">
          {product.colors.slice(0, 4).map((color) => (
            <span key={color} className="w-3 h-3 rounded-full border border-border" style={{ backgroundColor: color }} />
          ))}
          {product.colors.length > 4 && (
            <span className="font-ui text-[0.6rem] text-muted-foreground">+{product.colors.length - 4}</span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={() => addToCart({
            product,
            quantity: 1,
            selectedColor: product.colors[0] || '',
            selectedSize: product.sizes[0] || '',
          })}
          className="w-full py-2 rounded-md font-ui text-sm font-semibold text-primary-foreground flex items-center justify-center gap-2 transition-all hover:scale-[0.98] active:scale-95"
          style={{ background: 'var(--gradient-button)', boxShadow: 'var(--shadow-btn)' }}
        >
          <ShoppingCart size={14} /> Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
