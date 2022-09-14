import styled from "styled-components";
import Swal from "sweetalert2";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import axios from "../../axios/axios";
import { setUser, __basicLogin, __kakaoLogin } from "../../redux/modules/user";
import { useDispatch } from "react-redux";

import SaveButtonLong from "../common/SaveButtonLong";
import { useEffect } from "react";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initValue = {
    email: "",
    password: ""
  }

  //유효성검사
  const {
    register,
    handleSubmit,
  } = useForm({ 
    mode: 'onChange',
    defaultValues: initValue,
  });
  
  //리액트훅폼은 e.preventDefault를 명시하지 않아도 된다
  const onSubmit = (data) => {
    dispatch(__basicLogin(data))
  };

  // 카카오 로그인 시 쿼리문으로 token 값을 받아온다
  const onSubmitKakao = () => {
    window.location.href = `${process.env.REACT_APP_ENDPOINT}/kakao`
  }

  // 카카오 로그인 token 값
  let socialToken = new URL(window.location.href).searchParams.get("token");

  useEffect(()=>{
    if (socialToken) {
      dispatch(__kakaoLogin(socialToken))
      navigate('/')
    }
  },[socialToken])


  return(
    <>
      <StLogo/>
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
          <SaveButtonLong btnName={"로그인"}/>
          <StLogintoSingup onClick={()=>{navigate("/signup")}}>
            아직 회원이 아니신가요?
          </StLogintoSingup>
        </StLoginForm> 

        <StHorizonLine>
          <span>or</span>
        </StHorizonLine>
        <SaveButtonLong btnName={"카카오톡 로그인"}
          onClick={onSubmitKakao}
        />
      </StLoginWrap>
    </>
  )
}
export default LoginForm
            
const StLogo = styled.div`
  width: 200px;
  height: 200px;
  margin: 0 auto 30px;
  background-color: gray;
  position: relative;
  top: 30px;
`

const StLoginWrap = styled.div`
  height: 90vh;
  padding: 20px;
`

const StLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  top: 50px;
`

const StLoginInput = styled.input`
  width: 100%;
  min-height: 55px;
  margin: 0 auto 30px auto;
  padding-left: 10px;
  outline: none;
  border: none;
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
  color: gray;
  text-align: center;
  font-size: 13px;
  margin: 10px auto;
  cursor: pointer;
  :hover{
    font-weight: 700;
    text-decoration: underline;
  }
`

const StHorizonLine = styled.div`
  width: 100%;
  margin-top: 100px;
  text-align: center;
  border-bottom: 1px solid #aaa;
  line-height: 0.5px;
  & span {
    width: auto;
    background-color: aliceblue;
    padding: 0 10px;
  } 
`