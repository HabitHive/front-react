import styled from "styled-components"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { VscArchive } from "react-icons/vsc"

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
          <StList
            onClick={()=> {
              setHolderText("전체")
              setAttention("")
              setOpen(false)
            }}
          >
            전체
          </StList>
          <StList
            onClick={()=> {
              setHolderText("내 습관")
              setAttention("myHabit")
              setOpen(false)
            }}
          >
            내 습관 <VscArchive className="icon"/>
          </StList>
          {
            categories.map((category, i)=>{
              return (
                <StList key={i}
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
          <StList
            onClick={()=> {
              setHolderText("기타")
              setAttention("etc")
              setOpen(false)
            }}
          >
            기타
          </StList>
        </StSelectLists> : null
      }
    </StSelectBox>
  )
}
export default SelectBox

const StSelectBox = styled.div`
  width: 100px;
  height: 24px;

  font-weight: 500;
  font-size: 1rem;
  color: #343434;

  vertical-align: bottom;

  cursor: pointer;

  & .holder { 
    width: 100px;
    height: 24px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`

const StSelectLists = styled.div`
  width: 120%;
  height: 30vh;
  padding: 10px;
  overflow: scroll;

  position: relative;
  top: 5px;
  right: 20%;
  
  background: #FFFFFF;
  box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.08);
  border-radius: 4px;

  & .icon{
    position: relative;
    top: 3px;
  }
`

const StList = styled.div`
  margin: 10px 5px;
  &:hover {
    transition: .3s;
    color: #5039C8;
    font-weight: 800;
  }
`