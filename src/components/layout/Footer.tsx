import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand and description */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">LUXESTORE</h2>
            <p className="text-sm leading-relaxed mb-4">
              Premium clothing for men, women, and kids. Quality craftsmanship, 
              sustainable materials, and timeless designs for every occasion.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Shop links */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products/men" className="hover:text-white transition-colors">
                  Men's Collection
                </Link>
              </li>
              <li>
                <Link to="/products/women" className="hover:text-white transition-colors">
                  Women's Collection
                </Link>
              </li>
              <li>
                <Link to="/products/kids" className="hover:text-white transition-colors">
                  Kids' Collection
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white transition-colors">
                  Sale
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company links */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white transition-colors">
                  Our Stores
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact info */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex">
                <MapPin size={18} className="flex-shrink-0 mr-2 mt-1" />
                <span>123 Fashion Street, New York, NY 10001</span>
              </li>
              <li className="flex">
                <Phone size={18} className="flex-shrink-0 mr-2 mt-1" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex">
                <Mail size={18} className="flex-shrink-0 mr-2 mt-1" />
                <span>support@luxestore.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} LUXESTORE. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <Link to="#" className="hover:text-white transition-colors">Terms</Link>
            <Link to="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="#" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;