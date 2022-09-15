import styled from "styled-components";
import Category from "../components/survey/Category";

const SurveyPage = () => {

  return (
    <StSurveyWrap>
      <StSurveyTitle>
        관심사를 선택해 주세요!
        <span>적절한 습관을 추천받을 수 있어요</span>
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
  font-size: 26px;
  font-weight: 700;
  color: #343434;
  & span {
    margin: 5px 0;
    font-size: 16px;
    font-weight: 600;
    color: #999999;
  }
`