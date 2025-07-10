export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'men' | 'women' | 'kids';
  subCategory: string;
  images: string[];
  sizes: string[];
  colors: string[];
  ratings: number;
  reviewCount: number;
  inStock: boolean;
  featuredOrder?: number;
  isNew?: boolean;
  onSale?: boolean;
  salePrice?: number;
};

// Placeholder data for the e-commerce site
export const products: Product[] = [
  {
    id: '1',
    name: 'Men\'s Classic Oxford Shirt',
    description: 'A timeless Oxford shirt made from premium cotton with a comfortable regular fit. Perfect for both casual and semi-formal occasions.',
    price: 69.99,
    category: 'men',
    subCategory: 'shirts',
    images: [
      'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg',
      'https://images.pexels.com/photos/2235071/pexels-photo-2235071.jpeg',
      'https://images.pexels.com/photos/1506836/pexels-photo-1506836.jpeg'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Blue', 'Black'],
    ratings: 4.8,
    reviewCount: 124,
    inStock: true,
    featuredOrder: 1,
    isNew: false
  },
  {
    id: '2',
    name: 'Men\'s Slim Fit Chinos',
    description: 'Modern slim fit chinos crafted from stretch cotton twill for all-day comfort. Features a clean, tailored silhouette that works for any occasion.',
    price: 59.99,
    category: 'men',
    subCategory: 'pants',
    images: [
      'https://images.pexels.com/photos/1484806/pexels-photo-1484806.jpeg',
      'https://images.pexels.com/photos/2897531/pexels-photo-2897531.jpeg'
    ],
    sizes: ['28', '30', '32', '34', '36', '38'],
    colors: ['Khaki', 'Navy', 'Black', 'Olive'],
    ratings: 4.5,
    reviewCount: 98,
    inStock: true,
    isNew: true
  },
  {
    id: '3',
    name: 'Women\'s Casual Blazer',
    description: 'A versatile blazer designed for the modern woman. Structured yet comfortable enough for all-day wear.',
    price: 89.99,
    category: 'women',
    subCategory: 'jackets',
    images: [
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
      'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Grey'],
    ratings: 4.7,
    reviewCount: 86,
    inStock: true,
    featuredOrder: 2,
    onSale: true,
    salePrice: 69.99
  },
  {
    id: '4',
    name: 'Women\'s Slim Fit Jeans',
    description: 'High-quality denim jeans with a comfortable stretch. Features a slim fit design that flatters your silhouette.',
    price: 74.99,
    category: 'women',
    subCategory: 'pants',
    images: [
      'https://images.pexels.com/photos/1346187/pexels-photo-1346187.jpeg',
      'https://images.pexels.com/photos/885590/pexels-photo-885590.jpeg'
    ],
    sizes: ['24', '26', '28', '30', '32'],
    colors: ['Light Blue', 'Medium Blue', 'Dark Blue', 'Black'],
    ratings: 4.6,
    reviewCount: 152,
    inStock: true,
    isNew: true
  },
  {
    id: '5',
    name: 'Kids\' Graphic T-Shirt',
    description: 'Fun and colorful graphic t-shirt made from 100% organic cotton. Comfortable fit with playful designs kids will love.',
    price: 24.99,
    category: 'kids',
    subCategory: 'shirts',
    images: [
      'https://images.pexels.com/photos/4149019/pexels-photo-4149019.jpeg',
      'https://images.pexels.com/photos/6069640/pexels-photo-6069640.jpeg'
    ],
    sizes: ['3Y', '4Y', '5Y', '6Y', '7Y', '8Y'],
    colors: ['Red', 'Blue', 'Green', 'Yellow'],
    ratings: 4.9,
    reviewCount: 64,
    inStock: true,
    featuredOrder: 3
  },
  {
    id: '6',
    name: 'Kids\' Denim Overalls',
    description: 'Classic denim overalls made for durability and comfort. Adjustable straps and multiple pockets make these perfect for active kids.',
    price: 39.99,
    category: 'kids',
    subCategory: 'pants',
    images: [
      'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg',
      'https://images.pexels.com/photos/3933250/pexels-photo-3933250.jpeg'
    ],
    sizes: ['3Y', '4Y', '5Y', '6Y', '7Y', '8Y'],
    colors: ['Light Denim', 'Dark Denim'],
    ratings: 4.7,
    reviewCount: 48,
    inStock: true,
    onSale: true,
    salePrice: 29.99
  },
  {
    id: '7',
    name: 'Men\'s Leather Jacket',
    description: 'Premium leather jacket with a timeless design. Features a comfortable fit and durable construction for years of wear.',
    price: 199.99,
    category: 'men',
    subCategory: 'jackets',
    images: [
      'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg',
      'https://images.pexels.com/photos/6765145/pexels-photo-6765145.jpeg'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Brown'],
    ratings: 4.9,
    reviewCount: 76,
    inStock: true,
    isNew: true
  },
  {
    id: '8',
    name: 'Women\'s Summer Dress',
    description: 'Lightweight and flowing summer dress perfect for warm days. Made from breathable fabric with a flattering silhouette.',
    price: 79.99,
    category: 'women',
    subCategory: 'dresses',
    images: [
      'https://images.pexels.com/photos/972995/pexels-photo-972995.jpeg',
      'https://images.pexels.com/photos/6056103/pexels-photo-6056103.jpeg'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Floral', 'Blue', 'Red'],
    ratings: 4.8,
    reviewCount: 105,
    inStock: true,
    onSale: true,
    salePrice: 59.99,
    featuredOrder: 4
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products
    .filter(product => typeof product.featuredOrder === 'number')
    .sort((a, b) => (a.featuredOrder || 0) - (b.featuredOrder || 0));
};

export const getProductsByCategory = (category: 'men' | 'women' | 'kids'): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getNewArrivals = (): Product[] => {
  return products.filter(product => product.isNew);
};

export const getOnSaleProducts = (): Product[] => {
  return products.filter(product => product.onSale);
};