import styled from "styled-components"

import { useRef, useState } from "react"

const TagWeekday = ({weekData}) => {
  // const [checkedWeek, setCheckedWeek] = useState([]);
  const checkedWeek = [];
  const weekday = ["월", "화", "수", "목", "금", "토", "일"]

  weekData.map((checked, i)=>{
    if (checked === true)
      return checkedWeek.push(weekday[i]) 
  })

  return(
    <>
      {checkedWeek.map((checked, i)=>{
        return(
          <StStillTagWeek key={i}>
            {checked}
          </StStillTagWeek>
        )
      })
      }
    </>
  )
}
export default TagWeekday

const StStillTagWeek =  styled.div`
  background-color: #b9b9b9;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  font-size: 12px;
  text-align: center;
  margin: 0 2px;
`