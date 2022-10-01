import styled from "styled-components"

const TagWeekday = ({weekData}) => {

  const checkedWeek = [];
  const weekday = ["일", "월", "화", "수", "목", "금", "토"]

  weekData.map((checked, i)=>{
    if (checked === true)
      return checkedWeek.push(weekday[i]) 
  })

  return(
    <>
      {
        checkedWeek.length === 0 ? 
        <StHelpTXT> 아직 등록하지 않은 습관입니다 </StHelpTXT> :
        <>
          {
            checkedWeek.map((checked, i)=>{
              return(
                <StStillTagWeek key={i}>
                  {checked}
                </StStillTagWeek>
              )
            })
          }
        </>
      }
    </>
  )
}
export default TagWeekday

const StHelpTXT = styled.p`
  color: #684ded63;
  font-size: 13px;
  font-weight: 500;  
`

const StStillTagWeek =  styled.div`
  width: 24px;
  height: 24px;
  background: #B3A5FF;
  border-radius: 4px;
  margin-right: 6px;
  float: left;

  display: flex;
  align-items: center;
  justify-content: center;
  
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  text-align: center;
`