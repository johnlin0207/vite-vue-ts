import axios from 'axios';

const token = localStorage.getItem('token') || '';

// 添加请求拦截器
axios.interceptors.request.use(
  (config: any) => {
    config.headers.token = token;
    // 在发送请求之前做些什么
    return config;
  },
  (error: object) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  (response: any) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
  },
  function (error: object) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default axios;
