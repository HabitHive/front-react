import styled from "styled-components";
import { ConfirmAlert, ErrorAlert } from "../common/Alert"
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
    formState: { errors, dirtyFields },
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
      console.log(res)
      if (res.payload===403) {
        ErrorAlert({
          text: "이미 존재하는 이메일입니다"
        })
      } else if (res.payload >= 400) {
        ErrorAlert({
          text: "Error: 관리자에게 문의 바랍니다"
        }) 
      } else if (res.type==="signup/fulfilled") {
        console.log(res)
        ConfirmAlert({
          text: "회원가입을 축하합니다!"
        })
        navigate("/onboarding")
      }
    })
  };

  return (
    <StSignupForm onSubmit={handleSubmit(onSubmit)}>
      <div>
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
            <p className="emailError"> <FiAlertCircle/> 이메일을 입력해주세요 </p>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <p className="emailError"> <FiAlertCircle/> 올바른 이메일 형식이 아닙니다</p>
          )}
          { !errors.email && dirtyFields.email && (
            <p className="emailConfirm"> * 사용 가능한 이메일입니다 </p>
          )}
      </div>
      <div>
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
          <p className="pwError"> <FiAlertCircle/> 비밀번호를 입력해주세요</p>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <p className="pwError"> <FiAlertCircle/> 최소 8자입니다</p>
        )}
        {errors.password && errors.password.type === "pattern" && (
          <p className="pwError"> <FiAlertCircle/> 영문 + 숫자 + $@!%*#?& 조합이어야 합니다 </p>
        )}
        {errors.password && errors.password.type === "maxLength" && (
          <p className="pwError"> <FiAlertCircle/> 최대 16자입니다</p>
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
          <p className="pwCheckError"> <FiAlertCircle/> 비밀번호를 다시 입력해 주세요</p>
        )}
        {errors.pwConfirm && errors.pwConfirm.type === "validate" && (
          <p className="pwCheckError"> <FiAlertCircle/> 비밀번호가 일치하지 않습니다</p>
        )}
        { !errors.pwConfirm && dirtyFields.pwConfirm && (
          <p className="pwConfirm"> * 비밀번호가 일치합니다 </p>
        )}
      </div>
      <div>
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
          <p className="nameError"> <FiAlertCircle/> 닉네임을 입력해주세요</p>
        )}
        {errors.nickname && errors.nickname.type === "maxLength" && (
          <p className="nameError"> <FiAlertCircle/> 최대 10자까지 가능합니다</p>
        )}
        {errors.nickname && errors.nickname.type === "pattern" && (
          <p className="nameError"> <FiAlertCircle/> 특수문자 및 자모음은 사용할 수 없습니다 </p>
        )}
        { !errors.nickname && dirtyFields.nickname && (
          <p className="nameConfirm"> * 사용 가능한 닉네임입니다 </p>
        )}
      </div>
      <SaveButtonLong btnName={"회원가입"} top={130}/>
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
    margin-bottom: 5px;
    color: #F53232;
    font-weight: 400;
    font-size: 12px;
    display: flex;
    align-items: center;
  }
  & .emailError {
    position: absolute;
    top: 80px;
  }
  & .emailConfirm {
    color: #999999;
    position: absolute;
    top: 80px;
  }
  & .pwError {
    position: absolute;
    top: 188px;
  }
  & .pwCheckError {
    position: absolute;
    top: 272px;
  }
  & .pwConfirm {
    color: #999999;
    position: absolute;
    top: 272px;
  }
  & .nameError {
    position: absolute;
    top: 380px;
  }
  & .nameConfirm {
    color: #999999;
    position: absolute;
    top: 380px;
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
  margin: 0 auto 30px auto;
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