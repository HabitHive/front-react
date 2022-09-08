import styled from "styled-components"
import Loading from "../common/Loading";

import axios from "../../axios/axios"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import TagWeekday from "./TagWeekday";
import ToggleTags from "./ToggleTags";

const UserTags = () => {
  const navigate = useNavigate();

  // true일 때 로딩화면이 보여진다
  const [loading, setLoading] = useState(true);

  //태그 목록 분류
  const [stillTags, setStillTags] = useState({});
  const [successTags, setSuccessTags] = useState({});
  const [failTags, setFailTags] = useState({});

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

  // 유저의 태그 정보 불러온 후 로딩화면 닫기
  const getUserTags = async (today) => {
    // await axios.put(`/user/mypage/tag`, today) 백서버 연결할 때 사용
    await axios.get(`/tag`)
    .then((res) => {
      setStillTags(res.data[0].stillTags)
      setSuccessTags(res.data[0].successTags)
      setFailTags(res.data[0].failTags)
      setLoading(false)
    })
    .catch((err) => {
      console.log(err);
    });
  };

  useEffect(()=>{
    getUserTags(today)
  },[])

  return(
    <>
      {loading ? <Loading /> :
        <StTagsWrap>
          <StTagTitle>
            진행 중인 습관
          </StTagTitle>
          { stillTags.length === 0 ? <StTagHelpTxt> 현재 진행 중인 습관이 없습니다 </StTagHelpTxt> :
            stillTags.map((stillTag, tagName)=>{
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
      }
    </>
  )
}
export default UserTags

const StTagsWrap = styled.div`
  padding: 20px;
`

const StTagTitle = styled.h3`
  margin: 10px 0;
`

const StTagHelpTxt = styled.p`
  font-size: 13px;
  text-align: center;
  margin: 20px 0;
  color: #a5a5a5;
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
  margin: 0 10px 10px 0;
  padding: 5px 10px;
  border-radius: 20px;
  background: none;
  color: #8d8d8d;
  border: 1px solid #8d8d8d;
  cursor: pointer;
  &.active{
    border: none;
    background-color: grey; 
    color: white;
  }
`
