import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import { useProducts } from '../context/ProductContext';

const heroImages = [
  {
    url: 'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg',
    title: 'Elevate Your Style With Premium Fashion',
    subtitle: 'Discover our new collection of thoughtfully designed clothing for men, women, and kids'
  },
  {
    url: 'https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg',
    title: 'Luxury Meets Comfort',
    subtitle: 'Experience the perfect blend of style and comfort in every piece'
  },
  {
    url: 'https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg',
    title: 'Sustainable Fashion Forward',
    subtitle: 'Eco-conscious collections that make a statement'
  }
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[80vh] overflow-hidden">
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${image.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="container mx-auto px-4 h-full flex items-center relative z-10">
            <div className="max-w-2xl text-white">
              <h1 
                className="text-4xl md:text-6xl font-bold mb-4 leading-tight opacity-0 animate-slideUp"
                style={{
                  animation: currentSlide === index ? 'slideUp 0.8s forwards' : 'none',
                  animationDelay: '0.3s'
                }}
              >
                {image.title}
              </h1>
              <p 
                className="text-lg md:text-xl max-w-xl mb-8 text-gray-100 opacity-0 animate-slideUp"
                style={{
                  animation: currentSlide === index ? 'slideUp 0.8s forwards' : 'none',
                  animationDelay: '0.6s'
                }}
              >
                {image.subtitle}
              </p>
              <div 
                className="flex flex-wrap gap-4 opacity-0 animate-slideUp"
                style={{
                  animation: currentSlide === index ? 'slideUp 0.8s forwards' : 'none',
                  animationDelay: '0.9s'
                }}
              >
                <Link 
                  to="/products/men" 
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
                >
                  Shop Men
                </Link>
                <Link 
                  to="/products/women" 
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
                >
                  Shop Women
                </Link>
                <Link 
                  to="/products/kids" 
                  className="px-6 py-3 bg-white hover:bg-gray-100 text-indigo-600 font-medium rounded-lg transition-colors"
                >
                  Shop Kids
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Carousel indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'w-8 bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

const CategoryBanner: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Shop By Category</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Men's Category */}
          <Link 
            to="/products/men"
            className="relative h-80 rounded-lg overflow-hidden group"
          >
            <img 
              src="https://images.pexels.com/photos/1906795/pexels-photo-1906795.jpeg" 
              alt="Men's Collection" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl font-bold text-white mb-2">Men</h3>
              <p className="text-white/90 mb-4">Refined essentials for the modern man</p>
              <span className="inline-flex items-center text-white border-b border-white pb-1 group-hover:pb-2 transition-all">
                Shop Now <ChevronRight size={16} className="ml-1" />
              </span>
            </div>
          </Link>
          
          {/* Women's Category */}
          <Link 
            to="/products/women"
            className="relative h-80 rounded-lg overflow-hidden group"
          >
            <img 
              src="https://images.pexels.com/photos/1852382/pexels-photo-1852382.jpeg" 
              alt="Women's Collection" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl font-bold text-white mb-2">Women</h3>
              <p className="text-white/90 mb-4">Elegant styles for every occasion</p>
              <span className="inline-flex items-center text-white border-b border-white pb-1 group-hover:pb-2 transition-all">
                Shop Now <ChevronRight size={16} className="ml-1" />
              </span>
            </div>
          </Link>
          
          {/* Kids' Category */}
          <Link 
            to="/products/kids"
            className="relative h-80 rounded-lg overflow-hidden group"
          >
            <img 
              src="https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg" 
              alt="Kids' Collection" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl font-bold text-white mb-2">Kids</h3>
              <p className="text-white/90 mb-4">Playful designs for active children</p>
              <span className="inline-flex items-center text-white border-b border-white pb-1 group-hover:pb-2 transition-all">
                Shop Now <ChevronRight size={16} className="ml-1" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

const FeaturedProducts: React.FC = () => {
  const { products } = useProducts();
  const featuredProducts = products
    .filter(product => typeof product.featuredOrder === 'number')
    .sort((a, b) => (a.featuredOrder || 0) - (b.featuredOrder || 0));
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Featured Products</h2>
        <p className="text-gray-600 mb-8">Handpicked favorites for every style</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProducts.slice(0, 2).map(product => (
            <ProductCard key={product.id} product={product} featured />
          ))}
        </div>
      </div>
    </section>
  );
};

const NewArrivals: React.FC = () => {
  const { products } = useProducts();
  const newProducts = products.filter(product => product.isNew);
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">New Arrivals</h2>
            <p className="text-gray-600">The latest additions to our collection</p>
          </div>
          <Link 
            to="/new-arrivals" 
            className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
          >
            View All <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newProducts.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

const SaleSection: React.FC = () => {
  const { products } = useProducts();
  const saleProducts = products.filter(product => product.onSale);
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">On Sale</h2>
            <p className="text-gray-600">Limited time offers on selected items</p>
          </div>
          <Link 
            to="/sale" 
            className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
          >
            View All <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {saleProducts.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Newsletter: React.FC = () => {
  return (
    <section className="py-16 bg-indigo-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Newsletter</h2>
        <p className="max-w-2xl mx-auto mb-8">
          Subscribe to our newsletter and be the first to know about new collections, 
          special offers and exclusive events.
        </p>
        <form className="max-w-md mx-auto flex">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gray-900 hover:bg-black text-white font-medium rounded-r-lg transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

const HomePage: React.FC = () => {
  // Set page title
  React.useEffect(() => {
    document.title = 'LUXESTORE - Premium Fashion for Men, Women & Kids';
  }, []);
  
  return (
    <div>
      <Hero />
      <CategoryBanner />
      <FeaturedProducts />
      <NewArrivals />
      <SaleSection />
      <Newsletter />
    </div>
  );
};

export default HomePage;