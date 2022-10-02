import { useSelector } from "react-redux"
import styled from "styled-components"

import Header from "../common/Header"
import Tag from "../common/Tag"

const ListModal = ({setModal}) => {

  const stillTags = useSelector(state=>state.profile.userTags.stillTags)
      
  return (
    <StListModal>
      <Header text={"나의 습관 목록"} setModal={setModal}/>
      <div className="listLayout">
        {
          stillTags.length === 0 ? 
            <div className="helpText">
              <p className="boldText">진행 중인 습관이 없어요.</p>
              습관은 상점에서 구매 후 메인에서 등록할 수 있습니다.
            </div>  
          : <Tag lists={stillTags} shadow={true} disabled={"disabled"}/>
        }
      </div>
    </StListModal>
  )
}
export default ListModal

const StListModal = styled.div`
  width: 100%;
  max-width: 450px;
  height: 100vh;
  background-color: #F6F7FB;

  position: fixed;
  top: 0;

  overflow: scroll;

  & .listLayout {
    padding: 0 3vw;
  }

  & .helpText {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10vh;
    
    font-weight: 500;
    font-size: 14px;
    text-align: center;
    letter-spacing: -0.3px;
    color: #999999;
    line-height: 18px;
  }
`