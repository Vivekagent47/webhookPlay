import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    extensions: ["", ".js", ".jsx", ".ts", ".tsx", ".css"],
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
});
