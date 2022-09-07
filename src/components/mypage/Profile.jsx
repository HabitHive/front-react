import styled from "styled-components"
import Swal from "sweetalert2";

import axios from "../../axios/axios"
import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState({});

  const getUserInfo = async () => {
    // await axios.get(`/user/mypage/info`) 백서버 연결할 때 사용
    await axios.get(`/info`)
    .then((res) => {
      setUser(res.data[0])
    })
    .catch((err) => {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "에러메시지 나중에 넣기",
        confirmButtonText: "확인",
      });
    });
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
      <p>{user.nickname}</p>
      <StPoint>
        ✨{user.point} <span>point</span>
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