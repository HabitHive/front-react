import styled from "styled-components";

import { useNavigate } from "react-router";

import { IoIosArrowBack } from "react-icons/io";

const Header = ({text, setModal}) => {
  const navigate = useNavigate();

  const path = window.location.pathname

  return (
    <StHeader>
      <StHeaderBtn
        onClick={() => {
          if (path==="/mypage") {
            setModal(false)
          } else {
            navigate(-1)
          }
        }}
      >
        <IoIosArrowBack/>
      </StHeaderBtn>
      <StHeaderTxt>{text}</StHeaderTxt>
    </StHeader>
  );
};
export default Header;

const StHeader = styled.div`
  height: 52px;
  display: flex;
  align-items: center;
  margin: 4vh 3vw 0;
`;

const StHeaderBtn = styled.button`
  all: unset;
  cursor: pointer;
  font-size: 24px;
  margin-top: 7px;
`;

const StHeaderTxt = styled.p`
  margin: auto;
  text-align: center;
  font-weight: 700;
  font-size: 18px;
  letter-spacing: -0.3px;
`;
