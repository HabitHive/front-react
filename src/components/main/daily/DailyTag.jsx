import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import TodayTagList from "./TodayTagList";

const DailyTag = () => {
  const state = useSelector((state) => state.getMyDaily.myDaily);
  //목록 분류
  const myDaily = state[0];
  const colorCode = ["#CFEEFF", "#FEE1DD", "#CBF8F5", "#FEEEDF"]
  
  //체크박스 확인
  const [beChecked, setBeChecked] = useState([]);

  return (
    <>
      <STTagList>
        {myDaily?.length === 0 ? (
          <div className="empty"> 목표가 없습니다</div>
        ) : (
          myDaily?.map((list) => {
            return (
              <TodayTagList
                list={list}
                key={list.scheduleId}
                beChecked={beChecked}
                setBeChecked={setBeChecked}
                num={list.color}
                bgColor={colorCode[list.color]}
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
  & .empty {
    flex-direction: column;
    color: #d1d1d1;
    margin-left: 20px;
  }
`;
