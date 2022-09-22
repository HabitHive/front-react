import { useState } from "react";

const WeekCalTest = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(6);

  let weekArr = [];

  let today = new Date();
  const yyyy = today.getFullYear();
  const mm = today.getMonth();
  const dd = today.getDate();

  for (let i=a; i<b; i++) {
    let weekCal = new Date(today.setFullYear(yyyy,mm,(dd+i))).toISOString().slice(0,10)
    weekArr.push(weekCal)
  }

  const changAB = () => {
    setA(a+6)
    setB(b+6)
  }

  const changAB2 = () => {
    setA(a-6)
    setB(b-6)
  }

  return(
    <>
    <button
      onClick={changAB2}
    >뒤로</button>
    <button
      onClick={changAB}
    >앞으로</button>
    {
      weekArr.map((week, j)=>{
        return(
          <p key={j}>
            {week}
          </p>
        )
      })
    }
    </>
  )
 }
 export default WeekCalTest