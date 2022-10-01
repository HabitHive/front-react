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
        <Tag lists={stillTags} shadow={true} disabled={"disabled"}/>
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

  & .listLayout {
    padding: 0 3vw;
  }
`