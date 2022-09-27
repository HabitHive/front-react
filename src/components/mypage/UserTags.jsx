import styled from "styled-components"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { __getUserTags } from "../../redux/modules/mypage";
import TagWeekday from "./TagWeekday";
import ToggleTags from "./ToggleTags";

const UserTags = () => {
  const dispatch = useDispatch();

  const tags = useSelector(state=>state.profile.userTags)

  //태그 목록 분류
  const stillTags = tags.stillTags;
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
        </StTagTitle>
        { stillTags?.length === 0 ? <StTagHelpTxt> 현재 진행 중인 <br/> 습관이 없습니다 </StTagHelpTxt> :
          stillTags?.map((stillTag, tagName)=>{
            return (
            <StTagShadowBox key={tagName}>
              <StStillTag>
                <StStillTagName>
                  <p>{stillTag.tagName}</p>
                </StStillTagName>
                <TagWeekday weekData={stillTag.week}/>
              </StStillTag>
              <StStillTagdDay>
                <p>D-{stillTag.dDay}</p>
              </StStillTagdDay>
            </StTagShadowBox>
            )
          })
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
  margin: 10px 0;
  font-weight: 600;
  font-size: 16px;
  color: #343434;
`

const StTagHelpTxt = styled.p`
  margin: 20px 0;
  font-weight: 500;
  font-size: 14px;
  text-align: center;
  letter-spacing: -0.3px;
  color: #999999;
`

const StTagShadowBox = styled.div`
  background-color: #CFEEFF;
  width: 100%;
  height: 68px;
  margin: 6px auto;
  padding: 12px;
  display: flex;
  justify-content: space-between;

  box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.08);
  border-radius: 12px 12px 12px 0px;
`

const StStillTag =  styled.div`
`

const StStillTagName =  styled.div`
  width: max-content;
  font-weight: 700;
  font-size: 18px;
  color: #343434;
  & p {
    position: relative;
    top: -4px;
  }
`

const StStillTagdDay =  styled.div`
  width: 37px;
  height: 21px;
  background-color: #674DED;
  border-radius: 4px;
  & p {
    color: white;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
  }
`

const StDoneTagBox = styled.div`
  background-color: white;
  width: 100%;
  margin: 10px auto;
  min-height: 150px;
  box-shadow: 3px 3px 8px lightgrey;
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
