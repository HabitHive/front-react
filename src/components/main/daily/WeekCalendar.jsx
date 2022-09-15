import styled from "styled-components";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";

// 당일부터 해당 월의 마지막 날까지 출력
const GetAllDate = (today, lastDay) => {
  const dayList = [];
  for (let i = today; i <= lastDay; i++) {
    dayList.push(i);
  }
  return dayList;
};

// 당일 요일부터 시작하는 7일짜리 배열
const GetAllWeek = (todayWeekDay) => {
  const weekList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const thisWeek = [];
  const startWeek = weekList.indexOf(todayWeekDay);
  for (let i = startWeek; i < 7; i++) {
    thisWeek.push(i);
  }
  const arr1 = [weekList.slice(thisWeek[0])];
  for (let i = 0; i < startWeek; i++) {
    thisWeek.push(i);
  }
  const arr2 = [weekList.slice(0, startWeek)];
  const thisWeekList = [].concat(...arr1, ...arr2);
  return thisWeekList;
};

const WeekCalendar = (props) => {
  let now = new Date();
  const todayWeekDay = now.toString().slice(0, 3); //오늘의 요일 영어로 // Tue
  const today = now.getDate(); //오늘날짜
  const thisMonth = now.getMonth() + 1;
  console.log(thisMonth);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  //이번달 마지막날짜 //30or31 없으면(오늘이마지막날짜면) []
  const monthNameLong = now.toLocaleString("en-US", { month: "long" }); //이번달 영어로 풀

  const [daylist, setDaylist] = useState([]); //이번달 남은날짜
  const [weeklist, setWeeklist] = useState([]);
  const [pickDay, setPickDay] = useState();

  //daylist바뀌기 전에는 리렌더링돼도 getList실행 x
  const getList = useCallback(() => {
    setDaylist(daylist);
  }, [daylist]);

  const dayList = GetAllDate(today, lastDay);
  const thisWeekList = GetAllWeek(todayWeekDay);
  //전체 배열을 한번만 저장해서 실행함.
  // const alldate = useMemo(() => GetAllDate(today, lastday), [daylist]);
  // const allweek = useMemo(() => GetAllWeek(todayweek), [thisWeekList]);

  // console.log(alldate);

  // 날짜와 요일을 같이 표시( map돌리는 객체 )
  const CalendarObject = [
    { week: thisWeekList[0], day: dayList[0] },
    { week: thisWeekList[1], day: dayList[1] },
    { week: thisWeekList[2], day: dayList[2] },
    { week: thisWeekList[3], day: dayList[3] },
    { week: thisWeekList[4], day: dayList[4] },
    { week: thisWeekList[5], day: dayList[5] },
    // { week: thisWeekList[i], day: dayList[i] },
    // { week: thisWeekList[6], day: dayList[6] },
  ];
  console.log(CalendarObject);
  // console.log(CalendarObject[0]); //{week: 'Wed', day: 31}
  // console.log(CalendarObject[0].week); //Wed
  // console.log(CalendarObject[0].day); //31

  useEffect(() => {
    // return () => console.log("Clean up");
  }, []);

  const week = useRef(null);
  console.log(week);
  const day = useRef(null);

  const clickDate = (week, day) => {};

  return (
    <STWeekCalender>
      <StCalendar>
        <span className="Month">{monthNameLong}</span>
        <DayContainer className="Day" onChange={getList}>
          <div className="daylistContainer">
            <button>
              <FaChevronLeft />
            </button>
            <div>
              {/* {CalendarObject.map((calendarItem, index) => (
                <div
                  className="daylistSelector active"
                  key={index}
                  onClick={() => pickDate()}
                >
                  <div className="week" ref={week}>
                    {calendarItem.week}
                  </div>
                  <div className="day" ref={day}>
                    {calendarItem.day}
                  </div>
                </div>
              ))} */}
              {CalendarObject.map((calendarItem, index) => (
                <div
                  className="daylistSelector"
                  key={index}
                  onClick={() => clickDate()}
                  onChange={(e) => {
                    setPickDay({});
                  }}
                >
                  <STLabel>
                    <input
                      type="radio"
                      value={calendarItem.week}
                      name="period"
                      className="week"
                      ref={week}
                    />
                    {calendarItem.week}
                  </STLabel>
                  <STLabel>
                    <input
                      type="radio"
                      value={calendarItem.day}
                      name="period"
                      className="day"
                      ref={day}
                    />
                    {calendarItem.day}
                  </STLabel>
                </div>
              ))}
            </div>
            <button>
              <FaChevronRight />
            </button>
          </div>
        </DayContainer>
      </StCalendar>
    </STWeekCalender>
  );
};

export default WeekCalendar;
const STWeekCalender = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 15%;
`;
const StCalendar = styled.div`
  /* padding-left: 40px; */
  justify-content: center;
  align-items: center;
  text-align: center;

  width: 100%;
  overflow: initial;
  & .Month {
    /* position: absolute; */
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    color: #5039c8;
  }

  /* 캘린더 일전체 컨테이너 */
  & .Day {
    justify-content: center;
    align-content: center;
    text-align: center;

    /* width: 100%; */
    height: 3.5rem;
    font-size: 14px;
    /* left: 17%; */
    & .daylistContainer {
      display: flex;
      justify-content: space-between;
      & button {
        border: none;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: #ffffff;
        box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.08);
        cursor: pointer;
      }
    }
    /* 오늘자 기준 날짜 배열 Daylist */
    & .daylistSelector {
      /* overflow: auto; */
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      float: left;
      margin-right: 8px;
      cursor: pointer;

      width: 40px;
      height: 60px;
      border-radius: 8px;

      /* //today표현
      &:nth-child(1) {
        border: 0.04rem solid #6334ff;
      }
      & .week {
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 10px;
        color: #999999;
        margin-bottom: 6px;
      }
      & .day {
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
        text-align: center;
        color: #999999;
      } */

      /* //마우스 올렸을 때
      &:hover {
        background: linear-gradient(197.06deg, #907cf9 -6.2%, #6334ff 101.13%);
        color: white;
        & .week {
          color: white;
        }
        & .day {
          color: white;
        }
      } */
      //클릭했을 때
    }
    /* & .active {
      background: linear-gradient(197.06deg, #907cf9 -6.2%, #6334ff 101.13%);
      color: #fff;
      & .week {
        color: white;
      }
      & .day {
        color: white;
      }
    } */
  }
`;
const STLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  float: left;
  margin-right: 8px;
  cursor: pointer;

  width: 40px;
  height: 60px;
  border-radius: 8px;

  & input {
    visibility: hidden;
  }

  & .week {
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 10px;
    color: #999999;
    margin-bottom: 6px;
  }
  & .day {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: #999999;
  }
`;

const DayContainer = styled.div`
  display: block;
`;
