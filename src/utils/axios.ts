import axios, { AxiosError } from "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
  // baseURL: "https://forum-application-api.vercel.app/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const prevRequest = error.config;
    if (prevRequest) {
      if (
        error.response!.status === 401 &&
        !prevRequest._retry &&
        prevRequest.url !== "/users/login"
      ) {
        prevRequest._retry = true;
        await api.get("/users/refresh");
        return api(prevRequest);
      }
    }
    return Promise.reject(error);
  }
);
