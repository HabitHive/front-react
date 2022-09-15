import styled from "styled-components";
import Header from "../common/Header";
import calendarImg from "../../assets/images/calendar.png";
import timeImg from "../../assets/images/timeIcon.png";
import SaveButton from "../common/SaveButton";
import RepeatDay from "./RepeatDay";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes } from "date-fns";

import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { __getSchedule } from "../../redux/modules/post";
let now = new Date();
const PostForm = () => {
  const dispatch = useDispatch();
  const [startTime, setStartTime] = useState(null); //null값이어야 placeholder내용 보임
  const [endTime, setEndTime] = useState(null);
  // if (startTime) {
  //   console.log(startTime.getHours());
  // }
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [schedule, setSchedule] = useState([]);

  const weekday = ["일", "월", "화", "수", "목", "금", "토"];
  const checkInput = useRef([]);

  // 시작날짜 선택시 습관이 며칠짜리인지에 따라 자동으로 범위선택됨
  const dateRange = (update) => {
    const firstDate = new Date(update[0]);
    const lastDate = firstDate.setDate(firstDate.getDate() + 29);
    // console.log(new Date(lastDate));
    setStartDate(update[0]);
    setEndDate(new Date(lastDate));
  };

  // const starttime = [startTime.getHours() + ":" + startTime.getMinutes()];
  // const endtime = [endTime.getHours() + ":" + endTime.getMinutes()];
  // const startyear = [startDate.getFullYear()];
  // const startmoth = [
  //   startDate.getMonth() + 1 > 9
  //     ? now.getMonth() + 1
  //     : "0" + (now.getMonth() + 1),
  // ];
  // const startdate = [
  //   startDate.getDate() > 9 ? now.getDate() : "0" + now.getDate(),
  // ];
  // const startday = [startyear + "-" + startmoth + "-" + startdate];
  // const repeatDay = checkInput.current;
  // console.log(repeatDay);

  const savePost = () => {
    // setSchedule([startDate, startTime, endTime, inputCheck]);
    dispatch(__getSchedule([startDate, startTime, endTime, inputCheck]));
  };

  //체크값 상태관리
  const [inputCheck, setInputCheck] = useState([]);

  return (
    <div>
      <Header text={"데일리 설정"} />
      <BodyContainer>
        <div className="tagTitle"> 운동하기 ( 30일 )</div>
        <div className="startDate">
          <span className="startDateText">날짜 설정</span>
          <DatePicker
            className="startDateInput"
            calendarImg={calendarImg}
            selected={startDate}
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            dateFormat="yyyy.MM.dd" // 날짜 표현 형식
            minDate={now} //시작일은 최소 오늘날짜 이후만 가능 (오늘 날짜 가능)
            onChange={dateRange}
            placeholderText="날짜 설정하기"
          />
        </div>
        <div className="setTime">
          <div className="startTime">
            <span className="startTimeText">시작시간</span>
            <DatePicker
              className="startTimeInput"
              selected={startTime}
              onChange={(time) => setStartTime(time)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={10}
              timeCaption="Time"
              dateFormat="h:mm aa"
              placeholderText="시작시간 설정하기"
            />
          </div>
          <div className="endTime">
            <span className="endTimeText">종료시간</span>
            <DatePicker
              className="endTimeInput"
              selected={endTime}
              onChange={(time) => setEndTime(time)}
              minTime={setHours(
                setMinutes(new Date(), startTime?.getMinutes()),
                startTime?.getHours()
              )}
              maxTime={setHours(setMinutes(new Date(), 50), 23)}
              disabled={startTime === null}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={10}
              timeCaption="Time"
              dateFormat="h:mm aa"
              placeholderText="종료시간 설정하기"
            />
          </div>
        </div>
        <div className="repeatDay">
          <span className="repeatDayText">반복요일</span>
          {weekday.map((repeatDayInput, repeatId) => {
            // console.log(repeatDayInput);
            return (
              <RepeatDay
                key={repeatId}
                repeatDayInput={repeatDayInput}
                checkInput={checkInput}
                repeatId={repeatId}
                inputCheck={inputCheck}
                setInputCheck={setInputCheck}
              />
            );
          })}
        </div>
      </BodyContainer>
      <ButtonContainer>
        <SaveButton btnName={"저장"} onClick={() => savePost()} />
      </ButtonContainer>
    </div>
  );
};
export default PostForm;
const BodyContainer = styled.div`
  /* justify-content: center; */
  display: flex;
  flex-direction: column;
  align-items: center;
  //선택한 습관
  & .tagTitle {
    /* 보라그라데이션 */
    background: linear-gradient(197.06deg, #907CF9 -6.2%, #6334FF 101.13%);
    box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.08);
    border-radius: 12px 12px 12px 0px;
    /* 안쪽 글씨 */
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #FFFFFF;
    /* 습관박스 css */
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% - 40px);
    height: 62px;
    margin: 16px auto 0 auto;
  }
  & .startDate {
    width: 100%;
    padding: 0 20px;
    margin-top: 24px;
    //시작날짜텍스트
    & .startDateText {
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
    }
    //시작날짜인풋박스
    & .startDateInput {
      /* background-image: url(${(props) => props.calendarImg}); */
      background-image: url(${calendarImg});
      background-repeat: no-repeat;
      background-position: center left 3px;
      width: 100%;
      height: 42px;
      box-sizing: border-box;
      padding-left: 25px;
      /* margin: 10px; */
      /* background: #E2E2E2; */
      border-radius: 8px;
      margin-top: 8px;
    }
  }
  & .setTime {
    display: flex;
    width: 100%;
    padding: 0 20px;
    margin-top: 24px;
    & .startTime {
      display: flex;
      flex-direction: column;
      width: 50%;
      margin-right: 12px;
      //시작시간텍스트
      & .startTimeText {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
      }
      //시작시간인풋박스
      & .startTimeInput {
        background-image: url(${timeImg});
        background-repeat: no-repeat;
        background-position: center left 5px;
        width: 100%;
        height: 42px;
        box-sizing: border-box;
        padding-left: 25px;
        /* margin: 12px 20px; */
        /* background: #E2E2E2; */
        border-radius: 8px;
        margin-top: 8px;
      }
    }
    & .endTime {
      display: flex;
      flex-direction: column;
      width: 50%;
      //종료시간텍스트
      & .endTimeText {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
      }
      //종료시간인풋박스
      & .endTimeInput {
        background-image: url(${timeImg});
        background-repeat: no-repeat;
        background-position: center left 5px;
        width: 100%;
        height: 42px;
        box-sizing: border-box;
        padding-left: 25px;
        /* margin: 12px 20px; */
        /* background: #E2E2E2; */
        border-radius: 8px;
        margin-top: 8px;
      }
    }
  }
  & .repeatDay {
    /* background-color: #907CF9; */
    /* margin: 20px 20px; */
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
      /* background-color: #EEEEEE; */
      margin-top: 8px;
      display: flex;
      & #sunLabel {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #EBEBEB; //미클릭시 배경 초기색
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
        &:checked + #sunLabel {
          background: linear-gradient(
            197.06deg,
            #907CF9 -6.2%,
            #6334FF 101.13%
          );
        }
      }
    }
  }
`;
const ButtonContainer = styled.div`
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
`;