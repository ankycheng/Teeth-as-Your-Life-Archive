import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
  build: {
    outDir: "./dist",
  },
  // base: '/Teeth-as-Your-Life-Archive/'
  base: '/'
});
