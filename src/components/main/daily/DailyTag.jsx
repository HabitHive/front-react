import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import TodayTagList from "./TodayTagList";

const DailyTag = () => {
  const state = useSelector((state) => state.getMyDaily);

  //목록 분류
  const myDaily = state.myDaily;
  //채크박스 확인
  const [beChecked, setBeChecked] = useState([]);

  // useEffect(() => {
  //   getUserTagDate();
  // }, []);

  // const checkHandler = ({ target }) => {
  //   console.log(target);
  //   setChecked(!checked);
  //   clickInput(state.scheduleId, target.checked);
  //   console.log(target.checked);
  // };

  return (
    <>
      <STTagList>
        {myDaily.length === 0 ? (
          <div className="empty"> 목표가 없습니다</div>
        ) : (
          myDaily.map((list) => {
            return (
              <TodayTagList
                key={list.scheduleId}
                weekCycle={list.weekCycle}
                tagName={list.tagName}
                category={list.category}
                beChecked={beChecked}
                setBeChecked={setBeChecked}
                done={list.done}
                id={list.scheduleId}
              />
            );
          })
        )}
      </STTagList>
    </>
  );
};

export default DailyTag;

const STTagList = styled.div`
  width: 100%;
  margin-top: 24px;
  overflow: hidden;
  & .empty {
    flex-direction: column;
    color: #808080;
    margin-left: 20px;
  }
`;
