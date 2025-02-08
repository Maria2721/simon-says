import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
	base: "/maria2721-JSFE2024Q4/simon-says/",
	build: {
		minify: false,
		terserOptions: {
			compress: false,
			mangle: false,
		},
	},
});
