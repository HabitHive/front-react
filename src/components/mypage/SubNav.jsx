import styled from "styled-components"

import { useNavigate } from "react-router"
import { useDispatch } from "react-redux";

import { deleteToken } from "../../redux/modules/user";
import { __logout } from "../../redux/modules/user";
import Swal from "sweetalert2";

const SubNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    localStorage.removeItem("token")
    dispatch(__logout())
    navigate("/") // 동기처리하기
  }
 
  return (
    <StSubNav>
      <ul>
        <StSubNavMenu
          onClick={() => {navigate("/onboarding")}}
        >
          ■ 사용자 가이드
        </StSubNavMenu>
        <StSubNavMenu onClick={logoutHandler}>
          ■ 로그아웃
        </StSubNavMenu>
      </ul>
    </StSubNav>
  )
}
export default SubNav

const StSubNav = styled.nav`
  & ul {
    list-style: none;
  }
`

const StSubNavMenu = styled.li`
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 20px -10px;
  cursor: pointer;
`
