import styled from "styled-components";
import { FiAlertCircle } from "react-icons/fi"

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, __basicLogin, __kakaoLogin } from "../../redux/modules/user";

import SaveButtonLong from "../common/SaveButtonLong";
import mainLogo from "../../assets/loginImg/mainLogo.png"
import loginBG from "../../assets/loginImg/loginBG.png"
import { BsFillChatFill } from "react-icons/bs"
import { ConfirmToast } from "../common/Alert";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 예외처리 메시지
  const [msg, setMsg] = useState("");

  const initValue = {
    email: "",
    password: ""
  }

  //유효성검사
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ 
    mode: 'onChange',
    defaultValues: initValue
  });
  

  //리액트훅폼은 e.preventDefault를 명시하지 않아도 된다
  //에러코드에 따라서 예외처리, helpText 사용
  const onSubmit = (data) => {
    dispatch(__basicLogin(data))
    .then((res)=>{
      if (res.payload===400) {
        setMsg("Error: 관리자에게 문의바랍니다")
      } else if (res.payload===403) {
        setMsg("이메일 또는 비밀번호를 잘못 입력했습니다")
      } else if (res.payload===404) {
        setMsg("연결이 불안정합니다. 잠시 후 다시 시도해 주세요")
      } else if (res.type==="basicLogin/fulfilled") {  // 로그인 성공
        ConfirmToast({
          text: "환영합니다!"
        })
      }
    })
  };


  // 카카오 로그인 시 쿼리문으로 token 값을 받아온다
  const onSubmitKakao = () => {
    window.location.href = `${process.env.REACT_APP_ENDPOINT}/kakao`
  }
  // 카카오api에서 파라미터로 온 token을 socialToken으로 저장
  let socialToken = new URL(window.location.href).searchParams.get("accessToken");
  // socialToken 값이 바뀔 때(로그인해서 값이 생기면) thunk에서 로그인 처리
  useEffect(()=>{
    if (socialToken) {
      dispatch(__kakaoLogin(socialToken))
      .then((res)=>{
        ConfirmToast({
          text: "환영합니다!"
        })
      })
    }
  },[socialToken])
  

  return(
    <StLoginBG>
      <StLogo />
      <StLoginWrap>
        <StLoginForm onSubmit={handleSubmit(onSubmit)}>
          <StLoginInput
            placeholder="이메일을 입력해주세요"
            type="email"
            {...register("email", {
              required: true
            })}
          />
          <StLoginInput
            placeholder="비밀번호를 입력해주세요"
            type="password"
            {...register("password", {
              required: true,
            })}
          />
          {(errors.email && errors.email.type === "required" || errors.password && errors.password.type === "required") && (
            <p className="helpTXT"> <FiAlertCircle/> 이메일, 비밀번호를 입력해주세요 </p>
          )}
          {msg!==""? <p className="helpTXT">{msg}</p> : null}
          <SaveButtonLong btnName={"로그인"} top={27}/>
          <StLogintoSingup>
            아직 회원이 아니신가요?&nbsp;
            <span onClick={()=>{navigate("/signup")}}>회원가입 하기</span>
          </StLogintoSingup>
        </StLoginForm> 

        <StHorizonLine>
          <span>or</span>
        </StHorizonLine>
        <StKaKaoLogin
          onClick={onSubmitKakao}
        >
          <BsFillChatFill/> 카카오로 로그인
        </StKaKaoLogin>
      </StLoginWrap>
    </StLoginBG>
  )
}
export default LoginForm

const StLoginBG = styled.div`
  position: relative;
  width: 360px;
  height: 100vh;
  background-image: url(${loginBG});
  background-size: 110%;
  background-position: bottom;
  background-repeat: no-repeat;
  background-color: #E2DCFF;
`

const StLogo = styled.div`
  position: relative;
  top: 84px;
  width: 284px;
  height: 180px;
  background-image: url(${mainLogo});
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 auto 5px;
`

const StLoginWrap = styled.div`
  width: 360px;
  height: 531px;
  padding: 80px 20px 0;
`

const StLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  top: 50px;
  & .helpTXT {
    color: #F53232;
    font-weight: 400;
    font-size: 12px;
    position: absolute;
    top: 150px;
  }
`

const StLoginInput = styled.input`
  width: 100%;
  min-height: 55px;
  margin: 0 auto 30px auto;
  padding-left: 12px;
  outline: none;
  border: none;
  border-radius: 8px;
  background-color: #FFFFFF;
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-transition: background-color 9999s ease-out;
    -webkit-box-shadow: 0 0 0px 1000px white inset !important;
    box-shadow: 0 0 0px white inset !important;
    -webkit-text-fill-color: #000000 !important;
  }
`

const StLogintoSingup = styled.p`
  width: 100%;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  margin: 44px auto;
  color: #999999;
  & span {
    cursor: pointer;
    color: #0085FF;
    font-weight: 600;
    &:hover{
      text-decoration: underline;
    }
  }
`

const StHorizonLine = styled.div`
  width: 100%;
  margin-top: 53px;

  color: #999999;
  text-align: center;
  font-size: 12px;
  
  border-bottom: 1px solid;
  line-height: 10px;
  
  & span {  
    width: auto;
    background-color: #E2DCFF;
    padding: 0 10px;
    position: relative;
    top: 3px;
  } 
`

const StKaKaoLogin = styled.button`
  cursor: pointer;
  width: 320px;
  height: 48px;  
  margin-top: 39px;
  
  border: none;
  border-radius: 16px;

  color: #343434;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: -0.3px;

  background-color: #F6E34B;
`

const StSubmitBtn = styled.button`
  cursor: pointer;
  width: 320px;
  height: 48px;
  position: relative;
  top: ${props=>props.top}px;
  left: ${props=>props.left}px;
  border: 1px solid #674DED;
  border-radius: 16px;

  color: white;
  font-size: 20px;
  font-weight: bolder;

  background: linear-gradient(197.06deg, #907cf9 -6.2%, #6334ff 101.13%);
  box-shadow: 2px 2px 10px 4px rgba(88, 56, 255, 0.25);
`