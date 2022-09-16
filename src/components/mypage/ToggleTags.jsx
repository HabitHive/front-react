import styled from "styled-components"

const ToggleTags = ({tags}) => {

  return(
    <>
      { tags.length === 0 ? <StTagHelpTxt> 해당하는 습관이 없습니다 </StTagHelpTxt> :
        tags.map((tag, i)=>{
          return(
            <StDoneTag key={i}>
              <p>{tag}</p>
            </StDoneTag>
          )
        })
      }
    </>
  )
}
export default ToggleTags

const StTagHelpTxt = styled.p`
  font-size: 14px;
  text-align: center;
  margin: auto;
  letter-spacing: -0.3px;
  color: #343434;
`

const StDoneTag =  styled.div`
  width: max-content;
  height: 22px;
  color: white;
  margin-right: 5px;
  background: linear-gradient(197.06deg, #907CF9 -6.2%, #6334FF 101.13%);
  border: 1px solid #674DED;
  border-radius: 6px;
  & p {
    font-weight: 400;
    font-size: 12px;
    letter-spacing: -0.3px;
    color: #FFFFFF;
    margin: 0 12px;
  }
`