import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        box-sizing: border-box;
    }
    body{
        background-color: #F1F1F5;
        font-family: 'Pretendard', sans-serif;
    }
    ::-webkit-scrollbar {
        display: none;
    }
`;
export default GlobalStyle;
