import styled from "styled-components"
import Swal from "sweetalert2";

import SaveButtonLong from "../common/SaveButtonLong"
import categories from "./categories"
import CategoryBtn from "./CategoryBtn";

import { useRef } from "react"
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux"
import { __userCategory } from "../../redux/modules/user";

const Category = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userCategory = useRef([]);

  const categorySubmitHandler = () => {
    const category = userCategory.current
    dispatch(__userCategory(category))
    .then(
      navigate('/')
    )
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
  font-weight: 400;
  font-size: 16px;
  color: #999999;
`

const StCategoryWrap = styled.div`
  height: 55vh;
`