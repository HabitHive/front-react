import Header from "../components/common/Header";
import Navbar from "../components/common/Navbar";
import Profile from "../components/mypage/Profile";
import UserTags from "../components/mypage/UserTags";

const MyPage = () => {

  return (
    <>
      <Header text={"마이페이지"}/>
      <Profile/>
      <UserTags/>
      <Navbar/>
    </>
  )
};

export default MyPage;
