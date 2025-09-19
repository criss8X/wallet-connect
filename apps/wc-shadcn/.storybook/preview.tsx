/** biome-ignore-all lint/correctness/noUnusedImports: false positive */
import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview, ReactRenderer } from "@storybook/react-vite";
import "../src/styles/styles.css";
import React from "react";
import { Providers } from "../src/sections/providers";

const preview: Preview = {
	parameters: {},
	decorators: [
		withThemeByClassName<ReactRenderer>({
			themes: {
				light: "",
				dark: "dark",
			},

			defaultTheme: "light",
		}),
		(Story) => (
			<Providers>
				<Story />
			</Providers>
		),
	],
};

export default preview;
