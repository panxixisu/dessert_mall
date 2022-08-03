import PXrequset from "./request";
import { BASE_URL, TIME_OUT } from "./request/config";
//导出请求实例
const request = new PXrequset({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    //这段代码导致请求收到数据为空
    // requestInterceptor: (config) => {
    //   console.log('单独实例请求成功的拦截')
    //   return config
    // },
    // requestInterceptorCatch: (err) => {
    //   console.log('单独实例请求失败的拦截')
    //   return err
    // },
    // responseInterceptor: (res) => {
    //   console.log('单独实例的响应成功拦截')
    //   return res.data
    // },
    // responseInterceptorCatch: (err) => {
    //   console.log('单独实例的响应失败的拦截')
    //   return err
    // }
  },
});
export default request;
