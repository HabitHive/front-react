import styled from "styled-components"

import { useNavigate } from "react-router"

const Header = (props) => {
  const navigate = useNavigate();

  return (
  <StHeader>
    <StHeaderBtn onClick={()=>{navigate(-1)}}>
        ◀
    </StHeaderBtn>
    <StHeaderTxt>
      {props.text}
    </StHeaderTxt>
  </StHeader>
  )
}
export default Header

const StHeader = styled.div`
  height: 60px;
  display: flex;
  border: solid 1px;
`        

const StHeaderBtn = styled.button`
  margin: 10px;
  cursor: pointer;
`

const StHeaderTxt = styled.p`
  margin: auto 0 auto 35%;
`