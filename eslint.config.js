import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginVue from 'eslint-plugin-vue'
import vueEslintParser from 'vue-eslint-parser'
import {readFile} from 'node:fs/promises'

const eslintAutoImport = JSON.parse(
  await readFile(
    new URL('./.eslintrc-auto-import.json', import.meta.url),
    'utf8',
  ),
)

export default tseslint.config(
  eslint.configs.recommended,
  ...eslintPluginVue.configs['flat/recommended'],
  eslintPluginPrettierRecommended,
  eslintConfigPrettier,
  {ignores: ['dist/']},
  {
    languageOptions: {
      parser: vueEslintParser,
      parserOptions: {
        parser: tseslint.parser,
      },
      globals: {
        ...eslintAutoImport.globals,
      },
    },
  },
)
