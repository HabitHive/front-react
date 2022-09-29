import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        box-sizing: border-box;
    }
    body{
        background-color: #E2DCFF;
    }
    ::-webkit-scrollbar {
        display: none;
    }
`;
export default GlobalStyle;
