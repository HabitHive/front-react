import Calendar from "react-calendar";
import "./Calendar.css";

import React, { useState, useEffect } from "react";
import { __getMonth } from "../../../redux/modules/month";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __getMyDaily } from "../../../redux/modules/dailytag";
import styled from "styled-components";

import rightArrow from "../../../assets/monthly/rightArrow.png";
import leftArrow from "../../../assets/monthly/leftArrow.png";
import monthlyCalendarImg from "../../../assets/monthly/monthlyCalendarImg.png";

const MonthlyCalendar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const now = new Date();
  const [value, onChange] = useState(now);
  const today = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);

  //완료한 습관 갯수 리스트 
  const { doneList } = useSelector((state) => state.getMonth);

  //클릭한날짜의 데일리일정
  const pickDate = (value) => {
    const pick = new Date(value.getTime() - value.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);
    dispatch(__getMyDaily(pick));
  };

  const dbClickDate = (value) => {
    const clickDate = new Date(
      value.getTime() - value.getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, 10);
    navigate("/", { state: clickDate });
  };

  useEffect(() => {
    dispatch(__getMonth("2022-10-04"));
  }, []);

  return (
    <>
      <SWrapper doneList={doneList}>
        <Calendar
          onChange={onChange}
          value={value} //클릭한 날짜값(new Date()형식)
          onClickDay={pickDate}
          ondblclick={dbClickDate}
          showNeighboringMonth={false}
          calendarType="US" //일요일 시작
          prev2Label={null} //년도변경버튼 숨기기
          next2Label={null} //년도변경버튼 숨기기
          locale="en"
          tileContent={({ date, view }) => {
            return (
              <>
                <STTile
                  data={
                    doneList[
                      new Date(
                        date.getTime() - date.getTimezoneOffset() * 60000
                      )
                        .toISOString()
                        .slice(8, 10)
                        .startsWith("0")
                        ? new Date(
                            date.getTime() - date.getTimezoneOffset() * 60000
                          )
                            .toISOString()
                            .slice(9, 10)
                        : new Date(
                            date.getTime() - date.getTimezoneOffset() * 60000
                          )
                            .toISOString()
                            .slice(8, 10)
                    ]
                  }
                >
                  <div className="dot"></div>
                </STTile>
              </>
            );
          }}
        />
      </SWrapper>
    </>
  );
};

export default MonthlyCalendar;

const SWrapper = styled.div`
  background-image: url(${monthlyCalendarImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  & .react-calendar button {
    height: 52px;
    display: flex;
    justify-content: center;
    position: relative;

    &::hover abbr {
      color: black;
    }
    //날짜 텍스트
    & abbr {
      width: 100%;
      height: 100%;
      line-height: 14px;
      padding: 4px;
      position: relative;
      z-index: 10;

      /* &::before {
        content: "";
        display: block;
      } */

      /* 호버할때 나타날 것 */
      /* &::after {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: 50%;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        transform: translateX(-50%);
      } */
    }
    /* &:hover abbr::after {
      background-color: red;
    } */
  }

  & .react-calendar__navigation {
    position: relative;
    margin-bottom: 24px;
    &::before {
      content: "";
      position: absolute;
      bottom: -12px;
      left: 0;
      right: 0;
      margin: 0 auto;
      height: 1px;
      background-color: #eee;
      width: calc(100% - 40px);
    }
    & button {
      height: 44px;
      align-items: center;
      box-sizing: border-box;

      &.react-calendar__navigation__label {
        width: 136px;
        color: white;
        font-size: 18px;
        font-weight: 600;
        padding: 4px 8px;
        background-color: #674ded;
        margin-left: 20px;
        flex-grow: 0 !important;
      }

      &.react-calendar__navigation__next-button {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        width: 22px;
        height: 22px;
        padding: 0;
        border-radius: 50%;
        background-color: #674ded;

        background-image: url(${rightArrow});
        background-position: center;
        background-repeat: no-repeat;
        font-size: 0;
      }

      &.react-calendar__navigation__prev-button {
        position: absolute;
        right: 58px;
        top: 50%;
        transform: translateY(-50%);
        width: 22px;
        height: 22px;
        padding: 0;
        border-radius: 50%;
        background-color: #674ded;

        background-image: url(${leftArrow});
        background-position: center;
        background-repeat: no-repeat;
        font-size: 0;
      }
    }

    & .react-calendar__navigation__label {
      order: -1;
    }
  }
`;
//완료한 습관 갯수에 따라 점점 진해지는 색상코드
const STTile = styled.div`
  background-color: ${(props) =>
    props.data === 0
      ? "transparent"
      : props.data === 1
      ? "#E2DCFF"
      : props.data === 2
      ? "#AE9FFF"
      : props.data === 3
      ? "#AE9FFF"
      : "#5039C8"};
  position: absolute;
  bottom: 4px;
  left: 2px;
  width: calc(100% - 4px);
  height: 11px;
  border-radius: 0 0 8px 8px;
  /* background-color: #e2dcff; */
`;
