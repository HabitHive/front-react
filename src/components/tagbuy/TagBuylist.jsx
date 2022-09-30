import styled from "styled-components"
import buyBG from "../../assets/buyImg/buyBG.png"
import { HiFire } from "react-icons/hi"
import { AiOutlineUnorderedList } from "react-icons/ai"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getTagBuyList } from "../../redux/modules/tagbuy";

import Tag from "../common/Tag";
import TagBuyDrawer from "./TagBuyDrawer";
import categories from "../survey/categories"

const TagBuylist = () => {
  const dispatch = useDispatch();

  // 선택한 습관
  const [selectedTag, setSelectedTag] = useState([]);

  // drawer 상태
  const [drawer, setDrawer] = useState(false);

  // 선택한 카테고리
  const [attention, setAttention] = useState("");

  const randomTagList = useSelector((state)=>state.tagBuy.randomTagList)
  const tagAllList = useSelector((state)=>state.tagBuy.tagAllList)
  
  console.log(attention)
  
  useEffect(()=>{
    dispatch(__getTagBuyList(attention));
  },[attention])

  return(
    <>
      <StTagBuyWrap>
        <h1>
          습관 구매
        </h1>
        <StSubTittle>
          <h4>
            BEST 습관
            <HiFire className="icon"/> 
          </h4>
        </StSubTittle>
        {
          randomTagList.length === 0 ? <div className="soldOut"> <p>추천하는 습관이 없습니다</p> </div> :
          <Tag lists={randomTagList} setSelectedTag={setSelectedTag} setDrawer={setDrawer} shadow={true}/>
        }
        <StSubTittle>
          <h4 className="black"> 
            전체습관 
            <AiOutlineUnorderedList className="icon"/> 
          </h4>
          <select className="dropdown"
            onChange={(e)=>setAttention(e.target.value)}
          >
            <option value=""> 전체 </option>
            {
              categories.map((category, categoryId)=>{
                return (
                  <option value={category.categoryId} key={categoryId}>
                    {category.value}
                  </option>
                )
              })
            }
          </select>
        </StSubTittle>
        {
          tagAllList.length === 0 ? <div className="soldOut all"> <p>추천하는 습관이 없습니다</p> </div> :
          <Tag lists={tagAllList} setSelectedTag={setSelectedTag} setDrawer={setDrawer}/>
        }
      </StTagBuyWrap>
      <TagBuyDrawer selectedTag={[selectedTag]} setDrawer={setDrawer} drawer={drawer}/>
    </>
  ) 
}
export default TagBuylist

const StTagBuyWrap = styled.div`
  padding: 20px;
  background-image: url(${buyBG});
  background-repeat: no-repeat;
  background-size: contain; 
  color: white;

  & h1 {
    font-size: 18px;
    text-align: center;
    font-weight: 700;
    margin: 10% auto;
  }

  & .soldOut {
    width: 100%;
    height: 30vh;
    color: #343434;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3vh;
  }
  & .all {
    height: 35vh;
  }
`

const StSubTittle = styled.div`
  font-size: 16px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  & .icon {   
    width: 20px;
    height: 20px;
    position: relative;
    top: 4px;
    margin-left: 5px;
  }
  & .black {
    margin-top: 5%;
    color: #343434;
  }
  & .dropdown {
    color: red;
  }
`