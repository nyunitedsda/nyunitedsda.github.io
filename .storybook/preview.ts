import type { Preview } from '@storybook/react';
import React from 'react';
import AppProvider from '../src/components/AppProvider/AppProvider';

const preview: Preview = {
  globals: {
    theme: 'light',
    pageLayout: 'default',
  },

  decorators: [
    // 👇 Defining the decorator in the preview file applies it to all stories
    (Story, context) =>
      React.createElement(
        AppProvider,
        null,
        React.createElement(Story, context.args),
      ),
  ],
  tags: ['autodocs']
};

export default preview;