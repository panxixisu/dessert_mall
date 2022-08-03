import type { AxiosRequestConfig, AxiosResponse } from "axios";

//自定义接口实现拦截器定义
export interface PXrequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (err: any) => any;
  responseInterceptor?: (res: T) => T;
  responseInterceptorCatch?: (err: any) => any;
}
//自定义传入配置，新增interceptors用于接收传入的拦截器，用于构造每个实例独有的拦截器
export interface PXrequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: PXrequestInterceptors<T>;
  isShowLoading?: boolean;
}
