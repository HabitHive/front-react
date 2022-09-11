import instance from "./axios"

const setToken = (token) => {
    if(token) {
        console.log(token)
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        delete instance.defaults.headers.common['Authorization']
    }
}
export default setToken