import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({ include: /\.(mdx|js|jsx|ts|tsx)$/ })],
  build: {
    outDir: "./dist",
  },
  resolve: {
    alias: {
      "~n_m": path.resolve(__dirname, "node_modules"),
    },
  },
});
