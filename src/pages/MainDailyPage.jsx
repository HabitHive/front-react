import styled from "styled-components";

import WeekCalendar from "../components/main/daily/WeekCalendar";
import HedaerImg from "../assets/images/mainDailyHeader.png";
import { HiCalendar } from "react-icons/hi";

import { useNavigate } from "react-router";
import Navbar from "../components/common/Navbar";

import DailyTag from "../components/main/daily/DailyTag";
import MyTag from "../components/main/daily/MyTag";

const MainDailyPage = () => {
  const navigate = useNavigate();

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
          <p className="headerTitle">My daily</p>
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
  width: 100%;
  height: 214px;
  position: relative;
  & .headerImgContainer {
    /* background: url("../assets/images/mainDailyHeader.png"); */
    /* background-image: url(HedaerImg); */
    height: 214px;
    & .headerImg {
      width: 100%;
      /* height: 303px; */
      height: 214px;
      object-fit: cover;
    }
  }

  & .topContainer {
    display: flex;
    justify-content: space-between;

    /* top: 10%; */
    /* left: 50%; */
    /* transform: translate(-50%, -50%); */
    & .headerTitle {
      position: absolute;
      top: 10%;
    }
    & .headerIcon {
      /* justify-content: center;
      align-content: center;
      align-items: center; */

      cursor: pointer;
      position: absolute;
      top: 10%;
      /* left: 90%; */
      right: 1%;
      transform: translate(-50%, -50%);
    }
  }
`;
const StBodyContainer = styled.div`
  /* background-color: pink; */
  /* flex: 1; */
  position: relative;
`;

const StFooterContainer = styled.div`
  width: 100%;
  height: 30px;
`;
