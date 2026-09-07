import type { MetadataRoute } from "next";
import { allProducts, hydraulicGrades } from "@/lib/products";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/industrial",
    "/industrial/metalworking",
    "/industrial/aceite-hidraulico",
    "/oil-gas",
    "/sobre-formutech",
    "/configurador",
  ];
  const urls = [
    ...staticRoutes.map((path) => ({
      url: `${site.url}${path || "/"}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...hydraulicGrades.map((g) => ({
      url: `${site.url}${g.href}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...allProducts.map((p) => ({
      url: `${site.url}${p.href}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
  const seen = new Set<string>();
  return urls.filter((u) => {
    if (seen.has(u.url)) return false;
    seen.add(u.url);
    return true;
  });
}
