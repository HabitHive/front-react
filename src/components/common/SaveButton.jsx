import styled from "styled-components";

const SaveButton = (props) => {
  return <StButton onClick={props.onClick}>{props.btnName}</StButton>;
};
export default SaveButton;

const StButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  /* text-align: center; */
  cursor: pointer;
  width: 224px;
  height: 48px;
  color: #fff;
  transform: translateY(160px);

  /* 보라그라데이션 */
  background: linear-gradient(197.06deg, #907cf9 -6.2%, #6334ff 101.13%);
  border: 1px solid #674ded;
  box-shadow: 2px 2px 10px 4px rgba(88, 56, 255, 0.25);
  border-radius: 16px;
`;
