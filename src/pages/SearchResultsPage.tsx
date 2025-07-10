import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import { Product } from '../data/products';

type LocationState = {
  results: Product[];
  searchTerm: string;
};

const SearchResultsPage: React.FC = () => {
  const location = useLocation();
  const { results = [], searchTerm = '' } = (location.state as LocationState) || {};
  
  React.useEffect(() => {
    document.title = searchTerm ? `Search Results for "${searchTerm}" | LUXESTORE` : 'Search Results | LUXESTORE';
  }, [searchTerm]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>
        
        {searchTerm ? (
          <>
            <h1 className="text-2xl font-bold mb-2">
              Search Results for "{searchTerm}"
            </h1>
            <p className="text-gray-600">
              Found {results.length} {results.length === 1 ? 'result' : 'results'}
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-2">Search Results</h1>
            <p className="text-gray-600">No search term provided</p>
          </>
        )}
      </div>
      
      {!searchTerm ? (
        <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-lg">
          <Search size={48} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-medium text-gray-900 mb-2">No search performed</h2>
          <p className="text-gray-600 mb-6">
            Please enter a search term to find products
          </p>
          <Link 
            to="/" 
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Go Home
          </Link>
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-lg">
          <Search size={48} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-medium text-gray-900 mb-2">No products found</h2>
          <p className="text-gray-600 mb-6">
            Try adjusting your search terms or browse our categories below
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link 
              to="/products/men" 
              className="px-6 py-2 bg-pastel-blue/80 text-gray-900 rounded-lg hover:bg-pastel-blue transition-colors"
            >
              Shop Men
            </Link>
            <Link 
              to="/products/women" 
              className="px-6 py-2 bg-pastel-pink/80 text-gray-900 rounded-lg hover:bg-pastel-pink transition-colors"
            >
              Shop Women
            </Link>
            <Link 
              to="/products/kids" 
              className="px-6 py-2 bg-pastel-yellow/80 text-gray-900 rounded-lg hover:bg-pastel-yellow transition-colors"
            >
              Shop Kids
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;