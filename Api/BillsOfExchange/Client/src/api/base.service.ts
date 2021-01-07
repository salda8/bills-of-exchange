import axios, { AxiosInstance, AxiosResponse } from 'axios';

export abstract class BaseService {
    protected readonly $http: AxiosInstance;
    //protected $paging: boolean;

    protected constructor(controllerName: string, requestTimeout: number = 50000) {
        this.$http = axios.create({
          timeout: requestTimeout,
            baseURL: `http://localhost:52773/api/${controllerName}/`
        });

        //this._initializeResponseInterceptor();
    }
    /*
    private _initializeResponseInterceptor = () => {
        this.$http.interceptors.response.use(
            this.$http._handleResponse
        );
    };

    private _handleResponse = (config: AxiosResponse) => {
        config.headers["x-paging"];
    };*/
}
