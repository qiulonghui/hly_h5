import axios from 'axios'

// 创建axios实例
const http = axios.create({
  // baseURL: '/',// api的base_url
 
  timeout: 30000, // 请求超时时间
})

// request拦截器
http.interceptors.request.use(
  config => {
    // if (store.getters.token) {
    //     // config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    // }
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
    /**
     * code为非0是抛错
     */
    const { data } = response

    return data
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default http
