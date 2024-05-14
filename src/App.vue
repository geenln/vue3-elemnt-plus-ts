<script setup lang="ts">
import {useCounterStore} from './store/modules/counter'

const counterStore = useCounterStore()
</script>

<template>
  <h1>Vue3 Element Plus Ts</h1>
  <button class="border p-2 rounded-md" @click="counterStore.increment()">
    count加1
  </button>
  <div class="flex gap-2">
    <span>{{ counterStore.count }}</span>
    <span>{{ counterStore.doubleCount }}</span>
  </div>

  <div class="flex gap-2">
    <RouterLink to="/t1" class="underline text-teal-600">TestA.vue</RouterLink>
    |
    <RouterLink to="/t2" class="underline text-teal-600">TestB.vue</RouterLink>
  </div>
  <RouterView />
</template>
