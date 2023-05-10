import axios from 'axios' //通过 axios 创建对象

const request = axios.create({
    timeout: 5000
})

//request 拦截器
//1. 可以对请求做一些统一的处理
//2. 比如统一加 token, Content-Type 之类的

request.interceptors.request.use(
    config => {
        config.headers['Context-Type'] = 'application/json,charset=utf-8';
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

//导出模块
export default request;