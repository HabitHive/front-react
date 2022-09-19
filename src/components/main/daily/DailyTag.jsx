import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";

const DailyTag = () => {
  const state = useSelector((state) => state.getMyDaily);

  // const [check, setCheck] = useState(new Set());
  const [isChecked, setIsChecked] = useState(false);

  // useEffect(() => {
  //   getUserTagDate();
  // }, []);

  // const clickInput = (id, isChecked) => {
  //   console.log(isChecked);
  //   if (isChecked) {
  //     check.add(id);
  //     setCheck(check);
  //   }
  // };

  const clickInput = () => {
    setIsChecked(!isChecked);
    console.log(!isChecked);
  };

  // const checkHandler = ({ target }) => {
  //   console.log(target);
  //   setChecked(!checked);
  //   clickInput(state.scheduleId, target.checked);
  //   console.log(target.checked);
  // };

  return (
    <>
      <STTodayTagList>
        {state?.myDaily?.length === 0 ? (
          <div className="empty">오늘의 목표가 없습니다</div>
        ) : (
          state?.myDaily?.map((list) => {
            // console.log(list);
            return (
              <STTagList key={list.scheduleId}>
                <div className="checkBox">
                  <label
                    // htmlFor="inputCheck"
                    // id="inputLabel"
                    onClick={clickInput}
                    isChecked={isChecked}
                    // onClick={clickInput}
                  ></label>
                  <input
                    type="checkbox"
                    // id="inputCheck"
                    isChecked={isChecked}

                    // checked={check[list.scheduleId]}
                    // onClick={clickInput(list.scheduleId)}
                    // onChange={(e) => clickInput(e)}
                  ></input>
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
              </STTagList>
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
`;
//체크박스랑 말풍선영역 묶인 곳
const STTagList = styled.div`
  display: flex;
  margin: 0 20px 12px 20px;
  & .checkBox {
    flex-shrink: 0;
    width: 30px;
    position: relative;
    & label {
      /* background: #d3d3d3;
      border: none;
      border-radius: 50%;
      box-sizing: border-box;
      width: 22px;
      height: 22px;
      cursor: pointer; */

      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 50%;
      cursor: pointer;
      width: 28px;
      height: 28px;
      position: absolute;
      left: 0;
      top: 0;
      ${({ isChecked }) => {
        return isChecked
          ? css`
              background-color: #5039c8;
              border-color: #5039c8;
              &:after {
                border: 2px solid #fff;
                border-top: none;
                border-right: none;
                content: "";
                height: 6px;
                left: 7px;
                position: absolute;
                top: 8px;
                transform: rotate(-45deg);
                width: 12px;
              }
            `
          : css`
              background-color: #fff !important;
              &:after {
                opacity: 1;
              }
            `;
      }}
    }
    & input {
      /* display: none;
      position: absolute;
      width: 0;
      height: 0;
      padding: 0;
      overflow: hidden;
      border: 0;
      //요일 클릭시에 색 변경
      &:checked + label {
        background: #5039c8;
      } */
      visibility: hidden;
      ${({ isChecked }) =>
        isChecked
          ? css`
              background-color: #5039c8;
              border-color: #5039c8;
              &:after: {
                opacity: 1;
              }
            `
          : null}
    }
  }
  //말풍선 영역
  & .tagListbox {
    background: #cfeeff;
    cursor: pointer;
    box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.08);
    border-radius: 12px 12px 12px 0px;
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
`;
