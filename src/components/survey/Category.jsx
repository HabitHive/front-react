import styled from "styled-components"
import Swal from "sweetalert2";

import SaveButtonLong from "../common/SaveButtonLong"
import categories from "./categories"
import CategoryBtn from "./CategoryBtn";

import { useRef } from "react"
import { useNavigate } from "react-router";
import axios from "../../axios/axios"

const Category = () => {
  const navigate = useNavigate();

  const userCategory = useRef([]);

  const categorySubmitHandler = () => {
    const category = userCategory.current
    axios.post(`/survey`, category)
    // axios.put(`/user/interest`, category) 서버 열리면 변경하기
      .then((res) => {
        navigate("/onboarding");
      })
      .catch((err)=>{
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "에러메시지 나중에 넣기",
          confirmButtonText: "확인"
        });
      })
  }

  return (
    <>
      <StCategoryTxt>
        최대 3개
      </StCategoryTxt>
      

      <StCategoryWrap>
        {
          categories.map((categoryBtn, categoryId)=>{
            return(
              <CategoryBtn
                key={categoryId}
                categoryBtn={categoryBtn}
                userCategory={userCategory}
              />
            )
          })
        }
      </StCategoryWrap>

      <SaveButtonLong btnName={"선택완료"}
        onClick={categorySubmitHandler}
      />
    </>
  )
}
export default Category

const StCategoryTxt = styled.p`
  margin-bottom: 20px;
`

const StCategoryWrap = styled.div`
  height: 55vh;
`