import { css } from '@emotion/react'

const CDN = 'https://d2va9gm4j17fy9.cloudfront.net';
const fontsURL = `${CDN}/fonts`;

const docStyles = css`
  @font-face {
    font-family: 'Akzidenz';
    font-weight: normal;
    src: url('${fontsURL}/akzidgrostdreg.eot');
    /* IE9 Compat Modes */
    src: url('${fontsURL}/akzidgrostdreg.eot?#iefix')
        format('embedded-opentype'),
      /* Pretty Modern Browsers */ url('${fontsURL}/akzidgrostdreg.ttf')
        format('truetype'),
      /* Safari, Android, iOS */ url('${fontsURL}/akzidgrostdreg.svg#Akzidenz')
        format('svg');
    /* Legacy iOS */
  }

  @font-face {
    font-family: 'Akzidenz';
    font-weight: 600;
    src: url('${fontsURL}/akzidgrostdmed.eot');
    /* IE9 Compat Modes */
    src: url('${fontsURL}/akzidgrostdmed.eot?#iefix')
        format('embedded-opentype'),
      /* IE6-IE8 */ url('${fontsURL}/akzidgrostdmed.woff') format('woff'),
      /* Pretty Modern Browsers */ url('${fontsURL}/akzidgrostdmed.ttf')
        format('truetype'),
      /* Safari, Android, iOS */ url('${fontsURL}/akzidgrostdmed.svg#Akzidenz')
        format('svg');
    /* Legacy iOS */
  }

  @font-face {
    font-family: 'Akzidenz';
    font-weight: bold;
    src: url('${fontsURL}/akzidgrostdmed.eot');
    /* IE9 Compat Modes */
    src: url('${fontsURL}/akzidgrostdmed.eot?#iefix')
        format('embedded-opentype'),
      /* IE6-IE8 */ url('${fontsURL}/akzidgrostdmed.woff') format('woff'),
      /* Pretty Modern Browsers */ url('${fontsURL}/akzidgrostdmed.ttf')
        format('truetype'),
      /* Safari, Android, iOS */ url('${fontsURL}/akzidgrostdmed.svg#Akzidenz')
        format('svg');
    /* Legacy iOS */
  }

  html {
    font-family: 'Akzidenz', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: normal;
    font-style: normal;
  }

  body {
    margin: 0;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
`


const meyersWebReset = css`
/* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
`;


function styles() {
  return [
    meyersWebReset,
    docStyles,
  ]
}

export default styles;
