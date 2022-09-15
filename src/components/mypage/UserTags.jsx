import styled from "styled-components"

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { __getUserTags } from "../../redux/modules/mypage";
import TagWeekday from "./TagWeekday";
import ToggleTags from "./ToggleTags";

const UserTags = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tags = useSelector(state=>state.profile.userTags)

  //태그 목록 분류
  const stillTags = tags.stillTags;
  const successTags = tags.successTags;
  const failTags = tags.failTags;

  //request 에 오늘 날짜와 함께 요청
  const now = new Date();
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth() + 1 > 9 ? now.getMonth()+1 : "0"+(now.getMonth()+1)
  const nowDate = now.getDate() > 9 ? now.getDate() : "0"+now.getDate()
  const today = `${nowYear}-${nowMonth}-${nowDate}`

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
    dispatch(__getUserTags(today))
  },[])

  return(
      <StTagsWrap>
        <StTagTitle>
          진행 중인 습관
        </StTagTitle>
        { stillTags?.length === 0 ? <StTagHelpTxt> 현재 진행 중인 <br/> 습관이 없습니다 </StTagHelpTxt> :
          stillTags?.map((stillTag, tagName)=>{
            return (
            <StTagShadowBox justify={"space-between"} key={tagName}>
              <StStillTag>
                <StStillTagName>
                  {stillTag.tagName}
                </StStillTagName>
                <TagWeekday weekData={stillTag.week}/>
              </StStillTag>
              <StStillTagdDay>
                D-{stillTag.dDay}
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
        <StTagShadowBox height={"150px"}>
        {successBtnToggle ?
          <ToggleTags tags={successTags}/> :
          <ToggleTags tags={failTags}/>
        }
        </StTagShadowBox>
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
  color: #343434;
`

const StTagShadowBox = styled.div`
  background-color: white;
  width: 100%;
  margin: 10px auto;
  min-height: ${props=>props.height};
  box-shadow: 3px 3px 8px lightgrey;
  padding: 10px;
  display: flex;
  justify-content: ${props=>props.justify};
  border-radius: 18px;
`

const StStillTag =  styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`

const StStillTagName =  styled.div`
  background-color: grey; 
  color: white;
  padding: 5px 8px;
  margin-right: 10px;
`

const StStillTagdDay =  styled.div`
  width: 50px;
  font-size: 15px;
  text-align: center;
  background-color: grey; 
  color: white;
  padding: 5px 8px;
  border-radius: 5px;
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
