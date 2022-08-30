import styled from "styled-components";

import React, {
  Component,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import Year from "react-live-clock";
import Month from "react-live-clock";
import Day from "react-live-clock";

import Moment from "react-moment";
import "moment-timezone";
import moment from "moment-timezone";
// import timezone from "timezone";

const WeekCalendar = () => {
  const now = new Date();
  // const timezone = now.getTimezoneOffset();
  // console.log(timezone); //-540 (분) 나오는데 60으로 나누면, -9 시간 UTC보다 9시간빠른것
  console.log(new Date()); //Tue Aug 30 2022 16:45:45 GMT+0900 (한국 표준시)
  // console.log(moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss")); //2022-08-30 17:16:38
  // console.log(moment().tz("Asia/Seoul").utc().format("YYYY-MM-DD HH:mm:ss")); //2022-08-30 08:18:10
  // console.log(moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss Z")); //2022-08-30 17:20:10 +09:00

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
  const today = now.getDate(); //오늘날짜
  // console.log(today); //30
  const curruntTime =
    now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
  // console.log(todayTime); //20:40:23
  const lastday = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate(); //이번달의 마지막날짜
  // console.log(lastday); //31
  const [daylist, setDaylist] = useState([]);
  const [weeklist, setWeeklist] = useState([]);

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
    console.log(dates);
    // dates[1].getDay()

    return dates;
  };

  // //요일 표시 평일 검정색, 토요일 파란색, 일요일 빨간색
  // const GetAllWeek = (todayWeek) => {
  //   let strWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  //   let weeklist = [];

  //   //첫번째 오늘 날짜 적용
  //   weeklist[0] = strWeek[todayWeek];

  //   for (let i = 1; i <= 6; i++) {
  //     todayWeek++;
  //     if (todayWeek > 6) {
  //       todayWeek = 0;
  //       weeklist[i] = strWeek[todayWeek];
  //     } else {
  //       weeklist[i] = strWeek[todayWeek];
  //     }
  //   }

  //   return weeklist;
  // };

  // const CalendarDay = GetAllDate(today, lastday);
  // const CalendarWeek = GetAllWeek(todayWeek);

  // /*⭐⭐날짜와 요일을 같이 표시하기위해서 만들어 놓은 객체
  // 날짜를 하나씩 출력해서 객체로 만들기위해서 함수를 실행시킨뒤
  // 분해로 하나씩 넣는 방법을 사용했음 ⭐⭐*/
  // const CalendarObject = [
  //   { weak: CalendarWeek[0], day: CalendarDay[0] },
  //   { weak: CalendarWeek[1], day: CalendarDay[1] },

  //   { weak: CalendarWeek[2], day: CalendarDay[2] },
  //   { weak: CalendarWeek[3], day: CalendarDay[3] },
  //   { weak: CalendarWeek[4], day: CalendarDay[4] },
  //   { weak: CalendarWeek[5], day: CalendarDay[5] },
  //   { weak: CalendarWeek[6], day: CalendarDay[6] },
  // ];

  // useEffect(() => {
  //   return () => console.log("Clean up");
  // }, []);

  // const Week = useRef(null);
  const unixTimestamp = 1661820402;
  return (
    <div>
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
          <br />
          <span>
            <Day
              format={"DD"}
              ticking={false}
              // timezone={"KR/Pacific"}
              interval={0}
            />
          </span>
          <br />
          <span>
            {thisYear}년 &nbsp;&nbsp;
            {thisMonth}월 &nbsp;&nbsp;
            {monthNameShort}&nbsp;&nbsp;
            {now.getDate()}일&nbsp;&nbsp;
            {now.toString().slice(0, 3)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default WeekCalendar;
