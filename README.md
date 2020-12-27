# MD Presenter

A Markdown Interactive Presentation Tool for Pandoc 

**IMPORTANT:** This software is in a very early experimental stage

## What's This?

MD Presenter converts a Markdown file to an HTML that can be either used as a *printer-friendly* **single-page document** or as an *interactive* **presentation slides**

## Examples

- Example of a source Markdown file: [INPUT.md](https://raw.githubusercontent.com/yohasebe/mdpresenter/master/docs/index.md)
- Example of a resulting HTML file: [OUTPUT.html](https://yohasebe.github.io/mdpresenter/)

## Prerequisites

[Pandoc](https://pandoc.org/): A universal document converter

```shell
brew install pandoc
```

## Downloads

No download necessary. Include MD Presenter loading script URL when running Pandoc to convert MD to HTML.

## Usage

1. Create a Markdown document `INPUT.md` with sections/pages separated by `---`.
2. Convert the document using Pandoc with MD Presenter loading script html as shown below.
3. Open `OUTPUT.html`
4. Adjust screen zoom level

```shell
pandoc -f markdown+mmd_title_block -t html -s \
       -H https://yohasebe.github.io/mdpresenter/mdpresenter.loader.html \
       INPUT.md -o OUTPUT.html
```

## Keybindings in Presentation Mode


| Key | Function |
|-----|----------|
|`ESC`|Switch between **single-page** and **presentation** modes|
|`DOWN`/`J`/`SPACE`|Move cursor down|
|`UP`/`K`|Move cursor up|
|`ENTER`/`DOT (.)`| Focus/defocus current element |

* Focusing a link = open a new window and access the link
* Focusing an image = Expand the image
* Focusing a quiz element = show the answer key

## Browser Shortcuts

| Key | Function |
|-----|----------|
|`F11`/`CTRL and COMMAND and F`|Toggle fullscreen mode|
|`CTRL`/`CMD` + `+`|Zoom in|
|`CTRL`/`CMD` + `-`|Zoom out|
|`CTRL`/`CMD` + `0`|Reset to default zoom level|

----
