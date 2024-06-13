<script setup lang="ts">
import {useCommonStore} from '@/store/modules/common'
import http2 from '@/common/http2'
const commonStore = useCommonStore()

const handleTokenExpired = () => {
  http2.post('/tokenTimeOut').then(res => {
    console.info('res', res)
  })
}
</script>

<template>
  <h1>用户信息 {{ commonStore.user.username }}</h1>
  <ElButton @click="handleTokenExpired">测试登录过期</ElButton>
</template>
