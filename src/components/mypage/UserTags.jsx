import styled from "styled-components"

import axios from "../../axios/axios"
import { useEffect, useState } from "react";

const UserTags = () => {
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

  // 마운트 시 유저 정보 불러오기
  const getUserTags = async (today) => {
    // await axios.put(`/user/mypage/tag`, today) 백서버 연결할 때 사용
    await axios.get(`/tag`)
    .then((res) => {
      setStillTags(res.data[0].stillTags)
      setSuccessTags(res.data[0].successTags)
      setFailTags(res.data[0].failTags)
    })
    .catch((err) => {
      console.log(err);
    });
  };

  useEffect(()=>{
    getUserTags(today)
  },[])

  console.log(stillTags)
  console.log(successTags)
  console.log(failTags)

  return(
    <StTagsWrap>
      <StTagTitle>
        진행 중인 습관
      </StTagTitle>
      {
        stillTags.map((stillTag, tagName)=>{
          return (
          <StTagShadowBox display={"flex"} key={tagName}>
            <StStillTag>
              <StStillTagName>
                {stillTag.tagName}
              </StStillTagName>
              <StStillTagWeek>
                월
              </StStillTagWeek>
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
        <StDoneTag>
          물 마시기
        </StDoneTag>
      </StTagShadowBox>
    </StTagsWrap>
  )
}
export default UserTags

const StTagsWrap = styled.div`
  padding: 20px;
`

const StTagTitle = styled.h3`
  margin: 10px 0;
`

const StTagShadowBox = styled.div`
  background-color: white;
  width: 100%;
  margin: 10px auto;
  min-height: ${props=>props.height};
  box-shadow: 3px 3px 8px lightgrey;
  padding: 10px;
  display: ${props=>props.display};
  justify-content: space-between;
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
`

const StStillTagWeek =  styled.div`
  background-color: lightgray;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  font-size: 15px;
  text-align: center;
  margin: 0 10px;
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

const StDoneTag =  styled.div`
  width: max-content;
  background-color: grey; 
  color: white;
  padding: 5px 8px;
  border-radius: 5px;
`
