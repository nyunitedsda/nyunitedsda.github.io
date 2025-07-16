import { Controls, Description, Primary, Stories, Subtitle, Title } from '@storybook/blocks';
import type { Preview } from '@storybook/react';
import React from 'react';
import DynamicProvider from '../src/test/ProviderWrapper';
import GlobalNavigationProvider from './GlobalNavigationProvider';
import globalMockConfigs from './mockAddonConfigs';


const preview: Preview = {
  initialGlobals: {
    theme: 'light',
    pageLayout: 'default',
  },

  decorators: [
    // Global navigation provider for addon-links integration
    (Story, context) => {
      // ExcludeProviders from context (parameters or args), always exclude 'Router' by default
      const contextExcludes = context.parameters?.excludeProviders || context.args?.excludeProviders || [];
      const excludeProviders = Array.from(new Set(["Router", ...contextExcludes]));

      return React.createElement(
        GlobalNavigationProvider,
        { context },
        React.createElement(
          DynamicProvider,
          { excludeProviders },
          React.createElement(Story, context.args)
        )
      );
    },
  ],
  tags: ['autodocs'],
  parameters: {
    globalMockConfigs, // Mock configurations for API responses
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