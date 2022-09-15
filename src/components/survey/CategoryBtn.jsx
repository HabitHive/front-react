import styled from "styled-components"
import Swal from "sweetalert2";

import { AiOutlinePlus } from "react-icons/ai"
import { BsFillSuitHeartFill } from "react-icons/bs"

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
      <p>
        { 
          btnActive === false ? <AiOutlinePlus/> : <BsFillSuitHeartFill/>
        }
        <span>{categoryBtn.value}</span>
      </p>
    </StCategory>
  )
}
export default CategoryBtn

const StCategory =  styled.button`
  width: auto;
  height: 40px;
  margin: 0 8px 20px auto;
  padding: 0 16px;
  
  font-size: 16px;
  font-weight: 500;
  color: #999999;

  background-color: #F0F0F0;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  & p {
    float: right;
    & span {
      margin-left: 4px;
    }
  }
  &.active{
    background: linear-gradient(197.06deg, #907cf9 -6.2%, #6334ff 101.13%);
    color: white;
  }
`