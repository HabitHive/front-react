import styled from "styled-components";
import Category from "../components/survey/Category";

const SurveyPage = () => {
  return (
    <StSurveyWrap>
      <StSurveyTitle>
        나의 관심 카테고리 선택하기 
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