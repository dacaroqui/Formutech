import { OperationWizard } from "@/components/configurator/wizard";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { cta } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: cta.wizard,
  description:
    "Describa sector, proceso, equipo y condiciones. FormuTech hace una lectura preliminar de la operación; un asesor técnico la valida.",
};

export default function ConfiguradorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Breadcrumbs
        items={[
          { href: "/", label: "Inicio" },
          { label: cta.wizard },
        ]}
      />
      <div className="mt-8">
        <OperationWizard />
      </div>
    </div>
  );
}
