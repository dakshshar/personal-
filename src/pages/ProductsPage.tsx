import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronDown, Filter, X } from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import { useProducts } from '../context/ProductContext';
import { Product } from '../data/products';

type FilterOptions = {
  subCategory: string[];
  priceRange: [number, number];
  colors: string[];
  sizes: string[];
  sort: string;
};

const ProductsPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { products, getProductsByCategory } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const [filters, setFilters] = useState<FilterOptions>({
    subCategory: [],
    priceRange: [0, 1000],
    colors: [],
    sizes: [],
    sort: 'featured'
  });
  
  // Map to proper category if needed
  const normalizedCategory = category === 'men' ? 'men' : 
                             category === 'women' ? 'women' : 
                             category === 'kids' ? 'kids' : 'men';
  
  useEffect(() => {
    // Fetch products by category
    setLoading(true);
    const fetchedProducts = getProductsByCategory(normalizedCategory as 'men' | 'women' | 'kids');
    setFilteredProducts(fetchedProducts);
    setLoading(false);
    
    // Update page title
    document.title = `${normalizedCategory.charAt(0).toUpperCase() + normalizedCategory.slice(1)}'s Collection | LUXESTORE`;
  }, [normalizedCategory, products, getProductsByCategory]);
  
  // Get unique subcategories, colors, and sizes from current category products
  const categoryProducts = getProductsByCategory(normalizedCategory as 'men' | 'women' | 'kids');
  const subCategories = [...new Set(categoryProducts.map(product => product.subCategory))];
  const allColors = [...new Set(categoryProducts.flatMap(product => product.colors))];
  const allSizes = [...new Set(categoryProducts.flatMap(product => product.sizes))];
  
  // Filter change handler
  const handleFilterChange = (type: keyof FilterOptions, value: any) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };
  
  // Apply filters
  useEffect(() => {
    let result = [...categoryProducts];
    
    // Apply subcategory filter
    if (filters.subCategory.length > 0) {
      result = result.filter(product => filters.subCategory.includes(product.subCategory));
    }
    
    // Apply price range filter
    result = result.filter(product => {
      const price = product.onSale ? (product.salePrice || product.price) : product.price;
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });
    
    // Apply color filter
    if (filters.colors.length > 0) {
      result = result.filter(product => 
        product.colors.some(color => filters.colors.includes(color))
      );
    }
    
    // Apply size filter
    if (filters.sizes.length > 0) {
      result = result.filter(product => 
        product.sizes.some(size => filters.sizes.includes(size))
      );
    }
    
    // Apply sorting
    switch (filters.sort) {
      case 'price-low-high':
        result.sort((a, b) => {
          const priceA = a.onSale ? (a.salePrice || a.price) : a.price;
          const priceB = b.onSale ? (b.salePrice || b.price) : b.price;
          return priceA - priceB;
        });
        break;
      case 'price-high-low':
        result.sort((a, b) => {
          const priceA = a.onSale ? (a.salePrice || a.price) : a.price;
          const priceB = b.onSale ? (b.salePrice || b.price) : b.price;
          return priceB - priceA;
        });
        break;
      case 'newest':
        result.sort((a, b) => (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1);
        break;
      case 'rating':
        result.sort((a, b) => b.ratings - a.ratings);
        break;
      default:
        // Default to featured
        break;
    }
    
    setFilteredProducts(result);
  }, [filters, categoryProducts]);
  
  // Toggle filter for multi-select options
  const toggleFilter = (type: 'subCategory' | 'colors' | 'sizes', value: string) => {
    setFilters(prev => {
      const current = prev[type];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      
      return { ...prev, [type]: updated };
    });
  };
  
  return (
    <div className="bg-white">
      {/* Mobile filter dialog */}
      <div className={`fixed inset-0 z-40 transition-opacity ${mobileFiltersOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/30" onClick={() => setMobileFiltersOpen(false)}></div>
        <div className="relative ml-auto h-full w-full max-w-xs bg-white p-4 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Filters</h2>
            <button 
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={() => setMobileFiltersOpen(false)}
              aria-label="Close filters"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Filter sections - same as desktop but for mobile */}
          <div className="space-y-6">
            {/* Subcategory Filter */}
            <div>
              <h3 className="text-sm font-medium">Category</h3>
              <div className="mt-2 space-y-1">
                {subCategories.map(subCat => (
                  <div key={subCat} className="flex items-center">
                    <input
                      id={`mobile-${subCat}`}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      checked={filters.subCategory.includes(subCat)}
                      onChange={() => toggleFilter('subCategory', subCat)}
                    />
                    <label htmlFor={`mobile-${subCat}`} className="ml-3 text-sm text-gray-600">
                      {subCat.charAt(0).toUpperCase() + subCat.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Color Filter */}
            <div>
              <h3 className="text-sm font-medium">Color</h3>
              <div className="mt-2 space-y-1">
                {allColors.map(color => (
                  <div key={color} className="flex items-center">
                    <input
                      id={`mobile-color-${color}`}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      checked={filters.colors.includes(color)}
                      onChange={() => toggleFilter('colors', color)}
                    />
                    <label htmlFor={`mobile-color-${color}`} className="ml-3 text-sm text-gray-600">
                      {color}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Size Filter */}
            <div>
              <h3 className="text-sm font-medium">Size</h3>
              <div className="mt-2 space-y-1">
                {allSizes.map(size => (
                  <div key={size} className="flex items-center">
                    <input
                      id={`mobile-size-${size}`}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      checked={filters.sizes.includes(size)}
                      onChange={() => toggleFilter('sizes', size)}
                    />
                    <label htmlFor={`mobile-size-${size}`} className="ml-3 text-sm text-gray-600">
                      {size}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    
      <div className="container mx-auto px-4 pt-8 pb-16">
        <h1 className="text-3xl font-bold mb-2">
          {normalizedCategory.charAt(0).toUpperCase() + normalizedCategory.slice(1)}'s Collection
        </h1>
        <p className="text-gray-600 mb-8">
          Explore our latest {normalizedCategory}'s clothing and accessories
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block col-span-1">
            <h2 className="text-lg font-medium mb-4">Filters</h2>
            
            <div className="space-y-6">
              {/* Subcategory Filter */}
              <div>
                <h3 className="text-sm font-medium">Category</h3>
                <div className="mt-2 space-y-1">
                  {subCategories.map(subCat => (
                    <div key={subCat} className="flex items-center">
                      <input
                        id={`desktop-${subCat}`}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        checked={filters.subCategory.includes(subCat)}
                        onChange={() => toggleFilter('subCategory', subCat)}
                      />
                      <label htmlFor={`desktop-${subCat}`} className="ml-3 text-sm text-gray-600">
                        {subCat.charAt(0).toUpperCase() + subCat.slice(1)}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Color Filter */}
              <div>
                <h3 className="text-sm font-medium">Color</h3>
                <div className="mt-2 space-y-1">
                  {allColors.map(color => (
                    <div key={color} className="flex items-center">
                      <input
                        id={`desktop-color-${color}`}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        checked={filters.colors.includes(color)}
                        onChange={() => toggleFilter('colors', color)}
                      />
                      <label htmlFor={`desktop-color-${color}`} className="ml-3 text-sm text-gray-600">
                        {color}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Size Filter */}
              <div>
                <h3 className="text-sm font-medium">Size</h3>
                <div className="mt-2 space-y-1">
                  {allSizes.map(size => (
                    <div key={size} className="flex items-center">
                      <input
                        id={`desktop-size-${size}`}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        checked={filters.sizes.includes(size)}
                        onChange={() => toggleFilter('sizes', size)}
                      />
                      <label htmlFor={`desktop-size-${size}`} className="ml-3 text-sm text-gray-600">
                        {size}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="col-span-1 lg:col-span-3">
            {/* Mobile filter and sort controls */}
            <div className="flex items-center justify-between mb-4 lg:mb-6">
              <button
                className="lg:hidden flex items-center text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-50"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <Filter size={16} className="mr-2" />
                Filters
              </button>
              
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">Sort by:</span>
                <div className="relative">
                  <select
                    value={filters.sort}
                    onChange={(e) => handleFilterChange('sort', e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="rating">Top Rated</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
            
            {/* Results count */}
            <p className="text-sm text-gray-500 mb-6">
              Showing {filteredProducts.length} results
            </p>
            
            {/* Product grid */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters to find what you're looking for.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;