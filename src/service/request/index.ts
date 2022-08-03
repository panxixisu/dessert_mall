import axios from "axios";
import type { AxiosInstance } from "axios";
import { ElLoading } from "element-plus/lib/components/loading";
import stoage from "@/utils/storage";
import { LoadingInstance } from "element-plus/lib/components/loading/src/loading";
const DEFAULT_LOADING = true;

import { PXrequestInterceptors, PXrequestConfig } from "./type";

class PXrequest {
  instance: AxiosInstance;
  loading?: LoadingInstance;
  interceptors?: PXrequestInterceptors;
  isShowloading: boolean;
  constructor(config: PXrequestConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;
    this.isShowloading = config.isShowLoading ?? true;
    //1.每个实例各自传入的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    // 2.添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.isShowloading) {
          this.loading = ElLoading.service({
            lock: true,
            text: "正在请求数据....",
            background: "rgba(0, 0, 0, 0.5)",
          });
        }
        if (stoage.getCache("token")) {
          if (!config) {
            config = {};
          }
          if (!config.headers) {
            config.headers = {};
          }

          config.headers.Authorization = stoage.getCache("token");
        }

        return config;
      },
      (err) => {
        console.log("123error");
        this.loading?.close();
        return err;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close();

        return res;
      },
      (err) => {
        return err;
      }
    );
  }
  //3.单独请求的拦截
  request<T>(config:any): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.isShowLoading === false) {
        this.isShowloading = false;
      }

      //单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
    
        config = config.interceptors.requestInterceptor(config);
        console.log("单独请求")
        console.log(config)
      }
      
      //config.data = { unused: 0 };
      //config.headers['Content-type'] = config.headers.ContentType

      this.instance
        .request<any, T>(config)
        .then((res) => {
          //单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          this.isShowloading = DEFAULT_LOADING;

          resolve(res);
        })
        .catch((err) => {
          this.isShowloading = DEFAULT_LOADING;
          console.log("222error");
          reject(err);
        });
    });
  }
  //get请求
  get<T>(config: PXrequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "get" });
  }
  //post请求
  post<T>(config: PXrequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "post" });
  }
  //put请求
  put<T>(config: PXrequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "put" });
  }
  //delete请求
  delete<T>(config: PXrequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "delete" });
  }
}
export default PXrequest;
