import React from 'react';
import { CartItem } from '../types';
import { Trash2, ArrowRight } from 'lucide-react';

interface CartProps {
  items: CartItem[];
  onRemove: (id: string) => void;
  onPlaceOrder: () => void;
}

const Cart: React.FC<CartProps> = ({ items, onRemove, onPlaceOrder }) => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + tax;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="bg-slate-100 p-6 rounded-full mb-4">
            <Trash2 className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-slate-800">Your cart is empty</h3>
        <p className="text-slate-500 mt-2">Start adding products from the catalog to build an order.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Review Order</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-slate-100 rounded-lg overflow-hidden">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">{item.name}</h4>
                  <p className="text-sm text-slate-500">SKU: {item.sku}</p>
                  <p className="text-sm font-medium text-teal-600">₹{item.price.toLocaleString()} x {item.quantity}</p>
                </div>
              </div>
              <button 
                onClick={() => onRemove(item.id)}
                className="text-slate-400 hover:text-red-500 p-2 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 h-fit space-y-4">
            <h3 className="font-semibold text-slate-800 text-lg">Order Summary</h3>
            <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                    <span>GST (18%)</span>
                    <span>₹{tax.toLocaleString()}</span>
                </div>
                <div className="border-t border-slate-100 pt-2 flex justify-between font-bold text-slate-900 text-base">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                </div>
            </div>
            
            <button 
                onClick={onPlaceOrder}
                className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 mt-4"
            >
                Confirm Order
                <ArrowRight className="w-4 h-4" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;