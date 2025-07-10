import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../../data/products';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { formatCurrency } from '../../utils/formatCurrency';

type ProductCardProps = {
  product: Product;
  featured?: boolean;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const { addToCart } = useShoppingCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.onSale ? (product.salePrice || product.price) : product.price,
      image: product.images[0],
      quantity: 1,
      size: product.sizes[0],
      color: product.colors[0]
    });
  };
  
  return (
    <Link 
      to={`/product/${product.id}`} 
      className={`group bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col ${
        featured ? 'md:flex-row md:h-[400px]' : ''
      }`}
    >
      <div className={`relative overflow-hidden ${featured ? 'md:w-1/2' : ''}`}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {product.isNew && (
            <span className="px-2 py-1 bg-pastel-green/80 text-gray-700 text-xs font-medium rounded">
              NEW
            </span>
          )}
          {product.onSale && (
            <span className="px-2 py-1 bg-pastel-coral/80 text-gray-700 text-xs font-medium rounded">
              SALE
            </span>
          )}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-between">
          <button
            className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-pastel-pink/80 transition-colors"
            aria-label="Add to wishlist"
          >
            <Heart size={18} />
          </button>
          <button
            className="p-2 bg-pastel-purple/80 backdrop-blur-sm text-white rounded-full shadow-md hover:bg-pastel-purple transition-colors"
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
      
      <div className={`p-4 flex-1 flex flex-col ${featured ? 'md:w-1/2 md:p-6' : ''}`}>
        <h3 className={`font-medium text-gray-900 ${featured ? 'text-xl mb-2' : ''}`}>
          {product.name}
        </h3>
        
        {featured && (
          <p className="text-gray-600 mb-4 line-clamp-3">{product.description}</p>
        )}
        
        <div className="mt-auto">
          <div className="flex items-center justify-between">
            <div>
              {product.onSale ? (
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-medium text-gray-900">
                    {formatCurrency(product.salePrice || 0)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    {formatCurrency(product.price)}
                  </span>
                </div>
              ) : (
                <span className="text-lg font-medium text-gray-900">
                  {formatCurrency(product.price)}
                </span>
              )}
            </div>
            
            <div className="flex items-center">
              <span className="text-sm text-gray-500">
                {product.ratings} ★
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;