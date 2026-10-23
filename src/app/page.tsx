'use client';

import React, { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import CategoryPills from '@/components/CategoryPills';
import ProductCard from '@/components/ProductCard';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';
import { products } from '@/data/products';
import { siteConfig } from '@/config/siteConfig';
import { MessageCircle, Sparkles, Filter, PackageSearch } from 'lucide-react';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Category counts calculation
  const productCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: products.length,
      audio: 0,
      camera: 0,
      summer: 0,
      power: 0,
    };
    products.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category]++;
      }
    });
    return counts;
  }, []);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-surface-light">
        {/* Navigation Bar */}
        <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        {/* Hero Section */}
        <HeroBanner />

        {/* Main Products Section */}
        <main id="products-section" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-10 space-y-8">
          {/* Section Header & Category Filters */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-brand-200/80 pb-4 text-left">
            <div>
              <div className="inline-flex items-center gap-1.5 text-brand-700 text-xs font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                <span>সরাসরি চীন থেকে আমদানি</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-900">
                আমাদের গ্যাজেট ক্যাটালগ
              </h2>
              <p className="text-xs sm:text-sm text-text-muted mt-1">
                পাইকারি ও খুচরা রেটে সেরা পণ্য বেছে নিন এবং সরাসরি ক্যাশ অন ডেলিভারিতে অর্ডার করুন।
              </p>
            </div>

            {/* Total Results */}
            <div className="text-xs font-semibold text-brand-800 bg-brand-50 border border-brand-200 px-3 py-1.5 rounded-full shrink-0 self-start md:self-auto">
              মোট {filteredProducts.length} টি পণ্য পাওয়া গেছে
            </div>
          </div>

          {/* Interactive Category Filter Pills */}
          <CategoryPills
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            productCounts={productCounts}
          />

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-3 bg-white rounded-3xl border border-brand-200/80 p-8 shadow-xs">
              <PackageSearch className="w-12 h-12 mx-auto text-brand-400" />
              <h3 className="text-lg font-bold text-brand-900">কোনো পণ্য খুঁজে পাওয়া যায়নি!</h3>
              <p className="text-xs sm:text-sm text-text-muted max-w-md mx-auto">
                আপনার সার্চ কুয়েরির সাথে কোনো পণ্য মেলেনি। ফিল্টার রিসেট করে আবার চেষ্টা করুন।
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="mt-2 px-5 py-2 rounded-full bg-brand-600 text-white font-bold text-xs hover:bg-brand-700"
              >
                ফিল্টার রিসেট করুন
              </button>
            </div>
          )}

          {/* Special Wholesaler Callout Banner (Huge Value for BD Importers) */}
          <div className="rounded-3xl bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900 p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden text-left">
            <div className="absolute right-0 top-0 -mr-16 -mt-16 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-2 max-w-2xl relative z-10">
              <span className="text-xs bg-brand-700 text-brand-200 font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                দোকানদার ও রিসেলারদের জন্য
              </span>
              <h3 className="text-xl sm:text-2xl font-bold">
                আপনি কি পাইকারি বা বাল্ক লটে পণ্য নিতে চান?
              </h3>
              <p className="text-xs sm:text-sm text-brand-200 leading-relaxed">
                ৫০ বা ১০০ পিসের বড় কার্টনে স্পেশাল চায়না ইমপোর্ট ডিলার রেট পেতে আমাদের হোয়াটসঅ্যাপে যোগাযোগ করুন। সরাসরি কাস্টম কোটেশন ও কুরিয়ার পার্সেল পাঠিয়ে দেওয়া হবে।
              </p>
            </div>

            <a
              href={`${siteConfig.whatsappDirectUrl}?text=${encodeURIComponent('আসসালামু আলাইকুম! আমি ইলেকট্রনিক্স ইম্পোর্টার্স বিডি থেকে পাইকারি/বাল্ক লটে পণ্য নেওয়ার বিষয়ে আলোচনা করতে চাই।')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-whatsapp hover:bg-whatsapp-hover active:scale-95 text-white font-bold text-sm shadow-lg transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-white/20" />
              <span>পাইকারি ডিল করুন (WhatsApp)</span>
            </a>
          </div>
        </main>

        {/* Slide-out Cart Drawer */}
        <CartDrawer />

        {/* Footer */}
        <Footer />
      </div>
    </CartProvider>
  );
}
