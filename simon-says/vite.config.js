import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
	base: "/",
	build: {
		minify: false,
		terserOptions: {
			compress: false,
			mangle: false,
		},
	},
});
