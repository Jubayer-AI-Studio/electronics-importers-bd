export interface ProductColor {
  name: string;
  code: string;
  image?: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: 'audio' | 'camera' | 'smart-gadget' | 'summer' | 'power';
  categoryLabel: string;
  retailPrice: number;
  originalPrice: number;
  wholesalePrice: number;
  minWholesaleQty: number;
  badge?: string;
  isBestSeller?: boolean;
  inStock: boolean;
  images: string[];
  colors?: ProductColor[];
  shortDescription: string;
  fullDescription: string[];
  keyFeatures: string[];
  specs: ProductSpec[];
  warranty?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  isWholesale?: boolean;
}

export interface OrderCustomerInfo {
  name: string;
  phone: string;
  address: string;
  area: 'insideDhaka' | 'outsideDhaka';
  notes?: string;
}
