import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Share2, Truck, Shield, RotateCcw, Camera, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { products } from '@/data/products';
import ProductViewer3D from '@/components/ProductViewer3D';
import ProductCard from '@/components/ProductCard';

const materials = [
  { id: 'standard', label: 'Standard', icon: '🧵' },
  { id: 'metallic', label: 'Metallic', icon: '✨' },
  { id: 'velvet', label: 'Velvet', icon: '🎭' },
  { id: 'leather', label: 'Leather', icon: '🪶' },
] as const;

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id) || products[0];
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const isWished = wishlist.includes(product.id);

  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '#1A1A2E');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [selectedMaterial, setSelectedMaterial] = useState<'standard' | 'metallic' | 'velvet' | 'leather'>('standard');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [openSection, setOpenSection] = useState<string | null>('color');

  const related = products.filter(p => p.id !== product.id).slice(0, 5);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 font-ui text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-primary">Shop</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* 3D Viewer — 60% */}
          <div className="lg:col-span-3">
            {product.has3D ? (
              <div className="sticky top-24">
                <ProductViewer3D color={selectedColor} material={selectedMaterial} />
                <div className="flex items-center justify-between mt-3">
                  <p className="font-ui text-xs text-muted-foreground">Drag to rotate · Scroll to zoom</p>
                  <button className="p-2 rounded-lg bg-card border border-border hover:border-primary/40 transition-colors" title="Take Snapshot">
                    <Camera size={16} className="text-primary" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded-viewer overflow-hidden border border-border">
                <img src={product.image} alt={product.name} className="w-full aspect-square object-cover" />
              </div>
            )}
          </div>

          {/* Product Info + Configurator — 40% */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div>
              <p className="font-ui text-xs uppercase tracking-widest text-primary mb-2">{product.category}</p>
              <h1 className="font-heading text-2xl md:text-3xl text-foreground mb-3">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className={i < Math.floor(product.rating) ? 'fill-primary text-primary' : 'text-muted-foreground'} />
                  ))}
                </div>
                <span className="font-ui text-sm text-muted-foreground">{product.rating} ({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="font-ui font-bold text-primary" style={{ fontSize: '1.6rem' }}>
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="font-ui text-lg text-muted-foreground line-through">${product.originalPrice.toLocaleString()}</span>
                    <span className="px-2 py-0.5 rounded text-xs font-ui font-bold bg-destructive/10 text-destructive">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="border-t border-border pt-4" />

            {/* Configurator Accordion Sections */}
            <div className="space-y-2">
              {/* Color */}
              <div className="border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('color')}
                  className="w-full flex items-center justify-between p-4 font-heading text-sm text-foreground hover:bg-secondary/50"
                >
                  <span>Color</span>
                  <ChevronDown size={16} className={`transition-transform ${openSection === 'color' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openSection === 'color' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-0 flex items-center gap-3 flex-wrap">
                        {product.colors.map((color) => (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`w-8 h-8 rounded-full transition-all ${
                              selectedColor === color ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-110' : 'hover:scale-105'
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Size */}
              {product.sizes.length > 0 && (
                <div className="border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection('size')}
                    className="w-full flex items-center justify-between p-4 font-heading text-sm text-foreground hover:bg-secondary/50"
                  >
                    <span>Size</span>
                    <ChevronDown size={16} className={`transition-transform ${openSection === 'size' ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openSection === 'size' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-0 flex items-center gap-2 flex-wrap">
                          {product.sizes.map((size) => (
                            <button
                              key={size}
                              onClick={() => setSelectedSize(size)}
                              className={`px-4 py-2 rounded-md font-ui text-sm transition-all ${
                                selectedSize === size
                                  ? 'text-primary-foreground font-semibold'
                                  : 'bg-secondary text-foreground hover:bg-muted'
                              }`}
                              style={selectedSize === size ? { background: 'var(--gradient-button)' } : {}}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Material */}
              {product.has3D && (
                <div className="border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection('material')}
                    className="w-full flex items-center justify-between p-4 font-heading text-sm text-foreground hover:bg-secondary/50"
                  >
                    <span>Material / Fabric</span>
                    <ChevronDown size={16} className={`transition-transform ${openSection === 'material' ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openSection === 'material' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                          {materials.map((mat) => (
                            <button
                              key={mat.id}
                              onClick={() => setSelectedMaterial(mat.id)}
                              className={`p-3 rounded-lg font-ui text-sm text-left transition-all border ${
                                selectedMaterial === mat.id
                                  ? 'border-primary bg-primary/10 text-foreground'
                                  : 'border-border bg-card text-muted-foreground hover:border-primary/40'
                              }`}
                            >
                              <span className="text-lg mr-2">{mat.icon}</span>
                              {mat.label}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="font-heading text-sm text-foreground">Quantity</span>
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-secondary font-ui text-lg"
                >
                  −
                </button>
                <span className="w-10 h-10 flex items-center justify-center font-ui font-semibold text-foreground">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-secondary font-ui text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => addToCart({ product, quantity, selectedColor, selectedSize })}
                className="w-full py-4 rounded-lg font-ui font-bold text-primary-foreground flex items-center justify-center gap-2 text-lg"
                style={{ background: 'var(--gradient-button)', boxShadow: 'var(--shadow-btn)' }}
              >
                <ShoppingCart size={20} /> Add to Royal Cart
              </motion.button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`py-3 rounded-lg font-ui text-sm font-semibold border flex items-center justify-center gap-2 transition-colors ${
                    isWished ? 'border-primary bg-primary/10 text-primary' : 'border-border text-foreground hover:border-primary/40'
                  }`}
                >
                  {isWished ? 'Wishlisted' : 'Wishlist'}
                </button>
                <button className="py-3 rounded-lg font-ui text-sm font-semibold border border-border text-foreground hover:border-primary/40 flex items-center justify-center gap-2">
                  <Share2 size={16} /> Share
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              {[
                { icon: Shield, label: 'Secure Checkout' },
                { icon: RotateCcw, label: 'Easy Returns' },
                { icon: Truck, label: 'Fast Delivery' },
                { icon: Star, label: 'Genuine Product' },
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 p-2 rounded-md bg-secondary/50">
                  <badge.icon size={14} className="text-primary" />
                  <span className="font-ui text-xs text-muted-foreground">{badge.label}</span>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="border-t border-border pt-6">
              <div className="flex gap-6 border-b border-border mb-4">
                {['description', 'specs', 'shipping', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 font-ui text-sm capitalize transition-colors relative ${
                      activeTab === tab ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                    )}
                  </button>
                ))}
              </div>
              <div className="font-body text-muted-foreground leading-relaxed">
                {activeTab === 'description' && <p>{product.description}</p>}
                {activeTab === 'specs' && (
                  <div className="space-y-2">
                    <p><strong className="text-foreground">Material:</strong> {product.material}</p>
                    <p><strong className="text-foreground">Category:</strong> {product.category}</p>
                    <p><strong className="text-foreground">SKU:</strong> RCS-{product.id.padStart(5, '0')}</p>
                  </div>
                )}
                {activeTab === 'shipping' && <p>Free shipping on all orders over $200. Standard delivery takes 3-5 business days. Express options available at checkout.</p>}
                {activeTab === 'reviews' && <p>{product.reviews} reviews · {product.rating}/5 average rating. Detailed reviews coming soon.</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="font-heading text-2xl text-foreground mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 xl:gap-5">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
