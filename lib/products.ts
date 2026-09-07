export type SpecRow = {
  label: string;
  method?: string;
  value: string;
};

export type Grade = {
  id: string;
  label: string;
  slug: string;
  href: string;
  specs: SpecRow[];
  pending?: boolean;
};

export type Product = {
  slug: string;
  href: string;
  sector: "industrial" | "oil-gas";
  family: string;
  familyHref: string;
  category: string;
  name: string;
  type: string;
  short: string;
  image: string;
  solves: string;
  benefits: string[];
  applications: string[];
  specs: SpecRow[];
  presentations: string[];
  datasheet?: string;
  grades?: Grade[];
  pendingTechnical?: boolean;
  note?: string;
  colors?: string[];
  highlights?: { label: string; value: string; hint?: string }[];
  seoTitle: string;
  seoDescription: string;
};

const packStandard = [
  "Galón (3,78 litros)",
  "Garrafa (5 galones)",
  "Tambor (55 galones)",
];

const packDrumIbc = ["Tambor (55 galones)", "IBC (275 galones)"];

export const hydraulicGrades: Grade[] = [
  {
    id: "32",
    label: "ISO VG 32",
    slug: "formulub-iso-32",
    href: "/industrial/formulub-iso-32",
    specs: [
      { label: "Viscosidad @ 40 °C", value: "30 / 34 cSt" },
      { label: "Viscosidad @ 100 °C", value: "2 / 6 cSt" },
      { label: "Gravedad específica", value: "0,83 / 0,85" },
      { label: "Punto de inflamación", value: "205 – 220 °C" },
    ],
  },
  {
    id: "46",
    label: "ISO VG 46",
    slug: "formulub-iso-46",
    href: "/industrial/formulub-iso-46",
    specs: [
      { label: "Viscosidad @ 40 °C", value: "42 / 46 cSt" },
      { label: "Viscosidad @ 100 °C", value: "4 / 8 cSt" },
      { label: "Gravedad específica", value: "0,835 / 0,875" },
      { label: "Punto de inflamación", value: "210 – 230 °C" },
    ],
  },
  {
    id: "68",
    label: "ISO VG 68",
    slug: "formulub-iso-68",
    href: "/industrial/formulub-iso-68",
    specs: [
      { label: "Viscosidad @ 40 °C", value: "62 / 70 cSt" },
      { label: "Viscosidad @ 100 °C", value: "6 / 10 cSt" },
      { label: "Gravedad específica", value: "0,86 / 0,89" },
      { label: "Punto de inflamación", value: "215 – 235 °C" },
    ],
  },
  {
    id: "100",
    label: "ISO VG 100",
    slug: "formulub-iso-100",
    href: "/industrial/formulub-iso-100",
    specs: [
      { label: "Viscosidad @ 40 °C", value: "98 / 102 cSt" },
      { label: "Viscosidad @ 100 °C", value: "8 / 12 cSt" },
      { label: "Gravedad específica", value: "0,865 / 0,895" },
      { label: "Punto de inflamación", value: "220 – 240 °C" },
    ],
  },
];

