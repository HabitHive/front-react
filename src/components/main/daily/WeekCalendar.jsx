import styled from "styled-components";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useDispatch } from "react-redux";
import { __getMyTags } from "../../../redux/modules/mytag";

const GetAllMonth = (monthNameLong) => {
  const monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    "January",
    "February",
    "March",
    "April",
  ];
  const startMonth = monthList.indexOf(monthNameLong);
  const thisMonthList = monthList.slice(startMonth, startMonth + 5);
  return thisMonthList;
};

const WeekCalendar = (value) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // return () => console.log("Clean up");
  }, []);

  const week = useRef(null);

  //날짜 클릭시 해당날짜 데이터 보내기
  const clickDate = (clickDate) => {
    dispatch(__getMyTags(clickDate));
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
  const changFuture = () => {
    setPast(past + 6);
    setFuture(future + 6);
  };
  const changPast = () => {
    setPast(past - 6);
    setFuture(future - 6);
  };

  return (
    <STWeekCalender>
      <StCalendar>
        <span className="Month">{weekDate[0].month}</span>
        <DayContainer className="Day">
          <div className="daylistContainer">
            <button>
              <FaChevronLeft onClick={changPast} />
            </button>
            <div>
              {weekDate.map((weekday, i) => {
                return (
                  <div
                    className={
                      { value } === weekday.date ? "active" : "daylistSelector"
                    }
                    key={i}
                    onChange={() => {
                      clickDate(weekday.back);
                    }}
                  >
                    <STLabel>
                      <input
                        type="radio"
                        className="week"
                        name="asdf"
                        value={weekday.day}
                        ref={week}
                      />
                      {weekday.day}
                    </STLabel>
                    <STLabel>
                      <input
                        type="radio"
                        className="day"
                        name={value}
                        value={weekday.date}
                      />
                      {weekday.date}
                    </STLabel>
                  </div>
                );
              })}
            </div>
            <button>
              <FaChevronRight onClick={changFuture} />
            </button>
          </div>
        </DayContainer>
      </StCalendar>
    </STWeekCalender>
  );
};

export default WeekCalendar;
const STWeekCalender = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 15%;
`;
const StCalendar = styled.div`
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  overflow: initial;
  & .Month {
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    color: #5039c8;
  }

  /* 주간캘린더 일전체 컨테이너 */
  & .Day {
    justify-content: center;
    align-content: center;
    text-align: center;
    height: 3.5rem;
    font-size: 14px;

    & .daylistContainer {
      display: flex;
      justify-content: space-between;
      & button {
        border: none;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: #ffffff;
        box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.08);
        cursor: pointer;
        &:nth-child(1) {
          margin-right: 8px;
        }
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
      background: #ffffff;
      box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.08);
      color: #999999;

      /* //today표현
      &:nth-child(1) {
        border: 0.04rem solid #6334ff;
      }
      & .week {
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 10px;
        color: #999999;
        margin-bottom: 6px;
      }
      & .day {
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
        text-align: center;
        color: #999999;
      } */

      //마우스 올렸을 때
      &:hover {
        background: #5039c8;
        color: white;
        & .week {
          color: white;
        }
        & .day {
          color: white;
        }
      }
      //클릭했을 때
      &:active {
        background: linear-gradient(197.06deg, #907cf9 -6.2%, #6334ff 101.13%);
        color: #fff;
        & .week {
          color: white;
        }
        & .day {
          color: white;
        }
      }
    }
  }
`;
const STLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  float: left;
  cursor: pointer;

  width: 40px;
  height: 60px;
  border-radius: 8px;

  & input {
    visibility: hidden;
  }

  & .week {
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 10px;
    color: #999999;
  }
  & .day {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: #999999;
  }
`;

const DayContainer = styled.div`
  display: block;
`;
