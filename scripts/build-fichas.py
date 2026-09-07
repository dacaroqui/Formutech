"""Regenera las fichas PDF con el logo y la paleta oficiales de FormuTech."""

from pathlib import Path

import pymupdf
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
OUT = PUBLIC / "fichas"

GREEN = (73 / 255, 119 / 255, 48 / 255)
GOLD = (216 / 255, 150 / 255, 41 / 255)
INK = (28 / 255, 36 / 255, 24 / 255)
MUTED = (92 / 255, 100 / 255, 86 / 255)
PANEL = (36 / 255, 51 / 255, 34 / 255)
WHITE = (1, 1, 1)
RULE = (228 / 255, 225 / 255, 216 / 255)

FONT_R = "/usr/share/fonts/truetype/noto/NotoSans-Regular.ttf"
FONT_B = "/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf"

A4 = pymupdf.paper_rect("a4")
M = 36


def crop_logo() -> Path:
    src = Image.open(PUBLIC / "brand/logo.png").convert("RGBA")
    cropped = src.crop((180, 168, 1320, 808))
    dest = Path("/tmp/formutech-logo-ficha.png")
    cropped.save(dest)
    return dest


def prepare_fonts(page):
    page.insert_font(fontname="ntr", fontfile=FONT_R)
    page.insert_font(fontname="ntb", fontfile=FONT_B)


def fill_text(page, rect, text, fontname, size, color, align=0):
    return page.insert_textbox(
        pymupdf.Rect(rect),
        text,
        fontname=fontname,
        fontsize=size,
        color=color,
        align=align,
    )


def heading(page, x, y, w, label):
    page.draw_rect(pymupdf.Rect(x, y, x + 10, y + 10), color=GOLD, fill=GOLD)
    fill_text(
        page,
        (x + 16, y - 2, x + w, y + 14),
        label.upper(),
        "ntb",
        8,
        GOLD,
    )
    return y + 16


def bullet_list(page, x, y, w, items, size=8.5):
    for item in items:
        page.draw_rect(pymupdf.Rect(x, y + 4, x + 4.5, y + 8.5), color=GOLD, fill=GOLD)
        box_h = 28
        unused = fill_text(
            page,
            (x + 10, y, x + w, y + box_h),
            item,
            "ntr",
            size,
            INK,
        )
        used = box_h - unused if unused > 0 else box_h
        y += max(13, used) + 1
    return y


def spec_rows(page, x, y, w, specs):
    col_b = x + w * 0.58
    row_h = 20
    top = y
    for i, spec in enumerate(specs):
        bg = (0.97, 0.96, 0.94) if i % 2 == 0 else WHITE
        page.draw_rect(
            pymupdf.Rect(x, y, x + w, y + row_h),
            color=bg,
            fill=bg,
        )
        method = f"  ·  {spec['method']}" if spec.get("method") else ""
        fill_text(
            page,
            (x + 6, y + 3, col_b - 4, y + row_h - 2),
            spec["label"] + method,
            "ntr",
            7.4,
            MUTED,
        )
        fill_text(
            page,
            (col_b + 4, y + 3, x + w - 6, y + row_h - 2),
            spec["value"],
            "ntb",
            8,
            GREEN,
        )
        y += row_h
    page.draw_rect(pymupdf.Rect(x, top, x + w, y), color=GOLD, width=0.6)
    return y


