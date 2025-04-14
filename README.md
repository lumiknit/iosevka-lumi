# lumiknit flavored Iosevka & Sarasa Gothic

Iosevka & Sarasa Gothic based monospace / quasi-proportional fonts for programming *with CJK support*.

Iosevka & Sarasa Gothic 기반 프로그래밍을 위한 *(CJK 도 지원하는)* monospace & quasi-proportional 폰트.

## Download

You can download all font files in [the latest release](https://github.com/lumiknit/iosevka-lumi/releases/latest).

최신 release 를 확인해주세요.

## Preview

| Lumi (Sans-Serif) | Knit (Slab Serifed) |
| :-: | :-: |
| ![Lumi preview](/lumi.jpg) | ![Knit preview](/knit.jpg) |

## Font Lists

- | Monospace? | W/O CJK | With CJK |
  | :-: | :-: | :-: |
  | **Monospace** | Iosevka Term ... | Sarasa Term ... |
  | **Proportional** | Iosevka QP ... | Sarasa Gothic ... |
- For Sarasa, 'K' means Korean Hanja, 'J' means Japanese Kanji.
- `Lumi` for sans-serif (SourceHanSans for CJK), `Knit` for slab-serifed (SourceHanSerif for CJK)
- Iosevka fonts includes `Semi-extended` and `Extended` fonts.

---

## About the Font

While I used various programming fonts, I always long for some fonts with the below features:

- Bold face should be definitely bold.
  - Most good fonts (such as JetBrains Mono) have weights from 100 to 900, and 400 and 700 are used for regular and bold respectively. However, sometimes the bold face looks slightly thin and does not contrast well with regular faces.
  - Some fonts, such as PragmataPro, have a much bolder *bold* weight (maybe it uses 900 heavy for bold).
  - Like PragmataPro, I prefer fonts that use 900 for bold and 700 for medium.
  
- Upright fonts should use straight strokes, while italic fonts should use curves resembling cursive fonts.

- Ligatures.
  - Since I use lots of PL, more ligatures are better :)

- Proportional programming fonts.
  - While it does not fit every case, sometimes proportional fonts are more readable.
  - There are a few proportional fonts that can be used for programming, such as Input Sans and Recursive Sans.

- Even in proportional fonts, some characters must be distinguishable from each other.
  - Such as (`o O 0`, `1 l i I |`, `S s`, `W w`).
  - However, I don't prefer too much decoration for distinguishing. For example, I dislike the use of slashes, dots, etc., in zero.

- CJK support.
  - While most code consists of ASCII letters, I sometimes use my text editor or terminal for casual writing with Korean letters or Japanese.
  - It is very annoying when CJK fonts and monospace fonts do not match.
  - Programs like VSCode support *fallback fonts*, but this is not a universal solution. I often encounter broken characters or unattractive OS fallback fonts.
  - Also, it's better when the CJK characters' width are exactly double of all other characters. (For terminal.)

Previously, I used following fonts.

- **[PragmataPro](https://fsd.it/shop/fonts/pragmatapro/)** with some fallback CJK
  - Maybe the best option, but was not perfect with Windows font rendering.
- Some fonts supporting Koreans, such as
  **[NanumGothicCoding](https://github.com/naver/nanumfont),
  [D2Coding](https://github.com/naver/d2codingfont),
  [Semteulche](https://eastriverlee.itch.io/semteulche),
  or [Hesalche](https://eastriverlee.itch.io/hesalche)**
  - As they are created for support both monospace & Koreans, they look very consistant.
  - But the faces were not my cup of tea, or does not support ligatures, no Japanese, etc..

However, thanks to the incredible work of [be5invis](https://github.com/be5invis),
I realized I can build my custom fonts with **Iosevka**. Also, **Sarasa Gothic** enables me to inject CJK faces into them.

I would like to express my gratitude once again for be5invis's works..!

## How to Build?

The latest version was built with:

- https://github.com/be5invis/Iosevka 33.2.1
- https://github.com/be5invis/Sarasa-Gothic 1.0.30

### Build with Scripts

- Before starting the build tasks, you should install all requirements for `Iosevka` and `Sarasa Gothic`
  - `nodejs`, `npm`, `afdko` with Python (for otc2otf, ...), and `ttfautohint`
- Run scripts from `00-...ps1` to `02-...ps1` at the repository root.
- If you want to some configuration,
  - `/*.toml` are for Iosevka build
  - `/sarasa-config.temp.json` is for Sarasa Gothic build.

The Iosevka builds takes about 30min, and Saras Gothic build takes about 9 Hours with Apple M1.
(The most time consuming job is auto-hinting.)

For serifed CJK, replace SourceHanSans fonts in `Sarasa-Gothic` directory to SourceHanSerif
