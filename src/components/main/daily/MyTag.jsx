import styled from "styled-components";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getMyTags } from "../../../redux/modules/mytag";
import { useNavigate } from "react-router-dom";
import { setDate } from "date-fns";

const MyTag = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  //리덕스에서 가져온 category들 정보
  const categories = useSelector(
    (state) =>
      // console.log(state.myTag.myTags[0].userTagId);
      state.myTag.myTags
  );

  const now = new Date();
  const thisYear = now.getFullYear();
  const thisMonth =
    now.getMonth() + 1 > 9 ? now.getMonth() + 1 : "0" + (now.getMonth() + 1);
  const thisDate = now.getDate() > 9 ? now.getDate() : "0" + now.getDate();
  const today = `${thisYear}-${thisMonth}-${thisDate}`;

  useEffect(() => {
    dispatch(__getMyTags(today));
  }, []);

  return (
    <>
      <STMyTag>
        <div className="myTitle">My habit</div>
        <hr className="hr"></hr>
        <div className="tagCategories">
          {categories?.map((category) => {
            return (
              <div
                className="category"
                key={category.userTagId}
                onClick={() => {
                  // setDate()
                  navigate("/post", { state: category });
                }}
              >
                {category.tagName}
              </div>
            );
          })}
        </div>
      </STMyTag>
    </>
  );
};

export default MyTag;

const STMyTag = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  height: 180px;
  position: fixed;
  z-index: 2;
  margin-left: 20px;
  bottom: 84px;
  max-width: 420px;
  padding: 12px 16px;

  background: rgba(174, 159, 255, 0.4);
  border-radius: 16px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(16px);

  & .myTitle {
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: #5039c8;
    margin-bottom: 12px;
  }

  & .hr {
    border: 1px solid #5039c8;
    width: 288px;
    margin-bottom: 12px;
  }
  //카테고리들
  & .tagCategories {
    display: flex;
    flex-wrap: wrap;
    cursor: pointer;
    & .category {
      background: linear-gradient(197.06deg, #907cf9 -6.2%, #6334ff 101.13%);
      padding: 2px 6px;
      border: 1px solid #674ded;
      border-radius: 6px;
      align-items: center;
      width: fit-content;
      font-size: 12px;
      line-height: 14px;
      font-weight: 200;
      color: white;
      margin: 0 5px 5px 0;
    }
  }
`;
