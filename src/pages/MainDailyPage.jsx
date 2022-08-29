import styled from "styled-components";

import WeekCalendar from "../components/main/daily/WeekCalendar";
import { useNavigate } from "react-router";

const MainDailyPage = () => {
  const navigate = useNavigate();

  //먼슬리 페이지로 이동
  const GoMonthly = () => {
    navigate("/monthly");
  };

  return (
    <>
      <Header>
        <div className="container">
          <h3>My daily</h3>
          <button onClick={GoMonthly}>먼슬리로 이동</button>
        </div>
      </Header>
      <Body>
        <div>
          <WeekCalendar />
        </div>
      </Body>
    </>
  );
};

export default MainDailyPage;

const Header = styled.div`
  & .container {
    display: flex;
    justify-content: space-between;
  }
`;

const Body = styled.div``;
