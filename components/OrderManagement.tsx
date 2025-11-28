import React from 'react';
import { Order, OrderStatus } from '../types';
import { Package, Clock, CheckCircle, Truck, XCircle, AlertCircle, X } from 'lucide-react';

interface OrderManagementProps {
  orders: Order[];
  onCancelOrder: (orderId: string) => void;
}

const OrderManagement: React.FC<OrderManagementProps> = ({ orders, onCancelOrder }) => {
  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.DELIVERED: return <CheckCircle className="w-4 h-4 text-green-500" />;
      case OrderStatus.SHIPPED: return <Truck className="w-4 h-4 text-blue-500" />;
      case OrderStatus.PROCESSING: return <Package className="w-4 h-4 text-orange-500" />;
      case OrderStatus.CANCELLED: return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusClass = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.DELIVERED: return 'bg-green-50 text-green-700 border-green-200';
      case OrderStatus.SHIPPED: return 'bg-blue-50 text-blue-700 border-blue-200';
      case OrderStatus.PROCESSING: return 'bg-orange-50 text-orange-700 border-orange-200';
      case OrderStatus.CANCELLED: return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const sortedOrders = [...orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Order History</h2>

      {orders.length === 0 ? (
        <div className="bg-white p-12 rounded-xl border border-slate-200 text-center text-slate-500">
          <Package className="w-12 h-12 mx-auto mb-4 text-slate-300" />
          <p className="text-lg font-medium">No orders found.</p>
          <p>Orders you place will appear here.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-semibold text-slate-600">Order ID</th>
                  <th className="px-6 py-4 font-semibold text-slate-600">Customer</th>
                  <th className="px-6 py-4 font-semibold text-slate-600">Date</th>
                  <th className="px-6 py-4 font-semibold text-slate-600">Items</th>
                  <th className="px-6 py-4 font-semibold text-slate-600">Total Value</th>
                  <th className="px-6 py-4 font-semibold text-slate-600">Status</th>
                  <th className="px-6 py-4 font-semibold text-slate-600 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sortedOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{order.id}</td>
                    <td className="px-6 py-4 text-slate-600">{order.customerName}</td>
                    <td className="px-6 py-4 text-slate-500">{order.date}</td>
                    <td className="px-6 py-4 text-slate-600">
                      <span title={order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}>
                        {order.items.length} items
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">₹{order.total.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusClass(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {(order.status === OrderStatus.PENDING || order.status === OrderStatus.PROCESSING) ? (
                        <button 
                          type="button"
                          onClick={() => onCancelOrder(order.id)}
                          className="flex items-center gap-1.5 ml-auto text-red-600 font-semibold text-xs border border-red-300 hover:bg-red-600 hover:text-white px-4 py-2 rounded-full transition-all shadow-sm active:scale-95"
                        >
                          <X className="w-3 h-3" />
                          Cancel Order
                        </button>
                      ) : (
                        <span className="text-slate-400 text-xs italic opacity-60">
                          {order.status === OrderStatus.CANCELLED ? 'Cancelled' : 'Cannot Cancel'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;