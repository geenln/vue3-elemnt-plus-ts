import {useCommonStore} from '@/store/modules/common'
import {RouteRecordRaw, createRouter, createWebHashHistory} from 'vue-router'

const defaultRouter: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/userInfo',
    meta: {
      authRequired: true,
    },
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/userInfo',
    meta: {
      authRequired: true,
    },
    component: () => import('@/views/UserInfo.vue'),
  },
  {
    path: '/t1',
    component: () => import('@/views/TestA.vue'),
  },
  {
    path: '/t2',
    component: () => import('@/views/TestB.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...defaultRouter],
})

router.beforeEach((to, _from, next) => {
  const {fullPath, meta} = to
  const {authRequired = false} = meta
  const commonStore = useCommonStore()

  if (authRequired && !commonStore.user.token) {
    toLogin(fullPath)
    return
  }
  next()
})

export function toLogin(path?: string): void {
  const commonStore = useCommonStore()
  commonStore.updateUserInfo({logOut: true})
  commonStore.clearAbortControllers()
  const currentPath = router.currentRoute.value.path

  currentPath !== '/login' &&
    router.push({
      path: '/login',
      query: {to: path ? path : currentPath ?? undefined},
    })
}

export default router
