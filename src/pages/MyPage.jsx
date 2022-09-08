import Header from "../components/common/Header";
import Navbar from "../components/common/Navbar";
import Profile from "../components/mypage/Profile";
import UserTags from "../components/mypage/UserTags";
import SubNav from "../components/mypage/SubNav";

const MyPage = () => {

  return (
    <>
      <Header text={"마이페이지"}/>
      <Profile/>
      <UserTags/>
      <SubNav/>
      <Navbar/>
    </>
  )
};

export default MyPage;
