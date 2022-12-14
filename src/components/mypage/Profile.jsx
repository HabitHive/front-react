import styled from "styled-components"

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { __getProfile } from "../../redux/modules/mypage";

import propfileBG from "../../assets/mypageImg/profileBG.png"
import userIMG from "../../assets/mypageImg/userIMG.png"
import LV1 from "../../assets/mypageImg/LV1.png"
import LV2 from "../../assets/mypageImg/LV2.png"
import LV3 from "../../assets/mypageImg/LV3.png"
import LV4 from "../../assets/mypageImg/LV4.png"
import { BsStars } from "react-icons/bs"
import { CustomAlert } from "../common/Alert";

const Profile = () => {
  const dispatch = useDispatch();

  const profile = useSelector(state=>state.profile)

  const getUserInfo = async () => {
    dispatch(__getProfile())
    .then((res)=>{
      if (res.type === "getProfile/rejected") {
        CustomAlert({
          icon: "error",
          text: "데이터를 불러올 수 없습니다"
        })
      }
    })
  };

  useEffect(()=>{
    getUserInfo()
  },[])

  return(
  <>
    <StProfileWrap>
      <h1>마이메뉴</h1>
      <div></div>
      <StUserImg>
        <StPetImg level={profile.petLevel}/>
      </StUserImg>
      <p>{profile.nickname}</p>
      <StPoint>
        <BsStars/> {profile.point} <span>point</span>
      </StPoint>
    </StProfileWrap>
  </>
  )
}
export default Profile

const StProfileWrap = styled.div`
  background-image: url(${propfileBG});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0 0 16px 16px;
  & h1 {
    margin: 6vh 0;
    font-weight: 700; 
    font-size: 1.2rem;
    text-align: center;
    color: #343434;
    letter-spacing: -0.1rem;
  }
  & p {
    font-weight: 800;
    font-size: 20px;
    color: #343434;
  }
`

const StUserImg = styled.div`
  background-color: lightgray;
  width: 150px;
  height: 150px;
  border-radius: 100%;
  margin-bottom: 5px;
  background-image: url(${userIMG});
  background-position: center;
  background-size: contain;
`

const StPetImg = styled.div`
  background-color: #EDEAFF;
  width: 66px;
  height: 66px;
  border: 1px solid #AE9FFF;
  border-radius: 100%;
  position: relative;
  top: 84px;
  left: 84px;
  background-image: url(
    ${ props => props.level === 1 ? 
        LV1 : props=>props.level === 2 ?
        LV2 : props=>props.level === 3 ? 
        LV3 : LV4 }
  );
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

const StPoint = styled.div`
  background: linear-gradient(197.06deg, #907cf9 -6.2%, #6334ff 101.13%);
  width: 120px;
  height: 32px;
  margin: 10px auto;

  border-radius: 5px;
  border: 1px solid #674DED;

  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: white;
  
  & span {
  font-weight: 500;
  font-size: 12px;
  }
`