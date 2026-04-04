import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const port = Number(env.PORT || 5173);
  const httpsEnabled = env.HTTPS === 'true';

  return {
    plugins: [react()],
    server: {
      port,
      ...(httpsEnabled ? { https: {} } : {}),
      strictPort: true,
      allowedHosts: ['localhost', 'host.docker.internal', 'frontend'],
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './vitest.setup.ts',
    },
  };
});
