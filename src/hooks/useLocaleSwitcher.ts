import {useI18n} from 'vue-i18n'
import {Language} from 'element-plus/lib/locale/index.js'

import zhLocale from 'element-plus/es/locale/lang/zh-cn'
import enLocale from 'element-plus/es/locale/lang/en'

const locales = {
  en: 'English',
  zh: '中文',
}

const elementLocales: {[key: string]: Language} = {
  en: enLocale,
  zh: zhLocale,
}

export const useLocaleSwitcher = () => {
  const {locale} = useI18n()
  const currentLocale = ref(locale.value)

  const elementLocale = computed(() => elementLocales[locale.value])

  const switchLocale = (lang: string) => {
    locale.value = lang
    currentLocale.value = lang
  }

  return {
    currentLocale,
    elementLocale,
    locales,
    switchLocale,
  }
}
