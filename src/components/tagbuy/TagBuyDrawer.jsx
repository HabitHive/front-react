import styled, {keyframes} from "styled-components"
import { VscChromeClose } from "react-icons/vsc"
import { BsStars } from "react-icons/bs"

import { useState } from "react";
import { useDispatch } from "react-redux";
import { __addTag } from "../../redux/modules/tagbuy";

import TagLists from "./TagLists";

const TagBuyDrawer = ({selectedTag, drawer, setDrawer}) => {
  const dispatch = useDispatch();

  const [bought, setBought] = useState();

  //Drawer 닫기
  const drawerHandler = () => {
    setDrawer(false)
  }

  const tagSubmitHandler = (e) => {
    dispatch(__addTag(bought));
  }

  return (
    <StDrawerBg display={drawer ? null : "none"}> 
      <StDrawer>  
        <StDrawerHeader>
          <p>선택한 습관</p>
          <VscChromeClose
            style={{cursor:"pointer"}}
            onClick={drawerHandler}
          />
        </StDrawerHeader>
        <TagLists lists={selectedTag}/>

        <StDrawerBody>
          <span>기간선택</span>
          <StDrawerPeriodSelect
            onChange={e=>{
              setBought({
                ...bought,
                period: Number(e.target.value),
                tagId: selectedTag[0].tagId
              })
            }}
          >
            <StDrawerLable style={{width:"100%"}}>
              EVENT!! 1일
              <input type="radio" value={1} name="period"/>
            </StDrawerLable>
            <div>
              <StDrawerLable>
                5일
                <input type="radio" value={5} name="period"/>
              </StDrawerLable>
              <StDrawerLable>
                15일
                <input type="radio" value={15} name="period"/>
              </StDrawerLable>
              <StDrawerLable>
                30일
                <input type="radio" value={30} name="period"/>
              </StDrawerLable>
            </div>
          </StDrawerPeriodSelect> 
          <StDrawerCost>
            <p>소비포인트</p>
            <h5><span>1500</span>point</h5>
          </StDrawerCost>
        </StDrawerBody>

        <StDrawerFooter>
          <StDrawerPt>
            <p>내 포인트</p>
            <StDrawerMyPt>
              보유
              <StDrawerMyPtBox>
                <BsStars style={{margin:"5px"}}/> 2100 <span>point</span>  
              </StDrawerMyPtBox>
            </StDrawerMyPt>
          </StDrawerPt>
            <StDrawerCalc>
              사용 후 포인트 600 point
            </StDrawerCalc>
        </StDrawerFooter>
        <StDrawerBtnWrap>
          <StDrawerCancleBtn
            onClick={drawerHandler}
          >
            취소하기
          </StDrawerCancleBtn>
          <StDrawerSubmitBtn
            onClick={tagSubmitHandler}
          >
            구매하기
          </StDrawerSubmitBtn>
        </StDrawerBtnWrap>
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
  display: ${props=>props.display};
`

const slideUp = keyframes`
  from {
    transform: translateY(100px);
  } to {
    transform: translateY(0px);
  }
`

const StDrawer = styled.div`
  width: inherit;
  height: 500px;
  background-color: aliceblue;
  position: fixed;
  bottom: 0;
  border-radius: 16px 16px 0 0;
  padding: 30px;

  animation-duration: 0.4s;
  animation-timing-function: ease-out;
  animation-name: ${slideUp};
  animation-fill-mode: forwards;
`
  
const StDrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  font-weight: 600;
`

const StDrawerBody = styled.div`
  & span {
      color: #674DED;
      font-size: 15px;
      font-weight: 600;
    }
`

const StDrawerPeriodSelect = styled.div`
  display: flex;
  flex-direction: column;
  & div {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`

const StDrawerLable = styled.label`
  background-color: #777777;
  color: white;
  width: 31%;
  margin: 3px 0;
  height: 30px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  & input {
    visibility: hidden;
  }
`

const StDrawerCost = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  font-size: 15px;
  font-weight: 600;
  color: #343434;
  & span {
    font-size: 22px;
    font-weight: 700;
    color: #343434;
  }
`

const StDrawerFooter = styled.div`  
`

const StDrawerPt = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & p {
    font-size: 15px;
    font-weight: 600;
    color: #343434;
  }
  `

const StDrawerMyPt = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #674DED;
  display: flex;
  align-items: flex-end;
`

const StDrawerMyPtBox = styled.div`
  width: 150px;
  height: 40px;
  background-color: #674DED;
  color: white;
  font-size: 20px;
  border-radius: 5px;
  margin-left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  & span {
    font-size: 15px;
    font-weight: 400;
    margin-left: 5px;
  }
`

const StDrawerCalc = styled.div`
  color: #999999;
  text-align: right;
  margin: 10px 0;
  font-size: 14px;
  font-weight: 800;
`

const StDrawerBtnWrap = styled.div`
  
`

const StDrawerCancleBtn = styled.button`
  
`

const StDrawerSubmitBtn = styled.button`
  
`