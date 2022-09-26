import styled from "styled-components"
import { HiDocumentDuplicate, HiLogout } from "react-icons/hi"

import { useNavigate } from "react-router"
import { useDispatch } from "react-redux";

import { InfoAlert } from "../common/Alert";

const SubNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    localStorage.removeItem("accessToken")
    InfoAlert({
      text: "로그아웃되었습니다"
    })
  }
 
  return (
    <StSubNav>
      <ul>
        <StSubNavMenu onClick={() => {navigate("/onboarding")}}>
          <HiDocumentDuplicate/> &nbsp; 사용자 가이드
        </StSubNavMenu>
        <StSubNavMenu onClick={logoutHandler}>
          <HiLogout/> &nbsp; 로그아웃
        </StSubNavMenu>
      </ul>
    </StSubNav>
  )
}
export default SubNav

const StSubNav = styled.nav`
  & ul {
    list-style: none;
    margin-bottom: 70px;
  }
`

const StSubNavMenu = styled.li`
  color: #4E4E4E;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: -0.3px;
  
  display: flex;
  align-items: center;
  margin: 30px 0 20px -13px;

  cursor: pointer;
`
