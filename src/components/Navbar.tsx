'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, PhoneCall, Search, ShieldCheck, Truck, Sparkles, MessageCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { siteConfig } from '@/config/siteConfig';

interface NavbarProps {
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export default function Navbar({ searchQuery, onSearchChange }: NavbarProps) {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-brand-200/80 shadow-sm transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-brand-900 text-brand-100 text-xs sm:text-sm py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            <span className="font-medium text-brand-200">
              {siteConfig.slogan} — {siteConfig.tagline}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-xs text-brand-200">
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-brand-400" /> সারাদেশে ক্যাশ অন ডেলিভারি
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-400" /> ১০০% অরিজিনাল পণ্য
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-brand-500 shadow-md transition-transform group-hover:scale-105">
            <Image
              src="/images/logo.jpg"
              alt={siteConfig.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base sm:text-lg leading-tight text-brand-900 tracking-tight group-hover:text-brand-600 transition-colors">
              {siteConfig.name}
            </span>
            <span className="text-[10px] sm:text-xs text-brand-700 font-medium">
              সরাসরি চায়না থেকে ইমপোর্টকৃত
            </span>
          </div>
        </Link>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
          <input
            type="text"
            placeholder="পণ্য বা মডেল সার্চ করুন (যেমন: K12, Unigar, Headphone)..."
            value={searchQuery || ''}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            className="w-full bg-surface-muted/60 border border-brand-200/90 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all text-text-main placeholder-text-muted/70"
          />
          <Search className="w-4 h-4 text-brand-600 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="md:hidden p-2 rounded-full hover:bg-surface-muted text-text-main"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* WhatsApp Quick Helpline */}
          <a
            href={siteConfig.whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-whatsapp/10 hover:bg-whatsapp/20 text-whatsapp-dark border border-whatsapp/30 text-xs font-semibold transition-all"
          >
            <MessageCircle className="w-4 h-4 text-whatsapp fill-whatsapp/20" />
            <div className="flex flex-col text-left">
              <span className="text-[9px] uppercase tracking-wider text-whatsapp-dark/80">হোয়াটসঅ্যাপ হেল্পলাইন</span>
              <span className="font-mono text-xs font-bold leading-none">{siteConfig.whatsappDisplay}</span>
            </div>
          </a>

          {/* Cart Drawer Trigger Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-medium text-sm shadow-md transition-all group"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4 transition-transform group-hover:-rotate-12" />
            <span className="hidden xs:inline">কার্ট</span>
            <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-brand-200 text-brand-900 font-bold text-xs">
              {totalItems}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar Dropdown */}
      {mobileSearchOpen && (
        <div className="md:hidden px-4 pb-3 pt-1 border-t border-brand-100 bg-white">
          <div className="relative">
            <input
              type="text"
              placeholder="পণ্য বা মডেল সার্চ করুন..."
              value={searchQuery || ''}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              className="w-full bg-surface-muted border border-brand-200 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              autoFocus
            />
            <Search className="w-4 h-4 text-brand-600 absolute right-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      )}
    </header>
  );
}
