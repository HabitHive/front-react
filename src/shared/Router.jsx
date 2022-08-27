import { BrowserRouter, Routes, Route } from "react-router-dom";

import LogInPage from "../pages/LogInPage";
import SignUpPage from "../pages/SignUpPage";
import MainDailyPage from "../pages/MainDailyPage";
import MonthlyPage from "../pages/MonthlyPage";
import NotFound from "../pages/NotFound";
import PostingPage from "../pages/PostingPage";
import SurveyPage from "../pages/SurveyPage";
import MyPage from "../pages/MyPage";
import TagBuyPage from "../pages/TagBuyPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/main" element={<MainDailyPage />} />
        <Route path="/monthly" element={<MonthlyPage />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/post" element={<PostingPage />} />
        <Route path="/survey" element={<SurveyPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/buy" element={<TagBuyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
