import { defineConfig } from 'vite';

export default defineConfig({
  root: '.', // à la racine du projet
  publicDir: 'public',
  server: {
    port: 5173
  }
});
