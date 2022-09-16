import styled from "styled-components"
import Swal from "sweetalert2"

import petBG from "../../assets/mypetImg/petBG.png"
import LV1 from "../../assets/mypetImg/LV1.png"
import petData from "./petData"

import { BsStars } from "react-icons/bs";

import { StSubmitBtn } from "../common/SaveButtonLong";

const Pet = () => {


  return (
    <StPetBG>

      <StPetTitle>
        마이 펫
      </StPetTitle>

      <StPetInfo>
        <StPetImg/>

        <StPetExpBox>
          <StPetExpNum>
            <p>EXP.</p>
            <p>0/100xp</p>
          </StPetExpNum>

          <StPetExpBar>
            <StPetExpLV>
              Lv. 01
            </StPetExpLV>
            <StPetProgress>
            </StPetProgress>
          </StPetExpBar>
          <StPetData>
            {
              petData.map((myPet, i)=>{
                return(
                  <div key={i}>
                    <StPetDataKey>
                       {myPet.key} 
                    </StPetDataKey>
                    <StPetDataValue>
                       {myPet.value} 
                    </StPetDataValue>
                  </div>
                )
              })
            }
          </StPetData>
        </StPetExpBox>
      </StPetInfo>
      <StMyPt>
        <p>My Point <span>｜<BsStars/> 2100 </span>point</p>
      </StMyPt>
      <StPetBtn onClick={()=>{
        Swal.fire({
          text: '준비 중입니다...',
          width: 300,
          confirmButtonText: "확인",
        })
      }}>
        <BsStars/> <span>100 point</span> 펫 밥주기
      </StPetBtn>
    </StPetBG>
  )
}
export default Pet

const StPetBG = styled.div`
  width: 360px;
  height: 800px;
  background-image: url(${petBG});
  background-size: contain;
  background-repeat: no-repeat;
`

const StPetTitle = styled.h1`
  height: 110px;
  width: max-content;
  margin: auto;
  font-weight: 700; 
  font-size: 18px;
  text-align: center;
  color: #343434;
  letter-spacing: -0.3px;
  display: flex;
  align-items: center;
`

const StPetInfo = styled.div`
  width: 328px;
  margin: auto;
`

const StPetImg = styled.div`
  width: 248px;
  height: 248px;
  margin: 0 40px;
  background-color: #EDEAFF;
  border-radius: 100%;
  border: 8px solid #AB9BFF;
  box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.14), inset -2px -2px 4px rgba(0, 0, 0, 0.12);

  background-image: url(${LV1});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 35%;
`

const StPetExpBox = styled.div`
  width: 328px;
  height: 154px;  
  background-color: white;
  margin-top: 71px;
  border-radius: 16px;
  padding: 16px 20px;
`

const StPetExpNum = styled.div`
  display: flex;
  justify-content: space-between;
  & p {
    font-weight: 600;
    font-size: 12px;
  }
`

const StPetExpBar = styled.div`
  display: flex;
  align-items: center;
`

const StPetExpLV = styled.div`
  width: 50px;
  height: 22px;
  background: linear-gradient(197.06deg, #907CF9 -6.2%, #6334FF 101.13%);
  border-radius: 6px;
  margin: 5px 5px 0 0;

  font-weight: 600;
  font-size: 14px;
  text-align: center;
  letter-spacing: -0.3px;

  color: #FFFFFF;
`

const StPetProgress = styled.div`
  width: 236px;
  height: 14px;

  background: #EBEBEB;
  border-radius: 7px;
`

const StPetData = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 17px;
  & div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

const StPetDataKey = styled.div`
  width: 68px;
  height: 26px;
  border: 1px solid #5039C8;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  color: #674DED;
`

const StPetDataValue = styled.div`
  width: 56px;
  height: 30px;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  text-align: center;
  letter-spacing: -0.3px;
  color: #5039C8;
`

const StMyPt = styled.div`
  width: 179px;
  height: 32px;
  background-color: white;
  font-weight: 500;
  font-size: 12px;
  color: #653BFA;
  margin: 24px auto 0;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  & p {
    position: relative;
    top: -3px;
  }
  & span {
    position: relative;
    top: 3px;
    font-weight: 600;
    font-size: 18px;
  }
`

const StPetBtn = styled(StSubmitBtn)`
  width: 224px;
  margin: 21px auto;
  left: 68px
`

//https://teamsparta.notion.site/4-0841d140d6c04eab85433b090178a4f1
