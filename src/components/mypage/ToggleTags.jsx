import styled from "styled-components"

const ToggleTags = ({tags}) => {

  return(
    <>
      {
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

const StDoneTag =  styled.div`
  width: max-content;
  height: 30px;
  background-color: grey; 
  color: white;
  margin-left: 5px;
  padding: 5px 8px;
  border-radius: 5px;
`