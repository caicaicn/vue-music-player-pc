import axios from 'axios';
import qs from 'qs';
axios.defaults.timeout = 50000;
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.interceptors.request.use(function (config) {
    if(config.method === 'post'){
        config.data = qs.stringify(config.data)
    }
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    if (response.data.code){
        if (response.data.code !== 200) {
            return Promise.reject(response);
        }
    }
    
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default axios;