import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  /*** NORMALIZE ***/
  html, body {height: 100%;}
  html { line-height: 1.15; -webkit-text-size-adjust: 100%; box-sizing:border-box; }
  body { margin: 0; box-sizing:border-box; }
  main { display: block; }
  h1 { font-size: 2em; margin: 0.67em 0; }
  hr { box-sizing: content-box; height: 0; overflow: visible; border-top:none; border-left: none; }
  pre { font-family: monospace, monospace; font-size: 1em; }
  a { background-color: transparent; }
  abbr[title] { border-bottom: none; text-decoration: underline; text-decoration: underline dotted; }
  b, strong { font-weight: bolder; }
  code, kbd, samp { font-family: monospace, monospace; font-size: 1em; }
  small { font-size: 80%; opacity: .8; }
  sub, sup { font-size: 75%; line-height: 0; position: relative; vertical-align: baseline; }
  sub { bottom: -0.25em; }
  sup { top: -0.5em; }
  img { border-style: none; }
  button, input, optgroup, select, textarea { font-family: inherit; font-size: 100%; margin: 0; }
  button, input { overflow: visible; }
  button, select { text-transform: none; }
  button, [type="button"], [type="reset"], [type="submit"] { -webkit-appearance: button; }
  button::-moz-focus-inner, [type="button"]::-moz-focus-inner, [type="reset"]::-moz-focus-inner, [type="submit"]::-moz-focus-inner { border-style: none; padding: 0; }
  button:-moz-focusring, [type="button"]:-moz-focusring, [type="reset"]:-moz-focusring, [type="submit"]:-moz-focusring { outline: 1px dotted ButtonText; }
  fieldset { padding: 0.35em 0.75em 0.625em; }
  legend { box-sizing: border-box; color: inherit; display: table; max-width: 100%; padding: 0; white-space: normal; }
  progress { vertical-align: baseline; }
  textarea { overflow: auto; }
  [type="checkbox"], [type="radio"] { box-sizing: border-box;  padding: 0;  }
  [type="number"]::-webkit-inner-spin-button, [type="number"]::-webkit-outer-spin-button { height: auto; }
  [type="search"] { -webkit-appearance: textfield; outline-offset: -2px; }
  [type="search"]::-webkit-search-decoration { -webkit-appearance: none; }
  ::-webkit-file-upload-button { -webkit-appearance: button; font: inherit; }
  details { display: block; }
  summary { display: list-item; }
  template { display: none; }
  [hidden] { display: none; }

  /*** RESET ***/
  a{text-decoration:none; color:inherit; cursor:pointer;}
  p{margin:0;}
  html {width: 100%; }
  body{
    font-family: Calibri, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.3;
    color: #666;
    width:100%;
    box-sizing: border-box;
  }

  /*** SITE STYLES ***/
  @font-face {
    font-family: title-font;
    src: url('/assets/fonts/big_noodle_titling.ttf');
  }

  :root {
    --primary-color: #16594f;
    --secondary-color: #038477;
    --third-color: #438274;
    --fourth-color: #8fb2a9;
    --primary-bg-color: #1f867c;
    --secondary-bg-color: #f9fafa;
    --menu-item-over-color: #c7c8d0;
    --sub-menu-item-secondary-bg-color: #94d5d3;
    --sub-menu-item-font-secondary-color: #06685b;
    --separator-color: #d1d2d4;
    --footer-bg-color: #121314;
    --bg-tile: url('/assets/imgs/bg-tile.png');
  }

  body {
    background-color: var(--secondary-bg-color);
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    height: 100%;
    max-width: 100vw;
    width: 100%;
  }

  /*--------------------------------------------------------------
## Inputs & forms
--------------------------------------------------------------*/

.default-form {
    margin-bottom:2em;
    margin-top:2em;
    width:40.33em;
}

.form-title h1, .form-title h2, .form-title h3 {
    margin-top: 0;
}

.form-group {
    align-items: center;
    display:flex;
    width:100%;
}

.form-group > small {
    margin-top: 1.5em;
}

.form-group-row {
    align-items: center;
    display:flex;
    justify-content:space-between;

}

.input-group-separator {
    margin:1.75em .25em .3em .35em;
    color:#999;
}

.input-group {
    display:flex;
    flex-direction:column;
    justify-content: flex-start;
    margin:1em 0;
    width:inherit;
    position:relative;
}

.form-group .input-group {
    margin:.25em .5em;
}

.form-group .input-group:first-child {
    margin-left:0;
}

.form-group .input-group:last-child {
    margin-right:0;
}

.multiple-input {
    display: flex;
}

