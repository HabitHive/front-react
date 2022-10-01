import Navbar from "../components/common/Navbar";
import Profile from "../components/mypage/Profile";
import UserTags from "../components/mypage/UserTags";
import SubNav from "../components/mypage/SubNav";
import ListModal from "../components/mypage/ListModal";

import { useState } from "react";


const MyPage = () => {

  const [modal, setModal] = useState(false);

  return (
    <>
      <Profile/>
      <UserTags setModal={setModal}/>
      <SubNav/>
      <Navbar/>
      { modal ? <ListModal setModal={setModal}/> : null }
    </>
  )
};

export default MyPage;
