import instance from "./axios"

const setSession = (session) => {
    if(session) {
        instance.defaults.headers.common['session'] = session
    } else {
        delete instance.defaults.headers.common['session']
    }
}
export default setSession