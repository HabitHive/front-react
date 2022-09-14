import styled from "styled-components"

const SaveButtonLong = (props) => {
  return(
    <StSubmitBtn onClick={props.onClick} top={props.top} left={props.left}>
      {props.btnName}
    </StSubmitBtn>
  )
}
export default SaveButtonLong

const StSubmitBtn = styled.button`
  cursor: pointer;
  width: 320px;
  height: 48px;
  position: relative;
  top: ${props=>props.top}px;
  left: ${props=>props.left}px;
  border: 1px solid #674DED;
  border-radius: 16px;

  color: white;
  font-weight: 700;
  font-size: 16px;

  background: linear-gradient(197.06deg, #907cf9 -6.2%, #6334ff 101.13%);
  box-shadow: 2px 2px 10px 4px rgba(88, 56, 255, 0.25);
`