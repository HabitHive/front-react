import styled from "styled-components";
import Swal from "sweetalert2";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import axios from "../../axios/axios";

const LoginForm = () => {
  const navigate = useNavigate();

  const initValue = {
    email: "",
    password: ""
  }

  //회원가입 유효성검사
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
          title: "로그인 완료"
        });
        navigate("/main");
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "에러메시지 나중에 넣기",
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

        <StLoginBtn>
          로그인
        </StLoginBtn>

        <StLogintoSingup onClick={()=>{navigate("/signup")}}>
          아직 회원이 아니신가요?
        </StLogintoSingup>

        <StHorizonLine>
          <span>or</span>
        </StHorizonLine>

        <StLoginBtn>
          카카오톡
        </StLoginBtn>

      </StLoginForm>
    </>
  )
}
export default LoginForm


const StLogo = styled.img`
  width: 200px;
  height: 200px;
  margin: auto;
  background-color: gray;
  display: flex;
  align-self: center;
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

const StLoginBtn = styled.button`
  width: 100%;
  min-height: 55px;
  margin-top: 30px;
  cursor: pointer;
  border: none;
  font-size: 20px;
  font-weight: bolder;
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
  margin-top: 30px;
  text-align: center;
  border-bottom: 1px solid #aaa;
  line-height: 0.5px;
  & span {
    width: auto;
    background-color: aliceblue;
    padding: 0 10px;
  } 
`