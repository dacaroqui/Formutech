import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { SolutionsExplorer, solutionsFromSearchParams } from "@/components/product/solutions-explorer";
import { AdvisorBand } from "@/components/site/advisor-band";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oil & Gas · especialidades químicas",
  description:
    "Formulación y especialidades para fluidos de perforación. Fichas de Formu-Clay, Formu-PolyClay, Formu-NanoClay, Formu-ROP, Formu-LUB, Formu-ASF, Formu-Foam, Formu-BIO y Formu-OXY.",
};

export default async function OilGasPage({
  searchParams,
}: {
  searchParams: Promise<{ familia?: string | string[]; q?: string | string[] }>;
}) {
  const filters = solutionsFromSearchParams("oil-gas", await searchParams);
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <Breadcrumbs
          items={[
            { href: "/", label: "Inicio" },
            { label: "Soluciones" },
            { label: "Oil & Gas" },
          ]}
        />
        <div className="mt-8">
          <SolutionsExplorer {...filters} />
        </div>
      </div>
      <AdvisorBand title="¿La química del fluido todavía no está cerrada?" />
    </>
  );
}
