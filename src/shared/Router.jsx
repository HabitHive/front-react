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

const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LogInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/*" element={<NotFoundPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/survey" element={<SurveyPage />} />
            <Route path="/buy" element={<TagBuyPage />} />
            <Route path="/main" element={<MainDailyPage />} />
            <Route path="/monthly" element={<MonthlyPage />} />
            <Route path="/post" element={<PostingPage />} />
            <Route path="/edit" element={<EditingPage />} />
            <Route path="/mypage" element={<MyPage />} />
        </Routes>
    </BrowserRouter>
  );
};

export default Router;
