export const industrialFilterIds = [
  "all",
  "hidraulico",
  "metalworking",
  "textil",
  "anticorrosivo",
  "dielectrico",
  "mantenimiento",
] as const;

export type IndustrialFilter = (typeof industrialFilterIds)[number];

export const oilGasFilterIds = [
  "all",
  "inhibidores",
  "rop",
  "lubricantes",
  "obm",
  "tratamiento",
] as const;

export type OilGasFilter = (typeof oilGasFilterIds)[number];

export const sheetFilterIds = ["all", "pdf", "pending"] as const;
export type SheetFilter = (typeof sheetFilterIds)[number];

export const industrialFilterLabels: Record<IndustrialFilter, string> = {
  all: "Todas",
  hidraulico: "Hidráulico",
  metalworking: "Metalworking",
  textil: "Textil",
  anticorrosivo: "Anticorrosivo",
  dielectrico: "Dieléctrico",
  mantenimiento: "Mantenimiento",
};

export const oilGasFilterLabels: Record<OilGasFilter, string> = {
  all: "Todas",
  inhibidores: "Inhibidores",
  rop: "ROP",
  lubricantes: "Lubricantes WBM",
  obm: "OBM",
  tratamiento: "Tratamiento de fluido",
};

export const sheetFilterLabels: Record<SheetFilter, string> = {
  all: "Cualquier ficha",
  pdf: "Con ficha PDF",
  pending: "Ficha pendiente",
};

export function industrialFamilyFilter(href: string): Exclude<IndustrialFilter, "all"> {
  if (href.includes("aceite-hidraulico")) return "hidraulico";
  if (href.includes("formulub-sol")) return "metalworking";
  if (href.includes("formu-tex")) return "textil";
  if (href.includes("formu-cor")) return "anticorrosivo";
  if (href.includes("dielectrico")) return "dielectrico";
  if (href.includes("mw70")) return "mantenimiento";
  throw new Error(`familia industrial sin filtro: ${href}`);
}

export function oilGasFamilyFilter(slug: string): Exclude<OilGasFilter, "all"> {
  if (slug.includes("inhibidor")) return "inhibidores";
  if (slug.includes("rop")) return "rop";
  if (slug.includes("lubricante")) return "lubricantes";
  if (slug.includes("asfaltita")) return "obm";
  if (slug === "antiespumante" || slug === "biocida" || slug === "secuestrante-oxigeno") {
    return "tratamiento";
  }
  throw new Error(`especialidad Oil & Gas sin filtro: ${slug}`);
}

export function matchesSheet(
  item: { datasheet?: string; pendingTechnical?: boolean },
  sheet: SheetFilter
) {
  switch (sheet) {
    case "all":
      return true;
    case "pdf":
      return Boolean(item.datasheet);
    case "pending":
      return Boolean(item.pendingTechnical);
    default: {
      const _exhaustive: never = sheet;
      return _exhaustive;
    }
  }
}

export function matchesQuery(q: string, parts: string[]) {
  const n = q.trim().toLowerCase();
  if (!n) return true;
  return parts.some((p) => p.toLowerCase().includes(n));
}

function one(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}

export function parseIndustrialFilter(v: string | string[] | undefined): IndustrialFilter {
  const value = one(v);
  if (value && (industrialFilterIds as readonly string[]).includes(value)) {
    return value as IndustrialFilter;
  }
  return "all";
}

export function parseOilGasFilter(v: string | string[] | undefined): OilGasFilter {
  const value = one(v);
  if (value && (oilGasFilterIds as readonly string[]).includes(value)) {
    return value as OilGasFilter;
  }
  return "all";
}

export function parseSheetFilter(v: string | string[] | undefined): SheetFilter {
  const value = one(v);
  if (value && (sheetFilterIds as readonly string[]).includes(value)) {
    return value as SheetFilter;
  }
  return "all";
}

export function parseQuery(v: string | string[] | undefined) {
  return (one(v) ?? "").trim();
}

export function solutionsHref(
  tab: "industrial" | "oil-gas",
  family: string,
  sheet: SheetFilter,
  q: string
) {
  const path = tab === "industrial" ? "/industrial" : "/oil-gas";
  const params = new URLSearchParams();
  if (family !== "all") params.set("familia", family);
  if (sheet !== "all") params.set("ficha", sheet);
  const query = q.trim();
  if (query) params.set("q", query);
  const s = params.toString();
  return s ? `${path}?${s}` : path;
}

export function applyIndustrialFilters<
  T extends {
    product: string;
    name: string;
    href: string;
    phrase: string;
    facts: readonly string[];
  },
>(
  family: IndustrialFilter,
  sheet: SheetFilter,
  q: string,
  families: readonly T[],
  catalog: { href: string; datasheet?: string; pendingTechnical?: boolean }[]
): T[] {
  return families.filter((f) => {
    if (family !== "all" && industrialFamilyFilter(f.href) !== family) return false;
    const product = catalog.find((p) => p.href === f.href);
    if (!matchesSheet(product ?? {}, sheet)) return false;
    return matchesQuery(q, [f.product, f.name, f.phrase, ...f.facts]);
  });
}

export function applyOilGasFilters<
  T extends {
    slug: string;
    name: string;
    type: string;
    short: string;
    family: string;
    category: string;
    solves: string;
    applications: readonly string[];
    datasheet?: string;
    pendingTechnical?: boolean;
  },
>(family: OilGasFilter, sheet: SheetFilter, q: string, items: readonly T[]): T[] {
  return items.filter((p) => {
    if (family !== "all" && oilGasFamilyFilter(p.slug) !== family) return false;
    if (!matchesSheet(p, sheet)) return false;
    return matchesQuery(q, [
      p.name,
      p.type,
      p.short,
      p.family,
      p.category,
      p.solves,
      ...p.applications,
    ]);
  });
}
