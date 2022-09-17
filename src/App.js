import Router from "./shared/Router";

import { useDispatch } from "react-redux";
import { setLogin } from "./redux/modules/user"
import setToken from "./axios/setToken";
import { useLayoutEffect } from "react";

const App = () => {
  const dispatch = useDispatch();

  const token = localStorage.getItem("token")
  if (token) {
    setToken(token)
    dispatch(setLogin(token))
  }

  return (
    <Router />
  )
}

export default App;
