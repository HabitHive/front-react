import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        box-sizing: border-box;
    }
    body{
        font-family: 'Noto Sans KR', sans-serif;
    }
`;
export default GlobalStyle;
