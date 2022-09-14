import styled from "styled-components";

import MonthlyCalendar from "../components/main/monthly/MonthlyCalendar";
import DailyTag from "../components/main/daily/DailyTag";
import { FiChevronLeft } from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";

const MonthlyPage = () => {
  const navigate = useNavigate;
  return (
    <STContainer>
      <HeaderContainer>
        <Header text={"나의 월별 목표"} />
        {/* <div className="iconContainer">
          <button
            className="icon"
            onClick={() => {
              navigate(-1);
            }}
          >
            <FiChevronLeft />
          </button>
        </div>
        <div className="monthContainer">My monthly</div> */}
      </HeaderContainer>
      <BodyContainer>
        <MonthlyCalendar />
      </BodyContainer>
      <FooterContainer>
        <div className="dailyBox">
          <div className="topBox">
            <div className="titleText">나의 일별 목표</div>
            <div className="titleDate">juasefaf 1123</div>
          </div>
          <div className="dailyList">
            <DailyTag />
          </div>
        </div>
      </FooterContainer>
    </STContainer>
  );
};

export default MonthlyPage;

const STContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
const HeaderContainer = styled.div`
  /* display: flex; */
  &.iconContainer {
    & .icon {
      cursor: pointer;
    }
  }
  & .monthContainer {
    justify-content: center;
  }
`;

const BodyContainer = styled.div``;

const FooterContainer = styled.div`
  & .dailyBox {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 300px;

    background: #7a61ff;
    box-shadow: 0px -8px 12px rgba(0, 0, 0, 0.08),
      inset 0px 4px 4px rgba(255, 255, 255, 0.2);
    border-radius: 16px 16px 0px 0px;
    & .topBox {
      display: flex;
      justify-content: space-between;
      padding: 24px 20px 0 20px;
      & .titleText {
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        color: #ffffff;
      }
      & .titleDate {
        font-weight: 600;
        font-size: 12px;
        line-height: 14px;
        text-align: right;
        color: #ffffff;
      }
    }
  }
`;
