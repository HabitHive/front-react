import styled, {keyframes} from "styled-components"
import { VscChromeClose } from "react-icons/vsc"
import { BsStars } from "react-icons/bs"

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __addTag } from "../../redux/modules/tagbuy";

import TagLists from "./TagLists";

const TagBuyDrawer = ({selectedTag, drawer, setDrawer}) => {
  const dispatch = useDispatch();

  // 구매한 습관 
  const [bought, setBought] = useState(
    {
      period: 0,
      tagId: 0
    }
  );

  // 유저의 보유 포인트
  const userPoint = useSelector((state)=>state.tagBuy.userPoint)

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
        <TagLists lists={selectedTag} disabled={"disabled"}/>

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
            <StDrawerLable style={{width:"100%"}} 
              className={bought.period===1? "active" : null}
            >
              EVENT!! 1일
              <input type="radio" value={1} name="period"/>
            </StDrawerLable>
            <div>
              <StDrawerLable style={{width:"95px"}} 
                className={bought.period===5? "active" : null}
              >
                5일
                <input type="radio" value={5} name="period"/>
              </StDrawerLable>
              <StDrawerLable style={{width:"95px"}} 
                className={bought.period===15? "active" : null}
              >
                15일
                <input type="radio" value={15} name="period"/>
              </StDrawerLable>
              <StDrawerLable style={{width:"95px"}} 
                className={bought.period===30? "active" : null}
              >
                30일
                <input type="radio" value={30} name="period"/>
              </StDrawerLable>
            </div>
          </StDrawerPeriodSelect> 
          <StDrawerCost>
            <p>소비포인트</p>
            <h5><span>{bought.period*10}</span>point</h5>
          </StDrawerCost>
        </StDrawerBody>

        <StDrawerFooter>
          <StDrawerPt>
            <p>내 포인트</p>
            <StDrawerMyPt>
              보유
              <StDrawerMyPtBox>
                <BsStars style={{margin:"5px"}}/> {userPoint} <span>point</span>  
              </StDrawerMyPtBox>
            </StDrawerMyPt>
          </StDrawerPt>
            <StDrawerCalc>
              사용 후 포인트 {userPoint-bought.period*10} point
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
  width: 360px;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
  display: ${props=>props.display};
`

const CarouselUp = keyframes`
  from {
    transform: translateY(100px);
  } to {
    transform: translateY(0px);
  }
`

const StDrawer = styled.div`
  width: inherit;
  height: 442px;
  background-color: white;
  position: fixed;
  bottom: 0;
  border-radius: 16px 16px 0 0;
  padding: 30px;

  animation-duration: 0.4s;
  animation-timing-function: ease-out;
  animation-name: ${CarouselUp};
  animation-fill-mode: forwards;
`
  
const StDrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 600;
  color: #343434
`

const StDrawerBody = styled.div`
  & span {
      color: #674DED;
      font-size: 14px;
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
  background-color: #F6F7FB;
  width: 31%;
  height: 24px;
  margin: 3px 0;
  border-radius: 6px;
  
  display: flex;
  justify-content: center;
  align-items: center;
  
  color: #999999;
  font-weight: 600;
  font-size: 12px;
  text-align: center;

  cursor: pointer;
  & input {
    visibility: hidden;
  }
  &.active {
    color: white;
    background: linear-gradient(197.06deg, #907cf9 -6.2%, #6334ff 101.13%);
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
  & p {
    font-weight: 500;
    font-size: 14px;
  }
`

const StDrawerFooter = styled.div`  
`

const StDrawerPt = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & p {
    font-size: 14px;
    font-weight: 500;
    color: #343434;
  }
  `

const StDrawerMyPt = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #674DED;
  display: flex;
  align-items: flex-end;
`

const StDrawerMyPtBox = styled.div`
  width: 150px;
  height: 40px;
  background: linear-gradient(197.06deg, #907cf9 -6.2%, #6334ff 101.13%);
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
  font-size: 12px;
  font-weight: 500;
`

const StDrawerBtnWrap = styled.div`
  
`

const StDrawerCancleBtn = styled.button`
  
`

const StDrawerSubmitBtn = styled.button`
  
`