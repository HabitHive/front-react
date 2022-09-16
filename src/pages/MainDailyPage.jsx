import styled from "styled-components";

import WeekCalendar from "../components/main/daily/WeekCalendar";
import HedaerImg from "../assets/images/mainDailyHeader.png";
import Navbar from "../components/common/Navbar";
import { HiCalendar } from "react-icons/hi";
import DailyTag from "../components/main/daily/DailyTag";
import MyTag from "../components/main/daily/MyTag";

import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { __getMyDaily } from "../redux/modules/dailytag";

const MainDailyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(__getMyDaily());
  }, []);

  return (
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
          <HiCalendar
            className="headerIcon"
            onClick={() => {
              navigate("/monthly");
            }}
          />
        </div>
        <WeekCalendar />
      </StHeaderContainer>
      <StBodyContainer>
        <DailyTag />
        <MyTag />
      </StBodyContainer>
      <StFooterContainer>
        <Navbar />
      </StFooterContainer>
    </STContainer>
  );
};

export default MainDailyPage;

const STContainer = styled.div`
  /* display: flex;
  flex-direction: column; */
`;

const StHeaderContainer = styled.div`
  background: linear-gradient(138.07deg, #e8d1fc -1.75%, #a6b8f6 85.02%);
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.12);
  opacity: 0.8;
  width: 360px;
  height: 214px;
  position: relative;
  & .headerImgContainer {
    /* background: url("../assets/images/mainDailyHeader.png"); */
    /* background-image: url(HedaerImg); */
    height: 214px;
    & .headerImg {
      width: 100%;
      /* height: 303px; */
      height: 227px;
      object-fit: cover;
    }
  }

  & .topContainer {
    display: flex;
    justify-content: center;
    & .headerTitle {
      position: absolute;
      top: 47px;
    }
  }
  & .headerIconContainer {
    & .headerIcon {
      position: absolute;
      top: 47px;
      right: 20px;
      cursor: pointer;
      width: 24px;
      height: 24px;
    }
  }
`;
const StBodyContainer = styled.div`
  position: relative;
`;

const StFooterContainer = styled.div`
  width: 100%;
  height: 30px;
`;
