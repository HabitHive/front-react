import styled from "styled-components"

import { useState } from "react"
import { useNavigate } from "react-router"

import carouselContents from "./carouselContents"
import { StSubmitBtn } from "../common/SaveButtonLong"
import { useEffect } from "react"

const Carousel = () => {
  const navigate = useNavigate();
  
  // StCarouselContent 위치 값
  const [positionX, setPositionX] = useState(0);

  // 마우스 포지션 값
  const [down, setDown] = useState(0);
  const [up, setUp] = useState(0);

  const carouselHandler = () => {
    if(positionX===300) {
      return
    }
    setPositionX(positionX+100)
  }

  // 인디케이터 className 으로 CSS 활성화
  const dots = [0,100,200,300]

  // carousel 드래그 감지
  const getMouseDown = (e) => {
    setDown(e.touches[0].screenX)
  }

  const getMouseUp = (e) => {
    setUp(e.changedTouches[0].screenX)
  }

  useEffect(()=>{
    if (down < up) {
      if (positionX===0) {
        return
      } else {
        setPositionX(positionX-100)
      }
    } else if (down > up) {
      if (positionX===300) {
        return
      } else {
        setPositionX(positionX+100)
      }
    }
  },[up])
 
  return(
    <>
      <StCarouselLayout
        onTouchStart={(e)=>getMouseDown(e)}  
        onTouchEnd={(e)=>getMouseUp(e)}
      >
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
      
      <div>
        <StCarouselDotwrap>
          {
            dots.map((dot, i)=>{
              return(
                <StCarouselDot key={i}
                  className={dot === positionX ? "active" : null}
                  onClick={()=>setPositionX(dot)}
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
          : <StCarouselBtnWrap>
              <StSubmitBtn onClick={()=>navigate("/survey")}>
                시작하기
              </StSubmitBtn> 
            </StCarouselBtnWrap>
        }
      </div>
    </>
  )
}
export default Carousel

const StCarouselLayout = styled.div`
  position: relative;
  max-width: 450px;
  height: calc(100vh - 112px - 48px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: grab;
  `

const StCarouselContent = styled.div`
  width: 100%;
  height: 65vh;
  position: absolute;
  top: -5vh;
  right: calc(${props=>props.positionX}%);
  transition: 1s;
  display: flex;
`

const StCarouselImg = styled.div`
  flex: none;
  width: 100%;
  background-image: url(${props=>props.img});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`

const StCarouselParagraph = styled.div`
  position: relative;
  top: 63vh;
  margin: 32px 20px 0 20px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

const StCarouselTitle = styled.h1`
  font-size: 1.2em;
  color: #343434;
`

const StCarouselTxt = styled.p`
  padding-top: 14px;
  font-size: 0.8rem;
  font-weight: 400;
  color: #2D2D2D;
`

const StCarouselDotwrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 20%;
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
  cursor: pointer;
`

const StCarouselBtnWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10vh 20px 0 20px;
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