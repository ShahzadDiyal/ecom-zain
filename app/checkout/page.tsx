'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { createOrder } from '@/lib/services/orderService';
import { OrderDetails } from '@/types/ecommerce';
import { ArrowLeft } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, shippingFee, total, clearCart, formatPrice } = useCart();
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    email: user?.email || '',
    fullName: user?.displayName || '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'Cash on Delivery',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0 || submitting) return;

    setSubmitting(true);
    const orderId = `TZ${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder: OrderDetails = {
      orderId,
      userId: user?.uid,
      items: [...cart],
      subtotal,
      tax: 0,
      shippingFee,
      total,
      customer: {
        fullName: formData.fullName || 'TARZ Customer',
        email: formData.email || 'customer@tarz.com',
        phone: formData.phone || '+92 300 0000000',
        address: formData.address || 'Standard Address',
        city: formData.city || 'Karachi',
        postalCode: '75500',
        country: 'Pakistan',
        paymentMethod: formData.paymentMethod,
      },
      createdAt: new Date().toISOString(),
      status: 'Pending',
    };

    try {
      await createOrder(newOrder);
      clearCart();
      router.push(`/order-confirmation?orderId=${orderId}`);
    } catch (err) {
      console.error("Order submission error:", err);
      // Fallback: clear cart and redirect anyway
      clearCart();
      router.push('/order-confirmation');
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="bg-black text-white min-h-[70vh] flex flex-col items-center justify-center text-center px-6 space-y-6 font-inter md:mt-10">
        <h2 className="font-serif-display text-4xl font-extrabold uppercase">NO ITEMS TO CHECKOUT</h2>
        <Link
          href="/products"
          className="px-8 py-4 border border-white bg-white text-black font-lexend text-xs font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-all"
        >
          RETURN TO CATALOG
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen font-inter selection:bg-white selection:text-black">
      
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-10 space-y-12 md:mt-10">
        
        {/* HEADER ROW */}
        <div className="flex justify-between items-center border-b border-white/10 pb-6">
          <div className="flex items-center gap-6">
            <Link
              href="/cart"
              className="w-12 h-12 rounded-full border border-blue-600 flex items-center justify-center text-blue-500 hover:bg-blue-600 hover:text-white transition-colors"
              title="Back to Bag"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2]" />
            </Link>
            <h1 className="font-inter text-2xl sm:text-3xl font-medium tracking-tight uppercase text-white">
              CHECKOUT
            </h1>
          </div>

          <Link
            href="/products"
            className="font-inter text-xs tracking-wider uppercase text-white hover:underline flex items-center gap-2"
          >
            View All <span className="w-5 h-[1.5px] bg-white" />
          </Link>
        </div>


        {/* MAIN CONTAINER SPLIT */}
        <form onSubmit={handleSubmit} className="border border-white grid grid-cols-1 lg:grid-cols-12">
          
          {/* LEFT FORM COLUMN (7 Cols / 776px) */}
          <div className="lg:col-span-7 bg-[#070606] p-6 sm:p-10 space-y-10 border-b lg:border-b-0 lg:border-r border-white">
            
            {/* CONTACT INFORMATION */}
            <div className="space-y-6">
              <h2 className="font-inter text-xl font-medium uppercase tracking-wider text-white">
                CONTACT INFORMATION
              </h2>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block font-inter text-sm font-medium text-white">Email address</label>
                  <div className="border border-white p-4 bg-transparent">
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-transparent font-lexend text-sm text-white placeholder-white/50 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block font-inter text-sm font-medium text-white">Full Name</label>
                  <div className="border border-white p-4 bg-transparent">
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="Enter your Full Name"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full bg-transparent font-lexend text-sm text-white placeholder-white/50 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>


            {/* DELIVERY INFORMATION */}
            <div className="space-y-6 pt-4">
              <h2 className="font-inter text-xl font-medium uppercase tracking-wider text-white">
                DELIVERY INFORMATION
              </h2>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block font-inter text-sm font-medium text-white">Phone Number</label>
                  <div className="border border-white p-4 bg-transparent">
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="Enter your Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-transparent font-lexend text-sm text-white placeholder-white/50 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block font-inter text-sm font-medium text-white">Address</label>
                  <div className="border border-white p-4 bg-transparent">
                    <input
                      type="text"
                      name="address"
                      required
                      placeholder="House / Street / Area"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full bg-transparent font-lexend text-sm text-white placeholder-white/50 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block font-inter text-sm font-medium text-white">City</label>
                  <div className="border border-white p-4 bg-transparent">
                    <input
                      type="text"
                      name="city"
                      required
                      placeholder="Select city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full bg-transparent font-lexend text-sm text-white placeholder-white/50 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>


            {/* PAYMENT METHOD */}
            <div className="space-y-6 pt-4">
              <h2 className="font-inter text-xl font-medium uppercase tracking-wider text-white">
                PAYMENT
              </h2>

              <div className="space-y-4">
                <h4 className="font-inter text-sm font-medium text-white">PAYMENT METHOD</h4>
                
                <div className="space-y-3 font-inter text-sm text-white">
                  {['Cash on Delivery', 'Card', 'Bank Transfer'].map((method) => (
                    <label
                      key={method}
                      onClick={() => setFormData({ ...formData, paymentMethod: method })}
                      className="flex items-center gap-4 cursor-pointer py-1"
                    >
                      <div className={`w-6 h-6 rounded-full border border-white flex items-center justify-center transition-colors ${
                        formData.paymentMethod === method ? 'bg-white' : 'bg-transparent'
                      }`}>
                        {formData.paymentMethod === method && (
                          <div className="w-2.5 h-2.5 rounded-full bg-black" />
                        )}
                      </div>
                      <span className="font-medium text-white">{method}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>


            {/* PLACE ORDER BUTTON */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={submitting}
                className="w-full border border-white py-5 px-8 flex items-center justify-center gap-4 font-lexend text-sm sm:text-base font-normal uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all disabled:opacity-50"
              >
                {submitting ? "PROCESSING..." : "PLACE ORDER"} <span className="w-6 h-[2px] bg-current" />
              </button>
            </div>

          </div>


          {/* RIGHT ORDER SUMMARY SIDEBAR (5 Cols / 550px) */}
          <div className="lg:col-span-5 bg-[#070606] p-6 sm:p-10 space-y-8">
            
            <h2 className="font-inter text-2xl font-semibold capitalize text-white">
              Order summary
            </h2>

            {/* Itemized List */}
            <div className="space-y-6 divide-y divide-white/20">
              {cart.map(({ product, selectedColor, selectedSize }) => (
                <div key={product.id} className="pt-6 first:pt-0 flex items-center gap-6">
                  
                  {/* Thumbnail Image */}
                  <div className="aspect-[153/137] w-32 bg-zinc-950 border border-white/10 overflow-hidden shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Details */}
                  <div className="space-y-3 font-inter text-sm">
                    <h4 className="font-medium uppercase text-white tracking-wider">
                      {product.name}
                    </h4>
                    <p className="font-medium text-white uppercase">
                      {formatPrice(product.price)}
                    </p>
                    <div className="space-y-1 text-xs text-zinc-300">
                      <div className="flex gap-2">
                        <span className="text-white/70">Color</span>
                        <span className="text-white font-medium">{selectedColor || 'Burgundy'}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-white/70">Size</span>
                        <span className="text-white font-medium">{selectedSize || 'M'}</span>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>


            {/* Order Totals Summary */}
            <div className="pt-6 border-t border-white/20 space-y-4 font-inter text-base text-white">
              <h3 className="font-inter text-xl font-medium capitalize text-white pb-2">
                YOUR ORDER
              </h3>

              <div className="flex justify-between items-center py-1">
                <span>Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span>Shipping</span>
                <span className="font-medium">{shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}</span>
              </div>

              <div className="flex justify-between items-center py-1 font-bold text-lg border-t border-white/10 pt-3">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>


            {/* Estimated Delivery */}
            <div className="pt-4 border-t border-white/20 flex justify-between items-center font-inter text-sm text-white">
              <span>Estimated delivery</span>
              <span className="font-medium">3–5 business days</span>
            </div>

          </div>

        </form>

      </div>

    </div>
  );
}
