import styled from "styled-components"

const ToggleTags = ({tags}) => {

  return(
    <>
      { tags.length === 0 ? <StTagHelpTxt> 해당하는 습관이 없습니다 </StTagHelpTxt> :
        tags.map((tag, i)=>{
          return(
            <StDoneTag key={i}>
              {tag}
            </StDoneTag>
          )
        })
      }
    </>
  )
}
export default ToggleTags

const StTagHelpTxt = styled.p`
  font-size: 13px;
  text-align: center;
  margin: auto;
  color: #a5a5a5;
`

const StDoneTag =  styled.div`
  width: max-content;
  height: 30px;
  background-color: grey; 
  color: white;
  margin-left: 5px;
  padding: 5px 8px;
  border-radius: 5px;
`