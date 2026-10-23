'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShoppingBag,
  MessageCircle,
  Truck,
  ShieldCheck,
  RefreshCw,
  Plus,
  Minus,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  ArrowLeft,
  Share2
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { CartProvider, useCart } from '@/context/CartContext';
import { Product } from '@/types/product';
import { siteConfig } from '@/config/siteConfig';
import { generateSingleProductWhatsAppUrl } from '@/utils/whatsappOrder';

interface Props {
  product: Product;
  relatedProducts: Product[];
}

function ProductDetailContent({ product, relatedProducts }: Props) {
  const { addToCart } = useCart();

  const [activeImage, setActiveImage] = useState<string>(product.images[0]);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors && product.colors.length > 0 ? product.colors[0].name : undefined
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);

  const isWholesaleActive = quantity >= product.minWholesaleQty;
  const currentUnitPrice = isWholesaleActive ? product.wholesalePrice : product.retailPrice;
  const totalPrice = currentUnitPrice * quantity;

  // Color selection handler
  const handleColorSelect = (colorName: string, colorImg?: string) => {
    setSelectedColor(colorName);
    if (colorImg) {
      setActiveImage(colorImg);
    }
  };

  // Add to cart / Buy Now handler
  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, isWholesaleActive);
  };

  // WhatsApp instant order
  const handleWhatsAppOrder = () => {
    const url = generateSingleProductWhatsAppUrl(product, quantity, selectedColor, isWholesaleActive);
    window.open(url, '_blank');
  };

  // Quick set wholesale quantity
  const handleSetWholesaleQty = () => {
    setQuantity(product.minWholesaleQty);
  };

  // Share link handler
  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-light">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-text-muted flex-wrap">
          <Link href="/" className="hover:text-brand-900 flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> হোম
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-brand-300" />
          <span className="text-brand-700 font-semibold">{product.categoryLabel}</span>
          <ChevronRight className="w-3.5 h-3.5 text-brand-300" />
          <span className="text-brand-900 font-bold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Main Product Showcase Section (electrohubbd24 reference style) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white rounded-3xl p-5 sm:p-8 border border-brand-200/90 shadow-sm text-left">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            {/* Big Main Image Container */}
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-surface-muted/30 border border-brand-100 shadow-inner">
              {product.badge && (
                <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-brand-600 text-white font-bold text-xs shadow-md">
                  {product.badge}
                </div>
              )}
              <Image
                src={activeImage}
                alt={product.name}
                fill
                priority
                className="object-cover transition-all duration-300"
              />
            </div>

            {/* Thumbnail Navigation */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      activeImage === img
                        ? 'border-brand-600 shadow-md scale-105'
                        : 'border-brand-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Quick Share Pill */}
            <div className="flex items-center justify-between text-xs text-text-muted pt-2 border-t border-brand-100">
              <span className="flex items-center gap-1.5 text-whatsapp-dark font-bold">
                <Truck className="w-4 h-4 text-whatsapp" /> সারাদেশে দ্রুত ক্যাশ অন ডেলিভারি
              </span>
              <button
                onClick={handleShare}
                className="flex items-center gap-1 hover:text-brand-900 text-brand-700 font-medium"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'লিংক কপি হয়েছে!' : 'শেয়ার করুন'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Pricing & Purchase Controls */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category & Best Seller Badges */}
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-brand-100 text-brand-800 text-xs font-bold uppercase tracking-wider">
                  {product.categoryLabel}
                </span>
                {product.isBestSeller && (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> বেস্ট সেলার
                  </span>
                )}
              </div>

              {/* Title & Tagline */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-900 leading-tight">
                  {product.name}
                </h1>
                <p className="text-sm text-text-muted mt-1 leading-relaxed">
                  {product.tagline}
                </p>
              </div>

              {/* Pricing Architecture (Dual Retail + Wholesale Block) */}
              <div className="p-4 rounded-2xl bg-surface-light border border-brand-200 space-y-3">
                {/* Retail Price with Discount Badge */}
                <div className="flex items-baseline gap-3">
                  <span className="text-xs text-text-muted">খুচরা অফার মূল্য:</span>
                  <span className="text-2xl sm:text-3xl font-black text-brand-900">
                    ৳{product.retailPrice}
                  </span>
                  {product.originalPrice > product.retailPrice && (
                    <span className="text-sm text-text-muted line-through">
                      ৳{product.originalPrice}
                    </span>
                  )}
                  {product.originalPrice > product.retailPrice && (
                    <span className="px-2 py-0.5 rounded-md bg-red-100 text-red-700 text-xs font-extrabold">
                      {Math.round(((product.originalPrice - product.retailPrice) / product.originalPrice) * 100)}% ছাড়
                    </span>
                  )}
                </div>

                {/* Wholesale Special Highlight Card */}
                <div className="p-3 rounded-xl bg-brand-100/70 border border-brand-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-brand-900 block">
                      🔥 পাইকারি ডিলার রেট ({product.minWholesaleQty}+ পিস):
                    </span>
                    <span className="text-[11px] text-brand-700">
                      দোকানদার ও রিসেলারদের জন্য বিশেষ চায়না রেট
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-brand-700">
                      ৳{product.wholesalePrice}
                    </span>
                    <button
                      onClick={handleSetWholesaleQty}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-bold"
                    >
                      {product.minWholesaleQty} পিস বাছুন
                    </button>
                  </div>
                </div>
              </div>

              {/* Color Variant Selector (if available) */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2 pt-1">
                  <label className="text-xs font-bold text-brand-900 flex items-center justify-between">
                    <span>পছন্দের কালার নির্বাচন করুন:</span>
                    <span className="text-brand-700">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => handleColorSelect(color.name, color.image)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                          selectedColor === color.name
                            ? 'border-brand-600 bg-brand-50 text-brand-900 ring-2 ring-brand-500/20 shadow-xs'
                            : 'border-brand-200 bg-white text-text-muted hover:border-brand-300'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-xs"
                          style={{ backgroundColor: color.code }}
                        />
                        <span>{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Price Calculation */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-brand-900 block">
                  অর্ডারের পরিমাণ (Quantity):
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-brand-300 rounded-xl bg-white overflow-hidden shadow-xs">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2.5 hover:bg-brand-50 text-brand-900 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 text-sm font-extrabold text-brand-900 min-w-[40px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2.5 hover:bg-brand-50 text-brand-900 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-xs">
                    <span className="text-text-muted block">মোট মূল্য:</span>
                    <span className="text-lg font-black text-brand-900">
                      ৳{totalPrice}{' '}
                      {isWholesaleActive && (
                        <span className="text-xs text-green-700 font-bold bg-green-100 px-1.5 py-0.5 rounded">
                          (পাইকারি হিসাব)
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons: Buy Now & Direct WhatsApp */}
            <div className="space-y-3 pt-4 border-t border-brand-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleBuyNow}
                  className="w-full py-3.5 px-4 rounded-2xl bg-brand-600 hover:bg-brand-700 active:scale-98 text-white font-extrabold text-sm shadow-md shadow-brand-600/20 flex items-center justify-center gap-2 transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>এখনই অর্ডার করুন (Buy Now)</span>
                </button>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-3.5 px-4 rounded-2xl bg-whatsapp hover:bg-whatsapp-hover active:scale-98 text-white font-extrabold text-sm shadow-md shadow-whatsapp/20 flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white/20" />
                  <span>হোয়াটসঅ্যাপে সরাসরি অর্ডার</span>
                </button>
              </div>

              {/* 3 Trust Signals */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-center text-brand-800">
                <div className="p-2 rounded-xl bg-surface-light border border-brand-100 flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-brand-600" />
                  <span>ক্যাশ অন ডেলিভারি</span>
                </div>
                <div className="p-2 rounded-xl bg-surface-light border border-brand-100 flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-brand-600" />
                  <span>১০০% অরিজিনাল</span>
                </div>
                <div className="p-2 rounded-xl bg-surface-light border border-brand-100 flex flex-col items-center gap-1">
                  <RefreshCw className="w-4 h-4 text-brand-600" />
                  <span>{product.warranty || '৭ দিনের রিপ্লেসমেন্ট'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs / Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
          {/* Left Column: Full Description & Key Features */}
          <div className="lg:col-span-7 space-y-6">
            {/* Features Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-200/90 shadow-sm space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-brand-900 border-b border-brand-100 pb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-600" />
                মূল বৈশিষ্ট্যসমূহ (Key Features)
              </h2>
              <ul className="space-y-3">
                {product.keyFeatures.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-brand-900">
                    <CheckCircle2 className="w-4 h-4 text-whatsapp shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Full Story / Description */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-200/90 shadow-sm space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-brand-900 border-b border-brand-100 pb-3">
                পণ্যের বিস্তারিত বিবরণ
              </h2>
              <div className="space-y-3 text-xs sm:text-sm text-text-muted leading-relaxed">
                {product.fullDescription.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Technical Specs Table */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-200/90 shadow-sm space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-brand-900 border-b border-brand-100 pb-3">
                টেকনিক্যাল স্পেসিফিকেশন
              </h2>
              <div className="divide-y divide-brand-100 text-xs sm:text-sm">
                {product.specs.map((spec, i) => (
                  <div key={i} className="py-2.5 flex justify-between gap-4">
                    <span className="text-text-muted font-medium">{spec.label}:</span>
                    <span className="text-brand-900 font-bold text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Helpline Callout */}
            <div className="rounded-3xl bg-brand-50 border border-brand-200 p-5 space-y-2 text-xs text-brand-900">
              <h3 className="font-bold text-sm">কোনো প্রশ্ন বা জিজ্ঞাসা আছে?</h3>
              <p className="text-text-muted">
                প্রোডাক্টের রিয়েল ছবি, ভিডিও কিংবা পাইকারি কার্টন রেট জানতে আমাদের কাস্টমার হেল্পলাইনে সরাসরি ফোন বা হোয়াটসঅ্যাপ করতে পারেন।
              </p>
              <div className="pt-2">
                <a
                  href={siteConfig.whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-whatsapp-dark hover:underline"
                >
                  <MessageCircle className="w-4 h-4 text-whatsapp" />
                  হোয়াটসঅ্যাপ হেল্পলাইন: {siteConfig.whatsappDisplay}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Grid (electrohubbd24 reference pattern) */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-brand-200 text-left">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-brand-900">
                সম্পর্কিত অন্যান্য ট্রেন্ডিং পণ্য
              </h2>
              <p className="text-xs text-text-muted mt-1">
                একই সাথে আপনার অর্ডারে যুক্ত করতে পারেন
              </p>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function ProductDetailClient(props: Props) {
  return (
    <CartProvider>
      <ProductDetailContent {...props} />
    </CartProvider>
  );
}
