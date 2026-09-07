import { notFound } from "next/navigation";
import { ProductView } from "@/components/product/product-view";
import { getProduct, hydraulicGrades, products } from "@/lib/products";
import type { Metadata } from "next";

const reserved = new Set(["metalworking", "aceite-hidraulico"]);

export function generateStaticParams() {
  const productSlugs = products
    .filter((p) => !reserved.has(p.slug))
    .map((p) => ({ slug: p.slug }));
  const iso = hydraulicGrades.map((g) => ({ slug: g.slug }));
  return [...productSlugs, ...iso];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const grade = hydraulicGrades.find((g) => g.slug === slug);
  if (grade) {
    return {
      title: `FormuLub ISO ${grade.label}`,
      description: `Aceite hidráulico FormuLub ${grade.label}. Datos de ficha técnica.`,
    };
  }
  const product = getProduct(slug);
  if (!product) return {};
  return { title: product.seoTitle, description: product.seoDescription };
}

export default async function IndustrialSlugPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ iso?: string }>;
}) {
  const { slug } = await params;
  const query = await searchParams;
  if (reserved.has(slug)) notFound();

  const grade = hydraulicGrades.find((g) => g.slug === slug);
  if (grade) {
    const product = getProduct("aceite-hidraulico")!;
    return (
      <ProductView
        product={product}
        grade={grade}
        crumbs={[
          { href: "/", label: "Inicio" },
          { href: "/industrial", label: "Industrial" },
          { href: "/industrial/aceite-hidraulico", label: "Aceite hidráulico" },
          { label: grade.label },
        ]}
      />
    );
  }

  const product = getProduct(slug);
  if (!product || product.sector !== "industrial") notFound();

  const crumbs = [
    { href: "/", label: "Inicio" },
    { href: "/industrial", label: "Industrial" },
    ...(product.familyHref !== product.href
      ? [{ href: product.familyHref, label: product.family }]
      : []),
    { label: product.name },
  ];

  const defaultGrade =
    product.grades?.find((g) => g.id === query.iso) ??
    product.grades?.find((g) => !g.pending) ??
    product.grades?.[0];

  return <ProductView product={product} grade={defaultGrade} crumbs={crumbs} />;
}
