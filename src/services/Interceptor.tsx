import axios from "axios";
// const baseURL = 'http://192.168.0.45:9000/'
const baseURL = ''

const instance = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
})

instance.interceptors.request.use((request : any) => {
    request.url = baseURL + request.url;
    // console.log('request', request)
    return request;
},
    (error: any) => {
        return Promise.reject(error);
    }
)

instance.interceptors.response.use((response: any) => {
    // console.log(response)
    if (response.status === 500) {
        alert('Internal Server Error')
    } else {
        return response;
    }
}
)

export default instance;
