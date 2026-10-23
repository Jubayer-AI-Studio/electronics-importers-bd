export interface SiteConfig {
  name: string;
  tagline: string;
  slogan: string;
  description: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  whatsappDirectUrl: string;
  whatsappChannelUrl: string;
  deliveryCharge: {
    insideDhaka: number;
    outsideDhaka: number;
  };
  features: {
    wholesaleSupport: boolean;
    cashOnDelivery: boolean;
    directChinaImport: boolean;
  };
}

export const siteConfig: SiteConfig = {
  name: "ইলেকট্রনিক্স ইম্পোর্টার্স হোলসেল বিডি",
  tagline: "সরাসরি চায়না থেকে ইমপোর্ট, সেরা রেটে নিশ্চিত প্রফিট!",
  slogan: "বিশ্বস্ততাই আমাদের পুঁজি",
  description: "চীন থেকে আমদানিকৃত সেরা ও ট্রেন্ডিং গ্যাজেট, ব্লুটুথ নেকব্যান্ড, হেডফোন, কারাওকে স্পিকার এবং পাওয়ার ব্যাংকের নির্ভরযোগ্য পাইকারি ও খুচরা প্ল্যাটফর্ম।",
  whatsappNumber: "8801580376861",
  whatsappDisplay: "01580-376861",
  whatsappDirectUrl: "https://wa.me/8801580376861",
  whatsappChannelUrl: "https://whatsapp.com/channel/0029VbDSAmQJ93wVp6ykGK3k",
  deliveryCharge: {
    insideDhaka: 70,
    outsideDhaka: 130,
  },
  features: {
    wholesaleSupport: true,
    cashOnDelivery: true,
    directChinaImport: true,
  },
};
