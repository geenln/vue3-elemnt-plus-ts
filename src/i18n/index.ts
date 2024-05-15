import {createI18n} from 'vue-i18n'

import en from '@/i18n/lang/en.json'
import zh from '@/i18n/lang/zh.json'

const i18n = createI18n({
  legacy: false,
  messages: {
    en,
    zh,
  },
})

export default i18n
