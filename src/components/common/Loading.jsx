import styled from "styled-components"

import spinner from "../../assets/spinner.gif"

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
  width: 100%;
  height: 100vh;
  background-color: white;
  position: absolute;
  top: 0;
`

const StLoadingWrap = styled.div`
  width: fit-content;
  margin: 300px auto;
`

const StLoadingTxt = styled.div`
  width: max-content;
`