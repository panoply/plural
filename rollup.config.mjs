import { rollup, plugin, env } from '@sissel/rollup-config';

export default rollup(
  {
    input: 'src/index.ts',
    treeshake: 'smallest',
    output: [
      {
        compact: true,
        format: 'esm',
        file: 'index.mjs',
        preferConst: true,
        esModule: true,
        sourcemap: false
      },
      {
        compact: true,
        format: 'cjs',
        file: 'index.js',
        exports: 'default',
        sourcemap: false
      }
    ],
    plugins: env.if('dev')([ plugin.esbuild() ])([ plugin.esminify() ])
  }
);
