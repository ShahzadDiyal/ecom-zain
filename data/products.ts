import { Product } from '@/types/ecommerce';

export const PRODUCTS: Product[] = [
  {
    id: 'tarz-alpine-burgundy',
    name: 'TARZ Alpine Hoodie (Burgundy)',
    slug: 'tarz-alpine-hoodie-burgundy',
    price: 6490,
    originalPrice: 7990,
    rating: 4.9,
    reviewsCount: 88,
    category: 'Hoodies',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=900&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=900&q=80'
    ],
    description: 'The mountain + moon embroidery makes "Alpine" a strong fit. Heavyweight cotton blend with custom sleeve embroidery and relaxed drop-shoulder fit.',
    features: [
      '450 GSM Heavyweight Fleece Cotton',
      'Intricate Sleeve & Back Embroidery',
      'Double-lined Oversized Hood',
      'Pre-shrunk Vintage Washed Finish'
    ],
    inStock: true,
    isFeatured: true,
    isNew: true
  },
  {
    id: 'tarz-blossom-pink',
    name: 'TARZ Blossom Hoodie (Dusty Pink)',
    slug: 'tarz-blossom-hoodie-pink',
    price: 6490,
    originalPrice: 7990,
    rating: 4.8,
    reviewsCount: 64,
    category: 'Hoodies',
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=900&q=80'
    ],
    description: 'Subtle front chest branding with detailed sleeve artwork on a dusty rose heavyweight canvas. Designed for cold winter days and everyday wear.',
    features: [
      '450 GSM Heavyweight Fleece',
      'Custom Blossom Floral Embroidery',
      'Ribbed Cuffs & Hem',
      'Relaxed Unisex Fit'
    ],
    inStock: true,
    isFeatured: true,
    isNew: true
  },
  {
    id: 'tarz-alpine-black',
    name: 'TARZ Alpine Hoodie (Obsidian Black)',
    slug: 'tarz-alpine-hoodie-black',
    price: 6490,
    rating: 4.9,
    reviewsCount: 112,
    category: 'Hoodies',
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=900&q=80'
    ],
    description: 'Minimalist obsidian black silhouette featuring metallic silver embroidery details on sleeves and hood.',
    features: [
      '450 GSM Premium Cotton Fleece',
      'Metallic Silver Thread Embroidery',
      'Kangaroo Pocket with Secret Stash Compartment'
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: 'tarz-blossom-cream',
    name: 'TARZ Blossom Hoodie (Off White)',
    slug: 'tarz-blossom-hoodie-cream',
    price: 6490,
    rating: 4.7,
    reviewsCount: 53,
    category: 'Hoodies',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=900&q=80'
    ],
    description: 'Clean off-white fleece base with contrasting burgundy embroidery accents.',
    features: [
      '450 GSM Heavyweight Fleece',
      'High-Density Stitching',
      'Unisex Oversized Boxy Cut'
    ],
    inStock: true
  }
];

export const CATEGORIES = ['All', 'Hoodies', 'Jackets', 'New Arrivals', 'Best Sellers'];
