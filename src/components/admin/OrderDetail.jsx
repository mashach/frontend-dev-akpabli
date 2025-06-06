// src/components/admin/OrderDetail.jsx
import { Link, useParams } from "react-router-dom";

export default function OrderDetail() {
  const { orderId } = useParams();
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="p-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="text-gray-500">Order not found</p>
          <Link to="/admin/orders" className="text-orange-600 hover:text-orange-800 mt-4 inline-block">
            Back to orders
          </Link>
        </div>
      </div>
    );
  }

  const updateOrderStatus = (newStatus) => {
    const updatedOrders = orders.map(o => 
      o.id === orderId ? { ...o, status: newStatus } : o
    );
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Order #{order.id}</h2>
        <Link to="/admin/orders" className="text-orange-600 hover:text-orange-800">
          Back to orders
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Products</h3>
            <div className="space-y-4">
              {order.products.map((product, index) => (
                <div key={index} className="flex items-center border-b pb-4">
                  <div className="flex-shrink-0 h-16 w-16 bg-gray-200 rounded-md flex items-center justify-center">
                    <span className="text-gray-500 text-xs">
                       <img className="h-16 w-16 rounded-xl" src={(product.mobile).slice(1)} />
                    </span>
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{product.name}</h4>
                    <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
                    <p className="text-sm text-gray-500">Price: ${product.price.toFixed(2)}</p>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    ${(product.price * product.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
              <div className="flex justify-between pt-4 border-t">
                <span className="text-lg font-medium">Total</span>
                <span className="text-lg font-bold">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment and customer info sections remain the same as before */}
        </div>

        <div className="space-y-6">
          {/* Customer info and status sections remain the same */}
        </div>
      </div>
    </div>
  );
}