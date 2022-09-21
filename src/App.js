import Router from "./shared/Router";

import { useDispatch } from "react-redux";
import { setLogin } from "./redux/modules/user"
import { getCookie } from "./util/cookies";
import setSession from "./axios/setSession";

const App = () => {
  const dispatch = useDispatch();

  const session = getCookie("session")

  if (session) {
    setSession(session)
    dispatch(setLogin(session))
  }

  return (
    <Router />
  )
}

export default App;
