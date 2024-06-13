import {toLogin} from '@/router'
import {useCommonStore} from '@/store/modules/common'
import axios from 'axios'
import {ElNotification} from 'element-plus'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import 'element-plus/es/components/notification/style/css'

NProgress.configure({showSpinner: false, trickleSpeed: 200})
let respSet = new Set()
const resetRespSet = () => (respSet = new Set())

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 20000,
})

instance.interceptors.request.use(
  config => {
    const commonStore = useCommonStore()
    config.headers.Authorization = `Bearer ${commonStore.user.token}`

    const controller = new AbortController()
    config.signal = controller.signal
    config.controller = controller
    commonStore.addAbortController(controller)
    return config
  },
  error => Promise.reject(error),
)

instance.interceptors.request.use(
  config => {
    if (!config.doNotTriggerProgress) {
      const commonStore = useCommonStore()
      if (!commonStore.request_queue) {
        NProgress.start()
      }
      commonStore.setReqChange(true)
    }
    return config
  },
  error => Promise.reject(error),
)

const isTokenExpired = (data: any) => {
  return ['BAD_TOKEN', 'TOKEN_TIME_OUT'].includes(data.code)
}

instance.interceptors.response.use(
  response => {
    if (!response.config.doNotTriggerProgress) {
      setProgressBarDone()
    }

    const {code} = response.data

    if (!respSet.has(code)) {
      respSet.add(code)

      if (isTokenExpired(response.data)) {
        ElNotification.error('token过期')
        toLogin()

        window.setTimeout(resetRespSet, 100)
        return Promise.reject(response.data)
      }
    }

    const commonStore = useCommonStore()
    const controller = response.config.controller
    commonStore.removeAbortController(controller)
    return response.data
  },
  error => Promise.reject(error),
)

async function setProgressBarDone() {
  const commonStore = useCommonStore()
  commonStore.setReqChange(false)
  const queueLen = commonStore.request_queue
  if (queueLen > 0) {
    NProgress.inc()
  } else {
    NProgress.done()
  }
}

export default instance
