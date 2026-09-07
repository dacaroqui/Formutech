import { ProductView } from "@/components/product/product-view";
import { getProduct, hydraulicGrades } from "@/lib/products";
import type { Metadata } from "next";

const product = getProduct("aceite-hidraulico")!;
const defaultGrade = hydraulicGrades.find((g) => g.id === "46")!;

export const metadata: Metadata = {
  title: product.seoTitle,
  description: product.seoDescription,
};

export default function HydraulicPage() {
  return (
    <ProductView
      product={product}
      grade={defaultGrade}
      crumbs={[
        { href: "/", label: "Inicio" },
        { href: "/industrial", label: "Industrial" },
        { label: "Aceite hidráulico" },
      ]}
    />
  );
}
