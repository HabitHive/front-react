import styled from "styled-components"
import Swal from "sweetalert2";
import { AiOutlinePlus } from "react-icons/ai"

import SubmitBtn from "../common/SubmitBtn"
import categories from "./categories"

import { useRef } from "react"
import { useNavigate } from "react-router";
import axios from "../../axios/axios"

const Category = () => {
  const navigate = useNavigate();

  const userCategory = useRef([]);

  // 함수명? 리팩토링 할 떄 확인하기
  // e.preventDefault() 도대체 언제 사용???
  const categoryHandler = (value) => {
    // 최대 3개까지 선택할 수 있도록 개수 제한
    if (userCategory.current.length === 3) {
      Swal.fire({
        icon: "info",
        title: "최대 3개까지 선택 가능합니다",
        confirmButtonText: "닫기"
      });
      return
    } 
    userCategory.current.push(value)
    console.log(userCategory.current.length)
  }


  const categorySubmitHandler = () => {
    const category = userCategory.current
    axios.post(`/survey`, {category}) // api 확인 필요
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
              <StCategory key={categoryId}
                onClick={()=>categoryHandler(categoryBtn.categoryId)}
              >
                <AiOutlinePlus/> {categoryBtn.value}
              </StCategory>
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

const StCategory =  styled.button`
  width: auto;
  height: 40px;
  margin: 5px;
  padding: 0 15px;
  font-size: 20px;
  border-radius: 20px;
  cursor: pointer;
`