import styled from "styled-components";
import Swal from "sweetalert2";
import { FiAlertCircle } from "react-icons/fi"

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import axios from "../../axios/axios";

import SubmitBtn from "../common/SubmitBtn";

const SignupForm = () => {
  const navigate = useNavigate();

  const initValue = {
    email: "",
    password: "",
    pwConfirm: "",
    nickname: ""
  }

  //회원가입 유효성검사
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm({ 
    mode: 'onChange',
    defaultValues: initValue,
  });

  //password 중복체크용
  const watchPW = watch('password')
  
  const onSubmit = (data) => {
    delete data.pwConfirm
    axios
      // .post(`/user/signup`, data) 백서버 연결할 때 사용
      .post(`/signup`, data)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "회원가입 완료",
          text: "로그인 이후 이용해 주세요",
          confirmButtonText: "확인"
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "에러메시지 나중에 넣기",
          confirmButtonText: "확인"
        });
      });
  };

  return (
    <StSignupForm onSubmit={handleSubmit(onSubmit)}>
      <StSignupLabel>
        이메일 주소
      </StSignupLabel>
      <StSignupInput
        placeholder="이메일을 입력해 주세요"
        type="email"
        {...register("email", {
          required: true,
          pattern: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
        })}
        />
        {errors.email && errors.email.type === "required" && (
          <p> <FiAlertCircle/> 이메일을 입력해주세요 </p>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <p> <FiAlertCircle/> 올바른 이메일 형식이 아닙니다</p>
        )}

      <StSignupLabel>
        비밀번호
      </StSignupLabel>
      <StSignupInput
        placeholder="영문, 숫자, 특수문자($@!%*#?&) 포함 8자리 이상"
        type="password"
        {...register("password", {
          required: true,
          minLength: 8,
          maxLength: 16,
          pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        })}
      />
      {errors.password && errors.password.type === "required" && (
        <p> <FiAlertCircle/> 비밀번호를 입력해주세요</p>
      )}
      {errors.password && errors.password.type === "minLength" && (
        <p> <FiAlertCircle/> 최소 8자입니다</p>
      )}
      {errors.password && errors.password.type === "pattern" && (
        <p>
          <FiAlertCircle/> 영문, 숫자, $@!%*#?& 를 포함해야 합니다
        </p>
      )}
      {errors.password && errors.password.type === "maxLength" && (
        <p> <FiAlertCircle/> 최대 16자입니다</p>
      )}
      <StSignupInput
        placeholder="비밀번호를 다시 한 번 입력해 주세요"
        type="password"
        {...register("pwConfirm", {
          required: true,
          validate: (value) => value === watchPW
        })}
      />
      {errors.pwConfirm && errors.pwConfirm.type === "required" && (
        <p> <FiAlertCircle/> 비밀번호를 다시 입력해 주세요</p>
      )}
      {errors.pwConfirm && errors.pwConfirm.type === "validate" && (
        <p> <FiAlertCircle/> 비밀번호가 일치하지 않습니다</p>
      )}


      <StSignupLabel>
        닉네임
      </StSignupLabel>
      <StSignupInput
        placeholder="닉네임을 입력해 주세요. (최대 10자)"
        {...register("nickname", {
          required: true,
          maxLength: 10,
          pattern: /(?=.*[a-z0-9가-힣])[a-z0-9가-힣]+$/,
        })}
      />
      {errors.nickname && errors.nickname.type === "required" && (
        <p> <FiAlertCircle/> 닉네임을 입력해주세요</p>
      )}
      {errors.nickname && errors.nickname.type === "maxLength" && (
        <p> <FiAlertCircle/> 최대 10자까지 가능합니다</p>
      )}
      {errors.nickname && errors.nickname.type === "pattern" && (
        <p> <FiAlertCircle/> 특수문자는 사용할 수 없습니다 </p>
      )}

      <SubmitBtn btnName={"가입하기"}/>
    </StSignupForm>
  )
}
export default SignupForm

const StSignupForm = styled.form`
  height: 80vh;
  display: flex;
  flex-direction: column;
  position: relative;
  top: 50px;
  padding: 20px;
  & p {
    color: red;
    font-size: 13px;
    position: relative;
    top: -20px;
  }
`

const StSignupLabel = styled.label`
  font-size: 20px;
  height: 30px;
  margin: 10px 0;
`

const StSignupInput = styled.input`
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