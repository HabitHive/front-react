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
import Month from "react-live-clock";

// 당일기준 해당 월의 마지막 날까지 출력하기 위한 반복함수
const GetAllDate = (today, lastday) => {
  let dates = [];

  dates[0] = today;
  for (let i = 1; i <= 6; i++) {
    today++;
    //마지막 날보다 날짜가 클경우 today를 1로 초기화.
    if (today > lastday) {
      today = 1;
      dates[i] = today;
    }
    //일반 경우 그냥 날짜 추가
    else {
      dates[i] = today;
    }
  }

  //요일 정상적으로 뜨는지 확인해보자
  // console.log(dates[0]);
  // dates[1].getDay()

  return dates;
};

//요일 표시
const GetAllWeek = (todayweek) => {
  let strweek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let weeklist = [];

  //첫번째 오늘 날짜 적용
  weeklist[0] = strweek[todayweek];
  // console.log(weeklist);

  for (let i = 1; i <= 6; i++) {
    todayweek++;
    if (todayweek > 6) {
      todayweek = 0;
      weeklist[i] = strweek[todayweek];
    } else {
      weeklist[i] = strweek[todayweek];
    }
  }

  return weeklist;
};
let now = new Date();
const WeekCalendar = (props) => {
  const todayweek = now.getDay(); //오늘의 요일 숫자 ( 0(일) ~ 6(토) )
  const today = now.getDate(); //오늘날짜
  const lastday = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate(); //이번달 마지막날짜 //31,없으면 []

  const [daylist, setDaylist] = useState([]); //이번달 남은날짜
  const [weeklist, setWeeklist] = useState([]);

  const thisMonth = now.getMonth() + 1; //이번달숫자 (0부터 시작이라 +1)
  // const monthNameShort = now.toLocaleString("en-US", { month: "short" }); //이번달 영어로 3자리표현
  const monthNameLong = now.toLocaleString("en-US", { month: "long" }); //이번달 영어로 풀
  const thisWeekDay = now.getDay(); //오늘의 요일 숫자( 0(일) ~ 6(토))
  console.log(now.toString().slice(0, 3)); // 영어 형식으로 요일 받아오기 //Tue
  const currentTime =
    now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds(); //현재시각 24시표현법:nn분:nn초

  const getList = useCallback(() => {
    setDaylist(daylist.concat(today));
  }, [today, daylist]);

  //전체날의 배열을 한번만 저장해서 실행함.
  const alldate = useMemo(() => GetAllDate(today, lastday), [daylist]);
  // console.log(alldate); //[1,2,3...7]
  // const alldate = useEffect(() => GetAllDate(today,lastday),[daylist]);

  const allweek = useMemo(() => GetAllWeek(todayweek), [weeklist]);
  // console.log(allweek); // ['Tue', ~,'Wed']

  const CalendarDay = GetAllDate(today, lastday);
  const CalendarWeek = GetAllWeek(todayweek);

  // console.log(CalendarDay[0]); //31
  // console.log(CalendarWeek[0]); //Wed

  // /*날짜와 요일을 같이 표시하기위해서 만들어 놓은 객체
  // 날짜를 하나씩 출력해서 객체로 만들기위해서 함수를 실행시킨뒤
  // 분해로 하나씩 넣는 방법을 사용했음 */
  const CalendarObject = [
    { week: CalendarWeek[0], day: CalendarDay[0] },
    { week: CalendarWeek[1], day: CalendarDay[1] },
    { week: CalendarWeek[2], day: CalendarDay[2] },
    { week: CalendarWeek[3], day: CalendarDay[3] },
    { week: CalendarWeek[4], day: CalendarDay[4] },
    { week: CalendarWeek[5], day: CalendarDay[5] },
    { week: CalendarWeek[6], day: CalendarDay[6] },
  ];
  // console.log(CalendarObject);
  // console.log(CalendarObject[0]); //{week: 'Wed', day: 31}
  // console.log(CalendarObject.day); //undefined
  // console.log(CalendarObject[0].week); //Wed
  // console.log(CalendarObject[0].day); //31

  useEffect(() => {
    // return () => console.log("Clean up");
  }, []);

  const Week = useRef(null);

  return (
    <STWeekCalender>
      <StCalendar>
        <div className="Year-Month">
          <p>
            <span className="Year">
              {/* <Year
                id="Year"
                format={"YYYY"} //년도 형식 ( 2022 ) , 4글자
                ticking={false} // true 시 오류남
                // timezone={"KR/Pacific"}
                interval={0} //시간 자동업데이트 기간. 1000ms가 기본값. 0은 비활성화
              /> */}
            </span>
            &nbsp;&nbsp;
            <span className="Month">
              <Month
                format={"MMM"}
                ticking={false}
                // timezone={"KR/Pacific"}
                interval={0}
              />
            </span>
          </p>
        </div>

        {/* <span>
          <Day
            format={"DD"}
            ticking={false}
            // timezone={"KR/Pacific"}
            interval={0}
          />
        </span> */}

        {/* <span>
              {thisYear}년 &nbsp;&nbsp;
              {thisMonth}월 &nbsp;&nbsp;
              {monthNameShort}&nbsp;&nbsp;
              {now.getDate()}일&nbsp;&nbsp;
              {now.toString().slice(0, 3)}
            </span>
            <br /> */}

        <DayContainer className="Day" onChange={getList}>
          <div className="daylistContainer">
            <button>
              <FaChevronLeft />
            </button>
            <div>
              {CalendarObject.map((calendarItem, index) => (
                <div className="daylistSelector" key={index}>
                  <div
                    className="week"
                    // ,
                    // CalendarObject.week === "Sun" ? "Sun" : "week",
                    // CalendarObject.week === "Sat" ? "Sat" : "week"
                    ref={Week}
                  >
                    {calendarItem.week}
                  </div>

                  <div className="day">{calendarItem.day}</div>
                </div>
              ))}
            </div>
            <button>
              <FaChevronRight />
            </button>

            {/* <div>
              {alldate.map((value, item) => {
                return (
                  <span
                    className="Daylist"
                    key={item}
                    style={{ cursor: "pointer" }}
                  >
                    {value}
                  </span>
                );
              })}
            </div> */}
            {/* <div className="weeklistContainer">
              {allweek.map((value, index) => (
                <span
                  className="Weeklist"
                  key={index}
                  style={{ cursor: "pointer" }}
                  value={value}
                >
                  {value}
                </span>
              ))}
            </div> */}

            {/* {CalendarObject.map((calendar, item) => (
              <div>
                <div className="cn" key={item}>
                  {calendar.week}
                </div>
                <div className="cn" key={item}>
                  {calendar.day}
                </div>
              </div>
            ))} */}
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
  & .Year-Month {
    font-style: italic;
    color: #1864ab;
    & .Month {
      position: absolute;
      font-style: normal;
      font-weight: 700;
      font-size: 12px;
      line-height: 14px;
      text-align: center;
    }
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
        border-radius: 50%;
        size: small;
      }
    }
    /* 오늘자 기준 날짜 배열 Daylist */
    & .daylistSelector {
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

      &:hover {
        background: linear-gradient(197.06deg, #907cf9 -6.2%, #6334ff 101.13%);
        color: white;
        & .week {
          color: white;
        }
        & .day {
          color: white;
        }
      }

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
      }
    }
  }
`;

const DayContainer = styled.div`
  display: block;
`;
