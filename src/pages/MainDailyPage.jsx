import styled from "styled-components";

const MainDailyPage = () => {
  return (
    <div>
      <StLayout>테스트 레이아웃</StLayout>
    </div>
  );
};

export default MainDailyPage;

const StLayout = styled.div`
  background-color: white;
  max-width: 390px;
  height: 100vh;
  margin: 0 auto;
  /* max-width: 1000px;
  padding: 0 20px; */
`;
