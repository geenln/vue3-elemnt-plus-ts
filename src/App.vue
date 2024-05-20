<script setup lang="ts">
import {useCounterStore} from '@/store/modules/counter'
import {useI18n} from 'vue-i18n'
import {useLocaleSwitcher} from '@/hooks/useLocaleSwitcher'

const counterStore = useCounterStore()
const {currentLocale, elementLocale, locales, switchLocale} =
  useLocaleSwitcher()

const {t} = useI18n()

const localeValue = ref()

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <ElConfigProvider :locale="elementLocale">
    <h1>Vue3 Element Plus Ts</h1>
    <ElButton type="primary" @click="toggleDark()">
      切换暗黑模式 {{ isDark }}
    </ElButton>

    <ElDatePicker />

    <ElSelect v-model="localeValue" class="!w-[220px]" @change="switchLocale">
      <template v-for="(value, key) in locales" :key="key">
        <ElOption :label="value" :value="key" />
      </template>
    </ElSelect>
    <div>{{ t('message') }} {{ currentLocale }}</div>

    <button class="border p-2 rounded-md" @click="counterStore.increment()">
      count加1
    </button>
    <div class="flex gap-2">
      <span>{{ counterStore.count }}</span>
      <span>{{ counterStore.doubleCount }}</span>
    </div>

    <div class="flex gap-2">
      <RouterLink to="/t1" class="underline text-teal-600"
        >TestA.vue</RouterLink
      >
      |
      <RouterLink to="/t2" class="underline text-teal-600"
        >TestB.vue</RouterLink
      >
    </div>
    <RouterView />
  </ElConfigProvider>
</template>
