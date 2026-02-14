import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import turboPlugin from 'eslint-plugin-turbo'
import prettierPlugin from 'eslint-plugin-prettier'

const baseConfig = [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.turbo/**',
      '**/.next/**',
      '**/coverage/**'
    ]
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx,mjs,cjs}'],
    plugins: {
      turbo: turboPlugin,
      prettier: prettierPlugin
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',
      'prettier/prettier': 'warn'
    }
  }
]

export default baseConfig
