import styled, { css } from "styled-components";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { __doneMyDaily } from "../../../redux/modules/dailytag";
import { CustomAlert } from "../../common/Alert";
import Swal from "sweetalert2";

import icon0 from "../../../assets/tag/icon0.png"
import icon1 from "../../../assets/tag/icon1.png"
import icon2 from "../../../assets/tag/icon2.png"
import icon3 from "../../../assets/tag/icon3.png"
import mask0 from "../../../assets/tag/mask0.png"
import mask1 from "../../../assets/tag/mask1.png"
import mask2 from "../../../assets/tag/mask2.png"
import mask3 from "../../../assets/tag/mask3.png"

const TodayTagList = ({ list,num,bgColor,disabled }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pathName = window.location.pathname

  //props분류
  const id = list.scheduleId;
  const category = list.category;
  const done = list.done;
  const timeCycle = list.timeCycle;
  const tagName = list.tagName;
  const date = list.date;
  let now = new Date();
  let today = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
  // console.log(today<=today);

  const clickInput = () => {
    if ( disabled === true ) {
      return
      }else if (done === false) {
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
            }).catch((err) => {
console.log(err);
            });
          } else if (res.payload[0].first === true) {
            CustomAlert({ text: "20point 가 지급되었습니다" });
          }
        });
      }

  };

  return (
    <>
      <STTodayTagList pathName={pathName}>
        <div className="checkBox">
          <STLabel onClick={clickInput(list.date)} isChecked={done} pathName={pathName} ></STLabel>
          <STInputCheckbox type="checkbox" isChecked={done}></STInputCheckbox>
        </div>
        <STTagListBox
          className={done ? "doneTag" : "tagListbox"}
          onClick={() => {
            if ( disabled === true ) {
              return
              } else if (done === false) {  //완료되지 않은 습관에 대해서는 시작된 습관도(남은날짜) 수정가능
                navigate("/edit", { state: list });
              } else if (done === false && today<=date.slice(0,10)) { // 미래일정에 대해서는 완료불가
                Swal.fire({
                  text: "시작되지 않은 일정입니다",
                  icon: "error",
                  width: 300,
                })
              }
              else {
                CustomAlert({ text: "이미 완료한 습관입니다",icon:"warning" });
              }
          }}
          num={num} 
          bgColor={bgColor}
          disabled={disabled}
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
        </STTagListBox>
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
    margin-right: 8px;
  }

  //말풍선 영역
  & .tagListbox {
    cursor: ${(props)=>props.pathName==="/monthly"? null : "pointer" };

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
      text-decoration: line-through;
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

const STTagListBox = styled.div`
  background-image: url(
    ${ props => props.num === 0 ? icon0 : 
      props=>props.num === 1 ? icon1 : 
      props=>props.num === 2 ? icon2 : icon3 }),
      url(
  ${ props => props.num === 0 ? mask0 : 
    props=>props.num === 1 ? mask1 : 
    props=>props.num === 2 ? mask2 : mask3 });

  background-repeat: no-repeat;
  background-position: 95%, right;
  background-color: ${(props)=>props.bgColor};
`;

const STLabel = styled.label`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  cursor: ${(props)=>props.pathName==="/monthly"? null : "pointer" };
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
