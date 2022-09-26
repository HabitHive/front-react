import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_ENDPOINT,
    headers: {
        "Content-Type" : "application/json",
    },
    timeout: 2000,
})

export default instance

//만료된토큰 eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkxIjo1MjU3ODk1NjQ2LCJpYXQiOjE2NjQwMTgyMTUsImV4cCI6MTY2NDA2MTQxNX0.b6ttFY1d-4TZnSVpGnytBFeO2cEXbiYTuF_vaLnpbWE