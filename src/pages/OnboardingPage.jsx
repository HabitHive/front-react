import Carousel from "../components/onboarding/Carousel";

import { useLocation } from "react-router";

const OnboardingPage = () => {
  const location = useLocation();

  // 온보딩페이지에 접근한 pathname
  const path = location.state

  return (
    <Carousel path={path}/>
  );
}

export default OnboardingPage;
