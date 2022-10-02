import styled from "styled-components";

import WeekCalendar from "../components/main/daily/WeekCalendar";
import HeaderImg from "../assets/main/mainDaily.png";
import Navbar from "../components/common/Navbar";
import Calendar from "../assets/images/maincalendar.png";
import { MdKeyboardArrowUp } from "react-icons/md";
import DailyTag from "../components/main/daily/DailyTag";
import MyTag from "../components/main/daily/MyTag";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { __getMyDaily } from "../redux/modules/dailytag";

const MainDailyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, setModal] = useState(true);

  useEffect(() => {
    dispatch(__getMyDaily());
  }, []);

  return (
    <>
      <STContainer>
        <StHeaderContainer>
          <div className="headerImg"></div>
          <div className="topContainer">
            <p className="headerTitle">나의 일별 목표</p>
          </div>
          <div className="calendarContainer">
            <div
              className="headerCalendarImg"
              onClick={() => {
                navigate("/monthly");
              }}
            ></div>
          </div>
          <WeekCalendar />
        </StHeaderContainer>
        <StBodyContainer>
          <DailyTag />
          {modal === false ? (
            <STModal
              onClick={() => {
                setModal(true);
              }}
            >
              <div className="container">
                <div className="myTitle">나의 습관목록</div>
                <MdKeyboardArrowUp
                  className="upIcon"
                  size="30"
                  color="#5039C8"
                />
              </div>
            </STModal>
          ) : (
            <MyTag setModal={setModal} />
          )}
        </StBodyContainer>
        <StFooterContainer>
          <Navbar />
        </StFooterContainer>
      </STContainer>
    </>
  );
};

export default MainDailyPage;

const STModal = styled.div`
  position: fixed;
  bottom: 84px;
  max-width: 450px;
  min-height: 52px;
  z-index: 2;
  left: 0px;
  right: 0px;
  margin: 0 auto;
  & .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background-color: #ffffff;
    border: 1px solid #efefef;
    border-radius: 16px;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.12);
    margin: 0 20px;
  }

  & .myTitle {
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: #5039c8;
  }
  & .upIcon {
    cursor: pointer;
  }
`;

const STContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StHeaderContainer = styled.div`
  max-width: 450px;
  height: 214px;
  position: relative;
  margin-bottom: 20px;
  & .headerImg {
    background-image: url(${HeaderImg});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.12);
    border-radius: 0px 0px 16px 16px;
    width: 100%;
    height: 100%;
  }

  & .topContainer {
    display: flex;
    justify-content: center;
    & .headerTitle {
      color: #ffffff;
      position: absolute;
      top: 47px;
      font-weight: 700;
      font-size: 18px;
      line-height: 21px;
    }
  }

  & .calendarContainer {
    position: relative;
    top: -165px;
    right: -85%;
    background-color: #fff;
    border-radius: 4px;
    width: 24px;
    height: 24px;
    padding-left: 4px;
    padding-top: 4px;
    & .headerCalendarImg {
      background-image: url(${Calendar});
      background-repeat: no-repeat;
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  }
`;

const StBodyContainer = styled.div`
  position: relative;
  flex: 1;
  overflow: auto;
`;

const StFooterContainer = styled.div`
  width: 100%;
`;
