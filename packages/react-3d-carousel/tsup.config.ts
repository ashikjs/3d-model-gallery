import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
    external: ['react', 'react-dom', 'three', '@react-three/fiber', '@react-three/drei'],
    sourcemap: true,
    minify: false,
    splitting: false,
    treeshake: true
});