def grade_table(page, x, y, w, grades):
    headers = [
        "Grado ISO",
        "Viscosidad @ 40 °C",
        "Viscosidad @ 100 °C",
        "Gravedad específica",
        "Punto de inflamación",
    ]
    cols = [0.16, 0.22, 0.22, 0.20, 0.20]
    row_h = 20
    top = y
    page.draw_rect(pymupdf.Rect(x, y, x + w, y + row_h), color=PANEL, fill=PANEL)
    cx = x
    for h, frac in zip(headers, cols):
        fill_text(page, (cx + 3, y + 4, cx + w * frac - 3, y + row_h - 2), h, "ntb", 6.2, GOLD)
        cx += w * frac
    y += row_h
    for i, g in enumerate(grades):
        vals = [g["label"]] + [s["value"] for s in g["specs"]]
        bg = (0.97, 0.96, 0.94) if i % 2 == 0 else WHITE
        page.draw_rect(pymupdf.Rect(x, y, x + w, y + row_h), color=bg, fill=bg)
        cx = x
        for j, (val, frac) in enumerate(zip(vals, cols)):
            fill_text(
                page,
                (cx + 3, y + 3, cx + w * frac - 3, y + row_h - 2),
                val,
                "ntb" if j == 0 else "ntr",
                7.2,
                GREEN if j else INK,
            )
            cx += w * frac
        y += row_h
    page.draw_rect(pymupdf.Rect(x, top, x + w, y), color=GOLD, width=0.7)
    return y


def build(sheet: dict, logo: Path):
    doc = pymupdf.open()
    page = doc.new_page(width=A4.width, height=A4.height)
    page.draw_rect(A4, color=WHITE, fill=WHITE)
    prepare_fonts(page)

    page.insert_image(pymupdf.Rect(M, 22, M + 132, 88), filename=str(logo), keep_proportion=True)

    fill_text(
        page,
        (A4.width - M - 220, 40, A4.width - M, 58),
        sheet["ribbon"],
        "ntb",
        8,
        GOLD,
        align=2,
    )
    fill_text(
        page,
        (A4.width - M - 220, 58, A4.width - M, 74),
        "FICHA TÉCNICA",
        "ntb",
        11,
        INK,
        align=2,
    )

    page.draw_rect(pymupdf.Rect(M, 100, A4.width - M, 101.2), color=GOLD, fill=GOLD)

    fill_text(page, (M, 108, 348, 138), sheet["name"], "ntb", 18, GREEN)
    fill_text(page, (M, 136, 348, 154), sheet["type"], "ntr", 9, MUTED)

    left = M
    right = 360
    left_w = 310
    right_w = A4.width - M - right

    page.insert_image(
        pymupdf.Rect(right, 110, right + right_w, 278),
        filename=str(PUBLIC / sheet["image"].lstrip("/")),
        keep_proportion=True,
    )
    page.draw_rect(
        pymupdf.Rect(right, 110, right + right_w, 278),
        color=GOLD,
        width=0.8,
    )

    y = 162
    y = heading(page, left, y, left_w, "Descripción")
    box_h = 90
    unused = fill_text(
        page,
        (left, y, left + left_w, y + box_h),
        sheet["solves"],
        "ntr",
        8.4,
        INK,
    )
    y += (box_h - unused + 10) if unused > 0 else box_h + 8

    y = heading(page, left, y, left_w, "Características")
    y = bullet_list(page, left, y, left_w, sheet["benefits"])
    y += 8

    if not sheet.get("grades"):
        y = heading(page, left, y, left_w, "Especificaciones técnicas")
        y = spec_rows(page, left, y, left_w, sheet["specs"])

    ry = 292
    ry = heading(page, right, ry, right_w, "Aplicaciones")
    ry = bullet_list(page, right, ry, right_w, sheet["applications"], size=8)
    ry += 10
    ry = heading(page, right, ry, right_w, "Presentación")
    ry = bullet_list(page, right, ry, right_w, sheet["presentations"], size=8)

    if sheet.get("note") and not sheet.get("grades"):
        ry += 10
        ry = heading(page, right, ry, right_w, "Modo de empleo")
        fill_text(page, (right, ry, right + right_w, ry + 70), sheet["note"], "ntr", 7.8, INK)

    if sheet.get("grades"):
        ty = max(y, ry) + 12
        ty = heading(page, left, ty, A4.width - 2 * M, "Especificaciones técnicas")
        ty = grade_table(page, left, ty, A4.width - 2 * M, sheet["grades"])
        if sheet.get("note"):
            fill_text(
                page,
                (left, ty + 8, A4.width - M, ty + 36),
                sheet["note"],
                "ntr",
                7.6,
                MUTED,
            )

    page.draw_rect(pymupdf.Rect(M, 800, A4.width - M, 801), color=GOLD, fill=GOLD)
    fill_text(
        page,
        (M, 808, A4.width - M, 822),
        "gerencia@formutech.com.co  ·  +57 312 475 3648  ·  INGENIERÍA EN CADA GOTA",
        "ntr",
        7.4,
        MUTED,
        align=1,
    )
    fill_text(
        page,
        (M, 822, A4.width - M, 834),
        "No prometemos más. Demostramos mejor. Formulado tomando como referencia requerimientos de industria; no implica certificación de una norma sobre el producto terminado.",
        "ntr",
        6.4,
        MUTED,
        align=1,
    )

    dest = OUT / sheet["file"]
    doc.save(dest, deflate=True, garbage=4)
    doc.close()
    print("wrote", dest)


