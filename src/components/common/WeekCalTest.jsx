import { useState } from "react";

const WeekCalTest = () => {
  const [past, setPast] = useState(0);
  const [future, setFuture] = useState(6);

  let weekDate = [];
  let today = new Date();
  const yyyy = today.getFullYear();
  const mm = today.getMonth();
  const dd = today.getDate();

  for (let i = past; i < future; i++) {
    let weekCal = new Date(today.setFullYear(yyyy, mm, dd + i));
    weekDate.push({
      month: weekCal.toLocaleString("en-US", { month: "long" }),
      date: weekCal.getDate(),
      day: weekCal.toString().slice(0, 3),
      back: weekCal.toISOString().slice(0, 10),
    });
  }

  const changFuture = () => {
    setPast(past + 6);
    setFuture(future + 6);
  };

  const changPast = () => {
    setPast(past - 6);
    setFuture(future - 6);
  };

  return (
    <>
      <button onClick={changPast}>뒤로</button>
      <button onClick={changFuture}>앞으로</button>
      {weekDate.map((weekday, i) => {
        return (
          <p key={i}>
            {weekday.date} {weekday.day} {weekday.month}
          </p>
        );
      })}
    </>
  );
};
export default WeekCalTest;
