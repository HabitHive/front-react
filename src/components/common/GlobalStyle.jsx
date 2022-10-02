import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        box-sizing: border-box;
        // 모바일에서 파란 하이라이트 없애기
        -webkit-tap-highlight-color: rgba(0,0,0,0);
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
