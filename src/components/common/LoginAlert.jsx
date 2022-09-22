import { useEffect } from "react"
import { InfoAlert } from "./Alert"
import { useNavigate } from "react-router"

export const LoginAlert = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    InfoAlert({
      text: "로그인이 필요합니다"
    })
    navigate("/")
  })
}

export const LoggedinNav = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    navigate("/main")
  })
}
