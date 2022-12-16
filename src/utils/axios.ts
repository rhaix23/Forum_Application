import axios, { AxiosError } from "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    sent?: boolean;
  }
}

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const prevRequest = error.config;
    if (prevRequest) {
      if (error.response!.status === 403 && !prevRequest.sent) {
        prevRequest.sent = true;
        await api.get("/users/refresh");
        return api(prevRequest);
      }
    }
    return Promise.reject(error);
  }
);
