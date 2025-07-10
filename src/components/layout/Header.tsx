import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { useAuth } from '../../context/AuthContext';
import { useSearch } from '../../context/SearchContext';
import CartDrawer from '../cart/CartDrawer';
import { cn } from '../../utils/cn';

const Header: React.FC = () => {
  const { cartCount, openCart } = useShoppingCart();
  const { user, isAuthenticated } = useAuth();
  const { searchTerm, setSearchTerm, handleSearch, isSearching } = useSearch();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const isHomePage = location.pathname === '/';
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    setIsMenuOpen(false);
    setSearchVisible(false);
  }, [location]);
  
  const headerClasses = cn(
    'fixed w-full z-50 transition-all duration-300',
    {
      'bg-gradient-to-r from-primary-600 to-secondary-600 shadow-lg': isScrolled || !isHomePage,
      'bg-transparent': !isScrolled && isHomePage
    }
  );
  
  const textClasses = cn(
    'transition-colors duration-300',
    {
      'text-white': !isScrolled && isHomePage,
      'text-white': isScrolled || !isHomePage
    }
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      handleSearch(e);
      setSearchVisible(false);
    }
  };
  
  return (
    <>
      <header className={headerClasses}>
        <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl md:text-2xl font-bold">
              <span className={cn(textClasses, "tracking-tight")}>LUXESTORE</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/products/men" className={cn("hover:text-accent-200 font-medium", textClasses)}>
                Men
              </Link>
              <Link to="/products/women" className={cn("hover:text-accent-200 font-medium", textClasses)}>
                Women
              </Link>
              <Link to="/products/kids" className={cn("hover:text-accent-200 font-medium", textClasses)}>
                Kids
              </Link>
            </nav>
          </div>
          
          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for products..."
                className="w-full px-4 py-2 pl-10 bg-white/10 border border-white/20 text-white placeholder-white/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent"
                disabled={isSearching}
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" />
              {isSearching && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white/70"></div>
                </div>
              )}
            </form>
          </div>
          
          {/* Action Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Icon (Mobile) */}
            <button 
              className="md:hidden p-1 rounded-full hover:bg-white/10"
              onClick={() => setSearchVisible(!searchVisible)}
              aria-label="Search"
            >
              <Search size={20} className={textClasses} />
            </button>
            
            {/* User */}
            <Link 
              to={isAuthenticated ? "/profile" : "/login"} 
              className={cn("p-1 rounded-full hover:bg-white/10", textClasses)}
              aria-label={isAuthenticated ? "Profile" : "Login"}
            >
              <User size={20} />
            </Link>
            
            {/* Cart */}
            <button 
              className={cn("p-1 rounded-full hover:bg-white/10 relative", textClasses)}
              onClick={openCart}
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-1 rounded-full hover:bg-white/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X size={24} className={textClasses} />
              ) : (
                <Menu size={24} className={textClasses} />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Search bar */}
        {searchVisible && (
          <div className="absolute top-full left-0 right-0 bg-primary-600 shadow-md p-4 md:hidden transition-all duration-300">
            <div className="container mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full p-2 pl-10 bg-white/10 border border-white/20 text-white placeholder-white/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-400"
                  autoFocus
                  disabled={isSearching}
                />
                <Search size={18} className="absolute left-3 top-3 text-white/70" />
                {isSearching && (
                  <div className="absolute right-3 top-3">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white/70"></div>
                  </div>
                )}
              </form>
            </div>
          </div>
        )}
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-primary-600 shadow-md overflow-hidden transition-all duration-300">
            <nav className="container mx-auto py-4 px-4 flex flex-col space-y-4">
              <Link to="/products/men" className="py-2 font-medium text-white hover:text-accent-200 border-b border-white/10">
                Men
              </Link>
              <Link to="/products/women" className="py-2 font-medium text-white hover:text-accent-200 border-b border-white/10">
                Women
              </Link>
              <Link to="/products/kids" className="py-2 font-medium text-white hover:text-accent-200">
                Kids
              </Link>
            </nav>
          </div>
        )}
      </header>
      
      {/* Offset for fixed header */}
      <div className="h-16 md:h-20"></div>
      
      {/* Cart Drawer */}
      <CartDrawer />
    </>
  );
};

export default Header;