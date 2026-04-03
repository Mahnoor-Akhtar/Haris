import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, Moon, Sun, Phone, Mail, ChevronDown, User, UserPlus, Globe } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@/assets/logo.jpeg';

const categories = [
  { to: '/shop?category=Football', label: 'FOOTBALL' },
  { to: '/shop?category=Basketball', label: 'BASKETBALL' },
  { to: '/shop?category=Volleyball', label: 'VOLLEYBALL' },
  { to: '/shop?category=Esports', label: 'ESPORTS' },
  { to: '/shop?category=Tracksuit', label: 'TRACKSUIT' },
  { to: '/shop?category=Sports%20Equipment', label: 'SPORTS EQUIPMENT' },
  { to: '/shop?category=T-Shirts', label: 'T-Shirts' },
];

const TOP_BAR_H = 36;
const MAIN_NAV_H = 64;
const CAT_BAR_H = 40;

const Navbar = () => {
  const { theme, toggleTheme, cart, setCartOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  const cartCount = cart.reduce((a, c) => a + c.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  const navLinks = [
    { to: '/info', label: 'INFO' },
  ];

  return (
    <>
      {/* ===== TOP INFO BAR — 36px ===== */}
      <div
        className={`fixed top-0 left-0 right-0 z-[60] transition-transform duration-400 ${
          scrolled ? '-translate-y-full' : 'translate-y-0'
        }`}
        style={{
          height: TOP_BAR_H,
          backgroundColor: 'hsl(var(--bg-base))',
          borderBottom: '1px solid hsl(var(--gold-primary) / 0.15)',
        }}
      >
        <div className="max-w-[1440px] mx-auto px-6 h-full flex items-center justify-between text-[15px] font-ui">
          {/* Left — Contact */}
          <div className="hidden sm:flex items-center gap-5 text-muted-foreground">
            <a href="tel:+1234567890" className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Phone size={11} />
              <span>+1 (234) 567-890</span>
            </a>
            <a href="mailto:contact@KonyaWebStore.com" className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Mail size={11} />
              <span>contact@KonyaWebStore.com</span>
            </a>
          </div>

          {/* Center — Announcement */}
          <div className="flex-1 sm:flex-none text-center">
            <span className="text-primary font-semibold tracking-[0.2em] uppercase text-[15px]">
              ✦ Free Shipping on Orders Over $150 ✦
            </span>
          </div>

          {/* Right — Utility */}
          <div className="hidden md:flex items-center gap-4 text-muted-foreground">
            <button className="flex items-center gap-1 hover:text-primary transition-colors">
              <Globe size={11} />
              <span>English</span>
              <ChevronDown size={9} />
            </button>
            <span className="w-px h-3 bg-border" />
            <button className="flex items-center gap-1 hover:text-primary transition-colors">
              <span>USD $</span>
              <ChevronDown size={9} />
            </button>
            <span className="w-px h-3 bg-border" />
            <Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Help</Link>
          </div>
        </div>
      </div>

      {/* ===== MAIN NAVBAR — 64px ===== */}
      <nav
        className="fixed left-0 right-0 z-50 transition-all duration-400"
        style={{
          top: scrolled ? 0 : TOP_BAR_H,
          height: MAIN_NAV_H,
          backgroundColor: scrolled ? 'hsl(var(--navbar-bg))' : 'hsl(var(--bg-base) / 0.97)',
          backdropFilter: scrolled ? 'blur(20px) saturate(1.2)' : 'none',
          borderBottom: '1px solid hsl(var(--border))',
        }}
      >
        <div className="max-w-[1440px] mx-auto px-8 lg:px-10 h-full flex items-center gap-8 relative">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <img
              src={logo}
              alt="KONYA Web Store"
              className="h-14 w-17 rounded-full object-cover ring-1 ring-primary/30 group-hover:ring-primary/60 transition-all"
            />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-heading text-[24px] tracking-wide text-foreground">KONYA Web</span>
              <span className="text-[19px] font-ui text-primary tracking-[0.3em] uppercase -mt-0.5">Store</span>
            </div>
          </Link>

          {/* Search Bar — Desktop */}
          <form onSubmit={handleSearch} className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-full max-w-[520px]">
            <div className="flex items-center w-full h-9 rounded-md border border-border bg-input/40 hover:border-primary/30 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all overflow-hidden">
              <select className="bg-transparent text-foreground/80 text-[18px] font-ui h-full px-3 border-r border-border cursor-pointer outline-none appearance-none">
                <option>All</option>
                <option>Apparel</option>
                <option>Accessories</option>
                <option>Footwear</option>
              </select>
              <input
                ref={searchRef}
                type="text"
                placeholder="Search for royal treasures..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-foreground text-[18px] font-body px-3 h-full outline-none placeholder:text-muted-foreground/60"
              />
              <button type="submit" className="h-full px-3.5 bg-primary hover:bg-primary/90 transition-colors flex items-center">
                <Search size={15} className="text-primary-foreground" />
              </button>
            </div>
          </form>

          {/* Spacer */}
          <div className="flex-1 lg:hidden" />

          {/* Right Actions */}
          <div className="flex items-center gap-0.5 shrink-0 ml-auto">

            {/* Mobile Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-md hover:bg-secondary transition-colors"
            >
              <Search size={18} className="text-foreground" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-secondary transition-colors"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 180, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  {theme === 'dark' ? <Moon size={18} className="text-primary" /> : <Sun size={18} className="text-primary" />}
                </motion.div>
              </AnimatePresence>
            </button>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-secondary transition-colors relative"
            >
              <ShoppingCart size={18} className="text-foreground" />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-primary text-primary-foreground text-[9px] flex items-center justify-center font-ui font-bold"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Login / Register — Desktop */}
            <div className="hidden md:flex items-center ml-2 pl-2 border-l border-border gap-0.5">
              <Link to="/login" className="flex items-center gap-1.5 h-9 px-3 rounded-md text-[18px] font-ui text-foreground hover:text-primary hover:bg-secondary transition-all">
                <User size={15} />
                <span>Login</span>
              </Link>
              <Link to="/register" className="flex items-center gap-1.5 h-9 px-3 rounded-md text-[18px] font-ui text-foreground hover:text-primary hover:bg-secondary transition-all">
                <UserPlus size={15} />
                <span>Register</span>
              </Link>
            </div>

            {/* Mobile Menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-md hover:bg-secondary ml-0.5"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Dropdown */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden border-t border-border"
              style={{ backgroundColor: 'hsl(var(--bg-base))' }}
            >
              <form onSubmit={handleSearch} className="px-6 py-3">
                <div className="flex items-center h-10 rounded-md border border-border bg-input/40 overflow-hidden focus-within:border-primary">
                  <input
                    type="text"
                    placeholder="Search for royal treasures..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent text-foreground text-sm font-body px-4 h-full outline-none placeholder:text-muted-foreground"
                    autoFocus
                  />
                  <button type="submit" className="h-full px-4 bg-primary">
                    <Search size={15} className="text-primary-foreground" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ===== CATEGORY BAR — 40px ===== */}
      <div
        className="fixed left-0 right-0 z-40 hidden lg:block transition-all duration-400"
        style={{
          top: scrolled ? MAIN_NAV_H : TOP_BAR_H + MAIN_NAV_H,
          height: CAT_BAR_H,
          backgroundColor: scrolled ? 'hsl(var(--bg-base) / 0.92)' : 'hsl(var(--secondary) / 0.5)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid hsl(var(--border))',
        }}
      >
        <div className="max-w-[1440px] mx-auto px-6 h-full flex items-center justify-center gap-0 overflow-x-auto scrollbar-none">
          {categories.map((cat) => (
            <Link
              key={cat.label}
              to={cat.to}
              className={`h-full flex items-center px-4 text-[15px] font-ui tracking-[0.15em] uppercase whitespace-nowrap transition-all rounded-md border ${
                location.search.includes(cat.label)
                  ? 'text-primary bg-primary/15 border-primary/40'
                  : 'text-foreground/80 border-transparent hover:text-primary hover:bg-primary/20 hover:border-primary/50'
              }`}
            >
              {cat.label}
            </Link>
          ))}

          <span className="w-px h-4 bg-border mx-1" />

          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`h-full flex items-center px-4 text-[15px] font-ui tracking-[0.15em] uppercase whitespace-nowrap transition-all rounded-md border ${
                location.pathname === link.to
                  ? 'text-primary bg-primary/15 border-primary/40'
                  : 'text-foreground/80 border-transparent hover:text-primary hover:bg-primary/20 hover:border-primary/50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Bottom gold accent */}
        <div className="h-[2px] w-full" style={{ background: 'linear-gradient(90deg, transparent 5%, hsl(var(--gold-primary) / 0.5) 50%, transparent 95%)' }} />
      </div>

      {/* ===== MOBILE MENU OVERLAY ===== */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[45] bg-background lg:hidden overflow-y-auto"
            style={{ paddingTop: TOP_BAR_H + MAIN_NAV_H + 16 }}
          >
            <div className="px-6">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-5">
                <div className="flex items-center h-11 rounded-md border border-border bg-input/40 overflow-hidden">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent text-foreground text-sm px-4 h-full outline-none"
                  />
                  <button type="submit" className="h-full px-4 bg-primary">
                    <Search size={15} className="text-primary-foreground" />
                  </button>
                </div>
              </form>

              {/* Auth */}
              <div className="flex gap-3 mb-5">
                <Link to="/login" className="flex-1 flex items-center justify-center gap-2 h-10 rounded-md border border-border text-sm font-ui hover:border-primary/40 transition-colors">
                  <User size={15} /> Login
                </Link>
                <Link to="/register" className="flex-1 flex items-center justify-center gap-2 h-10 rounded-md bg-primary text-primary-foreground text-sm font-ui">
                  <UserPlus size={15} /> Register
                </Link>
              </div>
              {/* Nav links */}
              <div className="flex flex-col mb-5">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="flex items-center justify-between h-12 font-heading text-lg text-foreground hover:text-primary border-b border-border transition-colors"
                  >
                    {link.label}
                    <ChevronDown size={14} className="text-muted-foreground -rotate-90" />
                  </Link>
                ))}
              </div>

              {/* Categories */}
              <p className="text-[10px] font-ui tracking-[0.3em] uppercase text-primary mb-2">Categories</p>
              <div className="flex flex-col mb-6">
                {categories.map((cat) => (
                  <Link
                    key={cat.label}
                    to={cat.to}
                    className="h-10 flex items-center text-sm font-ui text-muted-foreground hover:text-foreground border-b border-border/40 transition-colors"
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>

              {/* Contact info */}
              <div className="pt-4 border-t border-border space-y-3 text-xs font-ui text-muted-foreground pb-8">
                <a href="tel:+1234567890" className="flex items-center gap-2">
                  <Phone size={13} /> +1 (234) 567-890
                </a>
                <a href="mailto:contact@royalcrownstore.com" className="flex items-center gap-2">
                  <Mail size={13} /> contact@royalcrownstore.com
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
