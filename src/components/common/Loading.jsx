import styled from "styled-components"

import loadingBG from "../../assets/loadingImg/loadingBG.png"
import mainLogo from "../../assets/loginImg/mainLogo.png"

const Loading = () => {
  return(
    <StLoadingBackground>
      로딩 중...
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

  display: flex;
  justify-content: center;
  align-items: center;

  font-family: 'Jua', sans-serif;
  font-size: 1.5rem;
  color: white;
`