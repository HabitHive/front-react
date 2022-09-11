import styled from "styled-components"

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getTagBuyList } from "../../redux/modules/tagbuy";

import TagLists from "./TagLists";
import { useState } from "react";

const TagBuylist = () => {
  const dispatch = useDispatch();

  const [selectedTag, setSelectedTag] = useState([]);

  console.log(selectedTag)

  const randomTagList = useSelector((state)=>state.tagBuy.randomTagList)
  const tagList = useSelector((state)=>state.tagBuy.tagList)
  
  useEffect(()=>{
    dispatch(__getTagBuyList());
  },[])

  return(
    <StTagBuyWrap>
      <StTitle>
        습관 구매
      </StTitle>

      <StTaglist>
        <StSubTittle>
          BEST 습관
        </StSubTittle>
        <TagLists lists={randomTagList}/>
      </StTaglist>

      <StTaglist>
        <StSubTittle>
          전체 습관 
          <p>(총 {tagList.length}개)</p>
        </StSubTittle>
        <TagLists lists={tagList} setSelectedTag={setSelectedTag}/>
      </StTaglist>

    </StTagBuyWrap>
  )
}
export default TagBuylist

const StTagBuyWrap = styled.div`
  padding: 20px;
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