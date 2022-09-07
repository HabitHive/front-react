import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_ENDPOINT,
    headers: {
        "Content-Type" : "application/json",
    },
    timeout: 2000,
})

export default instance

// instance.interceptors.request.use(
//     (config)=>{
//         return console.log("나는 인터셉터 리퀘스트야")
//     },(err)=>{
//         return console.log("나는 인터셉터 리퀘스트 에러야")
// })

// instance.interceptors.response.use(
//     (config)=>{
//         if (config.data.accessToken !== null) {
//         console.log("나는 인터셉터 리스폰스야")
//         }
//     },(err)=>{
//         return console.log("나는 인터셉터 리스폰스 에러야")
// })