import {getUser, removeUser, setUser} from '@/common/auth'
import {UserInfo} from '@/types/common'
import {defineStore} from 'pinia'

export const useCommonStore = defineStore('common', {
  state: () => ({
    user: (getUser() || {}) as UserInfo,
    request_queue: 0,
    abortControllers: [] as AbortController[],
  }),
  actions: {
    updateUserInfo(userInfo = {} as any) {
      const {logOut = false} = userInfo
      if (logOut) {
        removeUser()
      } else {
        setUser(userInfo)
      }
      this.user = userInfo
    },
    setReqChange(addOrDone: boolean) {
      addOrDone ? ++this.request_queue : --this.request_queue
    },
    addAbortController(controller: AbortController) {
      this.abortControllers.push(controller)
    },
    clearAbortControllers() {
      this.abortControllers.forEach(controller => {
        controller.abort()
      })
      this.abortControllers = []
    },
    removeAbortController(controller?: AbortController) {
      if (!controller) {
        return
      }
      const index = this.abortControllers.indexOf(controller)
      if (index !== -1) {
        this.abortControllers.splice(index, 1)
      }
    },
  },
})
