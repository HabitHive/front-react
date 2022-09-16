import Header from "../components/common/Header";
import Navbar from "../components/common/Navbar";
import Profile from "../components/mypage/Profile";
import UserTags from "../components/mypage/UserTags";
import SubNav from "../components/mypage/SubNav";

import styled from "styled-components";
import Layout from "../components/common/Layout"

const MyPage = () => {

  return (
    <StMyLayout>
      <Header text={"마이페이지"}/>
      <Profile/>
      <UserTags/>
      <SubNav/>
      <Navbar/>
    </StMyLayout>
  )
};

export default MyPage;

const StMyLayout = styled(Layout)`
  height: 200vh
`