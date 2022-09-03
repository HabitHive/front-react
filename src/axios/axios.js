import axios from 'axios'

// 토큰 받아서 넣기
const accessToken = 123

const instance = axios.create({
    baseURL: process.env.REACT_APP_ENDPOINT,
    headers: {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${accessToken}` ,
    },
    timeout: 2000,
})

export default instance