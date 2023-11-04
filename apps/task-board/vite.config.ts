import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// host on local network

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
  },
});
