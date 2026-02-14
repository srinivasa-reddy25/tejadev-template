import baseConfig from './base.mjs'

const nextConfig = [
  ...baseConfig,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    rules: {
      'turbo/no-undeclared-env-vars': 'off'
    }
  }
]

export default nextConfig
