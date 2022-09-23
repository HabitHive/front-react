import styled from "styled-components";
import { ConfirmToast, ErrorAlert } from "../common/Alert"
import { FiAlertCircle } from "react-icons/fi"

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { __signup } from "../../redux/modules/user";

import SaveButtonLong from "../common/SaveButtonLong";

const SignupForm = () => {
  const dispatch = useDispatch();
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
  
  const onSubmit = async (data) => {
    delete data.pwConfirm
    await dispatch(__signup(data))
    .then((res) => {
      ConfirmToast({text: "가입을 축하합니다"})
      navigate("/onboarding")
    })
    .catch((err) => {
      // console.log(err) 예외처리 시 확인
      ErrorAlert({
        title: "회원가입 실패",
        text: "잠시 후 다시 시도해 주세요"
      })
    })
  };

  return (
    <StSignupForm onSubmit={handleSubmit(onSubmit)}>
      <StSignupLabel>
        이메일 주소
      </StSignupLabel>
      <StSignupInput
        placeholder="이메일을 입력해주세요"
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
      <div/>
      <StSignupLabel>
        비밀번호
      </StSignupLabel>
      <StSignupInput
        placeholder="영문, 숫자, $@!%*#?& 포함 8자리 이상"
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
          <FiAlertCircle/> 영문 + 숫자 + $@!%*#?& 조합이어야 합니다
        </p>
      )}
      {errors.password && errors.password.type === "maxLength" && (
        <p> <FiAlertCircle/> 최대 16자입니다</p>
      )}
      <StSignupInput
        placeholder="비밀번호를 다시 한 번 입력해주세요"
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
      <div/>
      <StSignupLabel>
        닉네임
      </StSignupLabel>
      <StSignupInput
        placeholder="닉네임을 입력해주세요 (최대 10자)"
        {...register("nickname", {
          required: true,
          maxLength: 10,
          pattern: /(?=.*[A-Za-z0-9가-힣])[A-Za-z0-9가-힣]+$/,
        })}
      />
      {errors.nickname && errors.nickname.type === "required" && (
        <p> <FiAlertCircle/> 닉네임을 입력해주세요</p>
      )}
      {errors.nickname && errors.nickname.type === "maxLength" && (
        <p> <FiAlertCircle/> 최대 10자까지 가능합니다</p>
      )}
      {errors.nickname && errors.nickname.type === "pattern" && (
        <p> <FiAlertCircle/> 특수문자 및 자모음은 사용할 수 없습니다 </p>
      )}

      <SaveButtonLong btnName={"회원가입"} top={172}/>
    </StSignupForm>
  )
}
export default SignupForm

const StSignupForm = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  top: 32px;
  padding: 0 20px;
  & p {
    color: #F53232;
    font-weight: 400;
    font-size: 12px;
    display: flex;
    align-items: center;
    position: relative;
    top: -5px;
    margin-bottom: 5px;
  }
  & > div {
    height: 20px;
  }
`

const StSignupLabel = styled.label`
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 8px;
`

const StSignupInput = styled.input`
  width: 100%;
  min-height: 55px;
  margin: 0 auto 12px auto;
  padding-left: 12px;
  outline: none;
  border: none;
  border-radius: 8px;
  background-color: #EBEBEB;
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