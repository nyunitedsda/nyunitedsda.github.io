import { Controls, Description, Primary, Stories, Subtitle, Title } from '@storybook/blocks';
import type { Preview } from '@storybook/react';
import React from 'react';
import AppProviderTest from '../src/components/AppProvider/AppProviderTest';


const preview: Preview = {
  globals: {
    theme: 'light',
    pageLayout: 'default',
  },

  decorators: [
    // 👇 Defining the decorator in the preview file applies it to all stories
    (Story, context) =>
      React.createElement(
        AppProviderTest,
        null,
        React.createElement(Story, context.args),
      ),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      components: {
        Title,
        Subtitle,
        Description,
        Primary,
        Controls,
        Stories,
      },
      defaultName: 'Documentation',
      toc: { 
        
        title: 'Table Of Content',
      }, // 👈 Enables the table of contents      
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;