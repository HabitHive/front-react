import styled from "styled-components";

const SaveButton = (props) => {
  return <StButton onClick={props.onClick}>{props.btnName}</StButton>;
};
export default SaveButton;

const StButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 224px;
  height: 48px;
  color: #fff;

  background-color: #674ded;
  box-shadow: 2px 2px 8px 2px rgba(88, 56, 255, 0.25);
  border-radius: 16px;
  border: none;
`;
