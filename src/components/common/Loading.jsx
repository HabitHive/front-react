import styled from "styled-components"

import spinner from "../../assets/loadingImg/spinner.gif"
import loadingBG from "../../assets/loadingImg/loadingBG.png"

const Loading = () => {
  return(
    <StLoadingBackground>
      <StLoadingWrap>
        <img src={spinner} alt="로딩 중..."/>
        <StLoadingTxt>로딩 중...</StLoadingTxt>
      </StLoadingWrap>
    </StLoadingBackground>
  )
}
export default Loading

const StLoadingBackground = styled.div`
  width: 360px;
  height: 100vh;
  margin: auto;
  background-image: url(${loadingBG});
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  z-index: 100;
`

const StLoadingWrap = styled.div`
  width: fit-content;
  margin: 300px auto;
`

const StLoadingTxt = styled.div`
  width: max-content;
`