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
  // e.prevent.default() 도대체 언제 사용???
  const categoryHandler = (value) => {
    if (userCategory.current.length > 2) {
      alert("안돼")
      return
    } 
    userCategory.current.push(value)
    console.log(userCategory.current.length)
  }


  // 개수 제한 두기
  const categorySubmitHandler = () => {
    const category = userCategory.current
    axios.post(`/survey`, {category}) // api 확인 필요
      .then((res) => {
        // navigate("/");
        Swal.fire({
          icon: "success",
          title: "로그인 완료"
        });
      })
      .catch((err)=>{
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "에러메시지 나중에 넣기",
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