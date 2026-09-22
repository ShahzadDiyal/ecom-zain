"use client";

import React, { useEffect, useState } from "react";
import { 
  ShoppingBag, 
  Search, 
  Eye, 
  CheckCircle2, 
  Clock, 
  Truck, 
  XCircle,
  X,
  MapPin,
  Phone,
  Mail,
  RefreshCw
} from "lucide-react";
import { getAllOrders, updateOrderStatus } from "@/lib/services/orderService";
import { OrderDetails, OrderStatus } from "@/types/ecommerce";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<OrderDetails | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (e) {
      console.error("Failed to load orders:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((o) => (o.orderId === orderId ? { ...o, status: newStatus } : o))
      );
      if (selectedOrder && selectedOrder.orderId === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update order status.");
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <h1 className="font-serif-display text-3xl text-white tracking-wide uppercase">
            ORDERS MANAGEMENT
          </h1>
          <p className="font-inter text-xs text-neutral-400 tracking-widest uppercase mt-1">
            VIEW CUSTOMER ORDERS & UPDATE FULFILLMENT STATUS
          </p>
        </div>
        <button
          onClick={fetchOrders}
          className="px-4 py-2.5 bg-neutral-900 border border-neutral-700 hover:border-white text-xs uppercase tracking-wider text-white flex items-center gap-2 transition-colors shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh Orders
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between bg-neutral-950 border border-neutral-800 p-4">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="SEARCH BY ORDER #, NAME, EMAIL..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black border border-neutral-800 px-4 py-2.5 pl-10 text-xs text-white uppercase placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
          />
          <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
        </div>

        <div className="flex gap-2 overflow-x-auto">
          {["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-2 text-[10px] uppercase tracking-wider border whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? "bg-white text-black border-white font-semibold"
                  : "bg-black text-neutral-400 border-neutral-800 hover:border-neutral-700"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-neutral-950 border border-neutral-800 overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-neutral-500 text-xs uppercase tracking-widest">
            Loading order records...
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="py-16 text-center text-neutral-500 text-xs uppercase tracking-widest">
            No orders found matching criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs uppercase tracking-wider">
              <thead className="border-b border-neutral-800 text-neutral-400 text-[10px] bg-neutral-900/50">
                <tr>
                  <th className="py-3.5 px-4">Order ID</th>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">City</th>
                  <th className="py-3.5 px-4">Items</th>
                  <th className="py-3.5 px-4">Total</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900 text-neutral-300">
                {filteredOrders.map((order) => (
                  <tr key={order.orderId} className="hover:bg-neutral-900/50 transition-colors">
                    <td className="py-4 px-4 font-mono font-medium text-white">#{order.orderId}</td>
                    <td className="py-4 px-4">
                      <p className="text-white font-medium">{order.customer?.fullName || "Guest User"}</p>
                      <p className="text-[10px] text-neutral-500 lowercase">{order.customer?.email}</p>
                    </td>
                    <td className="py-4 px-4 text-neutral-400">{order.customer?.city || "N/A"}</td>
                    <td className="py-4 px-4 text-neutral-400">{order.items?.length || 0} item(s)</td>
                    <td className="py-4 px-4 font-mono font-bold text-white">
                      PKR {(order.total || 0).toLocaleString()}
                    </td>
                    <td className="py-4 px-4">
                      <select
                        value={order.status || "Pending"}
                        onChange={(e) => handleStatusChange(order.orderId, e.target.value as OrderStatus)}
                        className={`px-2 py-1 text-[10px] font-semibold border uppercase focus:outline-none bg-black ${
                          order.status === "Delivered"
                            ? "border-emerald-700 text-emerald-300"
                            : order.status === "Shipped"
                            ? "border-blue-700 text-blue-300"
                            : order.status === "Cancelled"
                            ? "border-red-800 text-red-400"
                            : "border-amber-700 text-amber-300"
                        }`}
                      >
                        <option value="Pending">PENDING</option>
                        <option value="Processing">PROCESSING</option>
                        <option value="Shipped">SHIPPED</option>
                        <option value="Delivered">DELIVERED</option>
                        <option value="Cancelled">CANCELLED</option>
                      </select>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-3 py-1.5 bg-neutral-900 border border-neutral-800 hover:border-white text-white text-[10px] uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" /> Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-950 border border-neutral-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl space-y-6">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-6 right-6 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] text-neutral-400 uppercase tracking-widest">ORDER DETAILS</span>
              <h2 className="font-serif-display text-2xl uppercase text-white font-mono mt-1">
                #{selectedOrder.orderId}
              </h2>
            </div>

            {/* Delivery Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-black border border-neutral-800 p-4 text-xs">
              <div className="space-y-1.5">
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold">CUSTOMER INFO</p>
                <p className="text-white font-medium">{selectedOrder.customer?.fullName}</p>
                <p className="text-neutral-400 flex items-center gap-1.5 lowercase">
                  <Mail className="w-3.5 h-3.5 text-neutral-500" /> {selectedOrder.customer?.email}
                </p>
                <p className="text-neutral-400 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-neutral-500" /> {selectedOrder.customer?.phone}
                </p>
              </div>

              <div className="space-y-1.5">
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold">SHIPPING ADDRESS</p>
                <p className="text-neutral-300 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0 mt-0.5" />
                  {selectedOrder.customer?.address}, {selectedOrder.customer?.city}
                </p>
                <p className="text-neutral-400 uppercase text-[10px] mt-2">
                  PAYMENT METHOD: <span className="text-white font-medium">{selectedOrder.customer?.paymentMethod}</span>
                </p>
              </div>
            </div>

            {/* Purchased Items List */}
            <div>
              <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold mb-3">PURCHASED ITEMS</p>
              <div className="space-y-2 divide-y divide-neutral-900 border-t border-b border-neutral-800 py-2">
                {selectedOrder.items?.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center pt-2 text-xs">
                    <div>
                      <p className="text-white font-medium">{item.product.name}</p>
                      <p className="text-[10px] text-neutral-400 uppercase">
                        Size: {item.selectedSize || "M"} | Color: {item.selectedColor || "Burgundy"} | Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-mono font-bold text-white">
                      PKR {(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Totals Summary */}
            <div className="flex justify-between items-center pt-2 text-xs border-t border-neutral-800">
              <span className="text-neutral-400 uppercase font-semibold">TOTAL AMOUNT</span>
              <span className="font-lexend text-xl font-bold text-white">
                PKR {(selectedOrder.total || 0).toLocaleString()}
              </span>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-6 py-2.5 bg-white text-black font-semibold uppercase text-xs tracking-wider hover:bg-neutral-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
