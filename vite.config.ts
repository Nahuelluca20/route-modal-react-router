/* eslint-disable @typescript-eslint/ban-ts-comment */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "remote",
      filename: "remoteEntry.js",
      remotes: {
        host: "http://localhost:5173/assets/remoteEntry.js",
      },
      exposes: {
        "./routes": "./src/routes/remoteRoutes",
      },
      shared: [
        "react",
        "react-dom",
        "react-router-dom",
        "react-bootstrap",
        "bootstrap",
      ],
    }),
  ],
  server: {
    port: 3001,
  },
  build: {
    target: "esnext",
  },
});
