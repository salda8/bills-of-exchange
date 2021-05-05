import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from "axios";

export const http = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (error: any) => Promise.reject(error)
);

http.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: any) => {
    handleAxiosError(error);
  }
);

const handleAxiosError = (error: AxiosError): void => {
  const message = {
    body: "Internal Server Error",
    request: "",
    status: 500,
  };

  if (error.response !== undefined) {
    if (error.response.status > 0) {
      message.status = error.response.status;
    }
    if (error.response.data !== undefined) {
      message.body = error.response.data.Message;
    }
  }
  console.error(message);
};
