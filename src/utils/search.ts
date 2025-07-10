import { Product } from '../data/products';

export const searchProducts = (products: Product[], searchTerm: string): Product[] => {
  if (!searchTerm.trim()) return [];
  
  const terms = searchTerm.toLowerCase().split(' ').filter(term => term.length > 0);
  
  return products.filter(product => {
    const searchableText = [
      product.name,
      product.description,
      product.category,
      product.subCategory,
      ...product.colors,
      ...product.sizes
    ].join(' ').toLowerCase();
    
    // Check if any term matches
    return terms.some(term => searchableText.includes(term));
  }).sort((a, b) => {
    // Sort by relevance - products with more matching terms first
    const aMatches = terms.filter(term => 
      [a.name, a.description, a.category, a.subCategory, ...a.colors, ...a.sizes]
        .join(' ').toLowerCase().includes(term)
    ).length;
    
    const bMatches = terms.filter(term => 
      [b.name, b.description, b.category, b.subCategory, ...b.colors, ...b.sizes]
        .join(' ').toLowerCase().includes(term)
    ).length;
    
    return bMatches - aMatches;
  });
};