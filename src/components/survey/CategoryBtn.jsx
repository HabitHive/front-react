import styled from "styled-components"
import Swal from "sweetalert2";
import { AiOutlinePlus, AiTwotoneHeart } from "react-icons/ai"

import { useState } from "react";

const CategoryBtn = ({categoryBtn, userCategory}) => {

  const [btnActive, setBtnActive] = useState(false);

  // 있는 애는 빼는 로직 추가하기
  const categoryHandler = (value) => {
    // 최대 3개까지 선택할 수 있도록 개수 제한
    if (userCategory.current.includes(value)===false) {
      if (userCategory.current.length === 3) {
        Swal.fire({
          icon: "info",
          title: "최대 3개까지 선택 가능합니다",
          confirmButtonText: "닫기"
        });
        return
      }
      userCategory.current.push(value)
      // onClick 할 때마다 className 토글
      setBtnActive(!btnActive)
    } else {
      // 이미 배열에 들어간 값을 다시 선택하면 빼기(취소)
      let cancled = userCategory.current.indexOf(value)
      userCategory.current.splice(cancled)
      setBtnActive(!btnActive)
    }
  }

  return (
    <StCategory 
      className={ btnActive ? "active" : null }
      key={categoryBtn.categoryId}
      onClick={()=> {
        categoryHandler(categoryBtn.categoryId)
      }}
    >
      { btnActive === false ?
        <AiOutlinePlus/> : <AiTwotoneHeart/>
      }
      {categoryBtn.value}
    </StCategory>
  )
}
export default CategoryBtn

const StCategory =  styled.button`
  width: auto;
  height: 40px;
  margin: 5px;
  padding: 0 15px;
  font-size: 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  &.active{
    background-color: #ff4a4a;
    color: white;
  }
`