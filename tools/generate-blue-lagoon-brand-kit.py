from pathlib import Path
import subprocess
import tempfile
from xml.sax.saxutils import escape

from PIL import Image, ImageDraw, ImageFont


OUT = Path.home() / "Desktop" / "Blue Lagoon Instagram Kit"
MASTER_OUT = OUT
TRANSPARENT_VARIANTS_OUT = OUT / "TRANSPARENT LOCKUP VARIANTS"
YOUTUBE_OUT = OUT / "YOUTUBE BANNERS"
INK = "#045b81"
MUTED = "#507184"
WHITE = "#ffffff"
BLACK = "#07151b"
FONT_REGULAR = Path(r"C:\Windows\Fonts\arial.ttf")
FONT_BOLD = Path(r"C:\Windows\Fonts\arialbd.ttf")
CHROME = Path(r"C:\Program Files\Google\Chrome\Application\chrome.exe")


def rgb(hex_color: str) -> tuple[int, int, int]:
    return tuple(int(hex_color[index : index + 2], 16) for index in (1, 3, 5))


def lerp(start: int, end: int, amount: float) -> int:
    return round(start + (end - start) * amount)


def draw_mark(size: int) -> Image.Image:
    html = f"""<!doctype html>
<html>
  <head>
    <style>
      html, body {{ width: {size}px; height: {size}px; margin: 0; background: transparent; overflow: hidden; }}
      .brand-mark {{
        width: {size}px;
        height: {size}px;
        border-radius: 50%;
        background:
          radial-gradient(circle at 48% 34%, #52d6e5 0 10%, transparent 11%),
          linear-gradient(148deg, #d7fbf6 0 39%, #10a8c7 40% 60%, #03618b 61%);
        box-shadow: inset 0 0 0 {max(1, round(size / 41))}px rgba(4, 91, 129, 0.12);
      }}
    </style>
  </head>
  <body><div class="brand-mark"></div></body>
</html>
"""
    with tempfile.TemporaryDirectory() as temp_dir:
        temp = Path(temp_dir)
        source = temp / "mark.html"
        screenshot = temp / "mark.png"
        source.write_text(html, encoding="utf-8")
        subprocess.run(
            [
                str(CHROME),
                "--headless=new",
                "--disable-gpu",
                "--hide-scrollbars",
                "--default-background-color=00000000",
                f"--window-size={size},{size}",
                f"--screenshot={screenshot}",
                source.as_uri(),
            ],
            check=True,
            capture_output=True,
        )
        return Image.open(screenshot).convert("RGBA")


