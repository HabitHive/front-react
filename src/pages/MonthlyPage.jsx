import styled from "styled-components";

import MonthlyCalendar from "../components/main/monthly/MonthlyCalendar";
import DailyTag from "../components/main/daily/DailyTag";
import Header from "../components/common/Header";
import moment from "moment";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { __getMonth } from "../redux/modules/month";

const MonthlyPage = () => {
  const dispatch = useDispatch();

  let now = new Date();
  const pick = useSelector((state) => state.getMyDaily.myDaily[1]);

  let pickMonth = new Date(now).toLocaleString("en-US", { month: "long" });
  let pickDay = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(8, 10);
  //today에서 클릭한 날짜로 데이터 변경
  if (pick !== undefined) {
    pickMonth = new Date(pick).toLocaleString("en-US", {
      month: "long",
    });
    pickDay = new Date(
      new Date(pick).getTime() - new Date(pick).getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(8, 10);
  }

  const [value, setValue] = useState(now);
  const [pickDate, SetPickDate] = useState(moment(value).format("YYYY-MM-DD"));

  useEffect(() => {
    dispatch(__getMonth(pickDate));
  }, []);

  return (
    <STContainer>
      <HeaderContainer>
        <Header text={"나의 월별 목표"} />
      </HeaderContainer>
      <BodyContainer>
        <MonthlyCalendar />
      </BodyContainer>
      <FooterContainer>
        <div className="dailyBox">
          <div className="topBox">
            <div className="titleText">나의 일별 목표</div>
            <div className="titleDate">
              {pickMonth}&nbsp;&nbsp;
              {pickDay}
            </div>
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
        margin-bottom: 20px;
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
