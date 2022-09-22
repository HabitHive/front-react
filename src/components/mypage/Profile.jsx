import styled from "styled-components"

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { __getProfile } from "../../redux/modules/mypage";

import propfileBG from "../../assets/mypageImg/profileBG.png"
import userIMG from "../../assets/mypageImg/userIMG.png"
import userPet1 from "../../assets/mypageImg/userPet1.png"
import { BsStars } from "react-icons/bs";


const Profile = () => {
  const dispatch = useDispatch();

  const profile = useSelector(state=>state.profile)

  const getUserInfo = async () => {
    dispatch(__getProfile())
  };

  useEffect(()=>{
    getUserInfo()
  },[])

  return(
  <>
    <StProfileWrap>
      <span>마이메뉴</span>
      <StUserImg>
        <StPetImg/>
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
  height: 326px;
  background-image: url(${propfileBG});
  display: flex;
  flex-direction: column;
  align-items: center;
  & > span {
    font-weight: 700;
    font-size: 18px;
    color: #343434;
    letter-spacing: -0.3px;
    margin: 47px auto 12px auto;
  }
  & p {
    font-weight: 700;
    font-size: 20px;
    color: #343434;
  }
`

const StUserImg = styled.div`
  background-color: lightgray;
  width: 120px;
  height: 120px;
  border-radius: 100%;
  margin: 12px auto 15px auto;
  background-image: url(${userIMG});
  background-position: center;
  background-size: contain;
`

const StPetImg = styled.div`
  background-color: gray;
  width: 44px;
  height: 44px;
  border-radius: 100%;
  position: relative;
  top: 76px;
  left: 76px;
  background-image: url(${userPet1});
  background-image: contain;
  background-position: center;
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