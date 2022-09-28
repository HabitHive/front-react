import styled from "styled-components";

import { useNavigate } from "react-router";

import { HiTag, HiOutlineTag } from "react-icons/hi";
import { RiMoneyDollarCircleFill, RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdPets } from "react-icons/md"
import { BsPersonFill, BsPerson } from "react-icons/bs";

const Navbar = () => {
  const navigate = useNavigate();

  let pathname = window.location.pathname;

  return (
    <StNavContainer>
      <StNavUl>
        <StNavli
          onClick={() => {
            navigate("/");
          }}
          className={pathname === "/" ? "active" : null}
        >
          <span>
            {pathname === "/" ? <HiTag/> : <HiOutlineTag/>}
          </span>
          <p>Daily</p>
        </StNavli>
        <StNavli
          onClick={() => {
            navigate("/buy");
          }}
          className={pathname === "/buy" ? "active" : null}
        >
          <span>
          {pathname === "/buy" ? <RiMoneyDollarCircleFill/> : <RiMoneyDollarCircleLine/>}
          </span>
          <p>Shop</p>
        </StNavli>
        <StNavli
          onClick={() => {
            navigate("/pet");
          }}
          className={pathname === "/pet" ? "active" : null}
        >
          <span>
            <MdPets/>
          </span>
          <p>Pet</p>
        </StNavli>
        <StNavli
          onClick={() => {
            navigate("/mypage");
          }}
          className={pathname === "/mypage" ? "active" : null}
        >
          <span>
            {pathname === "/mypage" ? <BsPersonFill/> : <BsPerson/>}
          </span>
          <p>My</p>
        </StNavli>
      </StNavUl>
    </StNavContainer>
  );
};
export default Navbar;

const StNavContainer = styled.nav`
  width: 100%;
  position: sticky;
  bottom: 0;
`;

const StNavUl = styled.ul`
  background-color: white;
  padding: 0 56px;
  height: 60px;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 16px 16px 0 0;
  box-shadow: 0 -6px 12px rgba(0, 0, 0, 0.06);
  & .active {
    color: #674ded;
  }
`;

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
    font-weight: 700;
    font-size: 12px;
  }
`;