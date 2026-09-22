"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  DollarSign, 
  ShoppingBag, 
  Package, 
  Users, 
  ArrowUpRight, 
  Plus, 
  Clock,
  CheckCircle2,
  AlertTriangle,
  RefreshCw
} from "lucide-react";
import { getAllOrders } from "@/lib/services/orderService";
import { getProducts } from "@/lib/services/productService";
import { getAllUsers } from "@/lib/services/userService";
import { OrderDetails, Product, UserProfile } from "@/types/ecommerce";

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<OrderDetails[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [fetchedOrders, fetchedProducts, fetchedUsers] = await Promise.all([
        getAllOrders(),
        getProducts(),
        getAllUsers(),
      ]);
      setOrders(fetchedOrders);
      setProducts(fetchedProducts);
      setUsers(fetchedUsers);
    } catch (e) {
      console.error("Dashboard fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  const pendingOrders = orders.filter((o) => o.status === "Pending").length;

  return (
    <div className="space-y-10">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <h1 className="font-serif-display text-3xl sm:text-4xl text-white tracking-wide uppercase">
            ADMIN DASHBOARD
          </h1>
          <p className="font-inter text-xs text-neutral-400 tracking-widest uppercase mt-1">
            TARZ WINTER STORE METRICS & ANALYTICS OVERVIEW
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            className="px-4 py-2.5 bg-neutral-900 border border-neutral-700 hover:border-white text-xs uppercase tracking-wider text-white flex items-center gap-2 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <Link
            href="/admin/products"
            className="px-5 py-2.5 bg-white text-black font-semibold hover:bg-neutral-200 text-xs uppercase tracking-wider flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <div className="bg-neutral-950 border border-neutral-800 p-6 space-y-4">
          <div className="flex justify-between items-center text-neutral-400">
            <span className="text-[11px] uppercase tracking-widest font-medium">TOTAL REVENUE</span>
            <div className="p-2 bg-neutral-900 border border-neutral-800 rounded">
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div>
            <p className="font-lexend text-2xl font-bold text-white">
              PKR {totalRevenue.toLocaleString()}
            </p>
            <p className="text-[10px] text-neutral-500 uppercase tracking-wider mt-1">
              From {orders.length} total orders
            </p>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-neutral-950 border border-neutral-800 p-6 space-y-4">
          <div className="flex justify-between items-center text-neutral-400">
            <span className="text-[11px] uppercase tracking-widest font-medium">TOTAL ORDERS</span>
            <div className="p-2 bg-neutral-900 border border-neutral-800 rounded">
              <ShoppingBag className="w-4 h-4 text-blue-400" />
            </div>
          </div>
          <div>
            <p className="font-lexend text-2xl font-bold text-white">
              {orders.length}
            </p>
            <p className="text-[10px] text-amber-400 uppercase tracking-wider mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3 inline" />
              {pendingOrders} Pending Processing
            </p>
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-neutral-950 border border-neutral-800 p-6 space-y-4">
          <div className="flex justify-between items-center text-neutral-400">
            <span className="text-[11px] uppercase tracking-widest font-medium">PRODUCTS</span>
            <div className="p-2 bg-neutral-900 border border-neutral-800 rounded">
              <Package className="w-4 h-4 text-purple-400" />
            </div>
          </div>
          <div>
            <p className="font-lexend text-2xl font-bold text-white">
              {products.length}
            </p>
            <p className="text-[10px] text-neutral-500 uppercase tracking-wider mt-1">
              {products.filter((p) => p.inStock).length} In Stock
            </p>
          </div>
        </div>

        {/* Registered Users */}
        <div className="bg-neutral-950 border border-neutral-800 p-6 space-y-4">
          <div className="flex justify-between items-center text-neutral-400">
            <span className="text-[11px] uppercase tracking-widest font-medium">REGISTERED USERS</span>
            <div className="p-2 bg-neutral-900 border border-neutral-800 rounded">
              <Users className="w-4 h-4 text-rose-400" />
            </div>
          </div>
          <div>
            <p className="font-lexend text-2xl font-bold text-white">
              {users.length}
            </p>
            <p className="text-[10px] text-neutral-500 uppercase tracking-wider mt-1">
              {users.filter((u) => u.role === "admin").length} Admins
            </p>
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-neutral-950 border border-neutral-800 p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-neutral-800 pb-4">
          <div>
            <h2 className="font-serif-display text-xl uppercase text-white tracking-wider">
              RECENT ORDERS
            </h2>
            <p className="text-[11px] text-neutral-400 uppercase tracking-widest">
              LATEST CUSTOMER PURCHASES FROM STOREFRONT
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs text-white hover:underline uppercase tracking-wider flex items-center gap-1 font-medium"
          >
            View All Orders <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="py-12 text-center text-neutral-500 text-xs tracking-widest uppercase">
            Loading recent orders...
          </div>
        ) : orders.length === 0 ? (
          <div className="py-12 text-center text-neutral-500 text-xs tracking-widest uppercase">
            No orders placed yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs uppercase tracking-wider">
              <thead className="border-b border-neutral-800 text-neutral-400 text-[10px]">
                <tr>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Items</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900 text-neutral-300">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.orderId} className="hover:bg-neutral-900/50 transition-colors">
                    <td className="py-4 px-4 font-mono font-medium text-white">#{order.orderId}</td>
                    <td className="py-4 px-4">
                      <p className="text-white font-medium">{order.customer?.fullName || "Guest"}</p>
                      <p className="text-[10px] text-neutral-500">{order.customer?.email}</p>
                    </td>
                    <td className="py-4 px-4 text-neutral-400">
                      {order.items?.length || 0} item(s)
                    </td>
                    <td className="py-4 px-4 text-neutral-400">{order.customer?.paymentMethod || "COD"}</td>
                    <td className="py-4 px-4 font-bold text-white">PKR {(order.total || 0).toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 text-[10px] font-semibold border ${
                        order.status === "Delivered"
                          ? "bg-emerald-950/60 border-emerald-700 text-emerald-300"
                          : order.status === "Shipped"
                          ? "bg-blue-950/60 border-blue-700 text-blue-300"
                          : order.status === "Cancelled"
                          ? "bg-red-950/60 border-red-800 text-red-400"
                          : "bg-amber-950/60 border-amber-700 text-amber-300"
                      }`}>
                        {order.status || "Pending"}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right text-neutral-500 text-[10px]">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
