import styled from "styled-components";

import Navbar from "../components/common/Navbar";
import TagBuylist from "../components/tagbuy/TagBuylist";


const TagBuyPage = () => {
  return (
    <StBuyLayout>
      <TagBuylist/>
      <Navbar/>
    </StBuyLayout>
  )
};

export default TagBuyPage;

const StBuyLayout = styled.div`
  display: flex;
  flex-direction: column;
`

