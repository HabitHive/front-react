import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "@mobiscroll/react-lite/dist/css/mobiscroll.min.css";
// import {
//   Datepicker,
//   Button,
//   Page,
//   setOptions,
//   localeKo,
// } from "@mobiscroll/react-lite";
import moment from "moment";

// setOptions({
//   locale: localeKo,
//   theme: "ios",
//   themeVariant: "light",
// });
let now = new Date();
const MonthlyCalendar = () => {
  // const [openPicker, setOpenPicker] = React.useState(false);
  // const [date, setDate] = React.useState(new Date());
  const [value, onChange] = useState(now);
  const today = now.getDate();

  // const show = () => {
  //   setOpenPicker(true);
  // };

  // const onClose = () => {
  //   setOpenPicker(false);
  // };

  return (
    <div>
      <Calendar onChange={onChange} value={value} minDate={new Date(today)} />
      <div className="clickdate">{moment(value).format("MM월 DD일")}</div>
      <div>
        <p>My tag</p>
      </div>
      {/* 
      <Datepicker controls={["calendar"]} display="inline" />
      <Datepicker controls={["time"]} stepMinute={30} touchUi={true} /> */}
    </div>
  );
};

export default MonthlyCalendar;
