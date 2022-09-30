import styled from "styled-components"

import { StSubmitBtn } from "../common/ButtonStyle"
import categories from "./categories"
import CategoryBtn from "./CategoryBtn";

import { useRef } from "react"
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux"
import { __userCategory } from "../../redux/modules/user";
import { ErrorAlert } from "../common/Alert";

const Category = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userCategory = useRef([]);

  const categorySubmitHandler = () => {
    const category = userCategory.current
    dispatch(__userCategory(category))
    .then((res)=>{
      if (res.type==="userCategory/rejected") {
        ErrorAlert({
          text: "Error: 관리자에게 문의바랍니다"
        })
      } else if (res.type==="userCategory/fulfilled") {
        navigate("/")
      }
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

      <StSubmitBtn onClick={categorySubmitHandler}>
        선택완료
      </StSubmitBtn>
    </>
  )
}
export default Category

const StCategoryTxt = styled.p`
  margin-bottom: 20px;
  font-weight: 400;
  font-size: 16px;
  color: #999999;
`

const StCategoryWrap = styled.div`
  height: 55vh;
`