import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { copy } from "vite-plugin-copy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    copy({
      targets: [{ src: "public/manifest.json", dest: "dist" }],
    }),
  ],
  server: {
    host: "0.0.0.0",
  },
});
