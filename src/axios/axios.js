import axios from 'axios'
import { CustomToast } from '../components/common/Alert'

const instance = axios.create({
    baseURL: process.env.REACT_APP_ENDPOINT,
    headers: {
        "Content-Type" : "application/json",
    },
    timeout: 2000,
})
export default instance

// 토큰에 이상이 있는 경우 로그아웃
instance.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (error.response.status===401) {
            localStorage.removeItem("accessToken")
            CustomToast({
                icon: "error",
                text: "토큰 만료. 다시 로그인해 주세요",
            }) 
            setTimeout(()=>{
                window.location.reload("/")
            }, 3000) 
        }
        return Promise.reject(error);
    }
)