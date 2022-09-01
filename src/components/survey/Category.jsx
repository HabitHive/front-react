import styled from "styled-components"
import Swal from "sweetalert2";

import SubmitBtn from "../common/SubmitBtn"
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
    // axios.post(`/user/interest`, category) 서버 열리면 변경하기
      .then((res) => {
        // navigate("/"); 온보딩페이지 넣어주기
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

      <SubmitBtn btnName={"선택완료"}
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