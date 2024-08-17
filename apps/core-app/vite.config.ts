// import { internalIpV4 } from "internal-ip";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { qrcode } from "vite-plugin-qrcode";

export default defineConfig(async (data) => {
  const pwaPlugin = data.mode === "dev" ? null : VitePWA(pwaOptions);

  return defineConfig({
    plugins: [react(), qrcode(), pwaPlugin],
    build: { sourcemap: true },
    server: {
      port: 5173,
      host: true,
    },
  });
});

// const mobile = !!/android|ios/.exec(process.env.TAURI_ENV_PLATFORM);

// const getTauriConfig = async () => {
//   return {
//     port: 1420,
//     strictPort: true,
//     host: mobile ? "0.0.0.0" : true,
//     hmr: mobile
//       ? {
//           protocol: "ws",
//           host: await internalIpV4(),
//           port: 1421,
//         }
//       : undefined,
//     watch: {
//       ignored: ["**/src-tauri/**"],
//     },
//   };
// };

const pwaOptions: Parameters<typeof VitePWA>[0] = {
  devOptions: { enabled: false },
  registerType: "prompt",
  manifest: {
    name: "React-vite-app",
    short_name: "react-vite-app",
    description: "I am a simple vite app",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "favicon",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "favicon",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "apple touch icon",
      },
      {
        src: "/maskable_icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    theme_color: "#171717",
    background_color: "#f0e7db",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
};
