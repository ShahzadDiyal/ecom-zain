export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  category: string;
  image: string;
  images: string[];
  description: string;
  features: string[];
  inStock: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface OrderDetails {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shippingFee: number;
  total: number;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    paymentMethod: string;
  };
  createdAt: string;
  status: 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered';
}
