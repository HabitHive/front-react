import { BrowserRouter, Routes, Route } from "react-router-dom";

import LogInPage from "../pages/LogInPage";
import SignUpPage from "../pages/SignUpPage";
import NotFoundPage from "../pages/NotFoundPage";
import OnboardingPage from "../pages/OnboardingPage";
import SurveyPage from "../pages/SurveyPage";
import TagBuyPage from "../pages/TagBuyPage";
import MainDailyPage from "../pages/MainDailyPage";
import MonthlyPage from "../pages/MonthlyPage";
import PostingPage from "../pages/PostingPage";
import EditingPage from "../pages/EditingPage";
import MyPage from "../pages/MyPage";

import { useSelector, useDispatch } from "react-redux";

import { setLogin } from "../redux/modules/user";
import setToken from "../axios/setToken";
import { useLayoutEffect } from "react";

const Router = () => {
  const dispatch = useDispatch();
  
  const token = localStorage.getItem("token")
  const isLog = useSelector(state=>state.user.isLog)

  // 마운트가 완료되기 전에 먼저 실행된다
  useLayoutEffect(()=>{
    if (token) {
      setToken(token)
      dispatch(setLogin(token))
    }
  })

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={isLog ? <MainDailyPage/> : <LogInPage/>}/>
            <Route path="/signup" element={isLog ? <MainDailyPage/> : <SignUpPage/>}/>
            <Route path="/onboarding" element={<OnboardingPage/>}/>
            <Route path="/survey" element={<SurveyPage/>}/>
            {/* <Route path="/main" element={<MainDailyPage/>}/> */}
            <Route path="/monthly" element={<MonthlyPage/>}/>
            <Route path="/buy" element={<TagBuyPage/>}/>
            <Route path="/post" element={<PostingPage/>}/>
            <Route path="/mypage" element={<MyPage/>}/>
            <Route path="/*" element={<NotFoundPage/>}/>
        </Routes>
    </BrowserRouter>
  );
};

export default Router;