def draw_clean_mark(size: int) -> Image.Image:
    scale = 3
    work_size = size * scale
    image = Image.new("RGBA", (work_size, work_size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image, "RGBA")
    mask = Image.new("L", (work_size, work_size), 0)
    mask_draw = ImageDraw.Draw(mask)
    inset = round(work_size * 0.012)
    mask_draw.ellipse((inset, inset, work_size - inset, work_size - inset), fill=255)

    # Large polygons preserve the site's three-band direction with crisp edges.
    draw.rectangle((0, 0, work_size, work_size), fill=(*rgb("#03618b"), 255))
    draw.polygon(
        [
            (0, 0),
            (work_size, 0),
            (work_size, round(work_size * 0.38)),
            (0, round(work_size * 0.83)),
        ],
        fill=(*rgb("#10a8c7"), 255),
    )
    draw.polygon(
        [
            (0, 0),
            (work_size, 0),
            (work_size, round(work_size * 0.08)),
            (0, round(work_size * 0.53)),
        ],
        fill=(*rgb("#d7fbf6"), 255),
    )
    highlight_radius = round(work_size * 0.1)
    highlight_x = round(work_size * 0.48)
    highlight_y = round(work_size * 0.34)
    draw.ellipse(
        (
            highlight_x - highlight_radius,
            highlight_y - highlight_radius,
            highlight_x + highlight_radius,
            highlight_y + highlight_radius,
        ),
        fill=(*rgb("#52d6e5"), 255),
    )
    image.putalpha(mask)
    return image.resize((size, size), Image.Resampling.LANCZOS)


def draw_spaced_text(
    draw: ImageDraw.ImageDraw,
    position: tuple[int, int],
    text: str,
    font: ImageFont.FreeTypeFont,
    fill: str,
    spacing: int,
) -> int:
    x, y = position
    for character in text:
        draw.text((x, y), character, font=font, fill=fill)
        width = draw.textlength(character, font=font)
        x += round(width) + spacing
    return x


def background(size: tuple[int, int], mode: str) -> Image.Image:
    colors = {
        "transparent": (0, 0, 0, 0),
        "white": (255, 255, 255, 255),
        "black": (*rgb(BLACK), 255),
    }
    return Image.new("RGBA", size, colors[mode])


def save_mark(mode: str) -> None:
    canvas = background((2048, 2048), mode)
    mark = draw_mark(1440)
    canvas.alpha_composite(mark, (304, 304))
    canvas.save(OUT / f"blue-lagoon-mark-{mode}-2048.png")


def save_lockup(mode: str) -> None:
    canvas = background((2600, 800), mode)
    mark = draw_mark(560)
    canvas.alpha_composite(mark, (130, 120))
    text_color = WHITE if mode == "black" else INK
    subtitle_color = "#a6edf0" if mode == "black" else MUTED
    draw = ImageDraw.Draw(canvas)
    title_font = ImageFont.truetype(str(FONT_BOLD), 174)
    subtitle_font = ImageFont.truetype(str(FONT_REGULAR), 102)
    draw_spaced_text(draw, (800, 190), "BLUE LAGOON", title_font, text_color, 20)
    draw_spaced_text(draw, (805, 414), "CREATIVE", subtitle_font, subtitle_color, 34)
    canvas.save(OUT / f"blue-lagoon-lockup-{mode}-2600x800.png")


def save_instagram(mode: str) -> None:
    canvas = background((1080, 1080), mode)
    mark = draw_mark(530)
    canvas.alpha_composite(mark, (275, 138))
    text_color = WHITE if mode == "black" else INK
    subtitle_color = "#a6edf0" if mode == "black" else MUTED
    draw = ImageDraw.Draw(canvas)
    title_font = ImageFont.truetype(str(FONT_BOLD), 86)
    subtitle_font = ImageFont.truetype(str(FONT_REGULAR), 54)
    title = "BLUE LAGOON"
    subtitle = "CREATIVE"

    title_width = sum(round(draw.textlength(character, font=title_font)) + 10 for character in title) - 10
    subtitle_width = sum(round(draw.textlength(character, font=subtitle_font)) + 20 for character in subtitle) - 20
    draw_spaced_text(draw, ((1080 - title_width) // 2, 742), title, title_font, text_color, 10)
    draw_spaced_text(draw, ((1080 - subtitle_width) // 2, 864), subtitle, subtitle_font, subtitle_color, 20)
    canvas.save(OUT / f"blue-lagoon-instagram-square-{mode}-1080.png")


def save_master_mark(mode: str) -> None:
    canvas = background((8192, 8192), mode)
    mark = draw_clean_mark(7000)
    canvas.alpha_composite(mark, (596, 596))
    canvas.save(MASTER_OUT / f"blue-lagoon-mark-{mode}-8192-master.png", optimize=True)


def save_master_lockup(mode: str) -> None:
    canvas = background((6000, 1846), mode)
    mark = draw_clean_mark(1292)
    canvas.alpha_composite(mark, (300, 277))
    text_color = WHITE if mode == "black" else INK
    subtitle_color = "#a6edf0" if mode == "black" else MUTED
    draw = ImageDraw.Draw(canvas)
    title_font = ImageFont.truetype(str(FONT_BOLD), 402)
    subtitle_font = ImageFont.truetype(str(FONT_REGULAR), 235)
    draw_spaced_text(draw, (1846, 438), "BLUE LAGOON", title_font, text_color, 46)
    draw_spaced_text(draw, (1858, 955), "CREATIVE", subtitle_font, subtitle_color, 78)
    canvas.save(MASTER_OUT / f"blue-lagoon-lockup-{mode}-6000-master.png", optimize=True)


def save_master_square(mode: str) -> None:
    canvas = background((4096, 4096), mode)
    mark = draw_clean_mark(2400)
    canvas.alpha_composite(mark, (848, 420))
    text_color = WHITE if mode == "black" else INK
    subtitle_color = "#a6edf0" if mode == "black" else MUTED
    draw = ImageDraw.Draw(canvas)
    title_font = ImageFont.truetype(str(FONT_BOLD), 326)
    subtitle_font = ImageFont.truetype(str(FONT_REGULAR), 205)
    title = "BLUE LAGOON"
    subtitle = "CREATIVE"
    title_width = sum(round(draw.textlength(character, font=title_font)) + 38 for character in title) - 38
    subtitle_width = sum(round(draw.textlength(character, font=subtitle_font)) + 76 for character in subtitle) - 76
    draw_spaced_text(draw, ((4096 - title_width) // 2, 2988), title, title_font, text_color, 38)
    draw_spaced_text(draw, ((4096 - subtitle_width) // 2, 3450), subtitle, subtitle_font, subtitle_color, 76)
    canvas.save(MASTER_OUT / f"blue-lagoon-instagram-square-{mode}-4096-master.png", optimize=True)


def save_transparent_lockup_variant(name: str, title_color: str, subtitle_color: str) -> None:
    canvas = background((7200, 2200), "transparent")
    mark = draw_clean_mark(1720)
    canvas.alpha_composite(mark, (180, 240))
    draw = ImageDraw.Draw(canvas)
    title_font = ImageFont.truetype(str(FONT_BOLD), 520)
    subtitle_font = ImageFont.truetype(str(FONT_REGULAR), 330)
    draw_spaced_text(draw, (2140, 470), "BLUE LAGOON", title_font, title_color, 58)
    draw_spaced_text(draw, (2160, 1140), "CREATIVE", subtitle_font, subtitle_color, 96)
    canvas.save(TRANSPARENT_VARIANTS_OUT / f"blue-lagoon-lockup-transparent-{name}-7200.png", optimize=True)


def save_youtube_banner(name: str, background_color: str, title_color: str, subtitle_color: str) -> None:
    canvas = Image.new("RGB", (2560, 1440), rgb(background_color))
    mark = draw_clean_mark(360)
    canvas.paste(mark, (536, 540), mark)
    draw = ImageDraw.Draw(canvas)
    title_font = ImageFont.truetype(str(FONT_BOLD), 132)
    subtitle_font = ImageFont.truetype(str(FONT_REGULAR), 82)
    draw_spaced_text(draw, (970, 573), "BLUE LAGOON", title_font, title_color, 15)
    draw_spaced_text(draw, (974, 755), "CREATIVE", subtitle_font, subtitle_color, 31)
    canvas.save(YOUTUBE_OUT / f"blue-lagoon-youtube-banner-{name}-2560x1440.jpg", quality=94, optimize=True, progressive=True)


def svg_mark(include_background: str | None = None) -> str:
    background_rect = ""
    if include_background:
        background_rect = f'<rect width="2048" height="2048" fill="{include_background}"/>'
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
  <defs>
    <linearGradient id="lagoon" x1="13.5%" y1="-8.4%" x2="86.5%" y2="108.4%">
      <stop offset="0%" stop-color="#d7fbf6"/>
      <stop offset="39%" stop-color="#d7fbf6"/>
      <stop offset="40%" stop-color="#10a8c7"/>
      <stop offset="60%" stop-color="#10a8c7"/>
      <stop offset="61%" stop-color="#03618b"/>
      <stop offset="100%" stop-color="#03618b"/>
    </linearGradient>
  </defs>
  {background_rect}
  <circle cx="1024" cy="1024" r="718" fill="url(#lagoon)" stroke="#045b81" stroke-opacity=".16" stroke-width="14"/>
  <circle cx="995" cy="793" r="142" fill="#52d6e5"/>
</svg>
"""


def svg_lockup(background_color: str | None, text_color: str, subtitle_color: str) -> str:
    background_rect = ""
    if background_color:
        background_rect = f'<rect width="2600" height="800" fill="{background_color}"/>'
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2600 800">
  <defs>
    <linearGradient id="lagoon" x1="13.5%" y1="-8.4%" x2="86.5%" y2="108.4%">
      <stop offset="0%" stop-color="#d7fbf6"/>
      <stop offset="39%" stop-color="#d7fbf6"/>
      <stop offset="40%" stop-color="#10a8c7"/>
      <stop offset="60%" stop-color="#10a8c7"/>
      <stop offset="61%" stop-color="#03618b"/>
      <stop offset="100%" stop-color="#03618b"/>
    </linearGradient>
  </defs>
  {background_rect}
  <circle cx="410" cy="400" r="280" fill="url(#lagoon)" stroke="#045b81" stroke-opacity=".16" stroke-width="6"/>
  <circle cx="399" cy="310" r="55" fill="#52d6e5"/>
  <text x="800" y="365" fill="{escape(text_color)}" font-family="Arial, sans-serif" font-size="174" font-weight="700" letter-spacing="20">BLUE LAGOON</text>
  <text x="805" y="548" fill="{escape(subtitle_color)}" font-family="Arial, sans-serif" font-size="102" letter-spacing="34">CREATIVE</text>
</svg>
"""


def write_readme() -> None:
    (OUT / "README.txt").write_text(
        """BLUE LAGOON CREATIVE - INSTAGRAM KIT

Quick picks:
- Instagram profile image: ULTRA HD MASTER/blue-lagoon-mark-white-8192-master.png
- Square Instagram post: blue-lagoon-instagram-square-white-1080.png
- Transparent logo for Canva: ULTRA HD MASTER/blue-lagoon-lockup-transparent-6000-master.png

Folders:
- PNG files are ready to upload or use in Canva.
- SVG files are vector originals for maximum quality.
- ULTRA HD MASTER contains oversized PNG originals for editing and export.

Brand wording:
BLUE LAGOON
CREATIVE
""",
        encoding="utf-8",
    )


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    TRANSPARENT_VARIANTS_OUT.mkdir(parents=True, exist_ok=True)
    YOUTUBE_OUT.mkdir(parents=True, exist_ok=True)
    for mode in ("transparent", "white", "black"):
        save_master_mark(mode)
        save_master_lockup(mode)
        save_master_square(mode)
    variants = {
        "navy-and-muted-blue": (INK, MUTED),
        "white-and-light-blue": (WHITE, "#a6edf0"),
        "white-and-soft-gray": (WHITE, "#d8e4e7"),
        "navy-and-turquoise": (INK, "#14a9cf"),
        "all-white": (WHITE, WHITE),
    }
    for name, (title_color, subtitle_color) in variants.items():
        save_transparent_lockup_variant(name, title_color, subtitle_color)
    save_youtube_banner("dark", BLACK, WHITE, "#a6edf0")
    save_youtube_banner("white", WHITE, INK, MUTED)
    save_youtube_banner("lagoon-mist", "#eff9f8", INK, MUTED)


if __name__ == "__main__":
    main()
