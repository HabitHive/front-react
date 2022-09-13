import styled from "styled-components"

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { __getProfile } from "../../redux/modules/mypage";


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
      <StUserImg>
        <StPetImg/>
      </StUserImg>
      <p>{profile.nickname}</p>
      <StPoint>
        ✨{profile.point} <span>point</span>
      </StPoint>
    </StProfileWrap>
  </>
  )
}
export default Profile

const StProfileWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & p {
    font-size: 30px;
    font-weight: bold;
  }
`

const StUserImg = styled.div`
  background-color: lightgray;
  width: 180px;
  height: 180px;
  border-radius: 100%;
  margin: 30px auto;
`

const StPetImg = styled.div`
  background-color: gray;
  width: 80px;
  height: 80px;
  border-radius: 100%;
  position: relative;
  top: 100px;
  left: 120px;
`

const StPoint = styled.div`
 background-color: gray;
 width: 180px;
 height: 30px;
 border-radius: 5px;
 text-align: center;
 font-size: 20px;
 color: white;
 margin: 10px auto;
 & span {
  font-size: 15px;
 }
`