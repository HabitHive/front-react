import { useEffect } from "react";
import styled from "styled-components";

// 모바일 화면에서 주소창 및 하단 nav바를 제외한 100vh구하기
const MobileLayout = ({children}) => {
  const setMobileSize = () => {
//1.innerHeight*0.01 => 모바일에서 주소창높이를 계산해서 vh구해놓음
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);
//2.1에서 구한 vh 를 두번째 인자에 넣어두고 --vh로 계산=>주소창 및 하단 nav바의 높이
}
useEffect(() => {
  setMobileSize();
  window.addEventListener("resize", setMobileSize);
  return () => {
    window.removeEventListener("resize", setMobileSize);
    };
},[])

return <Container>{children}</Container>;

};

export default MobileLayout;

const Container = styled.div`
  background-color: #F6F7FB;
  box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.08);
  max-width: 450px;
  margin: 0 auto;
  overflow: auto;
  // 3.모바일 화면에서 주소창 및 하단 nav바를 제외한 높이를 1vh라고하고 * 100vh
  height: calc(var(--vh, 1vh) * 100);
`;