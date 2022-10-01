import styled from "styled-components"

import icon0 from "../../assets/tag/icon0.png"
import icon1 from "../../assets/tag/icon1.png"
import icon2 from "../../assets/tag/icon2.png"
import icon3 from "../../assets/tag/icon3.png"
import mask0 from "../../assets/tag/mask0.png"
import mask1 from "../../assets/tag/mask1.png"
import mask2 from "../../assets/tag/mask2.png"
import mask3 from "../../assets/tag/mask3.png"

const Tag = ({lists, setSelectedTag, setDrawer, disabled, shadow}) => {

  const colorCode = ["#CFEEFF", "#FEE1DD", "#CBF8F5", "#FEEEDF"]

  const tagSelectHandler = (list) =>  {
    if (disabled) {
      return
    }
    setSelectedTag(list.list)
    setDrawer(true)
  }

  return(
    <>
      {lists?.map((list, tagId)=>{
        return(
          <StTag key={tagId} num={list.color} disabled={disabled} shadow={shadow}
          bgColor={colorCode[list.color]} 
          onClick={()=>tagSelectHandler({list})}
          >
            {list.tagName}
            <StTagCategories>
              {
                (list.category)?.map((category, i)=>{
                  return(
                    <StCategory key={i}>
                      {category}
                    </StCategory>
                  )
                })
              }
            </StTagCategories>
          </StTag>
        )
      })
      }
    </>
  )
}
export default Tag

const StTag = styled.div`
  cursor: ${props=>props.disabled ? null : "pointer" };

  height: 82px;
  background-image: 
    url(
      ${ props => props.num === 0 ? 
        icon0 : props=>props.num === 1 ?
        icon1 : props=>props.num === 2 ? 
        icon2 : icon3 }
    ), url(
    ${ props => props.num === 0 ? 
        mask0 : props=>props.num === 1 ?
        mask1 : props=>props.num === 2 ? 
        mask2 : mask3 }
    );
  background-repeat: no-repeat;
  background-position: 95%, right;
  background-color: ${props=>props.bgColor};
  border-radius: 12px 12px 12px 2px;
  box-shadow: ${props=>props.shadow ? "4px 4px 6px rgba(0, 0, 0, 0.08)" : null };
  margin: 3% 0;
  padding: 3%;

  font-size: 18px;
  font-weight: 700;
  color: #343434;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const StTagCategories = styled.div`
  display: flex;
`

const StCategory = styled.div`
  margin: 6px 4px 0 0;
  background-color: #B3A5FF;
  padding: 2px 6px;
  border-radius: 4px;
  align-items: center;
  width: fit-content;
  font-size: 12px;
  font-weight: 500;
  color: white;
`