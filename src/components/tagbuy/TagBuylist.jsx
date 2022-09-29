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
        
        <h1>
          습관 구매
        </h1>

        <div>
          <StSubTittle>
            <h4>BEST 습관 <HiFire className="icon"/> </h4>
          </StSubTittle>
          <StBestTaglist>
            <RandomTagLists lists={randomTagList} setSelectedTag={setSelectedTag} setDrawer={setDrawer}/>
          </StBestTaglist>
        </div>

        <div>
          <StSubTittle>
            <h4 className="black"> 전체습관 <HiOutlineMenu className="icon purple"/> </h4>
            <p>(총 {tagAllList?.length}개)</p>
          </StSubTittle>
          <TagLists lists={tagAllList} setSelectedTag={setSelectedTag} setDrawer={setDrawer}/>
        </div>
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
  background-position-x: center;
  position: relative;
  top: -17px;
  & h1 {
    font-size: 18px;
    text-align: center;
    font-weight: 700;
    margin: 49px auto 15px;
    color: white;
  }
`

const StBestTaglist = styled.div`
  width: 100%;
  background: #FFFFFF;
  border-radius: 16px;
  padding: 12px 16px;
  margin-bottom: 7%;
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
  & .black {
    color: #343434;
  }
  & .purple {
      color: #674DED;
    }
  & p {
    color: #343434;
    font-weight: 700;
    font-size: 0.8rem;
  }
  & span {
    color: #343434;
  }
`