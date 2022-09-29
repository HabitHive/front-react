import styled from "styled-components"

const SaveButtonLong = (props) => {

  return(
    <StSubmitBtn onClick={props.onClick} top={props.top} left={props.left}>
      {props.btnName}
    </StSubmitBtn>
  )
}
export default SaveButtonLong

export const StSubmitBtn = styled.button`
  cursor: pointer;
  width: 100%;
  height: 48px;

  background: #674DED;
  border: none;
  border-radius: 16px;

  color: #FFFFFF;
  font-weight: 700;
  font-size: 16px;
`