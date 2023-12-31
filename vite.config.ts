import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vitest-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    testTimeout: 10000,
  },
})
