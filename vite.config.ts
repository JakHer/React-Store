import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import ViteEnvironmentPlugin from 'vite-plugin-environment';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    define: {
      'process.env.VITE_FIREBASE_API_KEY': JSON.stringify(
        env.VITE_FIREBASE_API_KEY
      ),
      'process.env.APP_USE_AVT': JSON.stringify(env.APP_USE_AVT),
    },
    server: {
      open: true,
      port: 3000,
    },
    plugins: [
      react(),
      ViteEnvironmentPlugin({
        VITE_FIREBASE_API_KEY: env.VITE_FIREBASE_API_KEY,
        VITE_FIREBASE_AUTH_DOMAIN: env.VITE_FIREBASE_AUTH_DOMAIN,
        VITE_FIREBASE_PROJECT_ID: env.VITE_FIREBASE_PROJECT_ID,
        VITE_FIREBASE_STORAGE_BUCKET: env.VITE_FIREBASE_STORAGE_BUCKET,
        VITE_FIREBASE_MESSAGING_SENDER_ID:
          env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        VITE_FIREBASE_APP_ID: env.VITE_FIREBASE_APP_ID,
        VITE_FIREBASE_MEASUREMENT_ID: env.VITE_FIREBASE_MEASUREMENT_ID,
      }),
    ],
  };
});
