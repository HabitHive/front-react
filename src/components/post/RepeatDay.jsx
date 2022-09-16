import { useState } from "react";
import styled from "styled-components";

const RepeatDay = ({
  repeatDayInput,
  checkInput,
  repeatId,
  inputCheck,
  setInputCheck,
}) => {
  // onChange함수를 사용하여 이벤트 감지, 필요한 인풋체크값 받아오기
  const inputCheckHandler = (checked, item) => {
    if (checked) {
      setInputCheck([...inputCheck, item]);
    } else if (!checked) {
      setInputCheck(inputCheck.filter((el) => el !== item));
    }
  };
  // console.log(inputCheck);
  return (
    <STRepeatDay>
      <div className="repeatDayArea">
        <input
          id={repeatDayInput}
          className="sunCheck"
          type="checkbox"
          //onChange이벤트가 발생하면 check여부와 value(data)값을 전달하여 배열에 data를 넣어준다.
          onChange={(e) => {
            inputCheckHandler(e.target.checked, repeatId);
          }}
          //체크표시 & 해제를 시키는 로직. 배열에 data가 있으면 true, 없으면 false
          checked={inputCheck.includes(repeatId) ? true : false}
        />
        <label
          htmlFor={repeatDayInput}
          className="sunLabel"
          // onClick={() => {
          //   checkInput.current.includes(repeatDayInput);
          // }}
        >
          {repeatDayInput}
        </label>
      </div>
    </STRepeatDay>
  );
};

export default RepeatDay;

const STRepeatDay = styled.div`
  width: 100%;
  padding: 0 20px;
  margin-top: 24px;
  & .repeatDayText {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
  }
  & .repeatDayArea {
    /* background-color: #eeeeee; */
    margin-top: 8px;
    display: flex;
    & label {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #ebebeb; //미클릭시 배경 초기색
      /* color: #fff; */
      color: black;
      border: none;
      border-radius: 50%;
      box-sizing: border-box;
      cursor: pointer;
      /* width: 80%;
        height: 80%; */
      width: 50px;
      height: 50px;
      padding: 9px;
      margin: 0 16px 0 0;
      &:last-child {
        margin: 0;
      }
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
  }
`;
