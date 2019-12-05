import axios from 'axios'
import { Toast } from 'vant';
console.log(process.env);
// 开发环境 http://fx.hekouxin.com:60/ZHYD		
// 生产的测试环境 http://fx.hekouxin.com:60/ZHYD																						 
// 生产的正式环境 http://fx.hekouxin.com:60/Z
let baseURL = '/ZHYD';
if(process.env.NODE_ENV==='production'){
	baseURL= process.env.VUE_APP_BASEURL||'/ZHYD'; 
}
// 创建axios实例
const http = axios.create({
	baseURL,
  timeout: 10000, // 请求超时时间
})

// request拦截器
http.interceptors.request.use(
  config => {
    // if (store.getters.token) {
    //     // config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
		// }
		Toast.loading({
			message: '加载中...',
			forbidClick: true
		});
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone拦截器
http.interceptors.response.use(
  response => {
		Toast.clear();
    const { data } = response
    return data
  },
  error => {
		Toast.clear();
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default http
