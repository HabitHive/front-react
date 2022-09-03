import { FiChevronLeft } from "react-icons/fi";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

let now = new Date();
const PostingPage = () => {
  const [startDate, setStartDate] = useState(new Date(now));
  const [endDate, setEndDate] = useState(new Date(now));

  return (
    <div>
      <div className="headercontainer">
        <FiChevronLeft />
        <span>데일리 설정</span>
      </div>
      <BodyContainer>
        <div className="tagtitle"> 운동하기 ( 30일 )</div>
        <div className="startdate">
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
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
        </div>
        <div className="starttime">
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
        <div className="endtime"></div>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          timeCaption="Time"
          dateFormat="h:mm aa"
        />
        <div className="enddate"></div>
        <div className="repeatday"></div>
      </BodyContainer>
      <button>저장</button>
    </div>
  );
};

export default PostingPage;

const BodyContainer = styled.div`
  /* justify-content: center; */

  .tagtitle {
    background-color: coral;
    border-radius: 10px;
    width: 400px;
    height: 30px;
    display: flex;
    /* text-align: center; */
    justify-content: center;
    align-items: center;
  }
`;
