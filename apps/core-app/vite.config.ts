import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { internalIpV4 } from "internal-ip";
import { defineConfig } from "vite";
import { qrcode } from "vite-plugin-qrcode";

const mobile = !!/android|ios/.exec(process.env.TAURI_ENV_PLATFORM);
const USE_BASIC_CONFIG = true;

export default defineConfig(async () => {
  return defineConfig({
    plugins: [react(), tailwindcss(), qrcode()],
    server: USE_BASIC_CONFIG ? getBasicConfig() : await getTauriConfig(),
    build: { sourcemap: true },
  });
});

const getBasicConfig = () => {
  return {
    port: 5173,
    host: true,
  };
};

const getTauriConfig = async () => {
  return {
    port: 1420,
    strictPort: true,
    host: mobile ? "0.0.0.0" : true,
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
  };
};
