import type { Preview } from '@storybook/react';
import React from 'react';
import AppProvider from '../src/components/AppProvider/AppProvider';

const preview: Preview = {
  args: {
    theme: 'light', // Default theme
    pageLayout: 'default', // Default page layout
    
  },

  decorators: [
    // 👇 Defining the decorator in the preview file applies it to all stories
    (Story, { parameters }) => {
      // 👇 Make it configurable by reading from parameters
      const { pageLayout } = parameters;
      switch (pageLayout) {
        case 'page':
          // Your page layout is probably a little more complex than this ;)
          return React.createElement('div', { className: 'page-layout' }, React.createElement(Story));
        case 'page-mobile':
          return React.createElement('div', { className: 'page-mobile-layout' }, React.createElement(Story));
        default:
          // In the default case, don't apply a layout
          return React.createElement(AppProvider, null, React.createElement(Story));
      }
    },
  ],

  tags: ['autodocs']
};

export default preview;