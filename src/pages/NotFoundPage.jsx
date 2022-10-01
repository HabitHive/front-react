import styled from "styled-components";

import Header from "../components/common/Header"
import Navbar from "../components/common/Navbar";

const NotFound = () => {
  return (
    <StNotFoundLayout>
      <Header text={"뒤로가기"}/>
      <StNotFound>
        <h2>404 NOTFOUND</h2>
        <p>잘못된 접근입니다</p>
      </StNotFound>
      <Navbar/>
    </StNotFoundLayout>
  );
}
export default NotFound;

const StNotFoundLayout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const StNotFound = styled.div`
  width: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`


