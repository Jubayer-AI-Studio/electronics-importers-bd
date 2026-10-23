'use client';

import React from 'react';
import { Headphones, Camera, Fan, BatteryCharging, LayoutGrid } from 'lucide-react';

interface CategoryPillsProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  productCounts: Record<string, number>;
}

export default function CategoryPills({
  selectedCategory,
  onSelectCategory,
  productCounts,
}: CategoryPillsProps) {
  const categories = [
    { id: 'all', label: 'সব পণ্য', icon: LayoutGrid },
    { id: 'audio', label: 'নেকব্যান্ড ও হেডফোন', icon: Headphones },
    { id: 'camera', label: 'ভ্লগ মাউন্ট', icon: Camera },
    { id: 'summer', label: 'মিনি ফ্যান', icon: Fan },
    { id: 'power', label: 'পাওয়ার ব্যাংক', icon: BatteryCharging },
  ];

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2">
      <div className="flex items-center gap-2 sm:gap-3 min-w-max pb-1">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          const count = productCounts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                isSelected
                  ? 'bg-brand-600 text-white border-brand-600 shadow-md scale-102'
                  : 'bg-white text-brand-900 border-brand-200 hover:border-brand-400 hover:bg-brand-50'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isSelected ? 'text-brand-200' : 'text-brand-600'}`} />
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected ? 'bg-brand-700 text-brand-100' : 'bg-surface-muted text-text-muted'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
