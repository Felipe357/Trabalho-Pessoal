import axios, { type AxiosInstance } from "axios";

const getAPI = (): AxiosInstance => {
    const api = axios.create({
        baseURL: ""
    })
    // api.interceptors.request.use( config => {
    //     config.headers.Authorization
    //     return config
    // })
    return api
}

export const api = getAPI()