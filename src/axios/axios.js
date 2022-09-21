import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_ENDPOINT,
    headers: {
        "Content-Type" : "application/json",
        "session":"Irr0xUjWFkvTDQU_2Etga3K62LS1MEXu"

    },
    timeout: 2000,
})


export default instance


