import styled from "styled-components"

import loadingBG from "../../assets/loadingImg/loadingBG.png"
import mainLogo from "../../assets/loginImg/mainLogo.png"
import moon from "../../assets/loadingImg/moon.png"
import LV1 from "../../assets/mypetImg/LV1.gif"

const Loading = () => {
  return(
    <StLoadingBackground>
      <StLoadingWrap/>
    </StLoadingBackground>
  )
}
export default Loading

const StLoadingBackground = styled.div`
  width: 450px;
  height: 100vh;
  background-image: url(${mainLogo}), url(${loadingBG});
  background-size: 50%, cover;
  background-position-x: center;
  background-position-y: 20vh, center;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  z-index: 100;
`

const StLoadingWrap = styled.div`
  background-image: url(${LV1}), url(${moon});
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: -250px, 100px;
  width: 80%;
  height: 300px;
  position: absolute;
  left: 10%;
  bottom: 0;
`