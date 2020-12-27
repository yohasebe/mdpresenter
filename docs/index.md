title: MD Presenter
subtitle: A Markdown Presentation Toolkit for Pandoc
author: Yoichiro Hasebe
date: December 27, 2020 (Work in Progress / Experimental Stage)

----

<https://yohasebe.github.io/mdpresenter>

----

## Block Types

----

### Paragraph

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

----

### Unordered List

* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
* Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
* Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
* Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

----

### List items having URLs

* [Link List 1]()
* [Link List 2]()
* [Link List 3]()

----

### Ordered List

From 1 to 3

(1)  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

(2)  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 

(3)  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

     Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

From A to B

A.  abc
B.  def
C.  ghi

----

### List inside list

1 to 2 

1. - Lorem ipsum dolor sit amet
   - Lorem ipsum dolor sit amet
   - Lorem ipsum dolor sit amet

2. - Lorem ipsum dolor sit amet
   - Lorem ipsum dolor sit amet
   - Lorem ipsum dolor sit amet

98 to 99

98. a. Lorem ipsum dolor sit amet
    b. Lorem ipsum dolor sit amet
    c. Lorem ipsum dolor sit amet

99. a. Lorem ipsum dolor sit amet
    b. Lorem ipsum dolor sit amet
    c. Lorem ipsum dolor sit amet

----

### Definition

Lorem ipsum

: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Lorem ipsum

: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

----

### Code Block

```
div.line-block{
  font-weight: bold;
}
```

----

### Line Block

| Lorem ipsum dolor sit amet, consectetur adipiscing elit
| Ut enim ad minim veniam
| Duis aute irure dolor in reprehenderit
| Excepteur sint occaecat cupidatat non proident

----

### Image

![Picture: Louvre](https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Louvre_Museum_Wikimedia_Commons.jpg/1200px-Louvre_Museum_Wikimedia_Commons.jpg)

----

### Table



| TH | TH | TH |
|:---|:---|:---|
| TD | TD | TD |
| TD | TD | TD |

Table: Table Caption 1

----

### Blockquote

> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

----

### Quiz

Lorem ipsum dolor sit [amet]{.quiz}, consectetur [adipiscing]{.quiz} elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad [minim]{.quiz} veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. [Duis]{.quiz} aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est [laborum]{.quiz}.

----

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

----

## Browser Shortcuts

#### Zoom Screen

`F11` / `CTRL and COMMAND and F`

: Toggle fullscreen mode

`CTRL +` / `COMMAND and +`

: Zoom screen

`CTRL -` / `COMMAND -`

: Zoom out screen

`CTRL 0` / `COMMAND 0`

: Reset to default

----

## Keybindings

`DOWN` / `J` / `SPACE`

: Move cursor down

`UP` / `K`

: Move cursor up

`ENTER` / `DOT (.)`

: Focus/defocus current element 

* Focusing a link = open a new window and access the link
* Focusing an image = Expand the image
* Focusing a quiz element = show the answer key

`HOME`

: Move to top

`END`

: Move to end

`ESC`

: Show all the quiz answer keys and disable shading (for printing or exporting the document)

