import styled, { keyframes } from "styled-components"
import { BsStars } from "react-icons/bs";
import { CustomAlert } from "../common/Alert"
import { StSubmitBtn } from "../common/ButtonStyle";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { __getProfile } from "../../redux/modules/mypage"
import { __getPetData, __setPetXP, __getPoint } from "../../redux/modules/pet";

import petBG from "../../assets/mypetImg/petBG.png"
import petBox from "../../assets/mypetImg/petBox.png"
import cursor from "../../assets/mypetImg/cursor.cur"
import LV1 from "../../assets/mypetImg/LV1.gif"
import LV2 from "../../assets/mypetImg/LV2.gif"
import LV3 from "../../assets/mypetImg/LV3.gif"
import LV4 from "../../assets/mypetImg/LV4.gif"
import { petData } from "../pet/petData"
import Loading from "../common/Loading"

const Pet = () => {
  const dispatch = useDispatch();

  const user = useSelector((state)=>state.profile)
  const petInfo = useSelector((state)=>state.pet)

  // 로딩화면
  const [isLoad, setIsLoad] = useState(true);

  // 클릭 횟수 카운트
  const [count, setCount] = useState(1);
  
  // 경험치 바 
  const xp = 2**(petInfo.level-1) * 100
  const progressWidth = (petInfo.exp/xp) * 100

  // 펫 클릭 시 지급하는 추가 포인트
  const [plusPoint, setPlusPoint] = useState(0);

  const [textHandler, setTextHandler] = useState(false);
  const [petText, setPetText] = useState("");

  const feedPet = () => {
    if(petInfo.level >= 4 ) {
      CustomAlert({
        icon: "info",
        text: "다음 레벨을 준비 중입니다!"
      })
      return
    }
    dispatch(__setPetXP())
    .catch((err)=>{
      CustomAlert({
        icon: "error",
        text: "다시 시도해 주세요"
      })
    })
  }

  const petHandler = () => {
    setCount(count+1)
    if (count===5) {
      dispatch(__getPoint())
      .then((res)=>{
        if (res.type==="getPoint/rejected") {
          return
        } else {
          setPlusPoint(res.payload)
          setPetText(`${res.payload} 포인트 선물🎁`)
          setTextHandler(true)
          setTimeout(()=>{
            setTextHandler(false)
          },5000)
        }
      })
    }
  }

  useEffect(()=>{
    dispatch(__getPetData())
    dispatch(__getProfile())
    .then((res)=>{
      setTimeout(()=>{
        setIsLoad(false)
      },800)
    })
  },[petInfo])

  return (
    <StPetBG>
      { isLoad ? <Loading/> : null }
      <h1>
        <span>{user.nickname}</span> &nbsp; 님의 펫
      </h1>

      {
        textHandler ? <div className="petText">{petText}</div> : null
      } 

      <StPetImg level={petInfo.level}
        onClick={()=>{
          petHandler()
        }}
      />

      <StPetExpBox>
        <StPetExpNum>
          <p>EXP.</p>
          <p>{petInfo.exp}/{xp}xp</p>
        </StPetExpNum>

        <StPetExpBar>
          <StPetExpLV>
            Lv. 0{petInfo.level}
          </StPetExpLV>
          <StPetProgress>
            <StPetProgressActive width={progressWidth}/>
          </StPetProgress>
        </StPetExpBar>
        <StPetData>
          {
            petData.map((myPet, i)=>{
              return(
                <div key={i}>
                  <StPetDataKey>
                      {myPet.key} 
                  </StPetDataKey>
                  <StPetDataValue>
                      {myPet.value} 
                  </StPetDataValue>
                </div>
              )
            })
          }
        </StPetData>
      </StPetExpBox>

      <StMyPt>
        <p>My Point |<span><BsStars/> {user.point + plusPoint} </span>point</p>
      </StMyPt>
      <StPetBtn onClick={feedPet}>
        {
          petInfo.level === 4 ? "Max Level !" : <><BsStars/> <span>50 point</span> 펫 밥주기</>
        }
      </StPetBtn>
    </StPetBG>
  )
}
export default Pet

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(0px);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(-100px);
  }
`;

const StPetBG = styled.div`
  max-width: 450px;
  height: 100vh;
  background-color: #E2DCFF;
  background-image: url(${petBG});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column; 
  align-items: center;
  & .petText {
    font-family: 'Jua', sans-serif;
    animation: ${fadeIn} 5s;
    position: absolute;
    top: 20vh;
    color: #6334FF;
  }
  & h1 {
    margin: 12% 0;
    font-weight: 700; 
    font-size: 1.2rem;
    text-align: center;
    color: #343434;
    letter-spacing: -0.1rem;
    & span {
      color: #6334FF;
    }
  }
`

const StPetImg = styled.div`
  width: 248px;
  height: 248px;
  border-radius: 100%;
 
  background-image:
    url(
      ${ props => props.level === 1 ? LV1 : 
      props=>props.level === 2 ? LV2 :
      props=>props.level === 3 ? LV3 : LV4 }
    ), url(${petBox});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;

  cursor: url(${cursor}), pointer;
`

const StPetExpBox = styled.div`
  width: 80%; 
  background-color: white;
  margin-top: 15%;
  border-radius: 16px;
  padding: 4% 4%;
`

const StPetExpNum = styled.div`
  display: flex;
  justify-content: space-between;
  & p {
    font-weight: 600;
    font-size: 0.8rem;
  }
`

const StPetExpBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StPetExpLV = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 50px;
  height: 22px;
  background: linear-gradient(197.06deg, #907CF9 -6.2%, #6334FF 101.13%);
  border-radius: 6px;
  margin: 5px 0;

  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: -0.3px;
  color: #FFFFFF;
`

const StPetProgress = styled.div`
  width: 80%;
  height: 14px;

  background: #EBEBEB;
  border-radius: 7px;
`

const StPetProgressActive = styled.div`
  width: ${props=>props.width}%;
  height: 14px;

  background: linear-gradient(84.08deg, #907CF9 8.47%, #6334FF 88.8%);
  border-radius: 7px;
  transition: 1s;
`

const StPetData = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 17px;
  & div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

const StPetDataKey = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 68px;
  height: 26px;
  border: 1px solid #5039C8;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.9rem;
  color: #674DED;
`

const StPetDataValue = styled.div`
  width: 56px;
  height: 30px;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  text-align: center;
  letter-spacing: -0.3px;
  color: #5039C8;
`

const StMyPt = styled.div`
  width: 179px;
  height: 32px;
  background-color: white;
  font-weight: 500;
  font-size: 12px;
  color: #653BFA;
  margin: 24px auto 0;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  & p {
    position: relative;
    top: -3px;
  }
  & span {
    position: relative;
    top: 3px;
    font-weight: 600;
    font-size: 18px;
  }
`

const StPetBtn = styled(StSubmitBtn)`
  width: 55%;
  margin: 21px auto 0 auto;
  position: relative;

  background: linear-gradient(197.06deg, #907cf9 -6.2%, #6334ff 101.13%);
  border: 1px solid #674ded;
  box-shadow: 0 0 12px rgba(88, 56, 255, 0.25);
`