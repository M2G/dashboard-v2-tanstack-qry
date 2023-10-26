import path from "path";
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

import packageJson from "./package.json";

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    define: {
      "process.env": {},
      "import.meta.env.PACKAGE_VERSION": JSON.stringify(packageJson.version),
    },
    plugins: [
      react(),
      svgr(),
    ],
    publicDir: "public",
    resolve: {
      alias: {
        "@types": path.resolve(__dirname, "./src/@types"),
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 3002,
    },
    preview: {
      port: 3002,
    },
  };
});
