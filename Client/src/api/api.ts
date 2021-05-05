import axios, { AxiosError } from "axios";

export const http = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export const onError = (error: AxiosError) => {
  handleAxiosError(error);
};

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
  throw message;
};
