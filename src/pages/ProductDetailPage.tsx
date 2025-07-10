import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Share2, Star, ShoppingBag, ChevronRight, Truck, ArrowLeft } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { Product } from '../data/products';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { formatCurrency } from '../utils/formatCurrency';
import ProductCard from '../components/products/ProductCard';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById, getProductsByCategory } = useProducts();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  const { addToCart } = useShoppingCart();
  
  useEffect(() => {
    setLoading(true);
    const fetchedProduct = getProductById(id || '');
    
    if (fetchedProduct) {
      setProduct(fetchedProduct);
      setSelectedImage(fetchedProduct.images[0]);
      setSelectedSize(fetchedProduct.sizes[0]);
      setSelectedColor(fetchedProduct.colors[0]);
      
      // Fetch related products from the same category
      const related = getProductsByCategory(fetchedProduct.category)
        .filter(p => p.id !== fetchedProduct.id)
        .slice(0, 4);
      setRelatedProducts(related);
      
      // Update page title
      document.title = `${fetchedProduct.name} | LUXESTORE`;
    }
    
    setLoading(false);
  }, [id, getProductById, getProductsByCategory]);
  
  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.onSale ? (product.salePrice || product.price) : product.price,
      image: product.images[0],
      quantity,
      size: selectedSize,
      color: selectedColor
    });
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">The product you are looking for does not exist.</p>
        <Link 
          to="/" 
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Home
        </Link>
      </div>
    );
  }
  
  const actualPrice = product.onSale ? (product.salePrice || product.price) : product.price;
  
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-8 text-sm">
          <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
          <ChevronRight size={16} className="mx-2 text-gray-400" />
          <Link to={`/products/${product.category}`} className="text-gray-500 hover:text-gray-700">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Link>
          <ChevronRight size={16} className="mx-2 text-gray-400" />
          <span className="text-gray-900">{product.name}</span>
        </nav>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Product images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`aspect-square rounded-md overflow-hidden bg-gray-100 ${
                    selectedImage === image ? 'ring-2 ring-indigo-600' : ''
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product info */}
          <div>
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < Math.floor(product.ratings) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {product.ratings.toFixed(1)} ({product.reviewCount} reviews)
                </span>
              </div>
              
              <div className="mb-4">
                {product.onSale ? (
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-indigo-600 mr-2">
                      {formatCurrency(product.salePrice || 0)}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      {formatCurrency(product.price)}
                    </span>
                    <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                      SALE
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-indigo-600">
                    {formatCurrency(product.price)}
                  </span>
                )}
              </div>
              
              <p className="text-gray-700 mb-6">
                {product.description}
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    className={`px-3 py-1 border rounded-md text-sm ${
                      selectedColor === color
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`px-3 py-1 border rounded-md text-sm ${
                      selectedSize === size
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-sm font-medium mb-2">Quantity</h3>
              <div className="flex items-center">
                <button
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-md hover:bg-gray-100"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-12 h-10 flex items-center justify-center border-t border-b border-gray-300">
                  {quantity}
                </span>
                <button
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-md hover:bg-gray-100"
                  onClick={increaseQuantity}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                className="flex-1 flex items-center justify-center px-6 py-3 border border-transparent rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                onClick={handleAddToCart}
              >
                <ShoppingBag size={18} className="mr-2" />
                Add to Cart
              </button>
              
              <button
                className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                aria-label="Add to wishlist"
              >
                <Heart size={18} className="mr-2" />
                Wishlist
              </button>
              
              <button
                className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                aria-label="Share product"
              >
                <Share2 size={18} />
              </button>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Truck size={16} className="mr-2" />
                Free shipping on orders over $100
              </div>
              <p className="text-sm text-gray-600">
                In stock - Ready to ship within 1-2 business days
              </p>
            </div>
          </div>
        </div>
        
        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;