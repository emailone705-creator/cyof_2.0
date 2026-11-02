import React, { useState } from 'react';
import { ViewRoute, Product } from '../../types';
import { usePatron, OrderItem } from '../../context/PatronContext';
import { AccountNavHeader } from '../../components/AccountNavHeader';

interface OrdersViewProps {
  onNavigate: (route: ViewRoute) => void;
  onOpenSalonModal: () => void;
  onAddToCart?: (product: Product) => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({
  onNavigate,
  onOpenSalonModal,
  onAddToCart,
}) => {
  const { orders } = usePatron();
  const [filter, setFilter] = useState<'all' | 'active' | 'delivered'>('all');
  const [expandedTrackingId, setExpandedTrackingId] = useState<string | null>('ord-1');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredOrders = orders.filter((o) => {
    if (filter === 'active') return o.status === 'In Transit';
    if (filter === 'delivered') return o.status === 'Delivered';
    return true;
  });

  const handleRepeatOrder = (order: OrderItem) => {
    if (onAddToCart) {
      order.items.forEach((item) => {
        onAddToCart({
          id: item.productId,
          name: item.name,
          subtitle: item.category,
          category: item.category,
          price: item.price,
          image: item.image,
          images: [item.image],
          description: `Archival repeat commission for ${item.name}`,
          shades: [{ name: item.shade, color: '#332D2B' }],
          sizes: [{ label: item.size, dimensions: 'Standard' }],
        });
      });
      showToast('Masterpieces from previous commission allocated to Shopping Bag');
      setTimeout(() => onNavigate('cart'), 800);
    }
  };

  return (
    <div className="w-full flex flex-col bg-[#fcf9f4] min-h-screen text-[#1c1c19] py-8 sm:py-12 px-4 md:px-8 lg:px-12 max-w-[1500px] mx-auto">
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-[#111111] text-white text-xs font-['Manrope'] px-5 py-3.5 shadow-2xl border-l-4 border-[#B94700] animate-in slide-in-from-top-2 flex items-center gap-3">
          <span className="material-symbols-outlined text-[18px] text-[#B94700]">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <AccountNavHeader
        currentRoute="account-orders"
        onNavigate={onNavigate}
        title="My Orders & Active Shipments"
        subtitle="Pan-India Commissions Registry • #CraftedYourOwnFashion"
        onOpenSalonModal={onOpenSalonModal}
      />

      {/* Main Orders Content */}
      <div className="space-y-6">
        {/* Filter Controls & Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E9DFD2] gap-4 font-['Manrope']">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-2 text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#111111] text-white'
                  : 'bg-white border border-[#E9DFD2] text-[#57534E] hover:text-[#111111]'
              }`}
            >
              All Purchases ({orders.length})
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-3.5 py-2 text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer ${
                filter === 'active'
                  ? 'bg-[#111111] text-white'
                  : 'bg-white border border-[#E9DFD2] text-[#57534E] hover:text-[#111111]'
              }`}
            >
              Active Shipments (1)
            </button>
            <button
              onClick={() => setFilter('delivered')}
              className={`px-3.5 py-2 text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer ${
                filter === 'delivered'
                  ? 'bg-[#111111] text-white'
                  : 'bg-white border border-[#E9DFD2] text-[#57534E] hover:text-[#111111]'
              }`}
            >
              Delivered Archival ({orders.length - 1})
            </button>
          </div>

          <span className="text-xs text-[#57534E]">
            All transactions inscribed in Indian Rupees (INR ₹)
          </span>
        </div>

        {/* Orders Listing */}
        <div className="space-y-6">
          {filteredOrders.map((order) => {
            const isActive = order.status === 'In Transit';
            const isTrackingOpen = expandedTrackingId === order.id;

            return (
              <div
                key={order.id}
                className="border border-[#E9DFD2] bg-white p-6 shadow-xs font-['Manrope'] transition-all"
              >
                {/* Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E9DFD2]">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] font-semibold">
                        Token: {order.token}
                      </h3>
                      <span
                        className={`text-[9px] uppercase tracking-widest px-2.5 py-0.5 font-bold ${
                          isActive
                            ? 'bg-[#B94700] text-white animate-pulse'
                            : 'bg-[#111111] text-white'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#57534E]">
                      Inscribed on {order.date} • {order.statusDescription}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-[#57534E] block">Total Commission (GST 18% Included)</span>
                    <span className="text-xl font-bold text-[#111111]">
                      ₹{order.grandTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Items in this Order */}
                <div className="py-5 space-y-4">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#fcf9f4] p-4 border border-[#E9DFD2]"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-16 h-20 bg-[#ebe8e3] overflow-hidden shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[9px] uppercase tracking-widest text-[#57534E] block font-semibold">
                            {item.category}
                          </span>
                          <h4 className="font-['EB_Garamond'] text-lg text-[#111111] font-semibold truncate">
                            {item.name}
                          </h4>
                          <p className="text-xs text-[#57534E] mt-0.5">
                            Selected Shade: <strong className="text-[#111111]">{item.shade}</strong> • Size: <strong className="text-[#111111]">{item.size}</strong> • Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>

                      <div className="text-left sm:text-right shrink-0">
                        <span className="text-sm font-bold text-[#111111] block">
                          ₹{item.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-[#57534E]">HSN 6204</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Live Tracking Timeline */}
                {isActive && (
                  <div className="mt-2 bg-[#fcf9f4] border border-[#E9DFD2] p-5">
                    <div className="flex items-center justify-between pb-3 border-b border-[#E9DFD2]">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[20px] text-[#B94700]">local_shipping</span>
                        <span className="text-xs font-bold text-[#111111] uppercase tracking-wider">
                          Live White-Glove Hand-Delivery Timeline
                        </span>
                      </div>
                      <span className="text-xs text-[#B94700] font-bold">
                        Expected Handover: {order.estimatedHandover}
                      </span>
                    </div>

                    <div className="py-5 space-y-4">
                      {order.trackingSteps.map((step, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-4 relative">
                          <div className="flex flex-col items-center">
                            <span
                              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                step.completed
                                  ? 'bg-emerald-600 text-white'
                                  : step.current
                                  ? 'bg-[#B94700] text-white ring-4 ring-[#ffe8de]'
                                  : 'bg-[#E9DFD2] text-[#57534E]'
                              }`}
                            >
                              {step.completed ? '✓' : sIdx + 1}
                            </span>
                            {sIdx < order.trackingSteps.length - 1 && (
                              <div
                                className={`w-[2px] h-10 ${
                                  step.completed ? 'bg-emerald-600' : 'bg-[#E9DFD2]'
                                }`}
                              />
                            )}
                          </div>
                          <div className="text-xs min-w-0">
                            <p className={`font-semibold text-sm ${step.current ? 'text-[#B94700]' : 'text-[#111111]'}`}>
                              {step.title}
                            </p>
                            <p className="text-xs text-[#57534E] mt-0.5">
                              {step.location} • <span className="font-semibold">{step.timestamp}</span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 bg-white border border-[#E9DFD2] text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[#57534E]">
                      <div>
                        Chauffeur Waybill: <strong className="text-[#111111]">{order.trackingNumber}</strong> ({order.courierName})
                      </div>
                      <div>
                        Destination: <strong className="text-[#111111]">{order.deliveryAddress}</strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* Order Footer & Actions */}
                <div className="pt-4 mt-4 border-t border-[#E9DFD2] flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => onNavigate('account-invoices')}
                      className="text-[#111111] hover:text-[#B94700] underline uppercase tracking-wider font-semibold cursor-pointer"
                    >
                      View GST Invoice
                    </button>
                    <span className="text-[#E9DFD2]">•</span>
                    <button
                      onClick={() => onNavigate('account-returns')}
                      className="text-[#57534E] hover:text-[#111111] uppercase tracking-wider font-semibold cursor-pointer"
                    >
                      Initiate Return / Exchange
                    </button>
                    <span className="text-[#E9DFD2]">•</span>
                    <button
                      onClick={onOpenSalonModal}
                      className="text-[#57534E] hover:text-[#111111] uppercase tracking-wider font-semibold cursor-pointer"
                    >
                      Book Salon Fitting for this Look
                    </button>
                  </div>

                  <button
                    onClick={() => handleRepeatOrder(order)}
                    className="px-5 py-2.5 bg-[#111111] hover:bg-[#B94700] text-white text-xs uppercase tracking-widest font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[16px]">refresh</span>
                    <span>Repeat Commission</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
