import styled from "styled-components";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { __getMyDaily } from "../../../redux/modules/dailytag";

const WeekCalendar = (value) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // return () => console.log("Clean up");
  }, []);

  const week = useRef(null);

  //날짜 클릭시 해당날짜 데이터 보내기
  const clickDate = (clickDate) => {
    dispatch(__getMyDaily(clickDate));
  };

  const [past, setPast] = useState(0);
  const [future, setFuture] = useState(6);

  let weekDate = [];
  let now = new Date();
  const yyyy = now.getFullYear();
  const mm = now.getMonth();
  const dd = now.getDate();

  for (let i = past; i < future; i++) {
    let weekCal = new Date(now.setFullYear(yyyy, mm, dd + i));
    weekDate.push({
      month: weekCal.toLocaleString("en-US", { month: "long" }),
      date: weekCal.getDate(),
      day: weekCal.toString().slice(0, 3),
      back: new Date(now.getTime() - now.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 10),
    });
  }

  //weekbar 양옆 버튼 누를 때마다 6일짜리 돌아감
  const changeFuture = () => {
    setPast(past + 6);
    setFuture(future + 6);
  };
  const changePast = () => {
    setPast(past - 6);
    setFuture(future - 6);
  };

  return (
    <STWeekCalendar>
      <STCalendar>
        <div className="Month">{weekDate[0].month}</div>
      </STCalendar>
      <STDayContainer>
        <div className="daylistContainer">
          <button>
            <HiChevronLeft
              className="leftIcon"
              onClick={changePast}
              size="22"
              color="#5039C8"
            />
          </button>
          <div>
            {weekDate.map((weekday, i) => {
              return (
                <div className="daylistSelector" key={i}>
                  <input
                    type="radio"
                    id={weekday.date}
                    name={value}
                    value={weekday.date}
                  />
                  <STLabel
                    onClick={() => {
                      clickDate(weekday.back);
                    }}
                    htmlFor={weekday.date}
                  >
                    <div className="weekday">{weekday.day}</div>
                    <div className="weekdate">{weekday.date}</div>
                  </STLabel>
                </div>
              );
            })}
          </div>
          <button>
            <HiChevronRight
              className="rightIcon"
              onClick={changeFuture}
              size="22"
              color="#5039C8"
            />
          </button>
        </div>
      </STDayContainer>
    </STWeekCalendar>
  );
};

export default WeekCalendar;
const STWeekCalendar = styled.div`
  position: absolute;
  width: 100%;
  bottom: 15%;
`;
const STCalendar = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  & .Month {
    background-color: #fbfbfb;
    border-radius: 6px;
    padding: 6px 10px;
    /* width: 52px;
    height: 26px; */
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    color: #5039c8;
    margin-bottom: 12px;
  }
`;

/* 주간캘린더 일전체 컨테이너 */
const STDayContainer = styled.div`
  justify-content: center;
  align-content: center;
  text-align: center;
  height: 3.5rem;
  font-size: 14px;

  & .daylistContainer {
    display: flex;
    justify-content: space-between;
    position: relative;

    & button {
      position: relative;
      right: 20px;
      top: 15px;
      border: none;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: #ffffff;
      box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.08);
      cursor: pointer;
      &:nth-child(1) {
        left: 20px;
        top: 15px;
      }
    }
    & .leftIcon {
      background-color: #ffffff;
      border-radius: 50%;
      position: absolute;
      left: 0.1px;
      top: 0.1px;
    }
    & .rightIcon {
      background-color: #ffffff;
      border-radius: 50%;
      position: absolute;
      left: 0.1px;
      top: 0.1px;
    }
  }
  /* 하루짜리 날짜 배열 Daylist */
  & .daylistSelector {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    float: left;
    margin-right: 4px;
    width: 40px;
    height: 60px;
    border-radius: 8px;
    //클릭시 색 변하기
    & input:checked + label {
      background-color: #5039c8;
      color: white;
    }
    //today표현
    &:nth-child(1) {
      background-color: #b3a5ff;
      color: #fff;
    }
    //마지막일자는 margin빼기
    &:last-child {
      margin-right: 0;
    }

    & input {
      display: none;
      position: absolute;
      width: 0;
      height: 0;
      padding: 0;
      overflow: hidden;
      border: 0;
    }
  }
`;
const STLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  width: 40px;
  height: 60px;
  border-radius: 8px;
  background-color: #ffffff;
  color: #999999;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.08);
  font-weight: 600;

  & .weekday {
    font-size: 10px;
    line-height: 12px;
  }
  & .weekdate {
    font-size: 14px;
    line-height: 17px;
  }
  //마우스 올렸을 때
  &:hover {
    background: #5039c8;
    color: white;
  }
`;
