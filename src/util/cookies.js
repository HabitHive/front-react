import Cookies from "universal-cookie";

const cookies = new Cookies();

//나중에 옵션 설정 추가하기
export const setCookie = (name, value, option) => {
  return cookies.set(name, value, { ...option })
}

export const getCookie = (name) => {
  return cookies.get(name)
}

export const removeCookie = (name) => {
  return cookies.remove(name)
}