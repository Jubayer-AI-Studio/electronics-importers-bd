import { CartItem, OrderCustomerInfo, Product } from "@/types/product";
import { siteConfig } from "@/config/siteConfig";

export function generateCartWhatsAppUrl(
  customer: OrderCustomerInfo,
  cartItems: CartItem[],
  subtotal: number,
  deliveryCharge: number
): string {
  const total = subtotal + deliveryCharge;
  const areaLabel =
    customer.area === "insideDhaka"
      ? `ঢাকার ভিতরে (৳${siteConfig.deliveryCharge.insideDhaka})`
      : `ঢাকার বাইরে (৳${siteConfig.deliveryCharge.outsideDhaka})`;

  const itemsText = cartItems
    .map((item, idx) => {
      const isWholesale = item.isWholesale || item.quantity >= item.product.minWholesaleQty;
      const unitPrice = isWholesale ? item.product.wholesalePrice : item.product.retailPrice;
      const itemTotal = unitPrice * item.quantity;
      const colorText = item.selectedColor ? ` [রং: ${item.selectedColor}]` : "";
      const typeText = isWholesale ? " (পাইকারি রেট)" : " (খুচরা)";

      return `${idx + 1}. *${item.product.name}*${colorText}\n   পরিমাণ: ${item.quantity} টি x ৳${unitPrice} = ৳${itemTotal}${typeText}`;
    })
    .join("\n\n");

  const message = `🛍️ *নতুন অর্ডার রিকোয়েস্ট — ${siteConfig.name}*
━━━━━━━━━━━━━━━━━━━━
👤 *ক্রেতার নাম:* ${customer.name}
📞 *ফোন নম্বর:* ${customer.phone}
🏠 *ডেলিভারি ঠিকানা:* ${customer.address}
🚚 *ডেলিভারি জোন:* ${areaLabel}
${customer.notes ? `📝 *বিশেষ নোট:* ${customer.notes}\n` : ""}━━━━━━━━━━━━━━━━━━━━
📦 *অর্ডারকৃত পণ্যসমূহ:*

${itemsText}

━━━━━━━━━━━━━━━━━━━━
💰 পণ্যের মোট মূল্য: ৳${subtotal}
🛵 ডেলিভারি চার্জ: ৳${deliveryCharge}
💵 *সর্বমোট প্রদেয়:* ৳${total}
━━━━━━━━━━━━━━━━━━━━
দয়া করে আমার অর্ডারটি কনফার্ম করে ক্যাশ-অন-ডেলিভারিতে পাঠিয়ে দিন। ধন্যবাদ!`;

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`;
}

export function generateSingleProductWhatsAppUrl(
  product: Product,
  quantity: number,
  selectedColor?: string,
  isWholesale?: boolean
): string {
  const wholesaleActive = isWholesale || quantity >= product.minWholesaleQty;
  const unitPrice = wholesaleActive ? product.wholesalePrice : product.retailPrice;
  const total = unitPrice * quantity;
  const colorText = selectedColor ? `\n🎨 *পছন্দের রং:* ${selectedColor}` : "";
  const typeText = wholesaleActive ? " (পাইকারি রেট)" : " (খুচরা রেট)";

  const message = `👋 *আসসালামু আলাইকুম!*
আমি *${siteConfig.name}* ওয়েবসাইট থেকে এই প্রোডাক্টটি অর্ডার করতে আগ্রহী:

📌 *পণ্য:* ${product.name}
🔢 *পরিমাণ:* ${quantity} টি${colorText}
💰 *মূল্য:* ৳${unitPrice} x ${quantity} = ৳${total}${typeText}

আমার ঠিকানা ও ডেলিভারি তথ্য দিয়ে অর্ডার কনফার্ম করতে চাই। বিস্তারিত জানাবেন প্লিজ!`;

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`;
}
