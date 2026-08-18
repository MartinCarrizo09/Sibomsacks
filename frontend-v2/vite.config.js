import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  build: { outDir: "dist" },
  server: {
    // El backend Express corre en :3000 y sirve /api/*
    proxy: { "/api": "http://localhost:3000" },
  },
});
