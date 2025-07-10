import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShoppingBag, Heart, CreditCard, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

type TabType = 'account' | 'orders' | 'wishlist' | 'payment' | 'settings';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('account');
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    document.title = 'My Account | LUXESTORE';
    
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  if (!user) {
    return null; // Will redirect in the useEffect
  }
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 text-center border-b border-gray-200">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                  <User size={32} className="text-indigo-600" />
                </div>
                <h2 className="text-lg font-medium">{user.name}</h2>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              
              <nav className="p-2">
                <button
                  className={`w-full flex items-center px-4 py-3 rounded-md text-left text-sm font-medium ${
                    activeTab === 'account' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveTab('account')}
                >
                  <User size={18} className="mr-3" />
                  Account Information
                </button>
                
                <button
                  className={`w-full flex items-center px-4 py-3 rounded-md text-left text-sm font-medium ${
                    activeTab === 'orders' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveTab('orders')}
                >
                  <ShoppingBag size={18} className="mr-3" />
                  Order History
                </button>
                
                <button
                  className={`w-full flex items-center px-4 py-3 rounded-md text-left text-sm font-medium ${
                    activeTab === 'wishlist' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveTab('wishlist')}
                >
                  <Heart size={18} className="mr-3" />
                  Wishlist
                </button>
                
                <button
                  className={`w-full flex items-center px-4 py-3 rounded-md text-left text-sm font-medium ${
                    activeTab === 'payment' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveTab('payment')}
                >
                  <CreditCard size={18} className="mr-3" />
                  Payment Methods
                </button>
                
                <button
                  className={`w-full flex items-center px-4 py-3 rounded-md text-left text-sm font-medium ${
                    activeTab === 'settings' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveTab('settings')}
                >
                  <Settings size={18} className="mr-3" />
                  Account Settings
                </button>
                
                <button
                  className="w-full flex items-center px-4 py-3 rounded-md text-left text-sm font-medium text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut size={18} className="mr-3" />
                  Sign Out
                </button>
              </nav>
            </div>
          </div>
          
          {/* Main content */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Account Information Tab */}
              {activeTab === 'account' && (
                <div>
                  <h2 className="text-xl font-medium mb-6">Account Information</h2>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={user.name}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          readOnly
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={user.email}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          readOnly
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="Add your phone number"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Address Information</h3>
                      
                      <div className="bg-gray-50 p-4 rounded-lg mb-4 text-center">
                        <p className="text-gray-600">You don't have any saved addresses yet.</p>
                        <button className="mt-2 text-indigo-600 font-medium hover:text-indigo-800">
                          + Add a new address
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Order History Tab */}
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-xl font-medium mb-6">Order History</h2>
                  
                  <div className="bg-gray-50 p-8 rounded-lg text-center">
                    <ShoppingBag size={40} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-lg text-gray-700 mb-2">No orders yet</p>
                    <p className="text-gray-500 mb-6">When you place an order, it will appear here.</p>
                    <button
                      className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                      onClick={() => navigate('/')}
                    >
                      Start Shopping
                    </button>
                  </div>
                </div>
              )}
              
              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-xl font-medium mb-6">My Wishlist</h2>
                  
                  <div className="bg-gray-50 p-8 rounded-lg text-center">
                    <Heart size={40} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-lg text-gray-700 mb-2">Your wishlist is empty</p>
                    <p className="text-gray-500 mb-6">Save items you love for future reference.</p>
                    <button
                      className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                      onClick={() => navigate('/')}
                    >
                      Explore Products
                    </button>
                  </div>
                </div>
              )}
              
              {/* Payment Methods Tab */}
              {activeTab === 'payment' && (
                <div>
                  <h2 className="text-xl font-medium mb-6">Payment Methods</h2>
                  
                  <div className="bg-gray-50 p-8 rounded-lg text-center">
                    <CreditCard size={40} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-lg text-gray-700 mb-2">No payment methods saved</p>
                    <p className="text-gray-500 mb-6">Add a payment method for faster checkout.</p>
                    <button className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                      Add Payment Method
                    </button>
                  </div>
                </div>
              )}
              
              {/* Account Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-xl font-medium mb-6">Account Settings</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Email Preferences</h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input
                            id="order-updates"
                            type="checkbox"
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            defaultChecked
                          />
                          <label htmlFor="order-updates" className="ml-3 text-gray-700">
                            Order updates and receipts
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            id="promotions"
                            type="checkbox"
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            defaultChecked
                          />
                          <label htmlFor="promotions" className="ml-3 text-gray-700">
                            Promotions and special offers
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            id="new-arrivals"
                            type="checkbox"
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          />
                          <label htmlFor="new-arrivals" className="ml-3 text-gray-700">
                            New arrivals and restocks
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Password</h3>
                      
                      <button className="text-indigo-600 font-medium hover:text-indigo-800">
                        Change Password
                      </button>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Data Privacy</h3>
                      
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600">
                          Manage how your data is used and stored. For details on how we use your information, 
                          please read our <a href="#" className="text-indigo-600">Privacy Policy</a>.
                        </p>
                        
                        <button className="text-indigo-600 font-medium hover:text-indigo-800">
                          Export Personal Data
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3 text-red-600">Danger Zone</h3>
                      
                      <button className="text-red-600 font-medium hover:text-red-800">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;