import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { products } from '@/data/products';
import { siteConfig } from '@/config/siteConfig';
import ProductDetailClient from './ProductDetailClient';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return {};

  return {
    title: `${product.name} - ${siteConfig.name}`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | পাইকারি ও খুচরা রেট`,
      description: product.tagline,
      images: [
        {
          url: product.images[0],
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
  };
}

export default function ProductPage({ params }: Props) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  // Related products from same category or random
  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <ProductDetailClient product={product} relatedProducts={relatedProducts} />
  );
}
