import styled from "styled-components"

import testImg from "../../assets/onboardingTest.png"

const PageSlide = () => {
  return(
    <>
      <StSlideLayout>

        <StSlideImg/>

        <StSlideContent>
          <StSlideTitle>
            내게 맞는 습관을 추천받으세요
          </StSlideTitle>
          <StSlideTxt>
            관심사 선택 및 습관 빈도를 분석하여
            꼭 맞는 습관을 추천드립니다 
          </StSlideTxt>

          <StSlideDot>
            ● ● ● ●
          </StSlideDot>

          <StSlideBtnWrap>
            skip
            <StSlideBtn>
              next
            </StSlideBtn>
          </StSlideBtnWrap>

        </StSlideContent>
      </StSlideLayout>
    </>
  )
}
export default PageSlide

const StSlideLayout = styled.div`
  position: relative;
  top: 100px;
`

const StSlideImg = styled.div`
  height: 45vh;
  background-image: url(${testImg});
  background-repeat: no-repeat;
  background-size: cover;
`

const StSlideContent = styled.div`
  margin: 30px 20px;
`

const StSlideTitle = styled.h2`

`

const StSlideTxt = styled.p`
  margin: 30px 0;
`

const StSlideDot = styled.div`
  
`

const StSlideBtnWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StSlideBtn = styled.button`
  
`