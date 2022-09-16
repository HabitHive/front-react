import styled from "styled-components"

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
  width: 18px;
  height: 18px;
  background-color: #674DED;;
  border-radius: 100%;
  margin-right: 6px;
  float: left;

  display: flex;
  align-items: center;
  justify-content: center;
  
  color: white;
  font-size: 10px;
  font-weight: 600;
  text-align: center;
`