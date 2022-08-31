import styled from "styled-components";
import { BiCalendar } from "react-icons/bi";

import React, {
  Component,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import Year from "react-live-clock";
import Month from "react-live-clock";
import Day from "react-live-clock";
import { nanoid } from "nanoid";

import Moment from "react-moment";
import "moment-timezone";
import moment from "moment-timezone";
// import timezone from "timezone";

let now = new Date();

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

//요일 표시 평일 검정, 토요일 파랑, 일요일/공휴일 빨강
const GetAllWeek = (todayWeek) => {
  let strWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let weeklist = [];

  //첫번째 오늘 날짜 적용
  weeklist[0] = strWeek[todayWeek];
  //todayWeak=5
  //weaklist[0] = Fri

  for (let i = 1; i <= 6; i++) {
    todayWeek++;
    if (todayWeek > 6) {
      todayWeek = 0;
      weeklist[i] = strWeek[todayWeek];
    } else {
      weeklist[i] = strWeek[todayWeek];
    }
  }

  return weeklist;
};

const WeekCalendar = (props) => {
  // const timezone = now.getTimezoneOffset();
  // console.log(timezone); //-540 (분) 나오는데 60으로 나누면, -9 시간 UTC보다 9시간빠른것
  console.log(new Date()); //Tue Aug 30 2022 16:45:45 GMT+0900 (한국 표준시)
  // console.log(moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss")); //2022-08-30 17:16:38
  // console.log(moment().tz("Asia/Seoul").utc().format("YYYY-MM-DD HH:mm:ss")); //2022-08-30 08:18:10
  // console.log(moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss Z")); //2022-08-30 17:20:10 +09:00

  // const [today, setToday] = useState(now.getDate());
  // const [lastday, setLastDay] = useState(
  //   new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
  // );
  const todayWeek = now.getDay();
  const today = now.getDate();
  const lastday = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

  const [daylist, setDaylist] = useState([]); //이번달 남은날짜
  const [weeklist, setWeeklist] = useState([]);

  const thisYear = now.getFullYear(); //올해
  // console.log(thisYear); //2022
  const thisMonth = now.getMonth() + 1; //이번달 (0부터 시작이라 +1)
  // console.log(thisMonth); //8
  const monthNameShort = now.toLocaleString("en-US", { month: "short" });
  // console.log(monthNameShort);
  const thisWeek = now.getDay(); //이번주 요일 ( 0(일) ~ 6(토) )
  // console.log(todayWeek); //2 =>화요일
  // const weekNameShort = new Intl.DateTimeFormat
  // console.log(new Intl.DateTimeFormat("en-US").format(now));//  8/30/2022
  // console.log(now.toString().slice(0, 3)); // 영어 형식으로 요일 받아오기 //Tue
  // const today = now.getDate(); //오늘날짜
  // console.log(today); //30
  const currentTime =
    now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
  // console.log(todayTime); //20:40:23
  // const lastday = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate(); //이번달의 마지막날짜
  // console.log(lastday); //31

  const getList = useCallback(() => {
    setDaylist(daylist.concat(today));
  }, [today, daylist]);

  //전체날의 배열을 한번만 저장해서 실행함.
  const alldate = useMemo(() => GetAllDate(today, lastday), [daylist]);
  console.log(alldate);

  const allweek = useMemo(() => GetAllWeek(todayWeek), [weeklist]);

  const CalendarDay = GetAllDate(today, lastday);
  const CalendarWeek = GetAllWeek(todayWeek);

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
  console.log(CalendarObject);
  console.log(CalendarObject[0]); //{week: 'Wed', day: 31}
  console.log(CalendarObject.day); //undefined
  console.log(CalendarObject[0].week); //Wed
  console.log(CalendarObject[0].day); //31

  useEffect(() => {
    return () => console.log("Clean up");
  }, []);

  const Week = useRef(null);
  // const unixTimestamp = 1661820402;
  return (
    <div>
      <StCalendar>
        <div className="Year-Month">
          <p>
            <span className="Year">
              <Year
                id="Year"
                format={"YYYY"} //년도 형식 ( 2022 ) , 4글자
                ticking={false} // true 시 오류남
                // timezone={"KR/Pacific"}
                interval={0} //시간 자동업데이트 기간. 1000ms가 기본값. 0은 비활성화
              />
            </span>
            {/* <span>
            <Moment unix tz="Asia/Seoul">
              {unixTimestamp}
            </Moment>
          </span> */}
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
          <div className="CalendarIconContainer">
            {/* <button className="calendarButton"></button> */}
            {/* 버튼은 이벤트용 안보이게 만듦 */}
            <span className="CalendarIconText">전체 보기</span>
            <BiCalendar className="calendarIcon" />
          </div>
        </DayContainer>
      </StCalendar>
    </div>
  );
};

export default WeekCalendar;

const StCalendar = styled.div`
  margin-bottom: 140px;
  /* padding-left: 40px; */
  justify-content: center;
  align-items: center;
  text-align: center;

  height: 20vh;
  width: 100%;
  overflow: initial;
  & .Year-Month {
    font-style: italic;
    color: #1864ab;
    .Year {
      font-size: 2.4rem;
    }
    & .Month {
      font-size: 1.55rem;
    }
  }

  /* 캘린더 일전체 컨테이너 */
  & .Day {
    position: relative;
    justify-content: center;
    align-content: center;
    text-align: center;
    float: left;
    width: auto;
    height: 3.5rem;
    font-size: 1.4rem;
    color: #009600;
    /* color: #005096; */
    left: 17%;

    /* 오늘자 기준 날짜 배열 Daylist */
    .daylistSelector {
      justify-content: center; //수평 중앙 정렬
      align-items: center; //수직 중앙 정렬
      text-align: center;
      float: left;
      margin-left: 4rem;
      cursor: pointer;

      width: 70px;
      height: 110px;

      border-radius: 40px;
      padding-top: 40px;

      .Sun {
        color: red !important;
      }
      .Sat {
        color: #156fb9 !important;
      }

      &:hover {
        background: rgb(12, 86, 129);
        color: white;
        .week {
          color: white;
        }
      }

      &:nth-child(1) {
        border: 0.04rem solid rgb(12, 86, 129);
      }
      .week {
        justify-content: center; //수평 중앙 정렬
        align-items: center; //수직 중앙 정렬
        text-align: center;
        font-size: 0.8em;
        color: black;
        margin-bottom: 20px;
      }
      .day {
        font-weight: bold;
      }
    }

    .CalendarIconContainer {
      justify-content: center;
      align-items: center;
      position: absolute;

      width: 150px;
      height: 100px;
      font-style: bold;
      cursor: pointer;
      color: #353535;

      .CalendarIconText {
        font-size: 23px;
      }
      .CalendarIconSpan {
        position: absolute;
        left: 50%;
        right: 40%;
        margin-top: 40px;

        /* 실제 버튼처럼 보이는 아이콘 */
        .calendarIcon {
          color: #3535;
          text-align: center;
          margin-bottom: -12px;
          font-size: 3rem;
          cursor: pointer;
        }
      }
    }
  }
`;

const DayContainer = styled.div`
  display: block;
`;
