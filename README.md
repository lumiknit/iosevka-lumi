# iosevka-lumi

My config for https://github.com/be5invis/Iosevka 31.9.1

## About settings

- Make bold weight bolder
  - Keeping regular=400, medium=500, modified semi-bold = 700, bold = 900
- Upright fonts use straight strokes, and italic fonts use curves..
- Maximize width differences between narrow characters and wide characters for quasi-proportional font.

## Build

Rename private build profiles to iosevka 31.9.1 repo, and build.

- `qp-lumi.toml`: Sans-serif Quasi-proportional
- `term-lumi.toml`: Monospace Quasi-proportional
- `qp-knit.toml`: Serif Quasi-proportional
- `term-knit.toml`: Monospace Quasi-proportional

### Build with the new script

- Install otc2otf & ttfautohint
  - otc2otf is provided by Python `afdko` package.
    - `pip install afdko`
  - ttfautohint is provided by `ttfautohint` package.
    - `brew install ttfautohint`
    - Windows, you may need to download from the official site.
- Run the script from `00-....js`

## Preview

![Lumi preview](/lumi.png)

![Knit preview](/knit.png)
