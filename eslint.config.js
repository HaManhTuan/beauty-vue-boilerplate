import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.agents/**',
      '**/tmp/**',
      '**/.cursor/**',
      '**/package-lock.json',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  {
    files: ['src/components/ui/**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/require-default-prop': 'off',
    },
  },
  {
    files: ['src/views/**/*.vue'],
    rules: {
      /** `defineOptions({ name })` aligns with `route.name` for `<KeepAlive include>`. */
      'vue/multi-word-component-names': 'off',
      'vue/component-definition-name-casing': 'off',
    },
  },
  eslintConfigPrettier,
)
