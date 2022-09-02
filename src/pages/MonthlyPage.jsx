import MonthlyCalendar from "../components/main/monthly/MonthlyCalendar";
import { FiChevronLeft } from "react-icons/fi";
import styled from "styled-components";

const MonthlyPage = () => {
  return (
    <div>
      <Header>
        <div className="container">
          <FiChevronLeft />
          <span>마이 먼슬리</span>
        </div>
      </Header>
      <div></div>
      <MonthlyCalendar />
    </div>
  );
};

export default MonthlyPage;

const Header = styled.div`
  .container {
    display: flex;
    span {
      justify-content: center;
    }
  }
`;
