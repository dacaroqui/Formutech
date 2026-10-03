"""Fichas Oil & Gas nuevas, con el molde de public/fichas/formu-rop.pdf.

Los valores de la tabla salen como «Consultar con un asesor». No hay cifras de
laboratorio ni de empaque: el folleto no las trae.
"""

from pathlib import Path

import pymupdf

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "fichas"
REF = OUT / "formu-rop.pdf"

FONT_R = "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf"
FONT_B = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"

GREEN = (0, 0x3E / 255, 0)
INK = (0, 0, 0)
VALUE = (0x1F / 255, 0x1F / 255, 0x1F / 255)
RULE = (0.4, 0.4, 0.4)

CONSULTAR = "Consultar con un asesor"
PAGE = pymupdf.paper_rect("letter")

SPEC_ROWS = [
    "Presentación / Empaque",
    "Apariencia",
    "Densidad",
    "Solubilidad en el agua",
    "pH",
    "Concentración recomendada",
]


def assets():
    doc = pymupdf.open(REF)
    page = doc[0]
    logo = footer = None
    for info in page.get_image_info(xrefs=True):
        pix = pymupdf.Pixmap(doc, info["xref"])
        if pix.n > 4:
            pix = pymupdf.Pixmap(pymupdf.csRGB, pix)
        if info["width"] > 800:
            footer = pix
        else:
            logo = pix
    if logo is None or footer is None:
        raise SystemExit("no se pudo leer logo o pie de formu-rop.pdf")
    return logo, footer


def textbox(page, rect, text, font, size, color):
    unused = page.insert_textbox(
        pymupdf.Rect(rect),
        text,
        fontname=font,
        fontsize=size,
        color=color,
    )
    if unused < 0:
        raise SystemExit(f"no cabe: {text[:60]}")
    return rect[3] - rect[1] - unused


def heading(page, x, y, label):
    page.insert_text((x, y + 11), label, fontname="bld", fontsize=11, color=GREEN)
    return y + 18


def paragraph(page, x, y, width, text, size=9):
    height = 72
    used = textbox(page, (x, y, x + width, y + height), text, "reg", size, INK)
    return y + used + 8


def bullets(page, x, y, width, items):
    for item in items:
        page.insert_text((x, y + 9), "•", fontname="reg", fontsize=9, color=INK)
        used = textbox(page, (x + 14, y, x + width, y + 40), item, "reg", 9, INK)
        y += max(used, 12) + 4
    return y


def specs(page, x, y, width):
    row_h = 16
    mid = x + width * 0.46
    top = y
    for i, label in enumerate(SPEC_ROWS):
        yy = top + i * row_h
        page.draw_line(pymupdf.Point(x, yy), pymupdf.Point(x + width, yy), color=RULE, width=0.3)
        textbox(page, (x + 6, yy + 2, mid - 4, yy + row_h), label, "reg", 8, INK)
        textbox(
            page,
            (mid + 6, yy + 2, x + width - 4, yy + row_h),
            CONSULTAR,
            "reg",
            8,
            VALUE,
        )
    bottom = top + len(SPEC_ROWS) * row_h
    page.draw_line(pymupdf.Point(x, bottom), pymupdf.Point(x + width, bottom), color=RULE, width=0.3)
    page.draw_line(pymupdf.Point(x, top), pymupdf.Point(x, bottom), color=RULE, width=0.3)
    page.draw_line(pymupdf.Point(mid, top), pymupdf.Point(mid, bottom), color=RULE, width=0.3)
    page.draw_line(
        pymupdf.Point(x + width, top),
        pymupdf.Point(x + width, bottom),
        color=RULE,
        width=0.3,
    )
    return bottom


def build(sheet, logo, footer):
    doc = pymupdf.open()
    page = doc.new_page(width=PAGE.width, height=PAGE.height)
    page.insert_font(fontname="reg", fontfile=FONT_R)
    page.insert_font(fontname="bld", fontfile=FONT_B)

    page.insert_image(pymupdf.Rect(54.36, 50.04, 178.92, 144.6), pixmap=logo)

    left = 54
    width = 504
    y = 162
    page.insert_text((left, y + 16), sheet["title"], fontname="bld", fontsize=16, color=GREEN)
    y += 28
    page.insert_text((left, y + 10), sheet["subtitle"], fontname="reg", fontsize=10.5, color=GREEN)
    y += 26

    y = heading(page, left, y, "Aplicaciones")
    y = bullets(page, left, y, width, sheet["applications"])
    y += 6
    y = heading(page, left, y, "Propiedades")
    y = paragraph(page, left, y, width, sheet["intro"])
    y = bullets(page, left, y, width, sheet["properties"])
    y += 6
    y = heading(page, left, y, "Descripción")
    y = paragraph(page, left, y, width, sheet["description"])
    y += 4
    y = heading(page, left, y, "Especificaciones")
    y = specs(page, 60, y + 4, 420)
    if y > 680:
        raise SystemExit(f"{sheet['file']} se sale de la página ({y})")

    page.insert_image(pymupdf.Rect(54.36, 696.96, 577.08, 759.48), pixmap=footer)

    dest = OUT / sheet["file"]
    doc.save(dest, deflate=True, garbage=4)
    doc.close()

    check = pymupdf.open(dest)
    text = check[0].get_text()
    check.close()
    count = text.count(CONSULTAR)
    if count != len(SPEC_ROWS):
        raise SystemExit(f"{sheet['file']}: {count} veces «{CONSULTAR}», se esperaban {len(SPEC_ROWS)}")
    banned = ("ppb", "55 gal", "50 lb", "cSt", "kV")
    lowered = text.lower()
    for token in banned:
        if token.lower() in lowered:
            raise SystemExit(f"{sheet['file']} incluye un dato no autorizado: {token}")
    print("wrote", dest)


