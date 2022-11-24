import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

function _resolve(dir: string) {
  return path.resolve(__dirname, dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 配置项目别名
  resolve: {
    alias: {
      '@': _resolve('src'),
    },
  },
});
