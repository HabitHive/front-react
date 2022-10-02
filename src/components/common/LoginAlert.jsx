import { CustomAlert } from "./Alert"
import { useEffect } from "react"
import { useNavigate } from "react-router"

export const LoginAlert = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    CustomAlert({
      icon: "warning",
      text: "로그인이 필요합니다"
    })
    navigate("/")
  })
}

export const LoggedinNav = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    CustomAlert({
      icon: "info",
      text: "로그인 상태입니다"
    })
    navigate("/main")
  })
}
