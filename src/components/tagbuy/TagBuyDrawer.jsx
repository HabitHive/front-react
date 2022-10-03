import styled, {keyframes} from "styled-components"
import { CustomAlert, CustomToast } from "../../components/common/Alert"
import { VscChromeClose } from "react-icons/vsc"
import { BsStars } from "react-icons/bs"

import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { __addTag, __addUsersTag, __deleteUsersTag } from "../../redux/modules/tagbuy";

import Tag from "../common/Tag"
import { StSubmitBtn } from "../common/ButtonStyle";

const TagBuyDrawer = ({selectedTag, drawer, setDrawer}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 구매한 습관 
  const [bought, setBought] = useState(
    {
      period: 0,
      tagId: 0
    }
  );

  // 유저의 보유 포인트
  const userPoint = useSelector((state)=>state.tagBuy.userPoint)

  // 유저가 작성한 습관
  const [usersHabit, setUsersHabit] = useState("");

  const tagSubmitHandler = async () => {
    if (bought.period===0) {
      CustomAlert({
        icon: "warning",
        text: "구매 기간을 선택해 주세요"
      })
      return
    } else if (usersHabit === "" && selectedTag[0].tagId === -100) {
      CustomAlert({
        icon: "warning",
        text: "습관을 입력해 주세요"
      })
    } else if (usersHabit !== "" && selectedTag[0].tagId === -100) {
      await dispatch(__addUsersTag({
        tagName: usersHabit,
        period: bought.period
      }))
      .then((res) => {
        if (res.type==="addUsersTag/fulfilled") {
          CustomToast({
            icon: "success",
            text: "구매 완료"
          })
          navigate("/")
        } else if (res.payload.response.status===400) {
          const cal = Math.abs(res.payload.response.data.result)
          CustomAlert({
            icon: "warning",
            text: `${cal}point가 부족합니다`
          })
        }
      })
    } else {
      await dispatch(__addTag(bought))
      .then((res) => {
        if (res.type==="addTag/fulfilled") {
          CustomToast({
            icon: "success",
            text: "구매 완료"
          })
          navigate("/")
        } else if (res.payload.response.status===400) {
          const cal = Math.abs(res.payload.response.data.result)
          CustomAlert({
            icon: "warning",
            text: `${cal}point가 부족합니다`
          })
        }
      })
    }
  };

  const tagDeleteHandler = async () => {
    // 취소 확인 버튼 추가하기
    await dispatch(__deleteUsersTag(selectedTag[0]?.tagId))
    .then((res) => {
      // 예외처리 추가하기
      CustomToast({
        icon: "success",
        text: "습관을 삭제했습니다"
      })
      navigate("/")
    })    
  }

  return (
    <StDrawerBg display={drawer ? null : "none"}> 
      <StDrawer>  
        <StDrawerHeader>
          <p>선택한 습관</p>
          <VscChromeClose
            style={{cursor:"pointer"}}
            onClick={()=>setDrawer(false)}
          />
        </StDrawerHeader>
        {
          selectedTag[0]?.category?.indexOf("내 습관") === -1 ? null :
          <StTagDeleteBtn
            onClick={tagDeleteHandler}
          >
            내 습관 삭제하기
          </StTagDeleteBtn>
        }
        {
          selectedTag[0].tagId === -100 ?
          <Tag lists={selectedTag} disabled={"disabled"} diy={true} setUsersHabit={setUsersHabit}/>
          : <Tag lists={selectedTag} disabled={"disabled"}/>
        }

        <StDrawerPeriodSelect
          onChange={e=>{
            setBought({
              ...bought,
              period: Number(e.target.value),
              tagId: selectedTag[0].tagId
            })
          }}
          >
          <span>기간선택</span>
          <StDrawerLable style={{width:"100%"}} 
            className={bought.period===1? "active" : null}
          >
            <p>EVENT!! 1일</p>
            <input type="radio" value={1} name="period"/>
          </StDrawerLable>
          <div>
            <StDrawerLable style={{width:"95px"}} 
              className={bought.period===5? "active" : null}
            >
              <p>5일</p>
              <input type="radio" value={5} name="period"/>
            </StDrawerLable>
            <StDrawerLable style={{width:"95px"}} 
              className={bought.period===15? "active" : null}
            >
              <p>15일</p>
              <input type="radio" value={15} name="period"/>
            </StDrawerLable>
            <StDrawerLable style={{width:"95px"}} 
              className={bought.period===30? "active" : null}
            >
              <p>30일</p>
              <input type="radio" value={30} name="period"/>
            </StDrawerLable>
          </div>
        </StDrawerPeriodSelect> 
        <StDrawerCost>
          <p>소비포인트</p>
          <h5><span>{bought.period*10}</span>point</h5>
        </StDrawerCost>

        <StDrawerDiv/>

        <div>
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
        </div>

        <StDrawerBtnWrap>
          <StDrawerCancleBtn
            onClick={()=>setDrawer(false)}
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
  position: fixed;
  top: 0;
  left: inherit;
  width: 450px;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: ${props=>props.display};
  z-index: 1;
`

const DrawerUp = keyframes`
  from {
    transform: translateY(100px);
  } to {
    transform: translateY(0px);
  }
`

const StDrawer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 450px;

  background-color: white;
  border-radius: 16px 16px 0 0;
  padding: 20px;

  display: flex;
  flex-direction: column;

  animation: ${DrawerUp} 0.5s;
  animation-direction: alternate;
`
  
const StDrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 600;
  color: #343434;
  font-size: 1rem;
  font-weight: 600;
`

const StTagDeleteBtn = styled.button`
  all: unset;
  cursor: pointer;
  font-size: .9rem;
  width: max-content;
  display: flex;
  align-self: flex-end;
  margin: 10px 0 -10px 0;
  color: #999999;
  text-decoration: underline;
`

const StDrawerPeriodSelect = styled.form`
  display: flex;
  flex-direction: column;
  & span {
    color: #674DED;
    font-size: 14px;
    font-weight: 600;
    margin: 4px 0 8px 0;
  }
  & div {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`

const StDrawerLable = styled.label`
  background-color: #F6F7FB;
  min-width: 31%;
  height: 30px;
  margin: 1% 0;
  border-radius: 6px;
  
  display: flex;
  justify-content: center;
  align-items: center;
  
  color: #999999;
  font-weight: 600;
  font-size: 0.8rem;

  cursor: pointer;

  & input {
    all: unset;
  }
  &.active {
    color: white;
    background: #674DED;
  }
`

const StDrawerCost = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5% 0;
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

const StDrawerDiv = styled.div`
  width: 360px;
  height: 6px;
  position: relative;
  left: -20px;
  margin-bottom: 12px;
  background: #F6F7FB;
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
  background: #674DED;
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
  display: flex;
  justify-content: space-between;
`

const StDrawerCancleBtn = styled(StSubmitBtn)`
  background: #CCCCCC;
  border-radius: 6px;
  width: 30%;
  height: 42px;
`

const StDrawerSubmitBtn = styled(StSubmitBtn)`
  border-radius: 6px;
  width: 67%;
  height: 42px;
`