export const products: Product[] = [
  {
    slug: "aceite-hidraulico",
    href: "/industrial/aceite-hidraulico",
    sector: "industrial",
    family: "Aceite hidráulico",
    familyHref: "/industrial/aceite-hidraulico",
    category: "Sector Industrial",
    name: "FormuLub ISO",
    type: "Aceite hidráulico",
    short: "La viscosidad correcta para la presión, la temperatura y el equipo.",
    image: "/products/formulub-iso.jpg",
    solves:
      "Sistemas hidráulicos que trabajan con presión, temperatura y velocidad altas necesitan un fluido estable, con control de desgaste, corrosión y espuma. FormuLub ISO se formula a partir de bases parafínicas altamente refinadas y un paquete de aditivos orientado a esos requisitos de operación.",
    benefits: [
      "Protección antidesgaste",
      "Protección anticorrosiva y resistencia al herrumbre",
      "Compatibilidad con sellos del sistema",
      "Control de espuma para una operación más estable",
      "Estabilidad a la temperatura",
    ],
    applications: [
      "Sistemas hidráulicos industriales",
      "Bombas hidráulicas",
      "Inyección y moldeo de plásticos",
      "Reductores de velocidad",
      "Tractores",
      "Equipos de construcción y minería",
      "Montacargas",
    ],
    specs: hydraulicGrades[1].specs,
    presentations: packStandard,
    datasheet: "/fichas/formulub-iso.pdf",
    grades: hydraulicGrades,
    note: "Todos nuestros aceites hidráulicos están formulados bajo los más altos estándares de calidad y cumplen bajo lo estipulado por las normas ASTM, API y cuentan con su respectiva certificación OEM.",
    seoTitle: "FormuLub ISO | Aceite hidráulico ISO VG 32 · 46 · 68 · 100",
    seoDescription:
      "Aceite hidráulico FormuLub ISO en viscosidades 32, 46, 68 y 100. Protección antidesgaste, anticorrosiva y control de espuma. Ficha técnica disponible.",
  },
  {
    slug: "formulub-sol",
    href: "/industrial/formulub-sol",
    sector: "industrial",
    family: "Metalworking",
    familyHref: "/industrial/metalworking",
    category: "Aceite soluble mineral",
    name: "FormuLub-Sol",
    type: "Aceite soluble mineral",
    short: "Emulsión estable para mecanizado, refrigeración y protección.",
    image: "/products/formulub-sol.jpg",
    solves:
      "En mecanizado, el fluido tiene que refrigerar, lubricar y no abrir la puerta a corrosión u olores. FormuLub-Sol es un aceite soluble mineral formulado con bases de alto grado de refinación y un paquete de aditivos de emulsificación, anticorrosión, fungicidas y bactericidas.",
    benefits: [
      "Formación de emulsión estable",
      "Poder anticorrosivo",
      "pH al 10 % en agua entre 9,5 y 10,0",
      "Ayuda a evitar malos olores",
      "Lubricación en operaciones de mecanizado",
      "Formulado con biocidas de desempeño para mayor resistencia bacteriana",
    ],
    applications: [
      "Mecanizado de metales",
      "Tallado de engranajes",
      "Torneado",
      "Fresado",
      "Rectificado",
      "Corte",
      "Ferrosos y no ferrosos",
      "Protección de metales contra la oxidación",
      "Protección de corrosión en sistemas de refrigeración",
    ],
    specs: [
      { label: "Aspecto visual", method: "ASTM D-1500", value: "1,0 – 2,0" },
      { label: "Viscosidad cinemática @ 40 °C", value: "60 – 77 cSt" },
      { label: "Gravedad específica", method: "ASTM D-1298", value: "0,89 – 0,905" },
      { label: "Punto de inflamación", method: "ASTM D-92", value: "140 – 160 °C" },
      { label: "Espontaneidad de la emulsión", value: "Buena estabilidad" },
      { label: "Tiempo de estabilidad de la emulsión", value: "24 horas mínimo" },
      { label: "Crema", value: "< 1 mm" },
      { label: "Proporción de empleo", value: "1 % a 15 % en agua, según refrigeración y lubricidad" },
      { label: "Concentración de referencia", value: "5 – 10 %" },
    ],
    presentations: packStandard,
    datasheet: "/fichas/formulub-sol.pdf",
    note: "Se emplea como emulsión con agua, añadiendo el aceite al agua con agitación. La concentración depende de la refrigeración y la lubricidad requeridas.",
    highlights: [{ label: "Concentración de referencia", value: "5–10 %" }],
    seoTitle: "FormuLub-Sol | Aceite soluble mineral para mecanizado",
    seoDescription:
      "Aceite soluble mineral FormuLub-Sol para mecanizado, torneado, fresado y rectificado. Emulsión estable, protección anticorrosiva y ficha técnica con parámetros de laboratorio.",
  },
  {
    slug: "formulub-sol-ssynt",
    href: "/industrial/formulub-sol-ssynt",
    sector: "industrial",
    family: "Metalworking",
    familyHref: "/industrial/metalworking",
    category: "Aceite soluble semisintético",
    name: "FormuLub-Sol SSYNT",
    type: "Aceite soluble semisintético",
    short: "Aceite soluble formulado a partir de mezcla de aceites minerales y aceites sintéticos que garantizan una excelente protección y mayor poder de refrigeración.",
    image: "/products/formulub-sol-ssynt.jpg",
    solves:
      "Cuando el proceso pide más limpieza, protección, mayor poder de lubricación y más alta capacidad de refrigeración, sin llegar todavía a un 100 % sintético, la línea semisintética cubre ese tramo. La referencia se selecciona con el equipo, el material y consumo real.",
    benefits: [
      "Equilibrio entre lubricidad y refrigeración",
      "Orientado a operaciones de mecanizado continuas",
      "Concentración de referencia 5 – 10 %",
    ],
    applications: [
      "CNC",
      "Mecanizado",
      "Tallado de engranajes",
      "Torneado",
      "Fresado",
      "Rectificado",
      "Corte",
      "Ferrosos y no ferrosos",
    ],
    specs: [
      { label: "Aspecto visual", method: "ASTM D-1500", value: "1,0 – 2,0" },
      { label: "Viscosidad cinemática @ 40 °C", value: "30 – 45 cSt" },
      { label: "Gravedad específica", method: "ASTM D-1298", value: "0,89 – 0,905" },
      { label: "Punto de inflamación", method: "ASTM D-92", value: "140 – 160 °C" },
      { label: "Espontaneidad de la emulsión", value: "Buena estabilidad" },
      { label: "Tiempo de estabilidad de la emulsión", value: "24 horas mínimo" },
      { label: "Crema", value: "< 1 mm" },
      { label: "Proporción de empleo", value: "5 % a 10 % en agua, según refrigeración y lubricidad" },
      { label: "Concentración de referencia", value: "5 – 10 %" },
    ],
    presentations: packStandard,
    datasheet: "/fichas/formulub-sol-ssynt.pdf",
    note: "Se emplea como emulsión con agua. La concentración depende de la refrigeración y la lubricidad requeridas.",
    highlights: [{ label: "Concentración de referencia", value: "5–10 %" }],
    seoTitle: "FormuLub-Sol SSYNT | Aceite soluble semisintético",
    seoDescription:
      "Aceite soluble semisintético FormuLub-Sol SSYNT. Mezcla de bases minerales y sintéticas, concentración de referencia 5–10 % y ficha con parámetros de laboratorio.",
  },
  {
    slug: "formulub-sol-synt",
    href: "/industrial/formulub-sol-synt",
    sector: "industrial",
    family: "Metalworking",
    familyHref: "/industrial/metalworking",
    category: "Aceite soluble 100 % sintético",
    name: "FormuLub-Sol SYNT",
    type: "Aceite soluble 100 % sintético",
    short: "Mayor refrigeración a menor concentración, con identificación visual disponible.",
    image: "/products/formulub-sol-synt.jpg",
    solves:
      "En cortes y rectificados que piden más refrigeración y baños más limpios, un soluble 100 % sintético reduce la concentración de uso. La coloración no es una propiedad de desempeño: es una identificación visual disponible según el requerimiento de planta.",
    benefits: [
      "Línea 100 % sintética para metalworking",
      "Concentración de referencia 2,5 – 5 %",
      "Coloración disponible para identificación en planta",
    ],
    applications: [
      "CNC",
      "Mecanizado",
      "Tallado de engranajes",
      "Torneado",
      "Fresado",
      "Rectificado",
      "Corte",
      "Ferrosos y no ferrosos",
    ],
    specs: [
      { label: "Aspecto visual", method: "ASTM D-1500", value: "1,0 – 2,0" },
      { label: "Color", value: "Naranja, Azul y verde" },
      { label: "Viscosidad cinemática @ 40 °C", value: "30 – 45 cSt" },
      { label: "Gravedad específica", method: "ASTM D-1298", value: "1,02 – 1,10" },
      { label: "Punto de inflamación", method: "ASTM D-92", value: "> 200 °C" },
      { label: "Espontaneidad de la emulsión", value: "Buena estabilidad" },
      { label: "Tiempo de estabilidad de la emulsión", value: "24 horas mínimo" },
      { label: "Proporción de empleo", value: "2,5 % a 5 % en agua, según refrigeración y lubricidad" },
      { label: "pH al 2 %", value: "9 – 10" },
      { label: "Concentración de referencia", value: "2,5 – 5 %" },
    ],
    presentations: packStandard,
    colors: ["Azul", "Verde", "Naranja"],
    datasheet: "/fichas/formulub-sol-synt.pdf",
    note: "La coloración (azul, verde u naranja) se ofrece como identificación visual disponible, no como propiedad técnica.",
    highlights: [{ label: "Concentración de referencia", value: "2,5–5 %" }],
    seoTitle: "FormuLub-Sol SYNT | Aceite soluble 100 % sintético",
    seoDescription:
      "Aceite soluble 100 % sintético FormuLub-Sol SYNT. Concentración de referencia 2,5–5 % y coloración azul, verde u naranja como identificación visual.",
  },
  {
    slug: "formu-tex",
    href: "/industrial/formu-tex",
    sector: "industrial",
    family: "Aceite textil",
    familyHref: "/industrial/formu-tex",
    category: "Sector Industrial",
    name: "Formu-Tex",
    type: "Aceite textil emulsionable y lavable",
    short: "Lubrica el anillo y se retira de la fibra.",
    image: "/products/formu-tex.jpg",
    solves:
      "En textil el aceite tiene que proteger contra fricción, desgaste y corrosión, y después salir en el lavado. Formu-Tex es incoloro, emulsionable y formulado para no manchar tejidos ni fibras.",
    benefits: [
      "Antidesgaste",
      "Anticorrosivo y antioxidante",
      "Emulsionable en agua",
      "Fácil lavado / removible de telas",
      "Totalmente incoloro: no mancha tejidos ni fibras",
      "Estabilidad a la oxidación",
    ],
    applications: [
      "Máquinas circulares",
      "Tejido de punto",
      "Producción de fibras",
      "Carretes",
      "Telares planos",
      "Anillos de la industria textil",
      "Partes de máquinas de coser",
      "Máquinas de tejidos dobles",
      "Cuchillas de la industria papelera",
    ],
    specs: [
      { label: "Aspecto visual", value: "Incoloro" },
      { label: "Viscosidad cinemática @ 40 °C", value: "30 – 36 cSt" },
      { label: "Gravedad específica", method: "ASTM D-1298", value: "0,85 – 0,88" },
      { label: "Punto de inflamación", method: "ASTM D-92", value: "200 – 210 °C" },
      { label: "Lavable", value: "Sí" },
      { label: "Emulsionable en agua", value: "Sí" },
      { label: "Proporción de empleo", value: "1 % a 15 % en agua, según refrigeración y lubricidad" },
    ],
    presentations: packStandard,
    datasheet: "/fichas/formu-tex.pdf",
    grades: [
      {
        id: "22",
        label: "ISO 22",
        slug: "formu-tex-22",
        href: "/industrial/formu-tex?iso=22",
        specs: [
          { label: "Aspecto visual", value: "Incoloro" },
          { label: "Viscosidad cinemática @ 40 °C", value: "20 – 25 cSt" },
          { label: "Gravedad específica", method: "ASTM D-1298", value: "0,85 – 0,88" },
          { label: "Punto de inflamación", method: "ASTM D-92", value: "200 – 210 °C" },
        ],
      },
      {
        id: "32",
        label: "ISO 32",
        slug: "formu-tex-32",
        href: "/industrial/formu-tex?iso=32",
        specs: [
          { label: "Aspecto visual", value: "Incoloro" },
          { label: "Viscosidad cinemática @ 40 °C", value: "30 – 36 cSt" },
          { label: "Gravedad específica", method: "ASTM D-1298", value: "0,85 – 0,88" },
          { label: "Punto de inflamación", method: "ASTM D-92", value: "200 – 210 °C" },
        ],
      },
    ],
    note: "ISO 32 documenta 30–36 cSt @ 40 °C. ISO 22 documenta 20–25 cSt @ 40 °C, mismo aspecto incoloro.",
    seoTitle: "Formu-Tex | Aceite textil emulsionable y lavable ISO 22 · 32",
    seoDescription:
      "Aceite textil Formu-Tex para máquinas circulares, tejido de punto y fibras. Incoloro, lavable y emulsionable. Ficha técnica disponible.",
  },
  {
    slug: "formu-cor",
    href: "/industrial/formu-cor",
    sector: "industrial",
    family: "Aceite anticorrosivo",
    familyHref: "/industrial/formu-cor",
    category: "Sector Industrial",
    name: "Formu-Cor",
    type: "Fluido protector anticorrosivo",
    short: "Película protectora para superficies metálicas.",
    image: "/products/formu-cor.jpg",
    solves:
      "Formu-Cor es un fluido de protección basado en aceites minerales y solventes alifáticos, con aditivos anticorrosivos, antioxidantes y desplazantes de agua. Forma una película sobre el metal y separa el agua en procesos con etapas acuosas.",
    benefits: [
      "Protección anticorrosiva de superficies metálicas",
      "Desplaza agua y facilita etapas acuosas",
      "Baja viscosidad y buen poder humectante: menor consumo por m²",
      "Aplicación por inmersión, brocha o aspersión",
    ],
    applications: [
      "Inmersión",
      "Brocha",
      "Aspersión",
      "Piezas metálicas",
      "Tubos",
      "Perfiles de acero",
      "Procesos con etapas acuosas",
    ],
    specs: [
      { label: "Aspecto visual", method: "ASTM D-1500", value: "1,0 – 3,0" },
      { label: "Viscosidad cinemática @ 40 °C", value: "4,0 – 9,0 cSt" },
      { label: "Gravedad específica", method: "ASTM D-1298", value: "0,85 – 0,92" },
      { label: "Punto de inflamación", method: "ASTM D-92", value: "62 – 70 °C" },
      { label: "Cámara salina", value: "> 25 h" },
    ],
    presentations: packStandard,
    datasheet: "/fichas/formu-cor.pdf",
    highlights: [
      {
        label: "Cámara salina",
        value: "> 25 h",
        hint: "Dato de la ficha técnica Formu-Cor.",
      },
    ],
    seoTitle: "Formu-Cor | Protector anticorrosivo para superficies metálicas",
    seoDescription:
      "Formu-Cor protege piezas, tubos y perfiles. Inmersión, brocha o aspersión. Cámara salina > 25 h según ficha técnica.",
  },
  {
    slug: "aceite-dielectrico",
    href: "/industrial/aceite-dielectrico",
    sector: "industrial",
    family: "Aceite dieléctrico",
    familyHref: "/industrial/aceite-dielectrico",
    category: "Sector Industrial",
    name: "Aceite dieléctrico",
    type: "Fluido dieléctrico industrial",
    short: "Estructura lista para la referencia que defina su operación.",
    image: "/products/aceite-dielectrico.jpg",
    solves:
      "Esta línea está prevista para aislamiento y protección en equipos eléctricos industriales. Todavía no publicamos una ficha de producto terminado: no hay descripción, beneficios ni especificaciones inventadas en esta página.",
    benefits: [],
    applications: [],
    specs: [],
    presentations: [],
    pendingTechnical: true,
    note: "Campos preparados para descripción, beneficios, aplicaciones, especificaciones, presentaciones y documentación técnica. Un asesor técnico puede orientar la referencia cuando exista información de producto validada.",
    seoTitle: "Aceite dieléctrico | FormuTech — ficha en preparación",
    seoDescription:
      "Línea de aceite dieléctrico FormuTech. Estructura de producto lista; especificaciones se publicarán con documentación técnica validada.",
  },
  {
    slug: "formulub-mw70",
    href: "/industrial/formulub-mw70",
    sector: "industrial",
    family: "Mantenimiento multiuso",
    familyHref: "/industrial/formulub-mw70",
    category: "Mantenimiento multiuso",
    name: "FormuLub-MW 70",
    type: "Aceite penetrante multiuso",
    short: "Penetra · Protege · Limpia",
    image: "/products/formulub-mw70.jpg",
    solves:
      "Mantenimiento de planta, taller y equipo necesita un fluido que penetre, desplace humedad, limpie y deje una película de protección. FormuLub-MW 70 está pensado para esa rutina diaria, no para reemplazar un hidráulico o un soluble de proceso.",
    benefits: [
      "Elimina humedad",
      "Protege contra óxido",
      "Penetra y libera piezas atoradas",
      "Limpia y desengrasa",
      "Lubrica y reduce fricción",
    ],
    applications: [
      "Automotriz",
      "Mantenimiento industrial",
      "Herramientas y equipos",
      "Cerraduras y bisagras",
      "Cadenas y engranajes",
      "Desbloqueo y liberación",
      "Protección general",
    ],
    specs: [
      { label: "Aspecto visual", value: "Líquido ámbar claro (en aerosol o granel)" },
      { label: "Aroma", value: "Característico y suave" },
      { label: "Punto de inflamación", value: "> 45 °C" },
      { label: "Ausencia de componentes", value: "Libre de siliconas, resinas, plomo y metales pesados" },
      { label: "Composición base", value: "Mezcla de disolventes y aceites" },
      { label: "Gravedad específica", value: "0,8 – 0,88" },
    ],
    presentations: ["Aerosol 200 ml", "Granel"],
    datasheet: "/fichas/formulub-mw70.pdf",
    note: "Aceite penetrante multiuso para mantenimiento de planta, taller y equipo.",
    seoTitle: "FormuLub-MW 70 | Aceite penetrante multiuso",
    seoDescription:
      "FormuLub-MW 70: aceite penetrante multiuso. Penetra, protege y limpia. Aerosol 200 ml y granel. Asesoría técnica FormuTech.",
  },
];

