import axios, { type AxiosInstance } from "axios";

const getAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: "http://192.168.1.194:3030/",
  });
  // api.interceptors.request.use( config => {
  //     config.headers.Authorization
  //     return config
  // })
  return api;
};

export const api = getAPI();
