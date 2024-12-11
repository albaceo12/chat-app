import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "https://chat-app-realtime-9xh8.onrender.com/",
  plugins: [react()],
  server: {
    port: 5000,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
      },
    },
  },
});
