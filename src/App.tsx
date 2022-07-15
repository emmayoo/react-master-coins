import styled, { createGlobalStyle, css } from "styled-components";
import Router from "./Router";
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "./atoms";

const GlobalStyle = createGlobalStyle`
/* http://meyerweb.com/eric/tools/css/reset/
   v5.0.1 | 20191019
   License: none (public domain)
*/
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
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
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
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
* {
  box-sizing: border-box;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  background-color: ${props => props.theme.bgColor};
  color: ${props => props.theme.textColor};
}
a {
  text-decoration: none;
  color: inherit;
}
`

const ThemeButton = styled.div<{ isDark: boolean }>`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
  position: relative;

  button {
    position: absolute;
    top: 10px;
    right: 20px;

    background: 0;
    border: 0;
    box-sizing: border-box;
    cursor: pointer;
    height: 30px;
    width: 60px;
    border: 1px solid rgba(255, 255, 255, 0);
    
    & span:nth-child(1) {
      position: absolute;
      top: 0;
      left: 0;
      width: 60px;
      height: 30px;
      border-radius: 20px;
      background-color: #d6d7db;
      box-shadow: inset 1px 1px 3px 0 rgb(0 0 0 / 40%);
      transition: 0.3s;
    }
    
    & span:nth-child(2) {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 20px;
      height: 20px;
      background-color: #fff;
      border-radius: 50%;
      box-shadow: 1px 1px 2px 0 rgb(0 0 0 / 40%);
      transition: 0.3s;
    }

    ${props => props.isDark && css`
      & span:nth-child(1) {
        background-color: #ced4e2;
        color: #141516;
      }
      & span:nth-child(2) {
        left: 35px;
        background-color: #141516;
      }
    `}
  }
`;

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom(prev => !prev);
  return (<>
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <ThemeButton isDark={isDark}>
        <button onClick={toggleDarkAtom}>
          <span></span>
          <span></span>
        </button>
      </ThemeButton>
      <Router />
      <ReactQueryDevtools />
    </ThemeProvider>
  </>)
}

export default App;
