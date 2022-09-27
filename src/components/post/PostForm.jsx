import styled from "styled-components";
import Header from "../common/Header";
import calendarImg from "../../assets/images/calendar.png";
import timeImg from "../../assets/images/timeIcon.png";
import SaveButton from "../common/SaveButton";
import RepeatDay from "./RepeatDay";
import { ConfirmToast } from "../common/Alert";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes } from "date-fns";

import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { __addSchedule } from "../../redux/modules/schedule";
import { __getMyTag } from "../../redux/modules/mytag";

let now = new Date();
const PostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [startTime, setStartTime] = useState(null); //null값이어야 placeholder내용 보임
  const [endTime, setEndTime] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const weekday = ["일", "월", "화", "수", "목", "금", "토"];
  const checkInput = useRef([]);
  //체크값 상태관리
  const [inputCheck, setInputCheck] = useState([]);

  //보유습관에서 선택한 tag값 가져오기
  const { state } = useLocation();

  const now = new Date();
  const today = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);

  useEffect(() => {
    dispatch(__getMyTag());
  }, []);

  // 시작날짜 선택시 습관이 며칠짜리인지에 따라 자동으로 범위선택
  const dateRange = (update) => {
    const firstDate = new Date(update[0]);
    let lastDate = firstDate.setDate(firstDate.getDate() + state.period - 1);
    if (state.date != null) {
      //만약 이미 한번이라도 일정등록을 한 적이 있다면
      if (new Date(today) < new Date(new Date(state.date.slice(13)))) {
        //등록한 날짜가 지난 이후의 추가 post라면 endDate는 첫 post시의 endDate로 고정
        lastDate = new Date(state.date.slice(13));
      }
    }
    setStartDate(update[0]);
    setEndDate(new Date(lastDate));
  };

  const savePost = () => {
    dispatch(
      __addSchedule([startDate, startTime, endTime, inputCheck, state])
    ).then((res) => {
      ConfirmToast({ text: "등록이 완료되었습니다" });
      navigate("/");
    });
  };

  return (
    <div>
      <Header text={"데일리 설정"} />
      <BodyContainer>
        <div className="tagTitle">
          {state.tagName} ( {state.period}일 )
        </div>
        <div className="startDate">
          <span className="startDateText">날짜 설정</span>
          <DatePicker
            className="startDateInput"
            calendarImg={calendarImg}
            selected={startDate}
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            dateFormat="yyyy.MM.dd"
            minDate={now} //시작일은 최소 오늘날짜 이후만 가능 (오늘 날짜 가능)
            maxDate={endDate}
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
          <div className="repeatDayContainer">
            {weekday.map((repeatDayInput, repeatId) => {
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
  display: flex;
  flex-direction: column;
  align-items: center;
  //선택한 습관
  & .tagTitle {
    background: linear-gradient(197.06deg, #907cf9 -6.2%, #6334ff 101.13%);
    box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.08);
    border-radius: 12px 12px 12px 0px;

    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #ffffff;
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
      & .startTimeText {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
      }
      & .startTimeInput {
        background-image: url(${timeImg});
        background-repeat: no-repeat;
        background-position: center left 5px;
        width: 100%;
        height: 42px;
        box-sizing: border-box;
        padding-left: 25px;
        border-radius: 8px;
        margin-top: 8px;
      }
    }
    & .endTime {
      display: flex;
      flex-direction: column;
      width: 50%;
      & .endTimeText {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
      }
      & .endTimeInput {
        background-image: url(${timeImg});
        background-repeat: no-repeat;
        background-position: center left 5px;
        width: 100%;
        height: 42px;
        box-sizing: border-box;
        padding-left: 25px;
        border-radius: 8px;
        margin-top: 8px;
      }
    }
  }
  & .repeatDay {
    width: 100%;
    padding: 0 20px;
    margin-top: 24px;
    & .repeatDayText {
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
    }
    & .repeatDayContainer {
      display: flex;
      margin-top: 24px;
    }
  }
`;
const ButtonContainer = styled.div`
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
`;
