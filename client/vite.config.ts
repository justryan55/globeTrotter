import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["avvvatars-react"],
  },
  server: {
    proxy: {
      "/api": "https://travel-project-eight-phi.vercel.app/",
    },
    host: true,
    port: 3000,
    watch: {
      usePolling: true,
    },
  },
});
