<script setup lang="ts">
import http2 from '@/common/http2'
import {useCommonStore} from '@/store/modules/common'
import {UserInfo} from '@/types/common'

const router = useRouter()
const route = useRoute()
const commonStore = useCommonStore()

const redirect = () => {
  router.replace({
    path: (route.query.to ?? '/userInfo').toString(),
  })
}

const handleLogin = () => {
  http2.post<UserInfo>('/login').then(res => {
    commonStore.updateUserInfo(res.data)
    redirect()
  })
}
</script>

<template>
  <h1>登录页</h1>
  <ElButton @click="handleLogin">登录</ElButton>
</template>
