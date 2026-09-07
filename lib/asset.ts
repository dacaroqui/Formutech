const CDN: Record<string, string> = {
  "/brand/logo.png": "https://litter.catbox.moe/vnn0a8.jpg",
  "/brand/logo-menu.png": "https://litter.catbox.moe/lyy06c.png",
  "/photos/sector-industrial.png": "https://litter.catbox.moe/h8xfo3.jpg",
  "/photos/sector-oilgas.png": "https://litter.catbox.moe/ziqrqt.jpg",
  "/photos/calidad-ensayos.png": "https://litter.catbox.moe/dfjzou.jpg",
  "/photos/equipo-planta.jpg": "https://litter.catbox.moe/1xfim1.jpg",
  "/photos/lab-ensayos.png": "https://litter.catbox.moe/nf1ptf.jpg",
  "/photos/hero-oil-metal.png": "https://litter.catbox.moe/xctgsg.jpg",
  "/products/lubricante-mineral-wbm.jpg": "https://litter.catbox.moe/3b1ym3.jpg",
  "/products/biocida.jpg": "https://litter.catbox.moe/26y45x.jpg",
  "/products/inhibidor-arcilla-amina.jpg": "https://litter.catbox.moe/5c4qb1.jpg",
  "/products/inhibidor-arcilla-poliamina.jpg": "https://litter.catbox.moe/wz0bsc.jpg",
  "/products/formu-cor.jpg": "https://litter.catbox.moe/jl8gls.jpg",
  "/products/secuestrante-oxigeno.jpg": "https://litter.catbox.moe/48xz69.jpg",
  "/products/mejorador-rop.jpg": "https://litter.catbox.moe/wcg9g1.jpg",
  "/products/aceite-dielectrico.jpg": "https://litter.catbox.moe/tdql1r.jpg",
  "/products/formulub-sol-ssynt.jpg": "https://litter.catbox.moe/s5fkfp.jpg",
  "/products/formulub-iso.jpg": "https://litter.catbox.moe/tbu01x.jpg",
  "/products/formulub-mw70.jpg": "https://litter.catbox.moe/wc4rvl.jpg",
  "/products/formulub-sol.jpg": "https://litter.catbox.moe/n0gdlp.jpg",
  "/products/formu-tex.jpg": "https://litter.catbox.moe/vmpvxk.jpg",
  "/products/asfaltita-obm.jpg": "https://litter.catbox.moe/y0ovyy.jpg",
  "/products/formulub-sol-synt.jpg": "https://litter.catbox.moe/dl76lb.jpg",
  "/products/lubricante-vegetal-wbm.jpg": "https://litter.catbox.moe/s2srm8.jpg",
  "/products/antiespumante.jpg": "https://litter.catbox.moe/nufyxg.jpg",
  "/products/nanoinhibidor-arcilla.jpg": "https://litter.catbox.moe/7696n2.jpg"
};

export function asset(src: string) {
  if (process.env.NEXT_PUBLIC_USE_REMOTE_ASSETS === "1") {
    return CDN[src] ?? src;
  }
  const base = process.env.NEXT_PUBLIC_ASSET_BASE ?? "";
  return base ? `${base}${src}` : src;
}
