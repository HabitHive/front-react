import styled from "styled-components"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"

import { useState } from "react"

import categories from "../survey/categories"

const SelectBox = ({setAttention}) => {

  const [holderText, setHolderText] = useState("전체");

  const [open, setOpen] = useState(false);

  return (
    <StSelectBox>
      <div className="holder"
        onClick={()=>setOpen(!open)}
      > 
        {holderText} &nbsp;
        { open ? <IoIosArrowUp/> : <IoIosArrowDown/> }
      </div>
      { open ?
        <StSelectLists>       
          <StList className={holderText === "전체" ? "checked" : null }
            onClick={()=> {
              setHolderText("전체")
              setAttention("")
              setOpen(false)
            }}
          >
            전체
          </StList>
          {
            categories.map((category, i)=>{
              return (
                <StList key={i} className={holderText === category.value ? "checked" : null }
                  onClick={()=>{
                    setHolderText(category.value)
                    setAttention(category.categoryId)
                    setOpen(false)
                  }
                }>
                  {category.value}
                </StList>
              )
            })
          }
        </StSelectLists> : null
      }
    </StSelectBox>
  )
}
export default SelectBox

const StSelectBox = styled.div`
  width: 90px;
  height: 24px;

  font-weight: 500;
  font-size: 1rem;
  color: #343434;

  vertical-align: bottom;

  cursor: pointer;

  & .holder { 
    width: 90px;
    height: 24px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`

const StSelectLists = styled.div`
  width: 120%;
  padding: 10px;

  position: relative;
  top: 5px;
  right: 20%;

  background: #FFFFFF;
  box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  `

const StList = styled.div`
  margin: 10px 5px;
  & .checked {
    color: #5039C8;
  }
  &:hover {
    color: red;
  }
`