This plugin transpiles JSX attributes with CSS layout names into React inline styles.

<br />

**In**
```html
<div display="flex" alignItems="center"></div>
```

<br />

**Out**
```html
<div style={{ display: "flex", alignItems: "center" }}></div>
```

<br /><br />

## Why?
CSS styling serves several presentational roles. In particular, styling rules are used to both provide **layout** (by determining where and how components should render on a page) and **appearance** (by describing colors, font styles, background images, etc.).

In addition, **layout** is not only determined by CSS rules, but is also inextricably linked to the HTML markup it describes. It makes sense, then, to designate **layout** styling in the HTML markup itself. Styling that is concerned with component appearance can continue to live outside of markup.

Inline styles are a solution to this, but are notorious for producing messy and unreadable HTML markup. This plugin provides a layer of syntactic sugar for inlining only **layout** styles in a developer-friendly and clean way. Providing a small abstraction layer also helps to guide developers to better distinguish **layout** from **appearance** while styling components.

<br />

## Installation
Install with npm.
```bash
npm install --save-dev babel-plugin-layout-props
```

Add the plugin to your `.babelrc` file.
```json
{
  "plugins": [
    ...,
    "layout-props",
  ]
}
```

<br />

## Attribute Names
The following attribute names will be collected and transpiled into inline styles.

```
display
marginTop
marginRight
marginBottom
marginLeft
position
top
right
bottom
left
flexDirection
flexWrap
flexFlow
order
justifyContent
alignItems
alignSelf
alignContent
flexGrow
flexShrink
flexBasis
float
```