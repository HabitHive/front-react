import styled from "styled-components";
import Header from "../components/common/Header";
import calendarImg from "../assets/images/calendar.png";
import timeImg from "../assets/images/timeIcon.png";
import { StSubmitBtn } from "../components/common/ButtonStyle";
import EditRepeat from "./EditRepeat";
import { CustomAlert } from "../components/common/Alert";
import { HiOutlineTrash } from "react-icons/hi";

import DatePicker from "react-datepicker";
import { setHours, setMinutes } from "date-fns";

import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { __updateSchedule, __deleteSchedule } from "../redux/modules/schedule";
import { __getMyTag } from "../redux/modules/mytag";
import { __getUserTags } from "../redux/modules/mypage";

let now = new Date();
const EditForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //nav props로 선택한 태그정보 가져오기
  const { state } = useLocation();

  const [startTime, setStartTime] = useState(
    new Date(
      `Thu Sep 29 2022 ${
        state.timeCycle.split("~")[0]
      }:00 GMT+0900 (한국 표준시)`
    )
  );
  const [endTime, setEndTime] = useState(
    new Date(
      `Thu Sep 29 2022 ${
        state.timeCycle.split("~")[1]
      }:00 GMT+0900 (한국 표준시)`
    )
  );
  const [startDate, setStartDate] = useState(
    new Date(state.date.split("~")[0])
  );
  const [endDate, setEndDate] = useState(
    new Date(
      new Date(state.date.split("~")[0]).setDate(
        new Date(state.date.split("~")[0]).getDate() + state.period
      )
    )
  );

  const weekday = ["일", "월", "화", "수", "목", "금", "토"];
  const checkInput = useRef([]);
  //체크값 상태관리
  const [inputCheck, setInputCheck] = useState([]);

  // 시작날짜 선택시 습관이 며칠짜리인지에 따라 자동으로 범위선택
  const dateRange = (update) => {
    const firstDate = new Date(update[0]);
    const lastDate = firstDate.setDate(firstDate.getDate() + state.period - 1);
    setStartDate(update[0]);
    setEndDate(new Date(lastDate));
  };

  useEffect(() => {
    dispatch(__getMyTag());
    dispatch(__getUserTags());
  }, []);

  //스케쥴 수정
  const editPost = () => {
    dispatch(
      __updateSchedule([startDate, startTime, endTime, inputCheck, state])
    ).then((res) => {
      CustomAlert({ text: "수정이 완료되었습니다" , icon:"success"});
      navigate("/");
    });
  };
  //스케쥴 삭제
  const deletePost = () => {
    dispatch(__deleteSchedule(state.scheduleId)).then((res) => {
      CustomAlert({ text: "삭제가 완료되었습니다" ,icon:"success"});
      navigate("/");
    });
  };

  // index로 무슨요일인지 찾기
  const arr = [];
  const a = state.weekCycle.split(",");
  for (let i = 0; i < a.length; i++) {
    arr.push(weekday[a[i]]);
  }

  return (
    <>
      <STHeaderContainer>
        <Header text={"데일리 편집"} />
        <HiOutlineTrash
          className="trash"
          size={24}
          onClick={() => deletePost()}
        />
      </STHeaderContainer>

      <BodyContainer>
        <div className="tagTitle">
          {state.tagName} ( D - {state.period} )
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
            onChange={dateRange}
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
            />
          </div>
        </div>
        <div className="repeatDay">
          <span className="repeatDayText">반복요일</span>
          <div className="repeatDayContainer">
            {weekday.map((repeatDayInput, repeatId) => {
              return (
                <EditRepeat
                  key={repeatId}
                  repeatDayInput={repeatDayInput}
                  checkInput={checkInput}
                  repeatId={repeatId}
                  inputCheck={inputCheck}
                  setInputCheck={setInputCheck}
                  weekCycle={state.weekCycle}
                />
              );
            })}
          </div>
        </div>
      </BodyContainer>
      <ButtonContainer>
        <StSubmitBtn className="button" onClick={() => editPost()}>
          {"저장"}
        </StSubmitBtn>
      </ButtonContainer>
    </>
  );
};
export default EditForm;

const STHeaderContainer = styled.div`
  position: relative;
  .trash {
    position: absolute;
    top: 14px;
    right: 20px;
    cursor: pointer;
  }
`;

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
      background-image: url(${calendarImg});
      background-repeat: no-repeat;
      background-position: center left 3px;
      background-color: #ebebeb;
      width: 100%;
      height: 42px;
      box-sizing: border-box;
      border: none;
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
        background-color: #ebebeb;
        width: 100%;
        height: 42px;
        box-sizing: border-box;
        padding-left: 25px;
        border-radius: 8px;
        border: none;
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
        background-color: #ebebeb;
        width: 100%;
        height: 42px;
        box-sizing: border-box;
        padding-left: 25px;
        border-radius: 8px;
        border: none;
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
  position: relative;
  bottom: -250px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  & .button {
    display: block;
    margin: 0 auto;
    min-width: 180px;
    width: calc(100% - 136px);
  }
`;
