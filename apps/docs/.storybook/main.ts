/** @type { import('@storybook/react-vite').StorybookConfig } */
import path from "path";

const config = {
  stories: ["../**/*.mdx", "../**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../public"],
  async viteFinal(config, { configType }) {
    // customize the Vite config here
    return {
      ...config,
      resolve: {
        alias: [
          {
            find: "ui",
            replacement: path.resolve(__dirname, "../../../packages/ui/"),
          },
        ],
      },
    };
  },
};

export default config;