SHEETS = [
    {
        "file": "formu-emul-dual.pdf",
        "title": "FICHA TECNICA FORMU EMUL-DUAL",
        "subtitle": "Emulsificante dual para fluidos OBM",
        "applications": [
            "Fluidos OBM",
            "Control de estabilidad",
            "Desempeño del sistema",
        ],
        "intro": "Formu Emul-Dual posee las siguientes propiedades:",
        "properties": [
            "Favorece emulsiones estables.",
            "Ayuda a controlar la humedad y la estabilidad del sistema.",
            "Contribuye al desempeño del fluido.",
        ],
        "description": "Diseñado para mantener la estabilidad de la emulsión y un desempeño confiable del fluido en condiciones exigentes.",
    },
    {
        "file": "formu-redvis.pdf",
        "title": "FICHA TECNICA FORMU REDVIS",
        "subtitle": "Reductor de viscosidad para crudos",
        "applications": [
            "Crudos pesados",
            "Crudos extrapesados",
            "Transporte y manejo",
        ],
        "intro": "Formu RedVis posee las siguientes propiedades:",
        "properties": [
            "Disminuye la viscosidad aparente.",
            "Facilita el bombeo y el manejo del crudo.",
            "Mejora la movilidad del sistema.",
        ],
        "description": "Ayuda a mejorar la fluidez y facilita el manejo de crudos pesados y extrapesados.",
    },
    {
        "file": "sec-h2s.pdf",
        "title": "FICHA TECNICA SEC H₂S",
        "subtitle": "Secuestrante para sulfuro de hidrógeno (Formu-SEC H₂S)",
        "applications": [
            "Sistemas de gas",
            "Crudo",
            "Agua de proceso",
        ],
        "intro": "Sec H₂S (Formu-SEC H₂S) posee las siguientes propiedades:",
        "properties": [
            "Reduce el H₂S en el sistema.",
            "Mejora la seguridad operativa.",
            "Protege los equipos y ayuda al cumplimiento.",
        ],
        "description": "Formu-SEC H₂S contribuye a reducir la presencia de H₂S y a mejorar la seguridad en sistemas de gas, crudo y agua.",
    },
    {
        "file": "formu-phpa.pdf",
        "title": "FICHA TECNICA FORMU PHPA",
        "subtitle": "Polímero encapsulante en polvo",
        "applications": [
            "Fluidos base agua (WBM)",
            "Estabilización de arcillas",
            "Control de sólidos",
        ],
        "intro": "Formu PHPA en polvo posee las siguientes propiedades:",
        "properties": [
            "Encapsula arcillas y recortes, y evita su hidratación y dispersión.",
            "Mejora la estabilidad del pozo y mantiene las paredes firmes.",
            "Favorece el transporte y el control del sistema, y optimiza la reología del fluido.",
        ],
        "description": "Solución efectiva para estabilizar arcillas y mantener la integridad del pozo en condiciones desafiantes.",
    },
    {
        "file": "formu-pac-lv.pdf",
        "title": "FICHA TECNICA FORMU PAC LV",
        "subtitle": "Controlador de filtrado de baja viscosidad",
        "applications": [
            "Fluidos base agua (WBM)",
            "Control de filtrado",
            "Desempeño del sistema",
        ],
        "intro": "Formu PAC LV posee las siguientes propiedades:",
        "properties": [
            "Reduce el filtrado API y minimiza la pérdida de fluido.",
            "Favorece un revoque delgado y estable, y forma una película resistente.",
            "Apoya la integridad del pozo y contribuye a una perforación más segura.",
        ],
        "description": "Celulosa polianiónica de baja viscosidad para un control de filtrado eficiente y un desempeño estable del fluido.",
    },
    {
        "file": "formu-silcol.pdf",
        "title": "FICHA TECNICA FORMU SILCOL",
        "subtitle": "Sílice coloidal para aplicaciones especiales",
        "applications": [
            "Cementación",
            "Aplicaciones especiales",
        ],
        "intro": "Formu SILCOL posee las siguientes propiedades:",
        "properties": [
            "Apoya la estabilidad y el sellado fino.",
            "Favorece el control del sistema.",
            "Es útil en formulaciones especiales.",
        ],
        "description": "Sílice coloidal para cementación y aplicaciones especiales. Apoya la estabilidad y el sellado fino, favorece el control del sistema y resulta útil en formulaciones especiales.",
    },
    {
        "file": "formu-caco3.pdf",
        "title": "FICHA TECNICA FORMU CaCO₃",
        "subtitle": "Agente de puenteo y material obturante",
        "applications": [
            "Fluidos base agua (WBM)",
            "Control de pérdidas de circulación",
            "Cementación",
        ],
        "intro": "Formu CaCO₃ posee las siguientes propiedades:",
        "properties": [
            "Apoya el control de pérdidas: sella poros, fracturas y zonas de alta permeabilidad.",
            "Ofrece un puenteo temporal y forma un lecho estable y resistente.",
            "Está disponible en diferentes granulometrías, según la condición y el requerimiento.",
        ],
        "description": "Carbonato de calcio de alta pureza para el control de pérdidas y el sellado temporal de zonas permeables.",
    },
]


def main():
    logo, footer = assets()
    for sheet in SHEETS:
        build(sheet, logo, footer)


if __name__ == "__main__":
    main()
