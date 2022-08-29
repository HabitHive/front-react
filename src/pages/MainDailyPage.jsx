import styled from "styled-components";

import WeekCalendar from "../components/main/daily/WeekCalendar";

const MainDailyPage = () => {
  return (
    <>
      <Header>
        <div className="container">
          <h3>My daily</h3>
          <button>먼슬리로 이동</button>
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
