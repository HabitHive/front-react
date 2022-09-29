import styled, { css } from "styled-components";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { __doneMyDaily } from "../../../redux/modules/dailytag";
import { ConfirmAlert, ErrorAlert } from "../../common/Alert";
import Swal from "sweetalert2";

const TodayTagList = ({ list }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //props분류
  const id = list.scheduleId;
  const category = list.category;
  const done = list.done;
  const timeCycle = list.timeCycle;
  const tagName = list.tagName;
  let now = new Date();
  let today = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);

  const clickInput = () => {
    if (done === false) {
      dispatch(__doneMyDaily({ id, date: today })).then((res) => {
        if (res.payload[0].first === true && res.payload[0].bonus === true) {
          Swal.fire({
            text: "20point가 지급되었습니다!",
            icon: "success",
            width: 300,

            confirmButtonColor: "#3085d6", // 확인 버튼 색깔 지정
            confirmButtonText: "확인", // 확인 버튼 텍스트 지정
            reverseButtons: true, // 버튼 순서 거꾸로,
          }).then((result) => {
            if (result.isConfirmed) {
              // 만약 확인 버튼을 눌렀다면
              Swal.fire({
                text: `완료 추가보너스 ${res.payload[0].bonusPoint}Point가 지급되었습니다!`,
                icon: "success",
                width: 300,
              });
            }
          });
        } else if (res.payload[0].first === true) {
          ConfirmAlert({ text: "20point 가 지급되었습니다" });
        }
      });
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
          className={done ? "doneTag" : "tagListbox"}
          onClick={() => {
            if (done === false) {
              navigate("/edit", { state: list });
            } else {
              ErrorAlert({ text: "이미 완료한 습관입니다" });
            }
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

  &:nth-child(4n-3) > .tagListbox:nth-child(2):not(.donTag) {
    background-color: #ccedff;
  }
  &:nth-child(4n-2) > .tagListbox:nth-child(2):not(.donTag) {
    background-color: #fee1dd;
  }
  &:nth-child(4n-1) > .tagListbox:nth-child(2):not(.donTag) {
    background-color: #cbf8f5;
  }
  &:nth-child(4n) > .tagListbox:nth-child(2):not(.donTag) {
    background-color: #feeedf;
  }

  & .checkBox {
    flex-shrink: 0;
    width: 30px;
    position: relative;
    margin-right: 8px;
  }

  //말풍선 영역
  & .tagListbox {
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
  // 체크완료 시 CSS
  & .doneTag {
    background: #d9d9d9;
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
      color: white;
    }
    //습관이름
    & .tagTitle {
      font-size: 16px;
      line-height: 19px;
      margin-bottom: 4px;
      color: white;
    }
    //카테고리들
    & .tagCategories {
      display: flex;
      flex-wrap: wrap;
      & .category {
        background-color: #999999;
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

  &:last-child {
    margin-bottom: 90px;
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
            border: 2px solid #d3d3d3;
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
