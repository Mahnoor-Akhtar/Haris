import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Crown, Shield, Truck, RotateCcw, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/products';

const heroSlides = [
  {
    image: 'https://th.bing.com/th/id/OIP.Z3xMcuJEW2wg-dMr_t7KJQHaHa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',
    label: 'Apex Matchday Football Shirt',
    tag: 'BESTSELLER',
    price: '$89',
  },
  {
    image: 'https://tse1.mm.bing.net/th/id/OIP.1PmkQ3B7UGgGGlLVnW3zpQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
    label: 'Court Elite Basketball Jersey',
    tag: 'CLASSIC',
    price: '$79',
  },
  {
    image: 'https://tse2.mm.bing.net/th/id/OIP.sKPVO-y96bc6V-P6jfkvWQHaJQ?rs=1&pid=ImgDetMain&o=7&rm=3',
    label: 'Spike Pro Volleyball Shirt',
    tag: 'PREMIUM',
    price: '$74',
  },
  {
    image: 'https://tse1.mm.bing.net/th/id/OIP.1PmkQ3B7UGgGGlLVnW3zpQHaHa?w=564&h=564&rs=1&pid=ImgDetMain&o=7&rm=3',
    label: 'Neon Pulse Esports Jersey',
    tag: 'NEW ARRIVAL',
    price: '$69',
  },
  {
    image: 'https://tse4.mm.bing.net/th/id/OIP.EnPi-uGTFUs3OHx10mYS9wHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
    label: 'Velocity Training T-Shirt',
    tag: 'LIMITED',
    price: '$55',
  },
];

const HeroParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 15 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-primary/40"
        initial={{
          x: `${Math.random() * 100}%`,
          y: `${Math.random() * 100}%`,
          opacity: 0,
        }}
        animate={{
          y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
          opacity: [0, 0.8, 0],
        }}
        transition={{
          duration: 4 + Math.random() * 4,
          repeat: Infinity,
          delay: Math.random() * 3,
        }}
      />
    ))}
  </div>
);

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const newArrivals = products.filter(p => p.badge === 'new');
  const bestSellers = products.filter(p => p.badge === 'bestseller');
  const saleItems = products.filter(p => p.badge === 'sale');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const trustBadges = [
    { icon: Shield, label: 'Secure Checkout' },
    { icon: Truck, label: 'Free Shipping over $200' },
    { icon: RotateCcw, label: '30-Day Returns' },
    { icon: Crown, label: '100% Authentic' },
  ];

  const testimonials = [
    {
      name: 'Ali Raza',
      location: 'Lahore',
      rating: 5,
      product: 'AeroFlex Sport Shorts',
      review: 'Shorts ka fabric bohat soft aur stretchable hai. Running aur gym dono ke liye perfect fit mila, bilkul comfortable.',
      date: '12 Mar 2026',
      avatar: 'https://i.pravatar.cc/96?img=12',
    },
    {
      name: 'Usman Tariq',
      location: 'Karachi',
      rating: 5,
      product: 'ProDry Training Shorts',
      review: 'Sweat management outstanding hai. Long training sessions me bhi shorts dry rehte hain aur stitching quality premium feel deti hai.',
      date: '24 Mar 2026',
      avatar: 'https://i.pravatar.cc/96?img=15',
    },
    {
      name: 'Hassan Ali',
      location: 'Islamabad',
      rating: 4,
      product: 'Velocity Match Shorts',
      review: 'Game day pe movement bohat smooth rehti hai. Waist grip acha hai aur pocket design bhi practical hai for everyday use.',
      date: '02 Apr 2026',
      avatar: 'https://i.pravatar.cc/96?img=19',
    },
    {
      name: 'Ayesha Khan',
      location: 'Faisalabad',
      rating: 5,
      product: 'SprintLite Women Sport Shorts',
      review: 'Length aur fitting exactly waise hi hai jaisa chahiye tha. Lightweight material se workout me bohat asani hoti hai.',
      date: '28 Mar 2026',
      avatar: 'https://i.pravatar.cc/96?img=32',
    },
    {
      name: 'Bilal Ahmed',
      location: 'Multan',
      rating: 4,
      product: 'CourtMove Basketball Shorts',
      review: 'Basketball sessions ke liye ye shorts bohat ache hain. Airflow strong hai aur repeated wash ke baad bhi color fade nahi hua.',
      date: '16 Mar 2026',
      avatar: 'https://i.pravatar.cc/96?img=41',
    },
    {
      name: 'Zara Noor',
      location: 'Rawalpindi',
      rating: 5,
      product: 'ActiveCore Running Shorts',
      review: 'Morning run ke liye best purchase. Fabric skin-friendly hai, bounce nahi karta, aur overall look bhi sporty and clean lagta hai.',
      date: '05 Apr 2026',
      avatar: 'https://i.pravatar.cc/96?img=47',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: 'var(--gradient-hero)' }}
      >
        <HeroParticles />
        <div className="container mx-auto px-4 relative z-10 pt-32 lg:pt-40 pb-16">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left — Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Crown size={20} className="text-primary" />
                <span className="text-[11px] font-ui tracking-[0.3em] uppercase text-primary font-semibold">
                  KONYA Web Store Collection
                </span>
              </div>

              <h1 className="font-display text-foreground mb-3 leading-[1.1]" style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)' }}>
                Where Royalty Shops
              </h1>

              <p className="font-body text-base md:text-lg text-muted-foreground max-w-lg mb-4">
                Performance sports shirts built for matchday intensity, training comfort, and everyday style.
              </p>

              {/* Current product info */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="mb-6 flex items-center gap-3"
                >
                  <span className="text-[10px] font-ui tracking-widest uppercase px-2.5 py-1 rounded bg-primary/15 text-primary border border-primary/20">
                    {heroSlides[currentSlide].tag}
                  </span>
                  <span className="text-sm font-heading text-foreground">{heroSlides[currentSlide].label}</span>
                  <span className="text-sm font-ui font-bold text-primary">{heroSlides[currentSlide].price}</span>
                </motion.div>
              </AnimatePresence>

              <div className="flex flex-col sm:flex-row items-start gap-4 mb-8">
                <Link
                  to="/shop"
                  className="px-8 py-3.5 rounded-lg font-ui font-semibold text-primary-foreground flex items-center gap-2 hover:scale-[1.03] active:scale-95 transition-transform"
                  style={{ background: 'var(--gradient-button)', boxShadow: 'var(--shadow-btn)' }}
                >
                  Shop the Collection <ArrowRight size={18} />
                </Link>
                <Link
                  to={`/product/${products[0].id}`}
                  className="px-8 py-3.5 rounded-lg font-ui font-semibold text-primary border-2 border-primary hover:bg-primary/10 transition-colors"
                >
                  Customize Yours
                </Link>
              </div>

              {/* Slide indicators */}
              <div className="flex items-center gap-2">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === currentSlide ? 'w-8 bg-primary' : 'w-3 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Right — Rotating Product Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex items-center justify-center"
            >
              {/* Decorative glow behind image */}
              <div
                className="absolute inset-0 rounded-3xl blur-3xl opacity-30"
                style={{ background: 'radial-gradient(circle, hsl(var(--gold-primary) / 0.4), transparent 70%)' }}
              />

              {/* Image container */}
              <div className="relative w-full max-w-md lg:max-w-lg aspect-[3/4] rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentSlide}
                    src={heroSlides[currentSlide].image}
                    alt={heroSlides[currentSlide].label}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Overlay gradient at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Product label on image */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="absolute bottom-6 left-6 right-6"
                  >
                    <p className="text-white/70 text-[10px] font-ui tracking-[0.25em] uppercase mb-1">
                      {heroSlides[currentSlide].tag}
                    </p>
                    <p className="text-white font-heading text-lg">
                      {heroSlides[currentSlide].label}
                    </p>
                    <p className="text-white/90 font-ui font-bold text-xl mt-0.5">
                      {heroSlides[currentSlide].price}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Corner crown badge */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center border border-primary/30">
                  <Crown size={18} className="text-primary" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-8 border-b border-border bg-card/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-muted-foreground">
                <badge.icon size={18} className="text-primary" />
                <span className="font-ui text-sm">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-foreground mb-3" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.8rem)' }}>
              Featured Categories
            </h2>
            <p className="font-body text-muted-foreground">Explore our curated collections</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to="/shop"
                  className="block p-8 rounded-card text-center border border-border hover:border-primary/40 transition-all group"
                  style={{ background: 'var(--gradient-card)', boxShadow: 'var(--shadow-card)' }}
                >
                  <span className="text-4xl mb-3 block group-hover:scale-110 transition-transform">{cat.icon}</span>
                  <h3 className="font-heading text-lg text-foreground mb-1">{cat.name}</h3>
                  <p className="font-ui text-sm text-muted-foreground">{cat.count} Items</p>
                </Link>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="font-heading text-foreground" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.8rem)' }}>New Arrivals</h2>
                <p className="font-body text-muted-foreground mt-1">Fresh additions to the collection</p>
              </div>
              <Link to="/shop" className="font-ui text-sm text-primary hover:underline flex items-center gap-1">
                View All <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 xl:gap-5">
              {newArrivals.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        </section>
      )}

      {/* Best Sellers */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-heading text-foreground" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.8rem)' }}>Best Sellers</h2>
              <p className="font-body text-muted-foreground mt-1">The pieces everyone loves</p>
            </div>
            <Link to="/shop" className="font-ui text-sm text-primary hover:underline flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 xl:gap-5">
            {bestSellers.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* Sale Section */}
      {saleItems.length > 0 && (
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="font-heading text-foreground" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.8rem)' }}>Royal Sale</h2>
              <p className="font-body text-muted-foreground mt-1">Distinguished pieces at extraordinary value</p>
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 xl:gap-5">
              {saleItems.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        </section>
      )}

      {/* Brand Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-foreground mb-4" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.8rem)' }}>
                Crafted for the Distinguished
              </h2>
              <p className="font-body text-muted-foreground mb-6 text-lg leading-relaxed">
                Since our founding, KONYA Web Store has been synonymous with uncompromising quality and refined style. Every piece in our collection is carefully curated to meet the exacting standards of those who settle for nothing less than the finest.
              </p>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { num: '10K+', label: 'Royal Customers' },
                  { num: '500+', label: 'Premium Products' },
                  { num: '25+', label: 'Countries Served' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="font-heading text-2xl text-primary">{stat.num}</p>
                    <p className="font-ui text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-card overflow-hidden border border-border"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <img
                src="https://images.pexels.com/photos/35057166/pexels-photo-35057166.jpeg?auto=compress&cs=tinysrgb&w=600&h=500&fit=crop"
                alt="KONYA Web Store"
                className="w-full h-80 object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* All Products */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-heading text-foreground" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.8rem)' }}>The Full Collection</h2>
            <p className="font-body text-muted-foreground mt-1">Every masterpiece at a glance</p>
          </div>
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 xl:gap-5">
            {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
