import styled from "styled-components"
import buyBG from "../../assets/buyImg/buyBG.png"
import buyButton from "../../assets/buyImg/buyButton.png"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getTagBuyList } from "../../redux/modules/tagbuy";

import Tag from "../common/Tag";
import TagBuyDrawer from "./TagBuyDrawer";
import SelectBox from "./SelectBox";

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

  // 유저 작성 습관 버튼 placeHolder
  const diyTag = [{
    category: ["나만의", "습관을","만들면","상점에","추가됩니다!"],
    tagId: -100,
    color: 1,
    tagName: "원하는 습관을 직접 만드세요!"
  }]
    
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
          <h4> BEST 습관 </h4>
        </StSubTittle>
        {
          randomTagList.length === 0 ? <div className="soldOut"> <p>추천하는 습관이 없습니다</p> </div> :
          <Tag lists={randomTagList} setSelectedTag={setSelectedTag} setDrawer={setDrawer} shadow={true}/>
        }
        <StSubTittle>
          <h4 className="black"> 전체습관 </h4>
          <SelectBox setAttention={setAttention}/>
        </StSubTittle>
        <Tag lists={diyTag} setSelectedTag={setSelectedTag} setDrawer={setDrawer} shadow={true}/>
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
  flex: 1;
  padding: 0 20px;
  background-image: url(${buyBG});
  background-repeat: no-repeat;
  background-size: contain; 
  color: white;

  & h1 {
    margin: 6vh 0;
    font-weight: 700; 
    font-size: 1.2rem;
    text-align: center;
    color: #FFFFFF;
    letter-spacing: -0.1rem;
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
  
  & .black {
    margin-top: 5%;
    color: #343434;
  }
`