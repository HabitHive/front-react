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
  width: 320px;
  height: 48px;
  position: relative;
  top: ${props=>props.top}px;
  left: ${props=>props.left}px;
  background: #674DED;
  border: none;
  border-radius: 16px;

  color: white;
  font-weight: 700;
  font-size: 16px;
`