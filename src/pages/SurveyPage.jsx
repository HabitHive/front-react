import styled from "styled-components";
import Category from "../components/survey/Category";

import { useSelector } from "react-redux";


const SurveyPage = () => {
  const user = useSelector(state=>state.user)
  console.log(user)

  return (
    <StSurveyWrap>
      <StSurveyTitle>
        {user.nickname} 님의 관심사는 무엇인가요? 
        <span>딱 맞는 습관을 추천해 드립니다.</span>
      </StSurveyTitle>
      <Category/>
    </StSurveyWrap>
  )
};

export default SurveyPage;

const StSurveyWrap = styled.div`
  padding: 20px;
`

const StSurveyTitle = styled.h1`
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  font-size: 25px;
  & span {
    margin: 5px 0;
    font-size: 17px;
    font-weight: 400;
    color: gray;
  }
`