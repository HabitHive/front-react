import styled from "styled-components"
import { HiDocumentDuplicate, HiLogout } from "react-icons/hi"
import { BsFillSuitHeartFill } from "react-icons/bs"

import { useNavigate } from "react-router"
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux/modules/user";

const SubNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //현재 주소값, 이 주소값에 따라서 carouel 다음에 이동하는 위치가 달라진다
  const path = window.location.pathname

  const logoutHandler = async () => {
    localStorage.removeItem("accessToken")
    dispatch(setLogin(false))
  }
 
  return (
    <StSubNav>
      <div className="bar" />
      <ul>
        <StSubNavMenu onClick={() => {navigate("/survey")}}>
          <BsFillSuitHeartFill/> &nbsp; 관심사 변경하기
        </StSubNavMenu>
        <StSubNavMenu onClick={() => {navigate("/onboarding", { state: path })}}>
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
  & div {
    margin-top: 3vh;
    width: 100%;
    height: 0.5vh;
    background-color: #EAEBEF;
  }
  & ul {
    list-style: none;
    padding: 0 20px;
  }
`

const StSubNavMenu = styled.li`
  width: max-content;
  color: #4E4E4E;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: -0.3px;
  
  display: flex;
  align-items: center;
  margin: 3vh 0;

  cursor: pointer;
`
