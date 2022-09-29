import styled from "styled-components"
import { BsChevronRight } from "react-icons/bs"

const RandomTagLists = ({lists, setSelectedTag, setDrawer}) => {

  const tagSelectHandler = (list) =>  {
    setSelectedTag(list.list)
    setDrawer(true)
  }

  return(
    <>
      {lists?.map((list, i)=>{
        return(
          <StTag key={i} bgColor={i}
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
            <BsChevronRight className="arrow"/>
          </StTag>
        )
      })
      }
    </>
  )
}
export default RandomTagLists

const StTag = styled.div`
  cursor: pointer;

  background-color: ${props=> 
    props.bgColor === 0 ? "#CFEEFF" 
    : props.bgColor === 1 ? "#FEE1DD" : "#FFEDDD"
  };
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