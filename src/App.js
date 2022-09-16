import Router from "./shared/Router";

import { useDispatch } from "react-redux";
import { setLogin } from "./redux/modules/user"
import setToken from "./axios/setToken";

const App = () => {
  const dispatch = useDispatch();

  const token = localStorage.getItem("token")

  // 마운트가 완료되기 전에 먼저 실행된다
  if (token) {
    setToken(token)
    dispatch(setLogin(token))
  }

  return (
    <Router />
  )
}

export default App;
