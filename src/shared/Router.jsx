import { BrowserRouter, Routes, Route } from "react-router-dom";

import LogInPage from "../pages/LogInPage";
import SignUpPage from "../pages/SignUpPage";
import MainDailyPage from "../pages/MainDailyPage";
import MonthlyPage from "../pages/MonthlyPage";
import NotFoundPage from "../pages/NotFoundPage";
import PostingPage from "../pages/PostingPage";
import SurveyPage from "../pages/SurveyPage";
import MyPage from "../pages/MyPage";
import TagBuyPage from "../pages/TagBuyPage";
import OnboardingPage from "../pages/OnboardingPage";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import setToken from "../axios/setToken";

import { setLogin } from "../redux/modules/user";

const Router = () => {
  const dispatch = useDispatch();

  const isLog = useSelector(state=>state.user.isLog)
  
  const token = localStorage.getItem("token")

  useEffect(()=>{
    setToken(token)
    if (token) {
      dispatch(setLogin())
    }
  })

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={isLog ? <MainDailyPage/> : <LogInPage/>}/>
            <Route path="/signup" element={isLog ? <MainDailyPage/> : <SignUpPage/>}/>
            <Route path="/onboarding" element={<OnboardingPage/>}/>
            <Route path="/main" element={<MainDailyPage/>}/>
            <Route path="/monthly" element={<MonthlyPage/>}/>
            <Route path="/post" element={<PostingPage/>}/>
            <Route path="/survey" element={<SurveyPage/>}/>
            <Route path="/mypage" element={<MyPage/>}/>
            <Route path="/buy" element={<TagBuyPage/>}/>
            <Route path="/*" element={<NotFoundPage/>}/>
        </Routes>
    </BrowserRouter>
  );
};

export default Router;
