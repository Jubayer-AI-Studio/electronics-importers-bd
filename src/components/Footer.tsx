'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Truck, RefreshCw, MessageCircle, Phone, MapPin, Heart } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-brand-100 pt-12 pb-8 border-t border-brand-800 mt-16">
      {/* 4 Trust Feature Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-10 border-b border-brand-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-2xl bg-brand-800/80 text-brand-300 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">সারাদেশে ক্যাশ অন ডেলিভারি</h4>
              <p className="text-xs text-brand-300 mt-1">পণ্য হাতে পেয়ে চেক করে টাকা দেওয়ার নিশ্চয়তা।</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-2xl bg-brand-800/80 text-brand-300 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">সরাসরি চায়না থেকে ইমপোর্ট</h4>
              <p className="text-xs text-brand-300 mt-1">কোনো মধ্যস্বত্বভোগী ছাড়া শতভাগ অরিজিনাল গ্যাজেট।</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-2xl bg-brand-800/80 text-brand-300 shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">৭ দিনের রিপ্লেসমেন্ট</h4>
              <p className="text-xs text-brand-300 mt-1">যেকোনো টেকনিক্যাল সমস্যায় দ্রুত সমাধানের সুযোগ।</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-2xl bg-brand-800/80 text-brand-300 shrink-0">
              <MessageCircle className="w-6 h-6 text-whatsapp" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">২৪/৭ হোয়াটসঅ্যাপ সাপোর্ট</h4>
              <p className="text-xs text-brand-300 mt-1">যেকোনো প্রশ্ন বা পাইকারি রেট জানতে সরাসরি মেসেজ দিন।</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-12 gap-8 text-left">
        {/* Brand Info */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-brand-400">
              <Image
                src="/images/logo.jpg"
                alt={siteConfig.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">{siteConfig.name}</h3>
              <p className="text-xs text-brand-300">{siteConfig.slogan}</p>
            </div>
          </div>
          <p className="text-xs text-brand-200/90 leading-relaxed max-w-sm">
            {siteConfig.description}
          </p>
          <div className="pt-2">
            <a
              href={siteConfig.whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-white text-xs font-bold transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              হোয়াটসঅ্যাপে যোগাযোগ: {siteConfig.whatsappDisplay}
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="font-bold text-white text-sm">জনপ্রিয় ক্যাটাগরি</h4>
          <ul className="space-y-2 text-xs text-brand-300">
            <li><Link href="/#products-section" className="hover:text-white transition-colors">ওয়্যারলেস নেকব্যান্ড</Link></li>
            <li><Link href="/#products-section" className="hover:text-white transition-colors">কারাওকে স্পিকার ও মাইক</Link></li>
            <li><Link href="/#products-section" className="hover:text-white transition-colors">ভ্লগিং নেক হোল্ডার মাউন্ট</Link></li>
            <li><Link href="/#products-section" className="hover:text-white transition-colors">RGB ক্যাট ইয়ার হেডফোন</Link></li>
            <li><Link href="/#products-section" className="hover:text-white transition-colors">পাওয়ার ব্যাংক ও মিনি ফ্যান</Link></li>
          </ul>
        </div>

        {/* Contact Details */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="font-bold text-white text-sm">পাইকারি ও কাস্টমার সেবা</h4>
          <div className="space-y-2 text-xs text-brand-200">
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-brand-400 shrink-0" />
              হটলাইন: <span className="font-mono font-bold text-white">{siteConfig.whatsappDisplay}</span>
            </p>
            <p className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-whatsapp shrink-0" />
              হোয়াটসঅ্যাপ চ্যানেল: <a href={siteConfig.whatsappChannelUrl} target="_blank" rel="noopener noreferrer" className="text-brand-300 hover:text-white underline">ইলেকট্রনিক্স ইম্পোর্টার্স হোলসেল বিডি</a>
            </p>
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
              ইমপোর্ট হাব: ঢাকা, বাংলাদেশ (সরাসরি চীন থেকে আমদানি)
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 border-t border-brand-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-400 gap-3">
        <p>© {new Date().getFullYear()} {siteConfig.name}। সর্বস্বত্ব সংরক্ষিত।</p>
        <p className="flex items-center gap-1 text-brand-300">
          Made with <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> for your business growth
        </p>
      </div>
    </footer>
  );
}
