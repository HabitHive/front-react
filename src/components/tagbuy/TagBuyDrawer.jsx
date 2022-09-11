import styled from "styled-components"
import { VscChromeClose } from "react-icons/vsc"

const TagBuyDrawer = () => {
  return (
    <StDrawerBg>
      <StDrawer>  
        <StDrawerHeader>
          <p>선택한 습관</p>
          <VscChromeClose/>
        </StDrawerHeader>

      </StDrawer>
    </StDrawerBg>
  )
}
export default TagBuyDrawer

const StDrawerBg = styled.div`
  position: absolute;
  top: 0;
  width: 488px;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
`

const StDrawer = styled.div`
  width: inherit;
  height: 400px;
  background-color: aliceblue;
  position: fixed;
  bottom: 0;
  border-radius: 16px 16px 0 0;
  padding: 30px;
`
  
const StDrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  font-weight: 600;
`