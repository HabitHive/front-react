import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const DailyTag = () => {
  const state = useSelector((state) => state.getMyDaily);

  const [data, setData] = useState([]);

  // useEffect(() => {
  //   getUserTagDate();
  // }, []);

  return (
    <>
      <STTodayTagList>
        {state?.myDaily?.length === 0 ? (
          <div className="empty">오늘의 목표가 없습니다</div>
        ) : (
          state?.myDaily?.map((list) => {
            console.log(list);
            return (
              <div className="tagList" key={list.scheduleId}>
                <div className="check">
                  <input type="checkbox"></input>
                </div>
                <div className="tagListbox">
                  <div className="tagCycle">{list.weekCycle}</div>
                  <div className="tagTitle">{list.tagName}</div>
                  <div className="tagCategories">
                    {list.category?.map((category, i) => {
                      return (
                        <div className="category" key={i}>
                          {category}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </STTodayTagList>
    </>
  );
};

export default DailyTag;

const STTodayTagList = styled.div`
  width: 100%;
  margin-top: 24px;
  overflow: hidden;

  & .empty {
    flex-direction: column;
    color: #808080;
  }
  //체크박스랑 말풍선영역 묶인곳
  & .tagList {
    display: flex;
    margin: 0 20px 12px 20px;

    & .check {
      flex-shrink: 0;
      width: 30px;
    }
    //말풍선 영역
    & .tagListbox {
      background: #cfeeff;
      box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.08);
      border-radius: 12px 12px 12px 0px;
      /* height: 82px; */
      min-height: 82px;
      padding: 12px 12px 7px 12px;
      flex-grow: 1;
      //타임사이클
      & .tagCycle {
        font-size: 12px;
        line-height: 14px;
        margin-bottom: 2px;
      }
      //습관이름
      & .tagTitle {
        font-size: 16px;
        line-height: 19px;
        margin-bottom: 4px;
      }
      //카테고리들
      & .tagCategories {
        display: flex;
        flex-wrap: wrap;
        & .category {
          background-color: #674ded;
          padding: 2px 6px;
          border-radius: 4px;
          align-items: center;
          width: fit-content;
          font-size: 12px;
          line-height: 14px;
          font-weight: 200;
          color: white;
          margin: 0 5px 5px 0;
        }
      }
    }
  }
`;
