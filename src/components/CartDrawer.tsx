'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, MessageCircle, Truck, ShieldAlert } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { siteConfig } from '@/config/siteConfig';
import { OrderCustomerInfo } from '@/types/product';
import { generateCartWhatsAppUrl } from '@/utils/whatsappOrder';

export default function CartDrawer() {
  const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();

  const [customer, setCustomer] = useState<OrderCustomerInfo>({
    name: '',
    phone: '',
    address: '',
    area: 'insideDhaka',
    notes: '',
  });

  const [error, setError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const deliveryCharge =
    customer.area === 'insideDhaka'
      ? siteConfig.deliveryCharge.insideDhaka
      : siteConfig.deliveryCharge.outsideDhaka;

  const total = subtotal + deliveryCharge;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.name.trim()) {
      setError('দয়া করে আপনার নাম লিখুন');
      return;
    }
    if (!customer.phone.trim() || customer.phone.length < 11) {
      setError('দয়া করে একটি সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন');
      return;
    }
    if (!customer.address.trim()) {
      setError('দয়া করে আপনার পূর্ণাঙ্গ ডেলিভারি ঠিকানা লিখুন');
      return;
    }

    setError(null);
    const url = generateCartWhatsAppUrl(customer, cartItems, subtotal, deliveryCharge);
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
          {/* Drawer Header */}
          <div className="px-5 py-4 bg-brand-900 text-white flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-brand-300" />
              <h2 className="text-base sm:text-lg font-bold">আপনার শপিং কার্ট</h2>
              <span className="text-xs bg-brand-700 text-brand-100 px-2 py-0.5 rounded-full font-bold">
                {cartItems.length} টি আইটেম
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-brand-800 text-brand-200 hover:text-white transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-brand-50 flex items-center justify-center text-brand-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-brand-900">আপনার কার্ট খালি</h3>
                <p className="text-xs text-text-muted max-w-xs mx-auto">
                  আপনার পছন্দের পাইকারি বা খুচরা ইলেকট্রনিক্স গ্যাজেট কার্টে যোগ করুন।
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-600 text-white font-bold text-xs"
                >
                  পণ্য ব্রাউজ করুন <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <>
                {/* Cart Items List */}
                <div className="space-y-3">
                  {cartItems.map((item, idx) => {
                    const isWholesaleActive =
                      item.isWholesale || item.quantity >= item.product.minWholesaleQty;
                    const unitPrice = isWholesaleActive
                      ? item.product.wholesalePrice
                      : item.product.retailPrice;

                    return (
                      <div
                        key={`${item.product.id}-${item.selectedColor || ''}-${idx}`}
                        className="flex gap-3 p-3 rounded-2xl bg-surface-light border border-brand-200/80 items-center relative"
                      >
                        {/* Thumbnail */}
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-white border border-brand-100">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0 pr-6">
                          <h4 className="text-xs sm:text-sm font-bold text-brand-900 truncate">
                            {item.product.name}
                          </h4>
                          {item.selectedColor && (
                            <span className="text-[11px] text-brand-700 block">
                              রং: {item.selectedColor}
                            </span>
                          )}

                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-extrabold text-brand-900">
                              ৳{unitPrice}
                            </span>
                            {isWholesaleActive ? (
                              <span className="text-[10px] bg-green-100 text-green-800 px-1.5 py-0.2 rounded font-bold">
                                পাইকারি রেট
                              </span>
                            ) : (
                              <span className="text-[10px] text-text-muted">
                                ({item.product.minWholesaleQty}+ পিসে পাইকারি ৳{item.product.wholesalePrice})
                              </span>
                            )}
                          </div>

                          {/* Quantity Stepper */}
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center border border-brand-300 rounded-lg bg-white overflow-hidden">
                              <button
                                onClick={() =>
                                  updateQuantity(item.product.id, item.quantity - 1, item.selectedColor)
                                }
                                className="p-1 hover:bg-brand-50 text-brand-800"
                                aria-label="Decrease"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="px-2.5 text-xs font-bold text-brand-900">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.product.id, item.quantity + 1, item.selectedColor)
                                }
                                className="p-1 hover:bg-brand-50 text-brand-800"
                                aria-label="Increase"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <span className="text-xs font-bold text-brand-800">
                              = ৳{unitPrice * item.quantity}
                            </span>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                          className="absolute top-2.5 right-2.5 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Quick Checkout Form (Fast 1-Click WhatsApp BD Pattern) */}
                <form onSubmit={handleSubmitOrder} className="pt-3 border-t border-brand-200 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-brand-900">
                    <Truck className="w-4 h-4 text-brand-600" />
                    <span>ক্যাশ অন ডেলিভারি তথ্য (Delivery Details)</span>
                  </div>

                  {error && (
                    <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Customer Name */}
                  <div>
                    <label className="text-[11px] font-semibold text-text-muted block mb-1">
                      আপনার পূর্ণ নাম *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: মোঃ সাব্বির আহমেদ"
                      value={customer.name}
                      onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  {/* Customer Phone */}
                  <div>
                    <label className="text-[11px] font-semibold text-text-muted block mb-1">
                      মোবাইল নম্বর * (১১ ডিজিট)
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="017XXXXXXXX"
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  {/* Customer Address */}
                  <div>
                    <label className="text-[11px] font-semibold text-text-muted block mb-1">
                      সম্পূর্ণ ঠিকানা (বাসা/রোড/থানা/জেলা) *
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="যেমন: বাড়ি ১২, রোড ৪, সেক্টর ৭, উত্তরা, ঢাকা"
                      value={customer.address}
                      onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  {/* Delivery Area Radio */}
                  <div>
                    <label className="text-[11px] font-semibold text-text-muted block mb-1">
                      ডেলিভারি এলাকা নির্বাচন করুন *
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <label
                        className={`flex items-center gap-2 p-2 rounded-xl border cursor-pointer ${
                          customer.area === 'insideDhaka'
                            ? 'bg-brand-50 border-brand-500 text-brand-900 font-bold'
                            : 'bg-white border-brand-200 text-text-muted'
                        }`}
                      >
                        <input
                          type="radio"
                          name="area"
                          checked={customer.area === 'insideDhaka'}
                          onChange={() => setCustomer({ ...customer, area: 'insideDhaka' })}
                          className="accent-brand-600"
                        />
                        <span>ঢাকার ভিতরে (৳৭০)</span>
                      </label>

                      <label
                        className={`flex items-center gap-2 p-2 rounded-xl border cursor-pointer ${
                          customer.area === 'outsideDhaka'
                            ? 'bg-brand-50 border-brand-500 text-brand-900 font-bold'
                            : 'bg-white border-brand-200 text-text-muted'
                        }`}
                      >
                        <input
                          type="radio"
                          name="area"
                          checked={customer.area === 'outsideDhaka'}
                          onChange={() => setCustomer({ ...customer, area: 'outsideDhaka' })}
                          className="accent-brand-600"
                        />
                        <span>ঢাকার বাইরে (৳১৩০)</span>
                      </label>
                    </div>
                  </div>

                  {/* Optional Notes */}
                  <div>
                    <label className="text-[11px] font-semibold text-text-muted block mb-1">
                      বিশেষ কোনো বার্তা (ঐচ্ছিক)
                    </label>
                    <input
                      type="text"
                      placeholder="যেমন: সন্ধ্যার পর ডেলিভারি দেবেন"
                      value={customer.notes}
                      onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                      className="w-full text-xs p-2 rounded-xl border border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  {/* Price Summary Breakdown */}
                  <div className="pt-3 border-t border-brand-200 space-y-1.5 text-xs">
                    <div className="flex justify-between text-text-muted">
                      <span>পণ্যের মোট মূল্য:</span>
                      <span className="font-bold text-brand-900">৳{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-text-muted">
                      <span>ডেলিভারি চার্জ:</span>
                      <span className="font-bold text-brand-900">৳{deliveryCharge}</span>
                    </div>
                    <div className="flex justify-between text-sm font-extrabold text-brand-900 pt-1 border-t border-dashed border-brand-200">
                      <span>সর্বমোট প্রদেয়:</span>
                      <span className="text-base text-brand-600">৳{total}</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-whatsapp hover:bg-whatsapp-hover active:scale-98 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageCircle className="w-5 h-5 fill-white/20" />
                    <span>অর্ডার কনফার্ম করুন (Send to WhatsApp)</span>
                  </button>

                  <p className="text-[10px] text-center text-text-muted">
                    🔒 পণ্য হাতে পেয়ে মূল্য পরিশোধ (ক্যাশ অন ডেলিভারি)
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
