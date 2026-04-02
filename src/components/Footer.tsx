import { Link } from 'react-router-dom';
import logo from '@/assets/logo.jpeg';

const Footer = () => {
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
  );
};

export default Footer;