export const oilGasProducts: Product[] = [
  {
    slug: "inhibidor-arcilla-amina",
    href: "/oil-gas/inhibidor-arcilla-amina",
    sector: "oil-gas",
    family: "Oil & Gas",
    familyHref: "/oil-gas",
    category: "Oil & Gas",
    name: "Formu-Clay",
    type: "Inhibidor de arcillas a base de aminas",
    short: "Inhibición de arcillas reactivas en fluidos de perforación y de fractura.",
    image: "/products/inhibidor-arcilla-amina.jpg",
    solves:
      "El inhibidor de arcillas Formu-Clay es un inhibidor de arcillas con un excelente desempeño, utilizado en fluidos de perforación y fluidos de fractura, que gracias a su doble funcionalidad se utiliza para la inhibición química de formaciones de arcilla y esquisto sensibles al agua, evitando así el hinchamiento de las arcillas y su interacción con el agua. Adicional a esto es un producto 100 % biodegradable, lo cual mitiga su impacto ambiental en cuerpos acuíferos.",
    benefits: [
      "Inhibe la hidratación y expansión de arcillas reactivas",
      "Mejora la estabilidad de las paredes del pozo",
      "Puede añadirse al sistema activo sin efectos adversos sobre la viscosidad y las propiedades de filtración",
      "Producto biodegradable, minimizando el impacto ambiental",
      "Es fácil de mezclar; puede ser agregado durante el bombeo",
    ],
    applications: [
      "Fluido de perforación a base de agua en sistemas dispersos, semidispersos, poliméricos y salinos",
      "Perforación en áreas con arcillas medianamente reactivas o muy reactivas",
      "Estabilización de formaciones arcillosas durante la perforación",
    ],
    specs: [
      { label: "Apariencia", value: "Líquido ligeramente amarillo" },
      { label: "Densidad", value: "1,02 – 1,10" },
      { label: "Solubilidad en agua", value: "100 % soluble" },
      { label: "pH (solución al 5 %)", value: "8,0 – 8,5" },
      { label: "Concentración recomendada", value: "6 – 8 ppb en sistemas base agua" },
    ],
    presentations: packDrumIbc,
    datasheet: "/fichas/formu-clay.pdf",
    note: "La concentración puede variar según la reactividad de la lutita en el intervalo a perforar. Consulte la hoja de seguridad y use el equipo de protección personal recomendado.",
    highlights: [{ label: "Concentración recomendada", value: "6–8 ppb" }],
    seoTitle: "Formu-Clay | Inhibidor de arcillas a base de aminas",
    seoDescription:
      "Formu-Clay: inhibidor de arcillas a base de aminas para fluidos de perforación y de fractura. 100 % biodegradable. Ficha técnica descargable.",
  },
  {
    slug: "inhibidor-arcilla-poliamina",
    href: "/oil-gas/inhibidor-arcilla-poliamina",
    sector: "oil-gas",
    family: "Oil & Gas",
    familyHref: "/oil-gas",
    category: "Oil & Gas",
    name: "Formu-PolyClay",
    type: "Inhibidor de arcillas a base de poliaminas",
    short: "Estabiliza pozos profundos y encapsula arcillas reactivas.",
    image: "/products/inhibidor-arcilla-poliamina.jpg",
    solves:
      "El inhibidor de arcillas Formu-PolyClay es un inhibidor de arcillas que, gracias a su estructura molecular y sus diferentes mecanismos de inhibición, le otorga una capacidad muy superior a los inhibidores de arcilla convencionales para estabilizar pozos profundos y encapsular arcillas reactivas. Adicional a esto es un producto 100 % biodegradable, lo cual mitiga su impacto ambiental en cuerpos acuíferos.",
    benefits: [
      "Reduce el potencial de acumulación de material y ayuda a prevenir el embotamiento en la broca y el BHA",
      "Reduce el riesgo de atascamiento y problemas de filtración",
      "Puede añadirse al sistema activo sin efectos adversos sobre la viscosidad y las propiedades de filtración",
      "Producto biodegradable, adecuado en aplicaciones offshore y onshore",
      "Es fácil de mezclar; puede ser agregado durante el bombeo",
    ],
    applications: [
      "Fluido de perforación a base de agua en sistemas dispersos, semidispersos, poliméricos y salinos",
      "Perforación en áreas con arcillas medianamente reactivas o muy reactivas",
      "Estabilización de formaciones arcillosas durante la perforación",
    ],
    specs: [
      { label: "Apariencia", value: "Líquido ligeramente amarillo" },
      { label: "Densidad", value: "1,02 – 1,10" },
      { label: "Solubilidad en agua", value: "100 % soluble" },
      { label: "pH (solución al 5 %)", value: "8,3 – 9,0" },
      { label: "Concentración recomendada", value: "5 – 7 ppb en sistemas base agua" },
    ],
    presentations: packDrumIbc,
    datasheet: "/fichas/formu-polyclay.pdf",
    note: "La concentración puede variar según la reactividad de la lutita en el intervalo a perforar. Consulte la hoja de seguridad y use el equipo de protección personal recomendado.",
    highlights: [{ label: "Concentración recomendada", value: "5–7 ppb" }],
    seoTitle: "Formu-PolyClay | Inhibidor de arcillas a base de poliaminas",
    seoDescription:
      "Formu-PolyClay: inhibidor de arcillas a base de poliaminas para pozos profundos y arcillas reactivas. 100 % biodegradable. Ficha técnica descargable.",
  },
  {
    slug: "nanoinhibidor-arcilla",
    href: "/oil-gas/nanoinhibidor-arcilla",
    sector: "oil-gas",
    family: "Oil & Gas",
    familyHref: "/oil-gas",
    category: "Oil & Gas",
    name: "Nanoinhibidores de arcilla",
    type: "Especialidad para fluidos",
    short: "Inhibición de arcillas en formato nano.",
    image: "/products/nanoinhibidor-arcilla.jpg",
    solves:
      "Nanoinhibidores de arcilla para fluidos de perforación. Sin concentraciones, compatibilidades ni datos de laboratorio publicados en esta ficha.",
    benefits: [],
    applications: [],
    specs: [],
    presentations: [],
    pendingTechnical: true,
    seoTitle: "Nanoinhibidores de arcilla | FormuTech Oil & Gas",
    seoDescription:
      "Nanoinhibidores de arcilla FormuTech. Página preparada para cargar ficha técnica validada.",
  },
  {
    slug: "mejorador-rop",
    href: "/oil-gas/mejorador-rop",
    sector: "oil-gas",
    family: "Oil & Gas",
    familyHref: "/oil-gas",
    category: "Oil & Gas",
    name: "Formu-ROP",
    type: "Inhibidor de acreción para mejorar la tasa de penetración",
    short: "Broca libre de sólidos y mayor ROP en sistemas WBM.",
    image: "/products/mejorador-rop.jpg",
    solves:
      "El inhibidor de acreción Formu-ROP está diseñado mediante la mezcla de un paquete de aditivos que garantiza la broca libre de sólidos. Por otro lado, la composición química del inhibidor de acreción Formu-ROP ayuda a eliminar cualquier acumulación de sólidos de perforación debajo de la broca, permitiendo así que los cortadores de la broca estén en continuo contacto con la formación.",
    benefits: [
      "Aumenta eficazmente la velocidad de penetración (ROP) durante la perforación de todo tipo de lutitas",
      "Reduce el torque y el arrastre",
      "Mejora la calidad del revoque de filtración del fluido de perforación y disminuye los valores de pérdida de fluido",
      "Agentes químicos que mejoran la humectabilidad y reducen el riesgo de sólidos en la broca y el BHA",
      "Es fácil de mezclar; puede ser agregado durante el bombeo",
      "No induce la formación de espuma ni la aireación del sistema de lodo",
    ],
    applications: [
      "Fluido de perforación a base de agua en sistemas dispersos, semidispersos, poliméricos y salinos",
      "Producto diseñado para mejorar la ROP en los sistemas WBM",
      "Evita los problemas de embotamiento y mantiene la broca libre de sólidos",
    ],
    specs: [
      { label: "Apariencia", value: "Líquido ámbar claro" },
      { label: "Densidad", value: "0,85 – 0,89" },
      { label: "Solubilidad en agua", value: "Dispersable en agua" },
      { label: "pH (solución al 5 %)", value: "5,0 – 8,0" },
      { label: "Concentración recomendada", value: "6 – 8 ppb en sistemas base agua" },
    ],
    presentations: packDrumIbc,
    datasheet: "/fichas/formu-rop.pdf",
    note: "Consulte la hoja de seguridad y use el equipo de protección personal recomendado.",
    highlights: [{ label: "Concentración recomendada", value: "6–8 ppb" }],
    seoTitle: "Formu-ROP | Inhibidor de acreción para mejorar ROP",
    seoDescription:
      "Formu-ROP: inhibidor de acreción para mejorar la tasa de penetración en fluidos WBM. Broca libre de sólidos. Ficha técnica descargable.",
  },
  {
    slug: "lubricante-mineral-wbm",
    href: "/oil-gas/lubricante-mineral-wbm",
    sector: "oil-gas",
    family: "Oil & Gas",
    familyHref: "/oil-gas",
    category: "Oil & Gas",
    name: "Formu-LUB M",
    type: "Lubricante a base de aceite mineral para fluidos WBM",
    short: "Reduce fricción, torque y desgaste en perforación WBM.",
    image: "/products/lubricante-mineral-wbm.jpg",
    solves:
      "El lubricante Formu-LUB M es un producto a base de aceite mineral y aditivos especializados empleados en operaciones de perforación para reducir la fricción y el desgaste de los equipos. Este lubricante está diseñado para mejorar la eficiencia de la perforación al minimizar el torque y la fricción, permitiendo que los procesos de perforación sean más fluidos y rápidos.",
    benefits: [
      "Estable a altas temperaturas y no pierde sus propiedades lubricantes",
      "Excelente desempeño a altas temperaturas y presión",
      "Bajos coeficientes de fricción",
    ],
    applications: [
      "Sistemas de fluido de perforación WBM",
      "Pozos desviados y profundos",
    ],
    specs: [
      { label: "Apariencia", value: "Líquido ámbar claro" },
      { label: "Densidad", value: "0,85 – 0,88" },
      { label: "Solubilidad en agua", value: "Dispersable" },
      { label: "pH (solución al 1 %)", value: "6,0 – 9,0" },
      { label: "Concentración recomendada", value: "3 % v/v a 5 % v/v en sistemas base agua" },
    ],
    presentations: packDrumIbc,
    datasheet: "/fichas/formu-lub-m.pdf",
    note: "Agregar lenta y directamente al sistema de lodo, con un flujo pequeño y constante. Consulte la hoja de seguridad y use el equipo de protección personal recomendado.",
    highlights: [{ label: "Concentración recomendada", value: "3–5 % v/v" }],
    seoTitle: "Formu-LUB M | Lubricante mineral para fluidos WBM",
    seoDescription:
      "Formu-LUB M: lubricante a base de aceite mineral para fluidos WBM. Reduce fricción y torque en pozos desviados y profundos. Ficha técnica descargable.",
  },
  {
    slug: "lubricante-vegetal-wbm",
    href: "/oil-gas/lubricante-vegetal-wbm",
    sector: "oil-gas",
    family: "Oil & Gas",
    familyHref: "/oil-gas",
    category: "Oil & Gas",
    name: "Formu-LUB V",
    type: "Lubricante a base de aceites vegetales para fluidos WBM",
    short: "Lubricidad biodegradable en WBM, sin aceites minerales contaminantes.",
    image: "/products/lubricante-vegetal-wbm.jpg",
    solves:
      "El lubricante Formu-LUB V es un producto a base de aceites vegetales y aditivos especializados empleados en operaciones de perforación para reducir la fricción y el desgaste de los equipos. Este lubricante está diseñado para mejorar la eficiencia de la perforación al minimizar el torque y la fricción, permitiendo que los procesos de perforación sean más fluidos y rápidos.",
    benefits: [
      "Estable a altas temperaturas y no pierde sus propiedades lubricantes",
      "Libre de aceites minerales contaminantes",
      "Producto biodegradable",
      "Excelente desempeño a altas temperaturas y presión",
      "Bajos coeficientes de fricción",
    ],
    applications: [
      "Sistemas de fluido de perforación WBM",
      "Pozos desviados y profundos",
    ],
    specs: [
      { label: "Apariencia", value: "Líquido ámbar claro" },
      { label: "Densidad", value: "0,85 – 0,88" },
      { label: "Solubilidad en agua", value: "Dispersable" },
      { label: "pH (solución al 1 %)", value: "6,0 – 9,0" },
      { label: "Concentración recomendada", value: "3 % v/v a 5 % v/v en sistemas base agua" },
    ],
    presentations: packDrumIbc,
    datasheet: "/fichas/formu-lub-v.pdf",
    note: "Agregar lenta y directamente al sistema de lodo, con un flujo pequeño y constante. Consulte la hoja de seguridad y use el equipo de protección personal recomendado.",
    highlights: [{ label: "Concentración recomendada", value: "3–5 % v/v" }],
    seoTitle: "Formu-LUB V | Lubricante vegetal para fluidos WBM",
    seoDescription:
      "Formu-LUB V: lubricante a base de aceites vegetales para fluidos WBM. Biodegradable y libre de aceites minerales contaminantes. Ficha técnica descargable.",
  },
  {
    slug: "asfaltita-obm",
    href: "/oil-gas/asfaltita-obm",
    sector: "oil-gas",
    family: "Oil & Gas",
    familyHref: "/oil-gas",
    category: "Oil & Gas",
    name: "Formu-ASF",
    type: "Control de filtrado para fluidos OBM",
    short: "Asfaltita organofílica para estabilizar el pozo y controlar el filtrado.",
    image: "/products/asfaltita-obm.jpg",
    solves:
      "La asfaltita Formu-ASF es un producto organofílico a base de asfaltita empleado para estabilizar las paredes del pozo y controlar las tasas de filtrado en sistemas de fluidos OBM, con el fin de mejorar los tiempos operativos durante la etapa de perforación.",
    benefits: [
      "Posee un alto punto de ablandamiento",
      "Mejora la estabilidad térmica de los fluidos OBM",
      "Control eficaz de pérdidas de filtración en pozos profundos y direccionales",
      "Mejora la estabilidad de la emulsión de agua en fluidos OBM",
      "Garantiza una excelente estabilidad del pozo en formaciones inestables",
    ],
    applications: [
      "Sistemas de fluido de perforación a base de aceite mineral y/o sintético",
      "Pozos con presencia de formaciones microfracturadas",
    ],
    specs: [
      { label: "Apariencia", value: "Polvo de color negro" },
      { label: "Densidad", value: "1,08 – 1,15" },
      { label: "Solubilidad en agua", value: "Insoluble" },
      { label: "pH (solución al 1 %)", value: "6,0 – 9,0" },
      { label: "Concentración recomendada", value: "2 a 8 ppb en sistemas base aceite" },
    ],
    presentations: ["Saco de 50 lb (22,7 kg)"],
    datasheet: "/fichas/formu-asf.pdf",
    note: "Las dosis recomendadas dependen del grado de control de filtrado y de las características de cada aplicación. Consulte la hoja de seguridad y use el equipo de protección personal recomendado.",
    highlights: [{ label: "Concentración recomendada", value: "2–8 ppb" }],
    seoTitle: "Formu-ASF | Asfaltita para control de filtrado OBM",
    seoDescription:
      "Formu-ASF: asfaltita organofílica para estabilizar paredes de pozo y controlar filtrado en fluidos OBM. Ficha técnica descargable.",
  },
  {
    slug: "antiespumante",
    href: "/oil-gas/antiespumante",
    sector: "oil-gas",
    family: "Oil & Gas",
    familyHref: "/oil-gas",
    category: "Oil & Gas",
    name: "Antiespumantes",
    type: "Especialidad para fluidos",
    short: "Control de espuma en procesos y fluidos.",
    image: "/products/antiespumante.jpg",
    solves:
      "Antiespumantes para fluidos y procesos Oil & Gas. Sin concentraciones ni compatibilidades publicadas en esta página.",
    benefits: [],
    applications: [],
    specs: [],
    presentations: [],
    pendingTechnical: true,
    seoTitle: "Antiespumantes | FormuTech Oil & Gas",
    seoDescription:
      "Antiespumantes FormuTech para Oil & Gas. Ficha técnica pendiente de publicación.",
  },
  {
    slug: "biocida",
    href: "/oil-gas/biocida",
    sector: "oil-gas",
    family: "Oil & Gas",
    familyHref: "/oil-gas",
    category: "Oil & Gas",
    name: "Biocidas",
    type: "Especialidad para fluidos",
    short: "Control microbiológico en sistemas de fluidos.",
    image: "/products/biocida.jpg",
    solves:
      "Biocidas para sistemas de fluidos. No se informan espectros de actividad, dosificaciones ni compatibilidades hasta documentar el producto terminado.",
    benefits: [],
    applications: [],
    specs: [],
    presentations: [],
    pendingTechnical: true,
    seoTitle: "Biocidas | FormuTech Oil & Gas",
    seoDescription:
      "Biocidas FormuTech para Oil & Gas. Consulte a un asesor técnico para la referencia adecuada.",
  },
  {
    slug: "secuestrante-oxigeno",
    href: "/oil-gas/secuestrante-oxigeno",
    sector: "oil-gas",
    family: "Oil & Gas",
    familyHref: "/oil-gas",
    category: "Oil & Gas",
    name: "Secuestrantes de oxígeno",
    type: "Especialidad para fluidos",
    short: "Control de oxígeno disuelto en fluidos de proceso.",
    image: "/products/secuestrante-oxigeno.jpg",
    solves:
      "Secuestrantes de oxígeno para fluidos de proceso. Sin datos de laboratorio ni dosificaciones en esta ficha.",
    benefits: [],
    applications: [],
    specs: [],
    presentations: [],
    pendingTechnical: true,
    seoTitle: "Secuestrantes de oxígeno | FormuTech Oil & Gas",
    seoDescription:
      "Secuestrantes de oxígeno FormuTech. Página preparada para documentación técnica validada.",
  },
];

