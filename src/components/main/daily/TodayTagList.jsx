import styled, { css } from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { __doneMyDaily } from "../../../redux/modules/dailytag";

const TodayTagList = ({ list }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(false);

  //props분류
  const id = list.scheduleId;
  const category = list.category;
  const done = list.done;
  const timeCycle = list.timeCycle;
  const tagName = list.tagName;

  const clickInput = () => {
    setIsChecked(!isChecked);
    if (done === false) {
      dispatch(__doneMyDaily(id));
    }
  };

  return (
    <>
      <STTodayTagList>
        <div className="checkBox">
          <STLabel onClick={clickInput} isChecked={done}></STLabel>
          <STInputCheckbox type="checkbox" isChecked={done}></STInputCheckbox>
        </div>
        <div
          className="tagListbox"
          onClick={() => {
            navigate("/edit", { state: list });
          }}
        >
          <div className="tagCycle">{timeCycle}</div>
          <div className="tagTitle">{tagName}</div>
          <div className="tagCategories">
            {category?.map((category, i) => {
              return (
                <div className="category" key={i}>
                  {category}
                </div>
              );
            })}
          </div>
        </div>
      </STTodayTagList>
    </>
  );
};

export default TodayTagList;

//체크박스랑 말풍선영역 묶인 곳
const STTodayTagList = styled.div`
  display: flex;
  margin: 0 20px 12px 20px;
  & .checkBox {
    flex-shrink: 0;
    width: 30px;
    position: relative;
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

const STLabel = styled.label`
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
`;

const STInputCheckbox = styled.input`
  display: none;
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
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
`;
