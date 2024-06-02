import axios from 'axios'
import {ElMessage} from 'element-plus'
import 'element-plus/es/components/message/style/css'

const instance = axios.create({
  baseURL: '',
  timeout: 20000,
})

instance.interceptors.request.use(
  config => {
    // TODO: 添加请求参数
    // 例如：统一添加请求 token
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  response => {
    // TODO: 处理请求响应
    // 例如：统一处理错误信息
    if (response.data && !response.data.success) {
      ElMessage.error('请求失败')
      return Promise.reject(response.data)
    }
    return response.data
  },
  error => {
    return Promise.reject(error)
  },
)

export default instance
