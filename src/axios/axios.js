import axios from 'axios'

import { ErrorAlert } from '../components/common/Alert'
import { useNavigate } from 'react-router'
import { setLogin } from '../redux/modules/user'

import { useDispatch } from 'react-redux'

const instance = axios.create({
    baseURL: process.env.REACT_APP_ENDPOINT,
    headers: {
        "Content-Type" : "application/json",
    },
    timeout: 2000,
})

export default instance

instance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response.status===401) {
            localStorage.removeItem("accessToken")
            ErrorAlert({
               text: "토큰 만료. 다시 로그인해 주세요"
            })
            useDispatch(setLogin(false))
            useNavigate("/")
        }
        return Promise.reject(error);
    }
)