import Router from "./shared/Router";

import { useDispatch } from "react-redux";
import setToken from "./axios/setToken";
import { setLogin } from "./redux/modules/user"



const App = () => {
  const dispatch = useDispatch();

  const accessToken = localStorage.getItem("accessToken")

  if (accessToken) {
    setToken(accessToken)
    dispatch(setLogin(true))
  }

  return (
    <Router />
  )
}

export default App;
