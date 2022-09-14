import styled from "styled-components";
import Calendar from "react-calendar";
import "./Calendar.css";
import moment from "moment";

import React, { useState, useEffect } from "react";
import { __getDate } from "../../../redux/modules/date";
import { useDispatch } from "react-redux";

const MonthlyCalendar = () => {
  // const [date, setDate] = React.useState(new Date());
  const dispatch = useDispatch();
  const now = new Date();
  const [value, setValue] = useState(now);
  const today = now.getDate();

  const getDate = async () => {
    const pickDate = moment(value).format("YYYY-MM-DD");
    dispatch(__getDate(pickDate));
  };

  useEffect(() => {
    getDate();
  }, []);

  return (
    <>
      <Calendar
        onChange={(event) => {
          setValue(event);
          getDate();
        }}
        value={value}
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
