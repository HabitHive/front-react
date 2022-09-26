import { useEffect } from "react";
import styled from "styled-components";

const RepeatDay = ({
  repeatDayInput,
  repeatId,
  inputCheck,
  setInputCheck,
  weekCycle,
}) => {
  // 요일 체크시 색상 변경
  const inputCheckHandler = (checked, item) => {
    if (checked) {
      setInputCheck([...inputCheck, item]);
    } else if (!checked) {
      setInputCheck(inputCheck.filter((el) => el !== item));
    }
  };

  //체크했던 요일 정보 가져오기
  useEffect(() => {
    setInputCheck([...weekCycle.split(",").map((x) => parseInt(x))]);
  }, []);

  return (
    <STRepeatDay>
      <div className="repeatDayArea">
        <input
          id={repeatDayInput}
          className="sunCheck"
          type="checkbox"
          //check여부와 value(data)값을 전달하여 배열에 data 넣어줌
          onChange={(e) => {
            inputCheckHandler(e.target.checked, repeatId);
          }}
          //체크표시 & 해제
          checked={inputCheck.includes(repeatId) ? true : false}
        />
        <label htmlFor={repeatDayInput} className="sunLabel">
          {repeatDayInput}
        </label>
      </div>
    </STRepeatDay>
  );
};

export default RepeatDay;
const STRepeatDay = styled.div`
  margin: 0 16px 0 0;
  &:last-child {
    margin: 0;
  }
  & label {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ebebeb;
    color: black;
    border: none;
    border-radius: 50%;
    box-sizing: border-box;
    cursor: pointer;
    width: 32px;
    height: 32px;
    padding: 9px;
  }

  & .sunCheck {
    display: none;
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
    //요일 클릭시에 색 변경
    &:checked + label {
      background: linear-gradient(197.06deg, #907cf9 -6.2%, #6334ff 101.13%);
      color: #fff;
    }
  }
`;