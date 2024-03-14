import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { internalIpV4 } from "internal-ip";
import { defineConfig } from "vite";

const mobile = !!/android|ios/.exec(process.env.TAURI_ENV_PLATFORM);

export default defineConfig(async () => {
  return defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
      port: 1420,
      strictPort: true,
      host: mobile ? "0.0.0.0" : false,
      hmr: mobile
        ? {
            protocol: "ws",
            host: await internalIpV4(),
            port: 1421,
          }
        : undefined,
      watch: {
        ignored: ["**/src-tauri/**"],
      },
    },
    build: {
      sourcemap: true,
    },
  });
});
