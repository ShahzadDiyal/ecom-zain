'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, OrderDetails } from '@/types/ecommerce';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  tax: number;
  shippingFee: number;
  total: number;
  lastOrder: OrderDetails | null;
  placeOrder: (customer: OrderDetails['customer']) => OrderDetails;
  formatPrice: (amount: number) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [lastOrder, setLastOrder] = useState<OrderDetails | null>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('tarz_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (err) {
        console.error('Failed to parse cart:', err);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tarz_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity = 1, color?: string, size?: string) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prevCart, { product, quantity, selectedColor: color, selectedSize: size }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const formatPrice = (amount: number) => {
    return `PKR ${amount.toLocaleString('en-PK')}`;
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.05; // 5% sales tax
  const shippingFee = subtotal > 10000 || cart.length === 0 ? 0 : 350; // Free shipping over PKR 10,000
  const total = subtotal + tax + shippingFee;

  const placeOrder = (customer: OrderDetails['customer']): OrderDetails => {
    const newOrder: OrderDetails = {
      orderId: `TARZ-${Math.floor(100000 + Math.random() * 900000)}`,
      items: [...cart],
      subtotal,
      tax,
      shippingFee,
      total,
      customer,
      createdAt: new Date().toLocaleString(),
      status: 'Confirmed',
    };
    setLastOrder(newOrder);
    clearCart();
    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        tax,
        shippingFee,
        total,
        lastOrder,
        placeOrder,
        formatPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
