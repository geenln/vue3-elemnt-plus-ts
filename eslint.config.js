import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginVue from 'eslint-plugin-vue'
import vueEslintParser from 'vue-eslint-parser'

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
      }
    }
  }
)
