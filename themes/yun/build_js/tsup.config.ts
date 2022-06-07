import { defineConfig } from 'tsup'

export default defineConfig((options) => {
  return {
    entry: ['src'],
    splitting: true,
    sourcemap: false,
    // future to false
    clean: true,
    format: ['esm'],
    minify: !options.watch,
    outDir: '../source/js',
  }
})
