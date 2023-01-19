import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "/style/main.css"),
      name: "HTDesign",
    },
    minify: false,
  },
});
