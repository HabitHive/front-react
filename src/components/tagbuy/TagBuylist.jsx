import styled from "styled-components"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getTagBuyList } from "../../redux/modules/tagbuy";

import buyBG from "../../assets/buyImg/buyBG.png"
import { HiFire, HiOutlineMenu } from "react-icons/hi"

import RandomTagLists from "./RandomTagList";
import TagLists from "./TagLists";
import TagBuyDrawer from "./TagBuyDrawer";

const TagBuylist = () => {
  const dispatch = useDispatch();

  // 선택한 습관
  const [selectedTag, setSelectedTag] = useState([]);

  // drawer 상태
  const [drawer, setDrawer] = useState(false);

  const randomTagList = useSelector((state)=>state.tagBuy.randomTagList)
  const tagAllList = useSelector((state)=>state.tagBuy.tagAllList)
  
  useEffect(()=>{
    dispatch(__getTagBuyList());
  },[])

  return(
    <>
      <StTagBuyWrap>
        
        <StTitle>
          습관 구매
        </StTitle>

        <StTaglist>
          <StSubTittle>
            <p>BEST 습관 <HiFire className="icon"/> </p>
          </StSubTittle>
          <StBestTaglist>
            <RandomTagLists lists={randomTagList} setSelectedTag={setSelectedTag} setDrawer={setDrawer}/>
          </StBestTaglist>
        </StTaglist>

        <StTaglist>
          <StSubTittle>
            <span>전체 습관 <HiOutlineMenu className="icon purple"/> </span>
            <h5>(총 {tagAllList?.length}개)</h5>
          </StSubTittle>
          <TagLists lists={tagAllList} setSelectedTag={setSelectedTag} setDrawer={setDrawer}/>
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
  background-repeat: no-repeat;
  position: relative;
  top: -17px;
  margin-bottom: 40px;
`

const StTitle = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  margin: 49px auto 15px;
  color: white;
`

const StTaglist = styled.div`
`

const StBestTaglist = styled.div`
  width: 320px;

  background: #FFFFFF;
  border-radius: 16px;

  padding: 12px 16px;
`

const StSubTittle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: white;
  margin: 12px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & .icon {   
      width: 20px;
      height: 20px;
      position: relative;
      top: 4px;
  }
  & .purple {
      color: #674DED;
    }

  & h5 {
    color: #343434;
    font-weight: 500;
    font-size: 12px;
  }
  & span {
    color: #343434;
  }
`