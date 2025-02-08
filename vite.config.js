import { defineConfig } from "vite";

export default defineConfig({
	base: "/simon-says/",
	build: {
		minify: false,
		terserOptions: {
			compress: false,
			mangle: false,
		},
	},
});
