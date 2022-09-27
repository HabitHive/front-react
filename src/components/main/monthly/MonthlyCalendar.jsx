import Calendar from "react-calendar";
import "./Calendar.css";

import React, { useState, useEffect } from "react";
import { __getMonth } from "../../../redux/modules/month";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { __getMyDaily } from "../../../redux/modules/dailytag";

const MonthlyCalendar = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const now = new Date();
  const [value, onChange] = useState(now);
  const today = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);

  // const pickMonth = useSelector((state) => state.getMonth.getDate);
  // console.log(pickMonth.data.result);

  const pickDate = (value) => {
    const pick = new Date(value.getTime() - value.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);
    dispatch(__getMyDaily(pick));
  };

  const dbClickDate = (value) => {
    const clickDate = new Date(
      value.getTime() - value.getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, 10);
    navigator("/", { state: clickDate });
  };

  return (
    <>
      <Calendar
        onChange={onChange}
        value={value}
        onClickDay={pickDate}
        ondblclick={dbClickDate}
        minDate={new Date(today)}
        showNeighboringMonth={false}
        calendarType="US" //일요일 시작
        prev2Label={null} //년도변경버튼 숨기기
        next2Label={null} //년도변경버튼 숨기기
        locale="en"
      />
    </>
  );
};

export default MonthlyCalendar;
