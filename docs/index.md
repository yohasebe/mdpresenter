Title: MD Presenter
Subtitle: A Markdown Presentation Toolkit for Pandoc
Author: Yoichiro Hasebe
Web: https://github.io/yohasebe/mdpreseenter
Date: October 10, 2020 (Work in Progress / Experimental Stage)

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

### List inside list

1. a. Lorem ipsum dolor sit amet
   b. Lorem ipsum dolor sit amet
   c. Lorem ipsum dolor sit amet

2. a. Lorem ipsum dolor sit amet
   b. Lorem ipsum dolor sit amet
   c. Lorem ipsum dolor sit amet

----

### Ordered List

From 1 to 3

(1) Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 

(2)    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

       Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

From 5 to 7

5. abc
6. def
7. fgh

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

Lorem ipsum dolor sit [amet]{.quiz}, consectetur [adipiscing]{.quiz} elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad {minim} veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. {Duis} aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est {laborum}.

----

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

----

## Zoom Screen

`CTRL +` / `COMMAND +`

: Zoom screen

`CTRL -` / `COMMAND -`

: Zoom out screen

`CTRL 0` / `COMMAND 0`

: Reset to default

----

## Keybindings

`UP` / `DOWN`

: Move cursor up and down

`ENTER` / `DOT (.)`

: Focus/defocus current element 

* Focusing a link = open a new window and access the link
* Focusing an image = Expand the image
* Focusing a quiz element = show the answer key

`SPACE` / `RIGHT`

: Move cursor to next and focus

`PAGEUP` / `HOME`

: Move to top

`PAGEDOWN` / `END`

: Move to end

`P`

: Show all the quiz answer keys and disable shading (for printing or exporting the document)

----
