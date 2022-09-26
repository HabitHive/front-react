import axios from 'axios'

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
    async (error) => {
        if (error.response.status===401) {
            //토큰 만료 시 재발급 추가 예정
            console.log("만료된 토큰입니다")
            localStorage.removeItem("accessToken")
        }
    }
)

//만료된토큰 eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkxIjo1MjU3ODk1NjQ2LCJpYXQiOjE2NjQwMTgyMTUsImV4cCI6MTY2NDA2MTQxNX0.b6ttFY1d-4TZnSVpGnytBFeO2cEXbiYTuF_vaLnpbWE