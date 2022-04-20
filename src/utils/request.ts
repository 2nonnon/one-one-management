import axios
// , { AxiosRequestConfig }
  from 'axios'
import { useStore } from '../store/store'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL
})

const store = useStore()

request.interceptors.request.use(function (config) {
  // 统一设置用户token
  if (store.accessToken) {
    config.headers = Object.assign(config.headers ?? {}, { Authorization: `Bearer ${store.accessToken}` })
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

request.interceptors.response.use(function (response) {
  // 统一处理接口响应错误，比如：token 过期无效、服务端异常等
  return response
}, function (error) {
  return Promise.reject(error)
})

// export default async <T = any>(config: AxiosRequestConfig) => {
//   const res = await request(config)
//   return res.data as T
// }
export default request
