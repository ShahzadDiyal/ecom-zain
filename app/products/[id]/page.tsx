'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PRODUCTS as STATIC_PRODUCTS } from '@/data/products';
import { getProductById, getProducts } from '@/lib/services/productService';
import { Product } from '@/types/ecommerce';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, ArrowRight, Heart } from 'lucide-react';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { addToCart, formatPrice, toggleWishlist, isInWishlist } = useCart();

  const staticFallback = STATIC_PRODUCTS.find((p) => p.id === id) || STATIC_PRODUCTS[0];
  const [product, setProduct] = useState<Product>(staticFallback);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>(STATIC_PRODUCTS.slice(0, 4));
  const [selectedImage, setSelectedImage] = useState(staticFallback.image);
  const [selectedSize, setSelectedSize] = useState<string>('L');
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    async function loadProductData() {
      try {
        const fetchedProduct = await getProductById(id);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
          setSelectedImage(fetchedProduct.image);
        }
        const allProds = await getProducts();
        if (allProds && allProds.length > 0) {
          setRelatedProducts(allProds.filter((p) => p.id !== id).slice(0, 4));
        }
      } catch (e) {
        console.error("Error fetching product detail:", e);
      }
    }
    loadProductData();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, 1, undefined, selectedSize);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  return (
    <div className="bg-black text-white min-h-screen font-inter selection:bg-white selection:text-black">
      
      {/* MAIN PRODUCT DISPLAY */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 py-20 md:mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: GALLERY IMAGES (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Main Image */}
            <div className="relative aspect-4/3 sm:aspect-square w-full bg-zinc-950 border border-white/20 overflow-hidden">
              <img
                src={selectedImage || product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`aspect-4/3 w-full bg-zinc-950 border overflow-hidden transition-all ${
                      selectedImage === img ? 'border-white opacity-100 scale-[0.98]' : 'border-white/20 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

          </div>


          {/* RIGHT: DETAILS & ACTIONS (5 Cols) */}
          <div className="lg:col-span-5 space-y-8 text-left">
            
            {/* Title */}
            <div>
              <h1 className="font-inter text-3xl sm:text-4xl font-semibold uppercase tracking-tight text-white underline underline-offset-8">
                {product.name}
              </h1>
            </div>

            {/* Tagline & Short intro */}
            <div className="space-y-4">
              <p className="font-inter text-sm sm:text-base font-medium uppercase tracking-wider text-white">
                {product.tagline || 'THE MOUNTAIN + MOON EMBROIDERY MAKES "ALPINE" A STRONG FIT.'}
              </p>
              <p className="font-inter text-sm text-zinc-300 capitalize leading-relaxed font-medium">
                {product.description || "A heavyweight everyday hoodie designed for cold-weather layering. Relaxed fit with a soft brushed interior and structured hood."}
              </p>
            </div>

            {/* Material */}
            <div className="space-y-2 border-t border-white/10 pt-4">
              <h4 className="font-inter text-sm font-semibold capitalize text-white">MATERIAL</h4>
              <p className="font-inter text-sm text-zinc-300 font-medium whitespace-pre-line">
                {product.material || "80% Cotton\n20% Polyester"}
              </p>
            </div>

            {/* Weight */}
            <div className="space-y-2">
              <h4 className="font-inter text-sm font-semibold capitalize text-white">WEIGHT</h4>
              <p className="font-inter text-sm text-zinc-300 font-medium">{product.weight || "450 GSM"}</p>
            </div>

            {/* Care */}
            <div className="space-y-2">
              <h4 className="font-inter text-sm font-semibold capitalize text-white">CARE</h4>
              <p className="font-inter text-sm text-zinc-300 font-medium leading-relaxed whitespace-pre-line">
                {product.care || "Machine wash cold.\nDo not bleach.\nTumble dry low."}
              </p>
            </div>

            {/* Sizes */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                {(product.availableSizes && product.availableSizes.length > 0 ? product.availableSizes : ['S', 'M', 'L', 'XL']).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-inter text-sm font-medium transition-all ${
                      selectedSize === size
                        ? 'bg-white text-black font-bold shadow-lg scale-105'
                        : 'border border-white text-white hover:border-white/80'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="pt-2">
              <p className="font-inter text-3xl font-semibold uppercase text-white tracking-tight">
                {formatPrice(product.price)}
              </p>
            </div>

            {/* Add to Cart & Wishlist Buttons */}
            <div className="pt-2 space-y-3">
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 sm:flex-none px-10 py-5 bg-white text-black font-lexend text-xs font-bold tracking-[0.15em] uppercase hover:bg-black hover:text-white hover:border hover:border-white transition-all flex items-center justify-center gap-4 shadow-2xl"
                >
                  Add To Cart <span className="w-6 h-[2px] bg-current" />
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-4 border transition-all ${
                    isInWishlist(product.id)
                      ? 'bg-red-600 border-red-600 text-white'
                      : 'border-white text-white hover:bg-white hover:text-black'
                  }`}
                  title={isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-white' : ''}`} />
                </button>
              </div>

              {addedToast && (
                <div className="p-4 bg-white/10 border border-white text-white font-lexend text-xs tracking-widest uppercase text-center">
                  ✓ ADDED TO CART (SIZE {selectedSize}) — <Link href="/cart" className="underline font-bold">VIEW BAG</Link>
                </div>
              )}
            </div>

          </div>

        </div>
      </section>


      {/* DESCRIPTION SECTION */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 border-t border-white/20">
        <div className="max-w-5xl space-y-6">
          <h2 className="font-inter text-2xl sm:text-3xl font-semibold capitalize text-white">
            DESCRIPTION
          </h2>
          <h3 className="font-inter text-xl sm:text-2xl font-medium capitalize text-white">
            BUILT FOR COLDER DAYS.
          </h3>
          <p className="font-inter text-sm sm:text-base text-zinc-300 leading-relaxed">
            {product.description || "The TARZ Alpine Hoodie is a heavyweight winter essential designed for everyday comfort and effortless layering."}
          </p>
        </div>
      </section>


      {/* YOU MAY ALSO LIKE */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 border-t border-white/20 space-y-10">
        <div className="flex justify-between items-center">
          <h2 className="font-inter text-2xl sm:text-3xl font-semibold uppercase text-white tracking-tight">
            YOU MAY ALSO LIKE
          </h2>
          <Link href="/products" className="font-inter text-xs tracking-wider uppercase text-white hover:underline flex items-center gap-2">
            View All <span className="w-5 h-[1.5px] bg-white" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((p) => (
            <div
              key={p.id}
              className="group border border-white/30 bg-black overflow-hidden flex flex-col hover:border-white transition-all relative"
            >
              <Link href={`/products/${p.id}`} className="relative aspect-3/4 overflow-hidden bg-zinc-900 block">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>

              <div className="p-4 bg-[#111111]/90 flex items-center justify-between">
                <Link href={`/products/${p.id}`} className="block">
                  <h4 className="font-inter text-xs font-semibold uppercase tracking-wider text-white group-hover:underline">
                    {p.name}
                  </h4>
                  <p className="font-inter text-xs text-zinc-400 mt-1 font-medium group-hover:underline">
                    {formatPrice(p.price)}
                  </p>
                </Link>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCart(p, 1, undefined, selectedSize);
                  }}
                  className="w-8 h-8 rounded-full border border-white/30 hover:border-white flex items-center justify-center text-white hover:scale-110 transition-transform relative z-10"
                  title="Quick Add"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* SHIPPING & RETURNS */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 border-t border-white/20 space-y-10">
        <h2 className="font-inter text-2xl sm:text-3xl font-semibold uppercase text-white tracking-tight">
          SHIPPING & RETURNS
        </h2>

        <div className="max-w-3xl space-y-8">
          <div className="space-y-3">
            <h3 className="font-inter text-xl font-medium capitalize text-white">
              SHIPPING
            </h3>
            <p className="font-inter text-sm text-zinc-300 leading-relaxed">
              We carefully pack every TARZ order before dispatch.<br />
              Estimated delivery: 3–5 business days<br />
              Delivery times may vary depending on your location.<br />
              You'll receive order and delivery updates once your order has been dispatched.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-inter text-xl font-medium capitalize text-white">
              SHIPPING CHARGES
            </h3>
            <p className="font-inter text-sm text-zinc-300 leading-relaxed">
              Free shipping on orders above PKR 5,000.<br />
              Orders below the free-shipping threshold may be subject to a delivery fee at checkout.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
