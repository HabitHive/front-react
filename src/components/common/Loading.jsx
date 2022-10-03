import styled from "styled-components"

import loadingBG from "../../assets/loadingImg/loadingBG.png"
import mainLogo from "../../assets/loginImg/mainLogo.png"

const Loading = () => {
  return(
    <StLoadingBackground/>
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