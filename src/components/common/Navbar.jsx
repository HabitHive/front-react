import styled from "styled-components"

import { useNavigate } from "react-router"

const Navbar = () => {
  const navigate = useNavigate();
  
  return (
    <StNavContainer>
      <StNavUl>
        <StNavli onClick={()=>{navigate('/main')}}>
          <StNavIcon/>
          홈
        </StNavli>
        <StNavli onClick={()=>{navigate('/buy')}}>
          <StNavIcon/>
          습관
        </StNavli>
        <StNavli onClick={()=>{navigate('/mypage')}}>
          <StNavIcon/>
          마이           
        </StNavli>
        <StNavli onClick={()=>{navigate('/mypage')}}>
          <StNavIcon/>
          펫           
        </StNavli>
      </StNavUl>
    </StNavContainer>
  )
}
export default Navbar

const StNavContainer = styled.nav`
  width: 100%;
  max-width: 488px;
  position: fixed;
  bottom: 0;
  background-color: white;
`

const StNavUl = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: space-around;
  border: solid 1px;
`

const StNavli = styled.li`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`

const StNavIcon = styled.div`
  width: 30px;
  height: 30px;
  background-color: grey;
`

