import { FiChevronLeft } from "react-icons/fi";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import Header from "../components/common/Header";

let now = new Date();
const PostingPage = () => {
  const [startDate, setStartDate] = useState(new Date(now));
  const [endDate, setEndDate] = useState(new Date(now));

  return (
    <div>
      {/* <FiChevronLeft /> */}
      <Header
        text={"데일리 설정"}
        // LeftText={<FiChevronLeft />}
      />
      <BodyContainer>
        <div className="tagTitle"> 운동하기 ( 30일 )</div>
        <div className="startDate">
          <span>시작날짜</span>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            // minDate={subDays(new Date(), 5)}
            // maxDate={addDays(new Date(), 5)}
            // excludeDateIntervals={[{start: subDays(new Date(), 5), end: addDays(new Date(), 5) }]}
            // calendarStartDay={0}
          />
          <div className="endDate">
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </div>
        </div>
        <div className="startTime">
          <span>시작시간</span>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="Time"
            dateFormat="h:mm aa"
          />
        </div>
        <div className="endTime">
          <span>종료시간</span>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="Time"
            dateFormat="h:mm aa"
          />
        </div>
        <div className="expireDay">
          <span>유효기간</span>
          <div className="expireDate"> 2022년 10월 30일까지</div>
        </div>
        <div className="repeatDay"></div>
      </BodyContainer>
      <Button>
        <button>저장</button>
      </Button>
    </div>
  );
};

export default PostingPage;

const HeaderContainer = styled.div``;

const BodyContainer = styled.div`
  /* justify-content: center; */
  display: flex;
  flex-direction: column;
  align-items: center;

  & .tagTitle {
    background-color: coral;
    border-radius: 10px;
    display: flex;
    /* text-align: center; */
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 30px;
  }
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
`;
