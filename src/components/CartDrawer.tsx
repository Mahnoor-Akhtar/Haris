import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
  const { cart, cartOpen, setCartOpen, removeFromCart, updateQuantity } = useStore();
  const total = cart.reduce((a, c) => a + c.product.price * c.quantity, 0);

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-50"
            style={{ backgroundColor: 'hsl(var(--bg-overlay))' }}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50 bg-background border-l border-border flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-heading text-xl text-foreground flex items-center gap-2">
                <ShoppingBag size={20} className="text-primary" />
                KONYA Cart
              </h2>
              <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-secondary rounded-full">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag size={48} className="mx-auto text-muted-foreground mb-4" />
                  <p className="font-heading text-lg text-foreground">Your cart is empty</p>
                  <p className="font-body text-muted-foreground mt-2">Begin your royal shopping journey</p>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-4 p-3 rounded-card bg-card border border-border"
                    style={{ boxShadow: 'var(--shadow-card)' }}
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-heading text-sm text-foreground truncate">{item.product.name}</h4>
                      <p className="font-ui text-xs text-muted-foreground mt-1">
                        {item.selectedColor && `Color: ${item.selectedColor}`}
                        {item.selectedSize && ` · Size: ${item.selectedSize}`}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-md bg-secondary flex items-center justify-center hover:bg-muted"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-ui text-sm w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-md bg-secondary flex items-center justify-center hover:bg-muted"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="font-ui font-semibold text-primary">${(item.product.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.product.id)} className="self-start p-1 hover:text-destructive">
                      <X size={16} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-border space-y-4">
                <div className="flex justify-between font-heading text-lg">
                  <span>Total</span>
                  <span className="text-primary">${total.toLocaleString()}</span>
                </div>
                <Link
                  to="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="block w-full text-center py-3 rounded-lg font-ui font-semibold text-primary-foreground"
                  style={{ background: 'var(--gradient-button)', boxShadow: 'var(--shadow-btn)' }}
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
