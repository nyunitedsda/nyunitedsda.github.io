import { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: [
    // '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  build: {
    test: {
      //  disableSourcemaps: false,
      //  disableTreeShaking: false,
    }
  },
  staticDirs: ['../public', '../static'],
  addons: ['@storybook/addon-links', 'storybook-addon-mock', '@storybook/addon-docs'],
  core: {
    disableTelemetry: true,
  },
  docs: {
    defaultName: 'Documentation'
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    check: false,
  },
};

export default config;


