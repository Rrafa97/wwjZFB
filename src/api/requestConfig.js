import axios from 'axios'
import {Toast} from 'mint-ui'

const instance = axios.create({
  // baseURL: 'http://yyj2.hzhltec.com/list', // api的base_url
  // baseURL: 'http://122.224.91.150/list', // api的base_url
  // baseURL: 'http://localhost:8888/vrsws', // api的base_url
  // baseURL: 'http://111.1.5.92:8888/vifws', // api的base_url
  baseURL: 'http://zfb.hzhltec.com/vrsws', // api的base_url
  // baseURL: 'http://localhost:8080/vifws_c/', // api的base_url
  timeout: 30000, // request timeout
});
// 添加请求拦截器
axios.interceptors.request.use(config => {

  // 在发送请求之前做些什么
  return config;
}, function (error) {
  console.log(error)
  // 对请求错误做些什么
 // Toast('系统异常')
});
// 添加响应拦截器
axios.interceptors.response.use(response => {
  // 对响应数据做点什么
  return JSON.parse(response);
}, function (error) {
  console.log(error)
  // 对响应错误做点什么
  Toast('系统异常')
});

export default instance
