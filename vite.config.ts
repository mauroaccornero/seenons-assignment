import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import mockServer from "vite-plugin-mock-server";

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    mockServer({
      logLevel: "info",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
