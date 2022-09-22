import styled from "styled-components"

const TagLists = ({lists, setSelectedTag, setDrawer, disabled}) => {

  const tagSelectHandler = (list) =>  {
    setSelectedTag(list.list)
    setDrawer(true)
  }

  return(
    <>
      {lists?.map((list, tagId)=>{
        return(
          <StTag key={tagId}
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
export default TagLists

const StTag = styled.div`
  cursor: pointer;

  background-color: #CFEEFF;
  border-radius: 12px 12px 12px 0;
  margin: 8px 0;

  padding: 12px;
  font-size: 18px;
  font-weight: 700;
  color: #343434;
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