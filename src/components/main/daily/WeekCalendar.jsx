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

const WeekCalendar = () => {
  const now = new Date();
  const todayWeek = now.getDay(); //일주일
  const today = now.getDate(); //오늘날짜
  const lastday = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate(); //이번달의 마지막날짜

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
    // console.log(dates[1].getDay());

    return dates;
  };

  //요일 표시 평일 검정색, 토요일 파란색, 일요일 빨간색
  const GetAllWeek = (todayWeek) => {
    let strWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let weeklist = [];

    //첫번째 오늘 날짜 적용

    weeklist[0] = strWeek[todayWeek];

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

  const CalendarDay = GetAllDate(today, lastday);
  const CalendarWeek = GetAllWeek(todayWeek);

  /*⭐⭐날짜와 요일을 같이 표시하기위해서 만들어 놓은 객체
  날짜를 하나씩 출력해서 객체로 만들기위해서 함수를 실행시킨뒤
  분해로 하나씩 넣는 방법을 사용했음 ⭐⭐*/
  const CalendarObject = [
    { weak: CalendarWeek[0], day: CalendarDay[0] },
    { weak: CalendarWeek[1], day: CalendarDay[1] },

    { weak: CalendarWeek[2], day: CalendarDay[2] },
    { weak: CalendarWeek[3], day: CalendarDay[3] },
    { weak: CalendarWeek[4], day: CalendarDay[4] },
    { weak: CalendarWeek[5], day: CalendarDay[5] },
    { weak: CalendarWeek[6], day: CalendarDay[6] },
  ];

  useEffect(() => {
    return () => console.log("Clean up");
  }, []);

  const Week = useRef(null);

  return (
    <div>
      <div className="Year-Month">
        <p>
          <span className="Year">
            <Year
              id="Year"
              format={"YYYY"}
              ticking={false}
              timezone={"KR/Pacific"}
            />
          </span>
          &nbsp;&nbsp;
          <span className="Month">
            <Month format={"MMM"} ticking={false} timezone={"KR/Pacific"} />
          </span>
        </p>
      </div>
    </div>
  );
};

export default WeekCalendar;
