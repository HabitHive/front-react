import styled from "styled-components"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getTagBuyList } from "../../redux/modules/tagbuy";

import buyBG from "../../assets/buyImg/buyBG.png"
import { HiFire } from "react-icons/hi"

import TagLists from "./TagLists";
import TagBuyDrawer from "./TagBuyDrawer";

const TagBuylist = () => {
  const dispatch = useDispatch();

  // 선택한 습관
  const [selectedTag, setSelectedTag] = useState([]);

  // drawer 상태
  const [drawer, setDrawer] = useState(false);

  const randomTagList = useSelector((state)=>state.tagBuy.randomTagList)
  const tagList = useSelector((state)=>state.tagBuy.tagList)
  
  useEffect(()=>{
    dispatch(__getTagBuyList());
  },[])

  return(
    <>
      <StTagBuyWrap>
        
        <StTitle>
          습관 구매 <HiFire/>
        </StTitle>

        <StTaglist>
          <StSubTittle>
            BEST 습관
          </StSubTittle>
          <TagLists lists={randomTagList} setSelectedTag={setSelectedTag} setDrawer={setDrawer}/>
        </StTaglist>

        <StTaglist>
          <StSubTittle>
            전체 습관 
            <p>(총 {tagList.length}개)</p>
          </StSubTittle>
          <TagLists lists={tagList} setSelectedTag={setSelectedTag} setDrawer={setDrawer}/>
        </StTaglist>
      </StTagBuyWrap>

      <TagBuyDrawer selectedTag={[selectedTag]} setDrawer={setDrawer} drawer={drawer}/>
    </>
  )
}
export default TagBuylist

const StTagBuyWrap = styled.div`
  padding: 20px;
  background-image: url(${buyBG});
`

const StTitle = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  margin: 20px auto;
`

const StTaglist = styled.div`

`

const StSubTittle = styled.div`
  font-size: 16px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
`