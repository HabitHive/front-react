import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import TodayTagList from "./TodayTagList";

const DailyTag = ({disabled}) => {
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
                disabled={disabled}
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
    margin: 25% 0;
    text-align: center;
    color: #999999;
    font-weight: 500;
    font-size: 14px;
    letter-spacing: -0.3px;
  }
`;
