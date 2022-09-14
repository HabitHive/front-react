import styled from "styled-components"

import { useNavigate } from "react-router"

import { HiOutlineTag } from "react-icons/hi"
import { AiOutlineDollarCircle, AiOutlineSmile } from "react-icons/ai"
import { BsPersonFill } from "react-icons/bs"

const Navbar = () => {
  const navigate = useNavigate();
  
  return (
    <StNavContainer>
      <StNavUl>
        <StNavli onClick={()=>{navigate('/')}}>
          <span><HiOutlineTag/></span>
          <p>Daily</p>         
        </StNavli>
        <StNavli onClick={()=>{navigate('/buy')}}>
          <span><AiOutlineDollarCircle/></span>
          <p>Shop</p>         
        </StNavli>
        <StNavli onClick={()=>{navigate('/mypage')}}>
          <span><AiOutlineSmile/></span>
          <p>My</p>         
        </StNavli>
        <StNavli onClick={()=>{navigate('/mypage')}}>
          <span><BsPersonFill/></span>
          <p>Pet</p>         
        </StNavli>
      </StNavUl>
    </StNavContainer>
  )
}
export default Navbar

const StNavContainer = styled.nav`
  width: 100%;
  max-width: 360px;
  position: fixed;
  bottom: 0;
  background-color: white;
`

const StNavUl = styled.ul`
  padding: 0 56px;
  height: 60px;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 16px 16px 0 0;
  box-shadow: 0 -4px 4px 0 rgba(0, 0, 0, 0.25);
`

const StNavli = styled.li`
  width: 50px;
  height: 38px;
  color: #999999;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  & span {
    width: 20px;
    height: 20px;
  }
  & p {
    font-size: 12px;
  }
`
