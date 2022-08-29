import styled from "styled-components";

const MainDailyPage = () => {
  return (
    <div>
      <StLayout>테스트용 레이아웃입니다</StLayout>
      메인 페이지입니다
    </div>
  );
};

export default MainDailyPage;

const StLayout = styled.div`
  background-color: aliceblue;
  max-width: 390px;
  height: 100vh;
  margin: 0 auto;
`;
