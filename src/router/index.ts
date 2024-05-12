import {RouteRecordRaw, createRouter, createWebHashHistory} from 'vue-router'

const defaultRouter: RouteRecordRaw[] = [
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

export default router
