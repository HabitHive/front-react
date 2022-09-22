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
import { useDispatch } from "react-redux";
import { __getMyTags } from "../../../redux/modules/mytag";

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

// const GetAllMonth = (monthNameLong) => {
//   const monthList = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "september",
//     "October",
//     "November",
//     "December",
//   ];
//   const thisMonth = [];
//   const startMonth = monthList.indexOf(monthNameLong);
//   console.log(startMonth);
//   for (let i = startMonth; i < 12; i++) {
//     thisMonth.push(i);
//   }
//   const arr1 = [monthList.slice(thisMonth[0])];
//   for (let i = 0; i < startMonth; i++) {
//     thisMonth.push(i);
//   }
//   const arr2 = [monthList.slice(0, startMonth)];
//   const thisMonthList = [].concat(...arr1, ...arr2);
//   return thisMonthList;
// };

const WeekCalendar = (todayDate, value) => {
  const dispatch = useDispatch();
  let now = new Date();
  const todayWeekDay = now.toString().slice(0, 3); //오늘의 요일 영어로 // Tue
  const today = now.getDate(); //오늘날짜
  const thisMonth =
    now.getMonth() + 1 > 9 ? now.getMonth() + 1 : "0" + (now.getMonth() + 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  //이번달 마지막날짜 //30or31 없으면(오늘이마지막날짜면) []
  const monthNameLong = now.toLocaleString("en-US", { month: "long" }); //이번달 영어로 풀
  const [daylist, setDaylist] = useState([]); //이번달 남은날짜
  const [weeklist, setWeeklist] = useState([]);
  const [pickDay, setPickDay] = useState({ pickDate: 0 });
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
  // console.log(CalendarObject);

  useEffect(() => {
    // return () => console.log("Clean up");
  }, []);

  const week = useRef(null);
  // console.log(week); //고쳐야함
  const day = useRef(null);

  //날짜 클릭시 해당날짜 데이터 보내기
  // const clickDate =
  //   ((day) => {
  //     dispatch(__getMyTags(day));
  //   },
  //   []);

  const clickDate = (day) => {
    console.log(day)
  }

  //input radio value 값 가져오기
  const pickDayHandleChange = (e) => {
    setPickDay({
      pickDate: e.target.value,
      pickMonth:
        now.getMonth() + 1 > 9
          ? now.getMonth() + 1
          : "0" + (now.getMonth() + 1),
      pickyear: now.getFullYear(),
    });
  };
  // console.log(pickDay);

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
                  className={
                    { value } === calendarItem.day
                      ? "active"
                      : "daylistSelector"
                  }
                  key={index}
                  onClick={() => clickDate(calendarItem.day)}
                >
                  <STLabel>
                    <input
                      type="radio"
                      className="week"
                      name="asdf"
                      value={calendarItem.week}
                      // checked={setPickDay[name] === calendarItem.week}
                      // onChange={pickDayHandleChange}
                      ref={week}
                    />
                    {calendarItem.week}
                  </STLabel>
                  <STLabel>
                    <input
                      type="radio"
                      className="day"
                      name={value}
                      value={calendarItem.day}
                      checked={setPickDay[value] === calendarItem.day}
                      onChange={pickDayHandleChange}
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
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  overflow: initial;
  & .Month {
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    color: #5039c8;
  }

  /* 주간캘린더 일전체 컨테이너 */
  & .Day {
    justify-content: center;
    align-content: center;
    text-align: center;
    height: 3.5rem;
    font-size: 14px;

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
        &:nth-child(1) {
          margin-right: 8px;
        }
      }
    }
    /* 하루짜리 날짜 배열 Daylist */
    & .daylistSelector {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      float: left;
      margin-right: 4px;
      width: 40px;
      height: 60px;
      border-radius: 8px;
      background: #ffffff;
      box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.08);
      color: #999999;

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

      //마우스 올렸을 때
      &:hover {
        background: #5039c8;
        color: white;
        & .week {
          color: white;
        }
        & .day {
          color: white;
        }
      }
      //클릭했을 때
      &:active {
        background: linear-gradient(197.06deg, #907cf9 -6.2%, #6334ff 101.13%);
        color: #fff;
        & .week {
          color: white;
        }
        & .day {
          color: white;
        }
      }
    }
  }
`;
const STLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  float: left;
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
