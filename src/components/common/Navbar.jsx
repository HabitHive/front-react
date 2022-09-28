import styled from "styled-components";

import { useState } from "react";
import { useNavigate } from "react-router";

import { HiOutlineTag } from "react-icons/hi";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { MdPets } from "react-icons/md"

const Navbar = () => {
  const navigate = useNavigate();

  const [active, setActive] = useState("");

  let pathname = window.location.pathname;

  return (
    <StNavContainer pathname={pathname}>
      <StNavUl>
        <StNavli
          onClick={() => {
            navigate("/");
          }}
          className={pathname === "/" ? "active" : null}
        >
          <span>
            <HiOutlineTag />
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
            <AiOutlineDollarCircle />
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
            <BsPerson />
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
  max-width: 360px;
  position: fixed;
  bottom: 0;
  position: ${(props) => (props.pathname === "/" ? "relative" : "fixed")};
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