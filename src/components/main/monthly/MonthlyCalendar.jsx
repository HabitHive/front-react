import Calendar from "react-calendar";
import "./Calendar.css";
import moment from "moment";

import React, { useState, useEffect } from "react";
import { __getMonth } from "../../../redux/modules/month";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const MonthlyCalendar = () => {
  const now = new Date();
  const dispatch = useDispatch();
  const [value, onChange] = useState(now);
  console.log(value);
  const [pickDate, SetPickDate] = useState(moment(value).format("YYYY-MM-DD"));

  const today = now.getDate();
  const piDate = useSelector((state) => state.getMonth);

  // const getMonth = async () => {
  //   dispatch(__getMonth(pickDate));
  // };

  // const getDay = async () => {
  //   // dispatch(__getDayTag());
  // };

  // useEffect(() => {
  //   getMonth();
  // }, []);

  return (
    <>
      <Calendar
        onChange={onChange}
        value={value}
        // onClickDay={(value) => {
        //   setValue(value.toISOString().split("T")[0]);
        // }}
        // ondblclick ={(event) => {
        // }}
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