.multiple-input select {
    background-color: #f1f1f1!important;
    width: auto!important;
}

.multiple-input select option {
    background-color: #fff!important;
}

.form-style input::placeholder {
    color:#888;
}


.form-style input[type="text"],
.form-style input[type="date"],
.form-style input[type="datetime"],
.form-style input[type="email"],
.form-style input[type="number"],
.form-style input[type="password"],
.form-style input[type="search"],
.form-style input[type="time"],
.form-style input[type="url"],
.form-style input[type="file"],
.form-style textarea,
.form-style select
{
	transition:all 0.30s ease-in-out;
	outline:none;
	box-sizing:border-box;
	width:100%;
	background:#fff;
	border:1px solid #e9e9e9;
	padding:.5em .3em;
	color:#222;
}

.form-style textarea {
    resize: vertical;
}


.form-style input[type="text"]:focus,
.form-style input[type="date"]:focus,
.form-style input[type="datetime"]:focus,
.form-style input[type="email"]:focus,
.form-style input[type="number"]:focus,
.form-style input[type="password"]:focus,
.form-style input[type="search"]:focus,
.form-style input[type="time"]:focus,
.form-style input[type="url"]:focus,
.form-style input[type="file"]:focus,
.form-style textarea:focus,
.form-style select:focus {
	box-shadow:0 0 5px var(--primary-color);
    border:1px solid var(--primary-color);
    color:#222;
}

.form-style input[type="text"]:disabled,
.form-style input[type="date"]:disabled,
.form-style input[type="datetime"]:disabled,
.form-style input[type="email"]:disabled,
.form-style input[type="number"]:disabled,
.form-style input[type="password"]:disabled,
.form-style input[type="search"]:disabled,
.form-style input[type="time"]:disabled,
.form-style input[type="url"]:disabled,
.form-style input[type="file"]:disabled,
.form-style textarea:disabled,
.form-style select:disabled {
    opacity:.4;
    background-color: #f1f1f1;
}

.form-style input.is-invalid,
.form-style input.is-invalid,
.form-style input.is-invalid,
.form-style input.is-invalid,
.form-style input.is-invalid,
.form-style input.is-invalid,
.form-style input.is-invalid,
.form-style input.is-invalid,
.form-style input.is-invalid,
.form-style input.is-invalid,
.form-style textarea.is-invalid,
.form-style select.is-invalid {
    box-shadow:0 0 5px #dc3545;
    border:1px solid #dc3545;
    color:#dc3545;
}

.form-style .min-field {
    max-width:5em;
    margin:.5em .5em 0 0;
}

.form-style abbr {
    color:#f44336;
    text-decoration:none;
}

.button-group-centered {
  display: flex;
  justify-content: center;
}

 /*--------------------------------------------------------------
## Tables
--------------------------------------------------------------*/
.custom-table {
    width:100%;
    overflow-x: auto;
}

.custom-table .minus {
    width: 1%;
}

.custom-table table {
    width:100%;
    border-spacing:0;
    border:1px solid #e1e1e1;
    border-top-left-radius:.3em;
    border-top-right-radius:.3em;
}

.custom-table th {
    border-left:1px solid #f1f1f1;
    border-bottom:2px solid #e1e1e1;
    background-color:#f9f9f9;
    font-weight:bold;
    padding:.7em 1em !important;
    text-align:left;
    white-space: nowrap;
}

.custom-table th:first-child {
    border-left:none;
    border-top-left-radius:.3em;
}

.custom-table th:last-child {
    border-top-right-radius:.3em;
}

.custom-table tfoot th {
    border-bottom:1px solid #f1f1f1;
}

.custom-table td {
    border-left:1px solid #f1f1f1;
    padding:.5em 1em;
}

.custom-table td:first-child {
    border:none;
}

.custom-table tr:nth-child(even) {
  background-color:#f9f9f9
}

.custom-table tbody tr {
    border-top:1px solid #f1f1f1;
}

.custom-table tbody tr:first-child {
    border:none;
}

.custom-table tr:hover {
    background-color:rgba(0,0,0,.045);
}

.custom-table thead tr:hover {
    background-color:transparent;
}

.custom-table .table-buttons {
    display:flex;
    flex-wrap:nowrap;
    padding:.1em 1em;
}

.custom-table [class^="button"] {
    padding:.2em .2em;
    margin: 0 .15em;
    background-color:#f9f9f9;
    border:1px solid #e9e9e9;
    color:#616161;
    text-align: center;
    min-width:2.2em!important;
}

.custom-table .button-yellow {
    color:#ffab00;
}

.custom-table .button-red {
    color:#f44336;
}
`;