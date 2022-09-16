import Navbar from "../components/common/Navbar";
import TagBuylist from "../components/tagbuy/TagBuylist";

import styled from "styled-components";
import Layout from "../components/common/Layout"

const TagBuyPage = () => {
  return (
    <StMyLayout>
      <TagBuylist/>
      <Navbar/>
    </StMyLayout>
  )
};

export default TagBuyPage;

const StMyLayout = styled(Layout)`
  height: 170vh
`