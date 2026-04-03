import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import logo from '@/assets/logo.jpeg';

const Footer = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'New York, USA',
      rating: 5,
      product: 'Premium Sport Shorts',
      review: 'Absolutely amazing quality and comfort. The 3D customization feature made it so personal. Will definitely order again!',
      date: 'January 2024',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
    {
      name: 'Michael Chen',
      location: 'Los Angeles, USA',
      rating: 5,
      product: 'Custom Sport Shorts',
      review: 'Best online shopping experience. The product arrived faster than expected and exceeded my expectations completely.',
      date: 'December 2023',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    },
    {
      name: 'Emma Williams',
      location: 'London, UK',
      rating: 5,
      product: 'Designer Sport Shorts',
      review: 'The 3D preview helped me visualize exactly what I wanted. Premium quality at a fair price. Highly recommend!',
      date: 'November 2023',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    },
  ];

  const columns = [
    {
      title: 'Shop',
      links: [
        { label: 'All Products', to: '/shop' },
        { label: 'New Arrivals', to: '/shop' },
        { label: 'Best Sellers', to: '/shop' },
        { label: 'Sale', to: '/shop' },
      ],
    },
    {
      title: 'Help',
      links: [
        { label: 'Contact Us', to: '/contact' },
        { label: 'Shipping Info', to: '#' },
        { label: 'Returns', to: '#' },
        { label: 'FAQ', to: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', to: '/about' },
        { label: 'Careers', to: '#' },
        { label: 'Privacy Policy', to: '#' },
        { label: 'Terms', to: '#' },
      ],
    },
  ];

  return (
    <>
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-foreground mb-3" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.8rem)' }}>
              Customer Testimonials
            </h2>
            <p className="font-body text-muted-foreground">What customers are saying about our sport shorts</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {testimonials.map((item, idx) => (
              <motion.article
                key={item.name + item.date}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="rounded-2xl border border-border/70 bg-card p-6 shadow-[0_8px_30px_hsl(var(--foreground)/0.08)]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover border border-border"
                    loading="lazy"
                  />
                  <div>
                    <p className="font-heading text-base text-foreground">{item.name}</p>
                    <p className="font-ui text-xs text-muted-foreground">{item.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-3" aria-label={`${item.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < item.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/40'}
                    />
                  ))}
                </div>

                <p className="font-ui text-xs uppercase tracking-[0.16em] text-primary mb-2">Purchased: {item.product}</p>
                <p className="font-body text-sm text-foreground/90 leading-relaxed line-clamp-3 mb-4">{item.review}</p>
                <p className="font-ui text-xs text-muted-foreground">{item.date}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      <footer className="border-t-2 border-primary/20" style={{ backgroundColor: 'hsl(var(--footer-bg))' }}>
      <div className="container mx-auto px-4 py-16">
        {/* Newsletter */}
        <div className="text-center mb-16">
          <h3 className="font-display text-2xl text-primary mb-2">Join the Royal Circle</h3>
          <p className="font-body text-muted-foreground mb-6">Exclusive offers, early access, and regal updates</p>
          <div className="flex max-w-md mx-auto gap-3">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-lg bg-secondary border border-border font-ui text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              className="px-6 py-3 rounded-lg font-ui font-semibold text-primary-foreground"
              style={{ background: 'var(--gradient-button)' }}
            >
              Subscribe
            </button>
          </div>
        </div>
        

        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src={logo} alt="KONYA Web Store" className="h-10 w-10 rounded-full" />
              <span className="font-heading text-sm text-primary">KONYA Web Store</span>
            </Link>
            <p className="font-body text-sm text-muted-foreground">Premium e-commerce with 3D product customization. Curating the finest for the distinguished.</p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-heading text-sm text-foreground mb-4 tracking-wider uppercase">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="font-ui text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-6 text-center">
          <p className="font-ui text-xs text-muted-foreground">
            © {new Date().getFullYear()} KONYA Web Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;
