import styled from "styled-components"
import { BsChevronRight } from "react-icons/bs"

const TagLists = ({lists, setSelectedTag, setDrawer, disabled}) => {

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
          <StTag key={tagId} bgColor={disabled ? "#CFEEFF" : "#FFFFFF"}
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
            {
              disabled ? null :
              <BsChevronRight className="arrow"/>
            }
          </StTag>
        )
      })
      }
    </>
  )
}
export default TagLists

const StTag = styled.div`
  cursor: pointer;

  background-color: ${props=>props.bgColor};
  border-radius: 12px 12px 12px 0;
  box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.08);
  margin: 3% 0;

  padding: 12px;
  font-size: 18px;
  font-weight: 700;
  color: #343434;
  & .arrow {
    float: right;
    color: #5039C8;
    position: relative;
    top: -35px;
  }
`

const StTagCategories = styled.div`
  display: flex;
`

const StCategory = styled.div`
  margin: 6px 4px 0 0;
  background-color: #674DED;
  padding: 2px 6px;
  border-radius: 4px;
  align-items: center;
  width: fit-content;
  font-size: 12px;
  font-weight: 500;
  color: white;
`