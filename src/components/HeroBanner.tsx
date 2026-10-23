'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowDownRight, CheckCircle2, ShieldCheck, Sparkles, MessageCircle, Truck } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/60 via-white to-surface-light py-8 sm:py-12 border-b border-brand-100">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-brand-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 bg-brand-400/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text / Value Proposition */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-4 sm:space-y-6 text-left">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100 border border-brand-300 text-brand-900 text-xs sm:text-sm font-semibold shadow-xs">
              <Sparkles className="w-4 h-4 text-brand-600 animate-pulse" />
              <span>{siteConfig.slogan} • সরাসরি চায়না থেকে ইমপোর্ট</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-900 tracking-tight leading-[1.18]">
              সেরা গ্যাজেট ও ইলেকট্রনিক্স—{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-brand-700">
                নিশ্চিত পাইকারি ও খুচরা রেটে!
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-text-muted max-w-2xl leading-relaxed">
              চীন থেকে সরাসরি আমদানিকৃত ট্রেন্ডিং ওয়্যারলেস নেকব্যান্ড, কারাওকে স্পিকার, ভ্লগ মাউন্ট এবং গ্যাজেটের নির্ভরযোগ্য সংগ্রহ। কোনো মধ্যস্বত্বভোগী ছাড়া সেরা দামে কিনুন।
            </p>

            {/* Feature Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full pt-1 text-sm text-brand-900 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                <span>১০+ পিসে নিশ্চিত পাইকারি রেট (Wholesale)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                <span>সারাদেশে ক্যাশ অন ডেলিভারি সুবিধা</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                <span>৭ দিনের নির্ভরযোগ্য রিপ্লেসমেন্ট গ্যারান্টি</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                <span>১ ক্লিকে সরাসরি হোয়াটসঅ্যাপে অর্ডার</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#products-section"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-bold text-sm sm:text-base shadow-lg shadow-brand-600/20 transition-all"
              >
                পণ্যসমূহ দেখুন
                <ArrowDownRight className="w-4 h-4" />
              </a>

              <a
                href={siteConfig.whatsappChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-whatsapp/10 hover:bg-whatsapp/20 text-whatsapp-dark border border-whatsapp/30 font-semibold text-sm sm:text-base transition-all"
              >
                <MessageCircle className="w-4 h-4 text-whatsapp" />
                হোয়াটসঅ্যাপ চ্যানেলে জয়েন করুন
              </a>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm rounded-3xl bg-gradient-to-tr from-brand-100/90 via-white to-brand-50 p-4 border border-brand-200/90 shadow-soft">
              {/* Floating Badge */}
              <div className="absolute -top-3 -right-3 bg-brand-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" />
                সারাদেশে ডেলিভারি
              </div>

              {/* Logo / Hero Emblem */}
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-brand-200 shadow-inner bg-surface-light">
                <Image
                  src="/images/logo.jpg"
                  alt={siteConfig.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Bottom Quick Info */}
              <div className="mt-4 p-3 rounded-2xl bg-white border border-brand-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-text-muted block">অফিসিয়াল পাইকারি হটলাইন</span>
                  <span className="font-bold text-brand-900 text-sm">{siteConfig.whatsappDisplay}</span>
                </div>
                <div className="text-right">
                  <span className="text-text-muted block">সরাসরি ইমপোর্ট</span>
                  <span className="font-bold text-whatsapp-dark text-sm">চীন (China)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
