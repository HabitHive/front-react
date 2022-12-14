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
import PetPage from "../pages/PetPage";

import { useSelector } from "react-redux";

import { LoginAlert } from "../components/common/LoginAlert";

const Router = () => {
  const isLog = useSelector((state) => state.user.isLog);

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={isLog ? <MainDailyPage/> : <LogInPage/>}/>
            <Route path="/signup" element={isLog ? <MainDailyPage/> : <SignUpPage/>}/>
            <Route path="/onboarding" element={isLog ? <OnboardingPage/> : <LoginAlert/>}/>
            <Route path="/survey" element={isLog ?<SurveyPage/>: <LoginAlert/>}/>
            <Route path="/monthly" element={isLog ?<MonthlyPage/>: <LoginAlert/>}/>
            <Route path="/buy" element={isLog ?<TagBuyPage/>: <LoginAlert/>}/>
            <Route path="/post" element={isLog ?<PostingPage/>: <LoginAlert/>}/>
            <Route path="/edit" element={isLog ?<EditingPage/>: <LoginAlert/>}/>
            <Route path="/mypage" element={isLog ?<MyPage/>: <LoginAlert/>}/>
            <Route path="/pet" element={isLog ?<PetPage/>: <LoginAlert/>}/>
            <Route path="/*" element={<NotFoundPage/>}/>
        </Routes>
    </BrowserRouter>
  );
};

export default Router;
