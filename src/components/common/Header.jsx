import styled from "styled-components";

import { useNavigate } from "react-router";

import { IoIosArrowBack } from "react-icons/io";

const Header = (props) => {
  const navigate = useNavigate();

  return (
    <StHeader>
      <StHeaderBtn
        onClick={() => {
          navigate(-1);
        }}
      >
        <IoIosArrowBack/>
      </StHeaderBtn>
      <StHeaderTxt>{props.text}</StHeaderTxt>
    </StHeader>
  );
};
export default Header;

const StHeader = styled.div`
  height: 52px;
  display: flex;
  align-items: center;
  margin-top: 32px;
`;

const StHeaderBtn = styled.button`
  all: unset;
  cursor: pointer;
  font-size: 24px;
  margin: 7px 0 0 20px;
`;

const StHeaderTxt = styled.p`
  margin: auto;
  padding-right: 44px;
  font-weight: 700;
  font-size: 18px;
  letter-spacing: -0.3px;
`;
