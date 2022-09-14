import styled from "styled-components"

import { useState } from "react"

import carousel1 from "../../assets/carousel1.png"


const Carousel = () => {
  
  // StCarouselContent 위치 값
  const [positionX, setPositionX] = useState(0);

  const carouselHandler = () => {
    if(positionX===300) {
      return
    }
    setPositionX(positionX+100)
  }
 
  return(
    <>
      <StCarouselLayout>

        <StCarouselContent positionX={positionX}>

          <StCarouselImg>
            <StCarouselParagraph>
              <StCarouselTitle>
                내 관심사에 맞는 습관을 추천
              </StCarouselTitle>
              <StCarouselTxt>
                여러분의 관심사 및 습관 빈도를 분석하여 꼭 맞는 습관을<br/>
                추천드립니다.
              </StCarouselTxt>
            </StCarouselParagraph>
          </StCarouselImg>

          <StCarouselImg>
            <StCarouselParagraph>
              <StCarouselTitle>
                포인트로 습관을 구매
              </StCarouselTitle>
              <StCarouselTxt>
                가입 축하 포인트로 자유롭게 습관을 구입해 봅시다.<br/>
                구입한 습관을 일전표에 추가하여 나만의 목표를 짜보세요!
              </StCarouselTxt>
            </StCarouselParagraph>
          </StCarouselImg>

          <StCarouselImg>
            <StCarouselParagraph>
              <StCarouselTitle>
                습관을 완료하여 포인트 획득
              </StCarouselTitle>
              <StCarouselTxt>
                일정표에 추가한 목표를 달성하세요. 일일 완료 포인트에<br/>
                기간 내 매일 완료 시 추가 포인트를 드립니다.
              </StCarouselTxt>
            </StCarouselParagraph>
          </StCarouselImg>

          <StCarouselImg>
            <StCarouselParagraph>
              <StCarouselTitle>
                포인트로 나만의 펫을 육성
              </StCarouselTitle>
              <StCarouselTxt>
                습관을 구매하고 남은 포인트로 펫을 키워보세요!<br/>
                또 다른 재미와 목표가 될 거예요.
              </StCarouselTxt>
            </StCarouselParagraph>
          </StCarouselImg>
          
        </StCarouselContent>
      </StCarouselLayout>
      
      <StCarouselBottom>
        <StCarouselDotwrap>
          <StCarouselActiveDot/>
          <StCarouselDot/>
          <StCarouselDot/>
          <StCarouselDot/>
        </StCarouselDotwrap>
        <StCarouselBtn onClick={carouselHandler} >Next</StCarouselBtn>
      </StCarouselBottom>
    </>
  )
}
export default Carousel

const StCarouselLayout = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const StCarouselContent = styled.div`
  width: 100%;
  height: 750px;
  position: absolute;
  top: 0;
  right: calc(${props=>props.positionX}%);
  transition: 1s;
  display: flex;
`

const StCarouselImg = styled.div`
  flex: none;
  width: 100%;
  height: 580px;
  background-image: url(${carousel1});
  background-position: center;
  background-size: cover;
`

const StCarouselParagraph = styled.div`
  position: relative;
  top: 580px;
  padding: 30px;
`

const StCarouselTitle = styled.h1`
  font-size: 25px;
`

const StCarouselTxt = styled.p`
  padding-top: 20px;
  font-size: 18px;
  font-weight: 400;
`

const StCarouselBottom = styled.div`
  position: absolute;
  bottom: 90px;
  width: 488px;
`

const StCarouselDotwrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 120px;
  margin: auto;
`

const StCarouselDot = styled.div`
  background-color: #D9D9D9;
  width: 13px;
  height: 13px;
  border-radius: 100%;
`

const StCarouselActiveDot = styled.div`
  background-color: #674DED;
  width: 39px;
  height: 13px;
  border-radius: 100px;
`

const StCarouselBtn = styled.button`
  all: unset;
  cursor: pointer;
  background-color: #674DED;
  color: white;
`

