import styled from "styled-components";

const MainDailyPage = () => {
  return (
    <div>
      <StLayout>테스트용 레이아웃입니다</StLayout>
    </div>
  );
};

export default MainDailyPage;

const StLayout = styled.div`
  background-color: white;
  max-width: 390px;
  height: 100vh;
  margin: 0 auto;
`;
