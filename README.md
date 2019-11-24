# @verndale/scrollspy
[![npm version](https://badge.fury.io/js/%40verndale%2Fscrollspy.svg)](https://badge.fury.io/js/%40verndale%2Fscrollspy)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@verndale/scrollspy)
[![GitHub license](https://img.shields.io/github/license/verndale/scrollspy)](https://github.com/verndale/scrollspy/blob/master/LICENSE)
![npm](https://img.shields.io/npm/dt/@verndale/scrollspy)

A JavaScript scrollspy library

## Usage
### Installing using npm
```sh
npm i @verndale/scrollspy
```
### HTML
```html
<!-- Navigation -->
<ul>
  <li>
    <a href="#first-section">First Section</a>
  </li>
  <li>
    <a href="#second-section">Second Section</a>
  </li>
  <li>
    <a href="#third-section">Third Section</a>
  </li>
</ul>
<!-- Sections -->
<div id="first-section">
  <h2>First Section</h2>
</div>
<div id="second-section">
  <h2>Second Section</h2>
</div>
<div id="third-section">
  <h2>Third Section</h2>
</div>
```
### CSS

```css
a.current {
  font-weight: bold;
}
```
### JavaScript
```js
import ScrollSpy from "@verndale/scrollspy";

const links = document.querySelectorAll("a");

new ScrollSpy({
  // Available settings
  // navItems: nav items that are listening to the scroll
  // className: className that will be applied to the "current" nav item
  // topOffset: offset in pixels to compensate elements such as header in the calculation
  navItems: links
});
```

## Demo
https://codesandbox.io/s/verndalescrollspy-demo-m35uj