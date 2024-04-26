import axios, { type AxiosInstance } from "axios";

const getAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: "http://10.0.2.113:3030/",
  });
  // api.interceptors.request.use( config => {
  //     config.headers.Authorization
  //     return config
  // })
  return api;
};

export const api = getAPI();
