import styled from "styled-components";

import WeekCalendar from "../components/main/daily/WeekCalendar";
import HedaerImg from "../assets/main/mainDaily.png";
import Navbar from "../components/common/Navbar";
import { HiCalendar } from "react-icons/hi";
import Monthly from "../assets/images/calendart.png";
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
          <div className="headerImgContainer">
            <img
              className="headerImg"
              src={HedaerImg}
              alt="이미지를 불러오는 중입니다"
            />
          </div>
          <div className="topContainer">
            <p className="headerTitle">나의 일별 목표</p>
          </div>
          <div className="headerIconContainer">
            <img
              className="calendarImg"
              src={Monthly}
              alt="이미지를 로딩중입니다"
              onClick={() => {
                navigate("/monthly");
              }}
            />
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
              <div className="myTitle">나의 습관목록</div>
              <MdKeyboardArrowUp className="upIcon" size="30" color="#5039C8" />
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 320px;
  height: 52px;
  position: fixed;
  z-index: 2;
  margin-left: 20px;
  bottom: 84px;
  max-width: 420px;
  padding: 16px;

  background-color: #ffffff;
  border: 1px solid #efefef;
  border-radius: 16px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.12);

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
  background: linear-gradient(155.33deg, #907cf9 8.74%, #6334ff 91.82%);
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.12);
  border-radius: 0px 0px 16px 16px;
  opacity: 0.8;
  width: 360px;
  height: 214px;
  position: relative;
  margin-bottom: 20px;
  & .headerImgContainer {
    height: 100%;
    & .headerImg {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  & .topContainer {
    display: flex;
    justify-content: center;
    & .headerTitle {
      color: #ffffff;
      position: absolute;
      top: 47px;
    }
  }
  & .headerIconContainer {
    background-color: #fff;
    width: 24px;
    border-radius: 4px;
    position: absolute;
    top: 47px;
    right: 20px;
    & .calendarImg {
      margin-left: 4px;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    & .headerIcon {
      background-color: #ffffff;
      border-radius: 4px;
      position: absolute;
      top: 47px;
      right: 20px;
      cursor: pointer;
      width: 24px;
      height: 24px;
      color: #5039c8;
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
