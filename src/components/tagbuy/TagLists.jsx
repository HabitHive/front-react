import styled from "styled-components"

const TagLists = ({lists, setSelectedTag, setDrawer}) => {

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
  background-color: #CFEEFF;
  border-radius: 12px 12px 12px 0;
  margin: 10px 0;
  padding: 10px;
  font-size: 19px;
  font-weight: 700;
  cursor: pointer;
`

const StTagCategories = styled.div`
  display: flex;
`

const StCategory = styled.div`
  background-color: #674DED;
  padding: 3px;
  border-radius: 4px;
  align-items: center;
  width: fit-content;
  font-size: 12px;
  font-weight: 200;
  color: white;
  margin: 5px 5px 0 0;
`