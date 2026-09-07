import { notFound } from "next/navigation";
import { ProductView } from "@/components/product/product-view";
import { oilGasProducts } from "@/lib/products";
import type { Metadata } from "next";

export function generateStaticParams() {
  return oilGasProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = oilGasProducts.find((p) => p.slug === slug);
  if (!product) return {};
  return { title: product.seoTitle, description: product.seoDescription };
}

export default async function OilGasProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = oilGasProducts.find((p) => p.slug === slug);
  if (!product) notFound();
  return (
    <ProductView
      product={product}
      crumbs={[
        { href: "/", label: "Inicio" },
        { href: "/oil-gas", label: "Oil & Gas" },
        { label: product.name },
      ]}
    />
  );
}
