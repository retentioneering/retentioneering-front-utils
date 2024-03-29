/* eslint-disable import/no-extraneous-dependencies */
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import sourcemaps from 'rollup-plugin-sourcemaps'
import commonjs from '@rollup/plugin-commonjs'
import pkg from './package.json'

export default {
  external: ['@retentioneering/datalayer'],
  input: './src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
    {
      file: pkg['umd:main'],
      format: 'umd',
      sourcemap: true,
      name: 'ReteFrontUtils',
      globals: {
        '@retentioneering/datalayer': 'ReteDatalayer',
      },
    },
    {
      file: './dist/rete-front-utils.iife.js',
      format: 'iife',
      name: 'ReteFrontUtils',
      sourcemap: true,
      globals: {
        '@retentioneering/datalayer': 'ReteDatalayer',
      },
    },
  ],
  plugins: [
    sourcemaps(),
    terser(),
    nodeResolve(),
    commonjs(),
    typescript(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions: ['.js', '.ts', '.tsx'],
    }),
  ],
}
