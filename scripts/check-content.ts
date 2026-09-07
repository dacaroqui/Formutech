import assert from "node:assert/strict";
import {
  allProducts,
  hydraulicGrades,
  industrialFamilies,
  oilGasProducts,
} from "../lib/products.ts";
import {
  applyIndustrialFilters,
  applyOilGasFilters,
  industrialFamilyFilter,
  oilGasFamilyFilter,
} from "../lib/solutions-filter.ts";

const hrefs = new Set([
  ...allProducts.map((p) => p.href),
  ...hydraulicGrades.map((g) => g.href),
  ...industrialFamilies.map((f) => f.href),
]);

assert.equal(industrialFamilies.length, 8);
assert.equal(oilGasProducts.length, 10);
assert.ok(hrefs.has("/industrial/aceite-hidraulico"));
assert.ok(hrefs.has("/industrial/formulub-iso-46"));
assert.ok(hrefs.has("/industrial/formulub-sol-ssynt"));
assert.ok(hrefs.has("/oil-gas/inhibidor-arcilla-amina"));

for (const p of allProducts) {
  assert.ok(p.name.length > 2, p.slug);
  assert.ok(p.solves.length > 20, p.slug);
  assert.ok(p.seoTitle && p.seoDescription, p.slug);
  assert.ok(p.datasheet?.endsWith(".pdf"), p.slug);
  assert.ok(p.specs.length >= 4, p.slug);
  assert.ok(p.applications.length > 0, p.slug);
}

const iso = allProducts.find((p) => p.slug === "aceite-hidraulico")!;
assert.equal(iso.grades?.length, 4);
assert.ok(iso.datasheet?.endsWith(".pdf"));
assert.ok(!iso.solves.toLowerCase().includes("certificado"));

const industrialSheets: [string, string][] = [
  ["aceite-hidraulico", "/fichas/formulub-iso.pdf"],
  ["formulub-sol", "/fichas/formulub-sol.pdf"],
  ["formulub-sol-ssynt", "/fichas/formulub-sol-ssynt.pdf"],
  ["formulub-sol-synt", "/fichas/formulub-sol-synt.pdf"],
  ["formu-tex", "/fichas/formu-tex.pdf"],
  ["formu-cor", "/fichas/formu-cor.pdf"],
  ["aceite-dielectrico", "/fichas/formu-diel.pdf"],
  ["formulub-mw70", "/fichas/formulub-mw70.pdf"],
];
for (const [slug, sheet] of industrialSheets) {
  const p = allProducts.find((x) => x.slug === slug)!;
  assert.equal(p.datasheet, sheet, slug);
}

const oilGasSheets: [string, string][] = [
  ["inhibidor-arcilla-amina", "/fichas/formu-clay.pdf"],
  ["inhibidor-arcilla-poliamina", "/fichas/formu-polyclay.pdf"],
  ["nanoinhibidor-arcilla", "/fichas/formu-nanoclay.pdf"],
  ["mejorador-rop", "/fichas/formu-rop.pdf"],
  ["lubricante-mineral-wbm", "/fichas/formu-lub-m.pdf"],
  ["lubricante-vegetal-wbm", "/fichas/formu-lub-v.pdf"],
  ["asfaltita-obm", "/fichas/formu-asf.pdf"],
  ["antiespumante", "/fichas/formu-foam.pdf"],
  ["biocida", "/fichas/formu-bio.pdf"],
  ["secuestrante-oxigeno", "/fichas/formu-oxy.pdf"],
];
for (const [slug, sheet] of oilGasSheets) {
  const p = oilGasProducts.find((x) => x.slug === slug)!;
  assert.equal(p.datasheet, sheet, slug);
  assert.ok(p.specs.length >= 4, slug);
  assert.ok(p.applications.length > 0, slug);
}

assert.equal(industrialFamilyFilter("/industrial/aceite-hidraulico"), "hidraulico");
assert.equal(industrialFamilyFilter("/industrial/formulub-sol-ssynt"), "metalworking");
assert.equal(industrialFamilyFilter("/industrial/formulub-mw70"), "mantenimiento");
for (const f of industrialFamilies) industrialFamilyFilter(f.href);
assert.equal(oilGasFamilyFilter("inhibidor-arcilla-amina"), "inhibidores");
assert.equal(oilGasFamilyFilter("nanoinhibidor-arcilla"), "inhibidores");
assert.equal(oilGasFamilyFilter("secuestrante-oxigeno"), "tratamiento");
for (const p of oilGasProducts) oilGasFamilyFilter(p.slug);

const isoOnly = applyIndustrialFilters("hidraulico", "", industrialFamilies);
assert.equal(isoOnly.length, 1);
assert.equal(isoOnly[0]?.product, "FormuLub ISO");
const metal = applyIndustrialFilters("metalworking", "", industrialFamilies);
assert.equal(metal.length, 3);
assert.equal(applyIndustrialFilters("all", "arcilla", industrialFamilies).length, 0);
const inhib = applyOilGasFilters("inhibidores", "", oilGasProducts);
assert.equal(inhib.length, 3);
assert.ok(inhib.every((p) => p.slug.includes("inhibidor")));
assert.ok(applyOilGasFilters("all", "arcilla", oilGasProducts).length >= 3);

console.log("ok", allProducts.length, "products", hrefs.size, "hrefs");
