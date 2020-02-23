import Cookies from 'js-cookie'
const authorization = "authorization"

export const setCookie = (token) => {
  Cookies.set(authorization, token)
}

export const getCookie = () => {
  return Cookies.get(authorization)
}

export const removeCookie = () => {
  return Cookies.remove(authorization)
}
