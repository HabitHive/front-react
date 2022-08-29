import { useState } from "react";

const now = new Date();
const todayWeek = now.getDay(); //일주일
const today = now.getDate(); //오늘날짜
const lastday = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate(); //이번달의 마지막날짜

// const [daylist, setDaylist] = useState([]);
// const [weeklist, setWeeklist] = useState([]);

const weekCalendar = (today, lastday) => {
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
  console.log(today);

  return <div>dates</div>;
};

export default weekCalendar;
