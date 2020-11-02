## Application theme
Register application theme on
```code
src/app/@theme/styles/themes.scss
```
Add custom [theme variables](./theme-variables.md), and set built-in theme inheritance
```javascript
$nb-themes: nb-register-theme((
  
  //Place here your theme variables

  // color-primary-100: red,
  // color-primary-200: blue,
  // color-primary-300: magenta,
  // color-primary-400: aquamarine,
  // color-primary-500: green,
  // color-primary-600: gray,
  // color-primary-700: white,
  // color-primary-800: black,
  // color-primary-900: yellow

), 
/*
custom theme
*/
custom,
/*
built-in base theme inheritance
available built-in themes
- default
- cosmic
- corporate
- dark
- material-light
- material-dark
*/
default);
```

Edit top level global CSS/SCSS files to place your custom styles
```code
src/app/@theme/styles/styles-custom.scss
src/app/@theme/styles/styles-custom.css
```