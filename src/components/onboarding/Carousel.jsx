import styled from "styled-components"

import { useState } from "react"
import { useNavigate } from "react-router"

import carouselContents from "./carouselContents"
import SaveButtonLong from "../common/SaveButtonLong"

const Carousel = () => {
  const navigate = useNavigate();
  
  // StCarouselContent 위치 값
  const [positionX, setPositionX] = useState(0);

  const carouselHandler = () => {
    if(positionX===300) {
      return
    }
    setPositionX(positionX+100)
  }

  const dots = [0,100,200,300]
 
  return(
    <>
      <StCarouselLayout>

        <StCarouselContent positionX={positionX}>
          {
            carouselContents.map((data, img)=>{
              return(
                <StCarouselImg key={img} img={data.img}>
                  <StCarouselParagraph>
                    <StCarouselTitle>
                      {data.title}
                    </StCarouselTitle>
                    <StCarouselTxt>
                      {data.txt}
                    </StCarouselTxt>
                  </StCarouselParagraph>
                </StCarouselImg>
              )
            })
          }
        </StCarouselContent>
      </StCarouselLayout>
      
      <StCarouselBottom>
        <StCarouselDotwrap>
          {
            dots.map((dot, i)=>{
              return(
                <StCarouselDot key={i}
                  className={dot === positionX ? "active" : null}
                />
              )
            })
          }
        </StCarouselDotwrap>
        {
          positionX !== 300 ? 
            <StCarouselBtnWrap>
              <StCarouselLink onClick={()=>navigate("/survey")}>skip</StCarouselLink>
              <StCarouselBtn onClick={carouselHandler} >Next</StCarouselBtn>
            </StCarouselBtnWrap>
          : <SaveButtonLong 
              onClick={()=>navigate("/survey")}
              btnName={"시작하기"}
              top={56}
              left={20}
            />
        }
            
      </StCarouselBottom>
    </>
  )
}
export default Carousel

const StCarouselLayout = styled.div`
  position: relative;
  width: 360px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const StCarouselContent = styled.div`
  width: 360px;
  height: 750px;
  position: absolute;
  top: 0;
  right: calc(${props=>props.positionX}%);
  transition: 1s;
  display: flex;
`

const StCarouselImg = styled.div`
  flex: none;
  width: 360px;
  height: 464px;
  background-image: url(${props=>props.img});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`

const StCarouselParagraph = styled.div`
  position: relative;
  top: 464px;
  margin: 32px 20px 0 20px;
`

const StCarouselTitle = styled.h1`
  font-size: 22px;
  color: #343434;
`

const StCarouselTxt = styled.p`
  padding-top: 14px;
  font-size: 14px;
  font-weight: 400;
  color: #2D2D2D;
`

const StCarouselBottom = styled.div`
  position: relative;
  bottom: 144px;
  width: 360px;
`

const StCarouselDotwrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 96px;
  margin: auto;
`

const StCarouselDot = styled.div`
  background-color: #D9D9D9;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  &.active{
    background-color: #674DED;
    width: 30px;
    border-radius: 100px;
  }
`

const StCarouselBtnWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 70px 20px 0 20px;
`

const StCarouselLink = styled.button`
  all: unset;
  cursor: pointer;
  font-size: 16px;
  color: #999999;
`

const StCarouselBtn = styled.button`
  all: unset;
  cursor: pointer;
  background-color: #674DED;
  width: 80px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`

