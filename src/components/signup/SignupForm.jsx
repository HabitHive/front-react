import styled from "styled-components";
import Swal from "sweetalert2";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import axios from "../../axios/axios";

const SignupForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    axios
      // .post(`/user/signup`, data) 백서버 연결할 때 사용
      .post(`/signup`, data)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "회원가입 완료",
          text: "로그인 이후 이용해 주세요",
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "에러메시지 나중에 넣기",
        });
      });
  };

  return (
    <StSignupForm>
      <StSignupLabel>
        이메일 주소
      </StSignupLabel>
      <StSignupInput/>

      <StSignupLabel>
        비밀번호
      </StSignupLabel>
      <StSignupInput/>
      <StSignupInput/>

      <StSignupLabel>
        닉네임
      </StSignupLabel>
      <StSignupInput/>

    </StSignupForm>
  )
}
export default SignupForm

const StSignupForm = styled.form`
  background-color: yellowgreen;
  height: 80vh;
  display: flex;
  flex-direction: column;
  position: relative;
  top: 50px;
  padding: 20px;
`

const StSignupLabel = styled.label`
  font-size: 20px;
  height: 30px;
`

const StSignupInput = styled.input`
  width: 100%;
  height: 55px;
  margin: 0 auto;
`