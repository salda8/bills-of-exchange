import { toast } from 'react-toastify';
import { renderToastifyMsg } from '../utils';
import axios, { AxiosError, AxiosResponse } from 'axios';

const handleAxiosError = (error: AxiosError): void => {
  const message = {
    body: 'Internal Server Error',
    request: '',
    status: 500
  };
  if (typeof error !== 'undefined' && error.hasOwnProperty('message')) {
    message.body = error.message;
  }

  if (typeof error.response !== 'undefined') {
    switch (error.response.status) {
      case 401:
        message.body = 'UnAuthorized';
        break;
      case 404:
        message.body = 'API Route is Missing or Undefined';
        break;
      case 405:
        message.body = 'API Route Method Not Allowed';
        break;
      case 422:
        break;
      case 500:
      default:
        message.body = 'Internal Server Error';
        break;
    }
    if (error.response.status > 0) {
      message.status = error.response.status;
    }
    if (
      error.hasOwnProperty('response') &&
      error.response.hasOwnProperty('data') &&
      error.response.data.hasOwnProperty('message') &&
      !!error.response.data.message.length
    ) {
      message.body = error.response.data.message;
    }
  }

  toast.error(
    renderToastifyMsg(
      `XHR Error - ${message.status} (${message.body})`,
      'exclamation'
    )
  );
};

export default class AxiosGlobalConfig {
  public static setup(): void {
    axios.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        handleAxiosError(error);
        return Promise.reject(error);
      }
    );
  }
}
