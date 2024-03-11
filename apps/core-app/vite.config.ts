import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { internalIpV4Sync } from "internal-ip";
import { defineConfig } from "vite";

export default () => {
  const hostAddress = internalIpV4Sync();

  return defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
      host: hostAddress,
      port: 5173,
      hmr: {
        protocol: "ws",
        port: 1421,
        host: hostAddress,
      },
    },
    build: {
      sourcemap: true,
    },
  });
};
