import styled from "styled-components"

const SubmitBtn = (props) => {
  return(
    <StSubmitBtn onClick={props.onClick}>
      {props.btnName}
    </StSubmitBtn>
  )
}
export default SubmitBtn

const StSubmitBtn = styled.button`
  width: 100%;
  min-height: 55px;
  position: relative;
  top: 15%;
  cursor: pointer;
  border: none;
  font-size: 20px;
  font-weight: bolder;
`