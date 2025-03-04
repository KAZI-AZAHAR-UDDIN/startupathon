import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: "../backend/public", // Build inside the backend folder
    emptyOutDir: true, // ✅ Ensure old files are removed
    write: true, // ✅ Ensures Vite writes the files
  },
});
