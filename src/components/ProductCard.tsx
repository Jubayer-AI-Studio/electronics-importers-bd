'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, MessageCircle, Eye, Sparkles, Check } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { generateSingleProductWhatsAppUrl } from '@/utils/whatsappOrder';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = generateSingleProductWhatsAppUrl(product, 1);
    window.open(url, '_blank');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-brand-200/90 shadow-sm hover:shadow-card-hover transition-all duration-300 overflow-hidden hover:-translate-y-1">
      {/* Image Area with Link */}
      <Link href={`/product/${product.slug}`} className="relative w-full aspect-square bg-surface-muted/40 overflow-hidden">
        {/* Floating Badges */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
          {product.badge && (
            <span className="px-2.5 py-0.5 rounded-full bg-brand-600 text-white font-bold text-[11px] shadow-sm">
              {product.badge}
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white font-bold text-[10px] shadow-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> বেস্ট সেলার
            </span>
          )}
        </div>

        {/* Product Image */}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Quick View Hover Pill */}
        <div className="absolute inset-0 bg-brand-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-white/95 text-brand-900 px-3 py-1.5 rounded-full text-xs font-semibold shadow-md flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" /> বিস্তারিত দেখুন
          </span>
        </div>
      </Link>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3 text-left">
        <div>
          {/* Category Tag */}
          <span className="text-[11px] uppercase tracking-wider text-brand-700 font-bold block mb-1">
            {product.categoryLabel}
          </span>

          {/* Product Title */}
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-bold text-sm sm:text-base text-brand-900 line-clamp-2 hover:text-brand-600 transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Tagline / Subtitle */}
          <p className="text-xs text-text-muted line-clamp-1 mt-1">
            {product.tagline}
          </p>
        </div>

        {/* Pricing Architecture (Retail + Wholesale Highlight) */}
        <div className="space-y-2 pt-1 border-t border-brand-100">
          {/* Retail Price Display */}
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs text-text-muted">খুচরা:</span>
              <span className="text-base sm:text-lg font-extrabold text-brand-900">
                ৳{product.retailPrice}
              </span>
              {product.originalPrice > product.retailPrice && (
                <span className="text-xs text-text-muted line-through">
                  ৳{product.originalPrice}
                </span>
              )}
            </div>

            <span className="text-[10px] text-whatsapp-dark bg-whatsapp/10 px-2 py-0.5 rounded-full font-bold">
              স্টকে আছে
            </span>
          </div>

          {/* Wholesale Box (The Differentiator for BD Wholesalers) */}
          <div className="p-2 rounded-xl bg-brand-50 border border-brand-200/80 flex items-center justify-between text-xs">
            <span className="text-brand-800 font-medium">
              পাইকারি ({product.minWholesaleQty}+ পিস):
            </span>
            <span className="font-extrabold text-brand-700 text-sm">
              ৳{product.wholesalePrice}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>অর্ডার করুন</span>
          </button>

          <button
            onClick={handleWhatsAppClick}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-whatsapp hover:bg-whatsapp-hover active:scale-95 text-white font-bold text-xs shadow-xs transition-all"
            aria-label="Order on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white/20" />
            <span>হোয়াটসঅ্যাপ</span>
          </button>
        </div>
      </div>
    </div>
  );
}
