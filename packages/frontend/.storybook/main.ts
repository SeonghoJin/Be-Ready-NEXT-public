import type { StorybookConfig, Options } from '@storybook/core-common';
import path from 'path';

const config: StorybookConfig = {
  core: { builder: 'webpack5' },
  stories: [
    '../components/**/*.stories.mdx',
    '../components/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-essentials',

    '@nrwl/react/plugins/storybook',

    'storybook-addon-swc',
    {
      name: 'storybook-addon-next',
      options: {
        nextConfigPath: path.resolve(__dirname, '../next.config.js'),
      },
    },
  ],
  webpackFinal: async (config, { configType }: Options) => {
    // apply any global webpack configs that might have been specified in .storybook/main.ts

    // add your own webpack tweaks if needed

    return config;
  },
};

module.exports = config;