export const allProducts = [...products, ...oilGasProducts];

export function getProduct(slug: string) {
  return allProducts.find((p) => p.slug === slug);
}

export function getHydraulicByGrade(grade: string) {
  return hydraulicGrades.find((g) => g.id === grade);
}

export const industrialFamilies = [
  {
    name: "Aceite hidráulico",
    product: "FormuLub ISO",
    href: "/industrial/aceite-hidraulico",
    phrase: "Presión, temperatura y sellos: el fluido tiene que aguantar el ciclo.",
    image: "/products/formulub-iso.jpg",
    facts: ["ISO VG 32 · 46 · 68 · 100", "Antidesgaste · anticorrosivo · antiespumante"],
  },
  {
    name: "Aceite soluble mineral",
    product: "FormuLub-Sol",
    href: "/industrial/formulub-sol",
    phrase: "Emulsión para mecanizar, refrigerar y no abrir corrosión.",
    image: "/products/formulub-sol.jpg",
    facts: ["Concentración de referencia 5–10%", "Torneado · fresado · rectificado"],
  },
  {
    name: "Aceite soluble semisintético",
    product: "FormuLub-Sol SSYNT",
    href: "/industrial/formulub-sol-ssynt",
    phrase: "Mezcla de bases minerales y sintéticas: más protección y refrigeración.",
    image: "/products/formulub-sol-ssynt.jpg",
    facts: ["Concentración de referencia 5–10%", "Viscosidad 30–45 cSt @ 40 °C"],
  },
  {
    name: "Aceite soluble sintético",
    product: "FormuLub-Sol SYNT",
    href: "/industrial/formulub-sol-synt",
    phrase: "Más refrigeración, menor concentración, identificación visual.",
    image: "/products/formulub-sol-synt.jpg",
    facts: ["Concentración de referencia 2,5–5%", "Coloración azul · verde · naranja"],
  },
  {
    name: "Aceite textil",
    product: "Formu-Tex",
    href: "/industrial/formu-tex",
    phrase: "Lubrica el anillo y se lava de la fibra.",
    image: "/products/formu-tex.jpg",
    facts: ["ISO 22 · ISO 32", "Incoloro · lavable · emulsionable"],
  },
  {
    name: "Aceite anticorrosivo",
    product: "Formu-Cor",
    href: "/industrial/formu-cor",
    phrase: "Película sobre el metal. Inmersión, brocha o aspersión.",
    image: "/products/formu-cor.jpg",
    facts: ["> 25 h cámara salina", "Inmersión · brocha · aspersión"],
  },
  {
    name: "Aceite dieléctrico",
    product: "Aceite dieléctrico",
    href: "/industrial/aceite-dielectrico",
    phrase: "Línea en estructura. La ficha se publica con evidencia.",
    image: "/products/aceite-dielectrico.jpg",
    facts: ["Ficha técnica en preparación"],
  },
  {
    name: "Desengrasante / penetrante MW-70",
    product: "FormuLub-MW 70",
    href: "/industrial/formulub-mw70",
    phrase: "Penetra, protege y limpia en el mantenimiento de todos los días.",
    image: "/products/formulub-mw70.jpg",
    facts: ["Penetra · protege · limpia", "Aerosol 200 ml · granel"],
  },
] as const;

export const industryRefs = [
  { family: "DIN", hint: "Normas alemanas de fluidos hidráulicos y lubricantes." },
  { family: "ISO", hint: "Clasificación de viscosidad y métodos internacionales." },
  { family: "ASTM", hint: "Métodos de ensayo de laboratorio (viscosidad, inflamación, gravedad, color)." },
  { family: "OEM", hint: "Requerimientos de fabricantes de equipo. Se contrastan caso a caso." },
];
