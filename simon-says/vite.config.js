import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
	base: "/maria2721-JSFE2024Q4/simon-says/",
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
			},
		},
		minify: false,
		sourcemap: true,
	},
	server: {
		open: true,
		port: 3000,
	},
});
