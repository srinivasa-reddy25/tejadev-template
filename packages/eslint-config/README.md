# @tejadev/eslint-config

Shared ESLint flat config presets for this monorepo.

## Presets

- `@tejadev/eslint-config/base`
- `@tejadev/eslint-config/node`
- `@tejadev/eslint-config/next`

## Usage

In a workspace `eslint.config.mjs`:

```js
import { defineConfig } from 'eslint/config'
import nodeConfig from '@tejadev/eslint-config/node'

export default defineConfig(...nodeConfig)
```
