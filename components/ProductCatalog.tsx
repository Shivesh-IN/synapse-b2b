import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { Product, ProductCategory } from '../types';
import { Search, Filter, Plus, X, ShoppingCart, Car, Tag, AlertTriangle } from 'lucide-react';

interface ProductCatalogProps {
  addToCart: (product: Product) => void;
}

const ProductCatalog: React.FC<ProductCatalogProps> = ({ addToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' 
      ? true 
      : selectedCategory === ProductCategory.EV 
        ? product.tags?.includes('EV') 
        : product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Digital Catalog</h2>
          <p className="text-slate-500 mt-1">Browse and search our comprehensive parts inventory.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search by SKU or Name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-72 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all shadow-sm"
            />
          </div>
          
          <div className="relative group">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-56 pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none shadow-sm cursor-pointer hover:border-teal-300 transition-colors"
            >
              <option value="All">All Categories</option>
              {Object.values(ProductCategory).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product) => {
          const isLowStock = product.stock < 20;
          return (
            <div 
              key={product.id} 
              className={`bg-white rounded-2xl border overflow-hidden transition-all duration-300 cursor-pointer group flex flex-col hover:-translate-y-1.5 hover:shadow-2xl relative ${
                isLowStock ? 'border-red-200 shadow-red-100/50' : 'border-slate-200 hover:border-teal-400/50'
              }`}
              onClick={() => setSelectedProduct(product)}
            >
              {/* Image Section */}
              <div className="h-52 bg-slate-50 relative overflow-hidden flex items-center justify-center p-6 border-b border-slate-100">
                <div className="absolute inset-0 bg-slate-100/50 mix-blend-multiply transition-opacity opacity-0 group-hover:opacity-100" />
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500 ease-out relative z-10" 
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2 z-20">
                   {product.tags?.includes('EV') && (
                     <span className="bg-green-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg border border-white/20">
                      EV READY
                    </span>
                   )}
                </div>

                {isLowStock && (
                  <span className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1 z-20 animate-pulse ring-2 ring-white">
                    <AlertTriangle className="w-3 h-3" />
                    LOW STOCK
                  </span>
                )}
              </div>

              {/* Content Section */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider bg-teal-50 px-2 py-1 rounded-md border border-teal-100">
                    {product.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
                    {product.sku}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-lg mb-2 leading-snug line-clamp-2 min-h-[3.5rem] group-hover:text-teal-700 transition-colors">
                  {product.name}
                </h3>
                
                <p className="text-sm text-slate-500 mb-6 line-clamp-2 leading-relaxed min-h-[2.5rem]">
                  {product.description}
                </p>
                
                {/* Footer Section */}
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-slate-900">₹{product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                         <span className="text-xs text-slate-400 line-through font-medium">₹{product.originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                    <span className={`text-xs font-semibold mt-0.5 ${isLowStock ? 'text-red-600' : 'text-slate-400'}`}>
                      {product.stock} units
                    </span>
                  </div>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    disabled={product.stock === 0}
                    className={`p-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center ${
                      product.stock === 0 
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-slate-900 text-white hover:bg-teal-600 hover:shadow-teal-200 active:scale-95'
                    }`}
                    aria-label="Add to cart"
                  >
                    {product.stock === 0 ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        
        {filteredProducts.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-slate-900 font-medium text-lg">No products found</h3>
            <p className="text-slate-500 mt-1">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col md:flex-row max-h-[90vh] md:h-auto">
            {/* Modal Image */}
            <div className="w-full md:w-1/2 bg-slate-100 p-8 md:p-12 flex items-center justify-center relative">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/50 to-transparent"></div>
               <img 
                  src={selectedProduct.imageUrl} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-contain mix-blend-multiply relative z-10" 
                />
            </div>

            {/* Modal Content */}
            <div className="w-full md:w-1/2 p-6 md:p-10 relative flex flex-col overflow-y-auto">
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors z-10"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="mb-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-50 text-teal-700 border border-teal-100">
                    {selectedProduct.category}
                  </span>
                  {selectedProduct.tags?.map(tag => (
                     <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-green-50 text-green-700 border border-green-100">
                      {tag}
                     </span>
                  ))}
                  {selectedProduct.stock < 20 && (
                     <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-50 text-red-700 border border-red-100 animate-pulse">
                      Low Stock
                     </span>
                  )}
                </div>
                
                <h2 className="text-3xl font-bold text-slate-900 mb-2 leading-tight">{selectedProduct.name}</h2>
                <div className="flex items-center text-sm text-slate-500 mb-8 font-mono bg-slate-50 inline-block py-1 px-2 rounded w-fit border border-slate-100">
                  <Tag className="w-4 h-4 mr-2" />
                  {selectedProduct.sku}
                </div>

                <div className="prose prose-slate prose-sm mb-8 text-slate-600 leading-relaxed">
                  <p>{selectedProduct.description}</p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Car className="w-4 h-4 text-slate-400" />
                    Compatible Vehicles
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.vehicleCompatibility.map((vehicle, idx) => (
                      <span key={idx} className="bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm">
                        {vehicle}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-baseline gap-2">
                       <span className="block text-3xl font-bold text-slate-900">₹{selectedProduct.price.toLocaleString()}</span>
                       {selectedProduct.originalPrice && (
                         <span className="text-lg text-slate-400 line-through">₹{selectedProduct.originalPrice.toLocaleString()}</span>
                       )}
                    </div>
                    <span className={`text-sm font-medium ${selectedProduct.stock > 0 ? (selectedProduct.stock < 20 ? 'text-red-600' : 'text-green-600') : 'text-red-600'}`}>
                      {selectedProduct.stock > 0 ? (selectedProduct.stock < 20 ? `Only ${selectedProduct.stock} left` : 'In Stock') : 'Out of Stock'}
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    disabled={selectedProduct.stock === 0}
                    className="flex-1 flex items-center justify-center gap-2 bg-slate-900 hover:bg-teal-600 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {selectedProduct.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCatalog;