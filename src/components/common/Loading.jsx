import styled from "styled-components"

import spinner from "../../assets/spinner.gif"

const Loading = () => {
  return(
    <StLoadingBackground>
      <StLoadingImg src={spinner} alt="로딩 중..."/>
      <p>로딩 중...</p>
    </StLoadingBackground>
  )
}
export default Loading

const StLoadingBackground = styled.div`
  width: 100%;
  height: 100vh;
  background-color: white;
  position: absolute;
  top: 0;
  & > p {
    position: relative;
    top: 33%;
    left: 35%;  
  }
`

const StLoadingImg = styled.img`
  position: relative;
  top: 30%;
  left: 35%;
`