export const site = {
  name: "FormuTech",
  legalName: "FormuTech",
  tagline: "INGENIERÍA EN CADA GOTA",
  taglineSentence: "Ingeniería en cada gota",
  url: "https://formutech.com.co",
  locale: "es_CO",
  description:
    "Formulación y fabricación de lubricantes industriales y soluciones químicas especializadas. Entendemos la operación, formulamos o recomendamos la solución y acompañamos técnicamente.",
  principle: "No prometemos más. Demostramos mejor.",
  contact: {
    name: "Andres Moreno",
    role: "Gerente Técnico - Comercial",
    phoneDisplay: "+57 312 475 3648",
    phoneTel: "+573124753648",
    email: "gerencia@formutech.com.co",
    whatsapp: "https://wa.me/573124753648",
    whatsappMessage:
      "Hola FormuTech, quiero hablar de mi operación. Necesito acompañamiento técnico para seleccionar una solución.",
  },
} as const;

export const nav = [
  { href: "/", label: "Inicio" },
  {
    href: "/industrial",
    label: "Soluciones",
    children: [
      { href: "/industrial", label: "Sector Industrial" },
      { href: "/oil-gas", label: "Oil & Gas" },
    ],
  },
  { href: "/sobre-formutech", label: "Sobre FormuTech" },
] as const;

export const cta = {
  primary: "Hablemos",
  advisor: "Habla con un asesor técnico",
  sheet: "Solicitar ficha técnica",
  solution: "Consultar solución",
  explore: "Explorar soluciones",
  wizard: "Diagnóstico de operación",
} as const;

export function whatsappHref(text?: string) {
  return `${site.contact.whatsapp}?text=${encodeURIComponent(
    text ?? site.contact.whatsappMessage
  )}`;
}
