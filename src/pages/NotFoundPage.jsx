import styled from "styled-components";

import Header from "../components/common/Header"
import Navbar from "../components/common/Navbar";


const NotFound = () => {
  return (
    <>
      <Header text={"뒤로가기"}/>
      <StNotFound>
        <h2>404 NOTFOUND</h2>
        <p>잘못된 접근입니다.</p>
      </StNotFound>
      <Navbar/>
    </>
  );
}
export default NotFound;

const StNotFound = styled.div`
  margin: 20px
`


