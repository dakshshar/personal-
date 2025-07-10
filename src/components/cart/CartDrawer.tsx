import React from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, ChevronRight, Trash2 } from 'lucide-react';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { formatCurrency } from '../../utils/formatCurrency';

const CartDrawer: React.FC = () => {
  const { 
    cartItems, 
    cartTotal, 
    isCartOpen, 
    closeCart, 
    removeFromCart,
    updateQuantity
  } = useShoppingCart();
  
  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden transition-opacity duration-300 ${
        isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={closeCart}
      />
      
      {/* Cart panel */}
      <div 
        className={`absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-xl transition-transform duration-300 transform ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Cart header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center">
            <ShoppingBag size={20} className="mr-2" />
            Shopping Cart
          </h2>
          <button
            onClick={closeCart}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Cart content */}
        <div className="h-full overflow-y-auto pb-32">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-4 text-center">
              <ShoppingBag size={48} className="text-gray-300 mb-4" />
              <p className="text-lg text-gray-500 mb-4">Your cart is empty</p>
              <button
                onClick={closeCart}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {cartItems.map(item => (
                <div key={item.id} className="flex p-4 relative">
                  {/* Product image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded-md"
                  />
                  
                  {/* Product details */}
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    
                    {item.size && (
                      <p className="text-sm text-gray-500 mt-1">
                        Size: {item.size}
                      </p>
                    )}
                    
                    {item.color && (
                      <p className="text-sm text-gray-500 mt-1">
                        Color: {item.color}
                      </p>
                    )}
                    
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm font-medium">
                        {formatCurrency(item.price)}
                      </p>
                      
                      {/* Quantity selector */}
                      <div className="flex items-center">
                        <button
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md hover:bg-gray-100"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="w-10 h-8 flex items-center justify-center border-t border-b border-gray-300">
                          {item.quantity}
                        </span>
                        <button
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md hover:bg-gray-100"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Remove button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="absolute top-4 right-4 p-1 text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Cart footer */}
        {cartItems.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 space-y-4">
            <div className="flex justify-between text-base font-semibold">
              <span>Subtotal</span>
              <span>{formatCurrency(cartTotal)}</span>
            </div>
            <p className="text-sm text-gray-500">
              Shipping and taxes calculated at checkout
            </p>
            <Link
              to="/checkout"
              className="w-full inline-flex justify-center items-center py-3 px-4 bg-indigo-600 text-white text-base font-medium rounded-lg hover:bg-indigo-700 transition-colors"
              onClick={closeCart}
            >
              Checkout
              <ChevronRight size={16} className="ml-2" />
            </Link>
            <button
              onClick={closeCart}
              className="w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;