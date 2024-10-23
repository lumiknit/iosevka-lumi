# lumiknit flavored Iosevka & Sarasa Gothic

Iosevka & Sarasa Gothic 기반 프로그래밍을 위한 (CJK 도 지원하는) monospace & quasi-proportional 폰트.

My custom builds of

- https://github.com/be5invis/Iosevka 31.9.1
- https://github.com/be5invis/Sarasa-Gothic 1.0.22

## Preview

### Iosevka / Sarasa Lumi (Sans-Serif)

![Lumi preview](/lumi.jpg)

### Iosevka / Sarasa Knit (Slab Serifed)

![Knit preview](/knit.jpg)

## Download

See Releases.

## About settings

- Make bold weight bolder
  - Keeping regular=400, medium=500, modified semi-bold = 700, bold = 900
- Upright fonts use straight strokes, and italic fonts use curves..
- Maximize width differences between narrow characters and wide characters for quasi-proportional font.

### Build with the new script

- Install otc2otf & ttfautohint
  - otc2otf is provided by Python `afdko` package.
    - `pip install afdko`
  - ttfautohint is provided by `ttfautohint` package.
    - `brew install ttfautohint`
    - Windows, you may need to download from the official site.
- Run the script from `00-....js`
