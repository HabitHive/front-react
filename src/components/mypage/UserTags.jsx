import styled from "styled-components"
import { IoIosArrowForward } from "react-icons/io"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { __getUserTags } from "../../redux/modules/mypage";
import Tag from "../common/Tag"

import ToggleTags from "./ToggleTags";

const UserTags = ({setModal}) => {
  const dispatch = useDispatch();

  const tags = useSelector(state=>state.profile.userTags)

  //태그 목록 분류
  const stillTags = tags.stillTags;
  const preTags = tags.stillTags.slice(0,3);
  const successTags = tags.successTags;
  const failTags = tags.failTags;

  //도전했던 습관 버튼 토글
  const [successBtnToggle, setSuccessBtnToggle] = useState(true);
  const [failBtnToggle, setFailBtnToggle] = useState(false);
  const successBtnHandler = () => {
    if (successBtnToggle===true) {
      return
    } else {
      setSuccessBtnToggle(true)
      setFailBtnToggle(false)
    }
  }
  const failBtnHandler = () => {
    setFailBtnToggle(true)
    setSuccessBtnToggle(false)
  }

  useEffect(()=>{
    dispatch(__getUserTags())
  },[])

  return(
      <StTagsWrap>
        <StTagTitle>
          진행 중인 습관
          <button
            onClick={()=>setModal(true)}
          >
            전체목록 
          <IoIosArrowForward className="icon"/> </button>
        </StTagTitle>
          { stillTags?.length === 0 ? 
            <StTagHelpTxt> 현재 진행 중인 <br/> 습관이 없습니다 </StTagHelpTxt> :
            <Tag lists={preTags} shadow={true}/>
          }
        <StTagTitle>
          도전했던 습관
        </StTagTitle>
        <StDoneTagBtn className={ successBtnToggle ? "active" : null }
          onClick={successBtnHandler}
        >
          완주한 습관
        </StDoneTagBtn>
        <StDoneTagBtn className={ failBtnToggle ? "active" : null }
          onClick={failBtnHandler}
        >
          완주 못한 습관
        </StDoneTagBtn>
        <StDoneTagBox>
        {successBtnToggle ?
          <ToggleTags tags={successTags}/> :
          <ToggleTags tags={failTags}/>
        }
        </StDoneTagBox>
      </StTagsWrap> 
  )
}
export default UserTags

const StTagsWrap = styled.div`
  padding: 0 20px;
`

const StTagTitle = styled.h3`
  margin: 32px 0 8px 0;
  font-weight: 600;
  font-size: 16px;
  color: #343434;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  & button {
    all: unset;
    cursor: pointer;

    display: flex;
    align-items: center;

    font-weight: 500;
    font-size: 0.8rem;
    text-align: right;

    color: #999999;
  }

  & .icon {
    width: 20px;
    height: 20px;
  }
`

const StTagHelpTxt = styled.p`
  margin: 20% 0;
  font-weight: 500;
  font-size: 14px;
  text-align: center;
  letter-spacing: -0.3px;
  color: #999999;
  line-height: 18px;
`

const StDoneTagBox = styled.div`
  background-color: white;
  width: 100%;
  margin: 2px auto;
  min-height: 150px;
  box-shadow: 6px 6px 8px rgba(0, 0, 0, 0.08);
  padding: 16px 12px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: ${props=>props.justify};
  border-radius: 18px;
`

const StDoneTagBtn =  styled.button`
  cursor: pointer;

  margin: 0 10px 10px 0;
  padding: 5px 10px;
  border-radius: 20px;
  background: none;
  color: #B0B0B0;
  border: 1px solid #B0B0B0;

  font-weight: 700;
  font-size: 12px;
  letter-spacing: -0.3px;
  &.active{
    border: none;
    background-color: #674DED; 
    color: white;

  }
`
