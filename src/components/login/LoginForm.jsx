import styled from "styled-components";
import Swal from "sweetalert2";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import axios from "../../axios/axios";

import SubmitBtn from "../common/SubmitBtn";

const LoginForm = () => {
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

  const onSubmit = (data) => {
    axios
      // .post(`/user/login`, data) 백서버 연결할 때 사용
      .post(`/login`, data)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "로그인 완료",
          confirmButtonText: "확인"
        });
        navigate("/main");
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

  return(
    <>
      <StLogo/>

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

        <StBtnWrap>
          <SubmitBtn btnName={"로그인"}/>
          <StLogintoSingup onClick={()=>{navigate("/signup")}}>
            아직 회원이 아니신가요?
          </StLogintoSingup>
          <StHorizonLine>
            <span>or</span>
          </StHorizonLine>
          <SubmitBtn btnName={"카카오톡 로그인"}/>
        </StBtnWrap>

      </StLoginForm> 
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

const StLoginForm = styled.form`
  height: 80vh;
  display: flex;
  flex-direction: column;
  position: relative;
  top: 50px;
  padding: 20px;
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

const StBtnWrap = styled.div`
  
`

const StLogintoSingup = styled.p`
  position: relative;
  top: 40px;
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