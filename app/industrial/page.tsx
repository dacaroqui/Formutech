import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { SolutionsExplorer, solutionsFromSearchParams } from "@/components/product/solutions-explorer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Soluciones industriales",
  description:
    "Soluciones industriales formuladas desde la operación: hidráulicos, metalworking, textil, anticorrosivo, dieléctrico y mantenimiento.",
};

export default async function IndustrialPage({
  searchParams,
}: {
  searchParams: Promise<{ familia?: string | string[]; ficha?: string | string[]; q?: string | string[] }>;
}) {
  const filters = solutionsFromSearchParams("industrial", await searchParams);
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Breadcrumbs
        items={[
          { href: "/", label: "Inicio" },
          { label: "Soluciones" },
        ]}
      />
      <div className="mt-8">
        <SolutionsExplorer {...filters} />
      </div>
    </div>
  );
}