def main():
    logo = crop_logo()

    sheets = [
        {
            "file": "formulub-iso.pdf",
            "name": "FormuLub ISO",
            "type": "Aceite hidráulico  ·  ISO VG 32 · 46 · 68 · 100",
            "ribbon": "ACEITES INDUSTRIALES",
            "image": "/products/formulub-iso.jpg",
            "solves": "Sistemas hidráulicos que trabajan con presión, temperatura y velocidad altas necesitan un fluido estable, con control de desgaste, corrosión y espuma. FormuLub ISO se formula a partir de bases parafínicas altamente refinadas y un paquete de aditivos orientado a esos requisitos de operación.",
            "benefits": [
                "Protección antidesgaste",
                "Protección anticorrosiva y resistencia al herrumbre",
                "Compatibilidad con sellos del sistema",
                "Control de espuma para una operación más estable",
                "Estabilidad a la temperatura",
            ],
            "applications": [
                "Sistemas hidráulicos industriales",
                "Bombas hidráulicas",
                "Inyección y moldeo de plásticos",
                "Reductores de velocidad",
                "Tractores",
                "Equipos de construcción y minería",
                "Montacargas",
            ],
            "presentations": [
                "Galón (3,78 litros)",
                "Garrafa (5 galones)",
                "Tambor (55 galones)",
            ],
            "grades": [
                {
                    "label": "ISO VG 32",
                    "specs": [
                        {"value": "30 / 34 cSt"},
                        {"value": "2 / 6 cSt"},
                        {"value": "0,83 / 0,85"},
                        {"value": "205 – 220 °C"},
                    ],
                },
                {
                    "label": "ISO VG 46",
                    "specs": [
                        {"value": "42 / 46 cSt"},
                        {"value": "4 / 8 cSt"},
                        {"value": "0,835 / 0,875"},
                        {"value": "210 – 230 °C"},
                    ],
                },
                {
                    "label": "ISO VG 68",
                    "specs": [
                        {"value": "62 / 70 cSt"},
                        {"value": "6 / 10 cSt"},
                        {"value": "0,86 / 0,89"},
                        {"value": "215 – 235 °C"},
                    ],
                },
                {
                    "label": "ISO VG 100",
                    "specs": [
                        {"value": "98 / 102 cSt"},
                        {"value": "8 / 12 cSt"},
                        {"value": "0,865 / 0,895"},
                        {"value": "220 – 240 °C"},
                    ],
                },
            ],
            "note": "También se recomienda, según la operación, en equipos de taller, engranajes reductores, rodamientos, sistemas de aire comprimido y compresores de tornillo.",
        },
        {
            "file": "formulub-sol.pdf",
            "name": "FormuLub-Sol",
            "type": "Aceite soluble mineral  ·  concentración de referencia 5–10 %",
            "ribbon": "METALWORKING",
            "image": "/products/formulub-sol.jpg",
            "solves": "En mecanizado, el fluido tiene que refrigerar, lubricar y no abrir la puerta a corrosión u olores. FormuLub-Sol es un aceite soluble mineral formulado con bases de alto grado de refinación y un paquete de aditivos de emulsificación, anticorrosión, fungicidas y bactericidas.",
            "benefits": [
                "Formación de emulsión estable",
                "Poder anticorrosivo",
                "pH al 10 % en agua entre 9,5 y 10,0",
                "Ayuda a evitar malos olores",
                "Lubricación en operaciones de mecanizado",
                "Biocidas de desempeño para mayor resistencia bacteriana",
            ],
            "applications": [
                "CNC y mecanizado de metales",
                "Tallado de engranajes",
                "Torneado, fresado, rectificado y corte",
                "Ferrosos y no ferrosos",
                "Protección contra oxidación",
            ],
            "presentations": [
                "Galón (3,78 litros)",
                "Garrafa (5 galones)",
                "Tambor (55 galones)",
            ],
            "specs": [
                {"label": "Aspecto visual", "method": "ASTM D-1500", "value": "1,0 – 2,0"},
                {"label": "Viscosidad cinemática @ 40 °C", "value": "60 – 77 cSt"},
                {"label": "Gravedad específica", "method": "ASTM D-1298", "value": "0,89 – 0,905"},
                {"label": "Punto de inflamación", "method": "ASTM D-92", "value": "140 – 160 °C"},
                {"label": "Estabilidad de la emulsión", "value": "24 h mínimo"},
                {"label": "Crema", "value": "< 1 mm"},
                {"label": "Proporción de empleo", "value": "1 % a 15 % en agua"},
                {"label": "Concentración de referencia", "value": "5 – 10 %"},
            ],
            "note": "Se emplea como emulsión con agua, añadiendo el aceite al agua con agitación. La concentración depende de la refrigeración y la lubricidad requeridas.",
        },
        {
            "file": "formulub-sol-ssynt.pdf",
            "name": "FormuLub-Sol SSYNT",
            "type": "Aceite soluble semisintético  ·  concentración de referencia 5–10 %",
            "ribbon": "METALWORKING",
            "image": "/products/formulub-sol-ssynt.jpg",
            "solves": "Cuando el proceso pide más limpieza, protección, mayor poder de lubricación y más alta capacidad de refrigeración, sin llegar todavía a un 100 % sintético, la línea semisintética cubre ese tramo. La referencia se selecciona con el equipo, el material y consumo real.",
            "benefits": [
                "Equilibrio entre lubricidad y refrigeración",
                "Orientado a operaciones de mecanizado continuas",
                "Concentración de referencia 5 – 10 %",
            ],
            "applications": [
                "CNC",
                "Mecanizado",
                "Tallado de engranajes",
                "Torneado",
                "Fresado",
                "Rectificado",
                "Corte",
                "Ferrosos y no ferrosos",
            ],
            "presentations": [
                "Galón (3,78 litros)",
                "Garrafa (5 galones)",
                "Tambor (55 galones)",
            ],
            "specs": [
                {"label": "Aspecto visual", "method": "ASTM D-1500", "value": "1,0 – 2,0"},
                {"label": "Viscosidad cinemática @ 40 °C", "value": "30 – 45 cSt"},
                {"label": "Gravedad específica", "method": "ASTM D-1298", "value": "0,89 – 0,905"},
                {"label": "Punto de inflamación", "method": "ASTM D-92", "value": "140 – 160 °C"},
                {"label": "Espontaneidad de la emulsión", "value": "Buena estabilidad"},
                {"label": "Tiempo de estabilidad de la emulsión", "value": "24 horas mínimo"},
                {"label": "Crema", "value": "< 1 mm"},
                {"label": "Proporción de empleo", "value": "5 % a 10 % en agua, según refrigeración y lubricidad"},
                {"label": "Concentración de referencia", "value": "5 – 10 %"},
            ],
            "note": "Se emplea como emulsión con agua. La concentración depende de la refrigeración y la lubricidad requeridas.",
        },
        {
            "file": "formulub-sol-synt.pdf",
            "name": "FormuLub-Sol SYNT",
            "type": "Aceite soluble 100 % sintético  ·  concentración de referencia 2,5–5 %",
            "ribbon": "METALWORKING",
            "image": "/products/formulub-sol-synt.jpg",
            "solves": "En cortes y rectificados que piden más refrigeración y baños más limpios, un soluble 100 % sintético reduce la concentración de uso. La coloración no es una propiedad de desempeño: es una identificación visual disponible según el requerimiento de planta.",
            "benefits": [
                "Línea 100 % sintética para metalworking",
                "Concentración de referencia 2,5 – 5 %",
                "Coloración disponible para identificación en planta",
            ],
            "applications": [
                "CNC",
                "Mecanizado",
                "Tallado de engranajes",
                "Torneado",
                "Fresado",
                "Rectificado",
                "Corte",
                "Ferrosos y no ferrosos",
            ],
            "presentations": [
                "Galón (3,78 litros)",
                "Garrafa (5 galones)",
                "Tambor (55 galones)",
            ],
            "specs": [
                {"label": "Aspecto visual", "method": "ASTM D-1500", "value": "1,0 – 2,0"},
                {"label": "Color", "value": "Naranja, Azul y verde"},
                {"label": "Viscosidad cinemática @ 40 °C", "value": "30 – 45 cSt"},
                {"label": "Gravedad específica", "method": "ASTM D-1298", "value": "1,02 – 1,10"},
                {"label": "Punto de inflamación", "method": "ASTM D-92", "value": "> 200 °C"},
                {"label": "Espontaneidad de la emulsión", "value": "Buena estabilidad"},
                {"label": "Tiempo de estabilidad de la emulsión", "value": "24 horas mínimo"},
                {"label": "Proporción de empleo", "value": "2,5 % a 5 % en agua, según refrigeración y lubricidad"},
                {"label": "pH al 2 %", "value": "9 – 10"},
                {"label": "Concentración de referencia", "value": "2,5 – 5 %"},
            ],
            "note": "La coloración (azul, verde u naranja) se ofrece como identificación visual disponible, no como propiedad técnica. Se emplea como emulsión con agua.",
        },
        {
            "file": "formu-tex.pdf",
            "name": "Formu-Tex",
            "type": "Aceite textil emulsionable y lavable  ·  ISO 32 (ISO 22 a solicitud)",
            "ribbon": "ACEITE TEXTIL",
            "image": "/products/formu-tex.jpg",
            "solves": "En textil el aceite tiene que proteger contra fricción, desgaste y corrosión, y después salir en el lavado. Formu-Tex es incoloro, emulsionable y formulado para no manchar tejidos ni fibras.",
            "benefits": [
                "Antidesgaste",
                "Anticorrosivo y antioxidante",
                "Emulsionable en agua",
                "Fácil lavado / removible de telas",
                "Totalmente incoloro: no mancha tejidos ni fibras",
                "Estabilidad a la oxidación",
            ],
            "applications": [
                "Máquinas circulares y tejido de punto",
                "Producción de fibras y carretes",
                "Telares planos",
                "Anillos de la industria textil",
                "Partes de máquinas de coser",
                "Cuchillas de la industria papelera",
            ],
            "presentations": [
                "Galón (3,78 litros)",
                "Garrafa (5 galones)",
                "Tambor (55 galones)",
            ],
            "specs": [
                {"label": "Aspecto visual", "method": "ASTM D-1500", "value": "0,5 – 1,0"},
                {"label": "Viscosidad cinemática @ 40 °C", "value": "30 – 36 cSt"},
                {"label": "Gravedad específica", "method": "ASTM D-1298", "value": "0,85 – 0,88"},
                {"label": "Punto de inflamación", "method": "ASTM D-92", "value": "200 – 210 °C"},
                {"label": "Lavable", "value": "Sí"},
                {"label": "Emulsionable en agua", "value": "Sí"},
                {"label": "Proporción de empleo", "value": "1 % a 15 % en agua"},
            ],
            "note": "Se emplea en emulsión con agua, añadiendo el aceite al agua con agitación. La ficha documenta ISO 32 (30–36 cSt @ 40 °C). Para ISO 22 solicite esa viscosidad.",
        },
        {
            "file": "formu-cor.pdf",
            "name": "Formu-Cor",
            "type": "Fluido protector anticorrosivo",
            "ribbon": "ACEITE PROTECTOR",
            "image": "/products/formu-cor.jpg",
            "solves": "Formu-Cor es un fluido de protección basado en aceites minerales y solventes alifáticos, con aditivos anticorrosivos, antioxidantes y desplazantes de agua. Forma una película sobre el metal y separa el agua en procesos con etapas acuosas.",
            "benefits": [
                "Protección anticorrosiva de superficies metálicas",
                "Desplaza agua y facilita etapas acuosas",
                "Baja viscosidad y buen poder humectante",
                "Aplicación por inmersión, brocha o aspersión",
            ],
            "applications": [
                "Inmersión, brocha o aspersión",
                "Piezas metálicas",
                "Tubos y perfiles de acero",
                "Procesos con etapas acuosas",
            ],
            "presentations": [
                "Galón (3,78 litros)",
                "Garrafa (5 galones)",
                "Tambor (55 galones)",
            ],
            "specs": [
                {"label": "Aspecto visual", "method": "ASTM D-1500", "value": "1,0 – 3,0"},
                {"label": "Viscosidad cinemática @ 40 °C", "value": "4,0 – 9,0 cSt"},
                {"label": "Gravedad específica", "method": "ASTM D-1298", "value": "0,85 – 0,92"},
                {"label": "Punto de inflamación", "method": "ASTM D-92", "value": "62 – 70 °C"},
                {"label": "Cámara salina", "value": "> 25 h"},
            ],
        },
        {
            "file": "formulub-mw70.pdf",
            "name": "FormuLub-MW 70",
            "type": "Aceite penetrante multiuso  ·  aerosol 200 ml y granel",
            "ribbon": "MANTENIMIENTO",
            "image": "/products/formulub-mw70.jpg",
            "solves": "Mantenimiento de planta, taller y equipo necesita un fluido que penetre, desplace humedad, limpie y deje una película de protección. FormuLub-MW 70 está pensado para esa rutina diaria, no para reemplazar un hidráulico o un soluble de proceso.",
            "benefits": [
                "Elimina humedad",
                "Protege contra óxido",
                "Penetra y libera piezas atoradas",
                "Limpia y desengrasa",
                "Lubrica y reduce fricción",
            ],
            "applications": [
                "Automotriz",
                "Mantenimiento industrial",
                "Herramientas y equipos",
                "Cerraduras y bisagras",
                "Cadenas y engranajes",
                "Desbloqueo y liberación",
                "Protección general",
            ],
            "presentations": ["Aerosol 200 ml", "Granel"],
            "specs": [
                {"label": "Aspecto visual", "value": "Líquido ámbar claro (en aerosol o granel)"},
                {"label": "Aroma", "value": "Característico y suave"},
                {"label": "Punto de inflamación", "value": "> 45 °C"},
                {"label": "Ausencia de componentes", "value": "Libre de siliconas, resinas, plomo y metales pesados"},
                {"label": "Composición base", "value": "Mezcla de disolventes y aceites"},
                {"label": "Gravedad específica", "value": "0,8 – 0,88"},
            ],
            "note": "Aceite penetrante multiuso para mantenimiento de planta, taller y equipo.",
        },
    ]

    for sheet in sheets:
        build(sheet, logo)


if __name__ == "__main__":
    main()
