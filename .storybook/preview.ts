import { Controls, Description, Primary, Stories, Subtitle, Title } from '@storybook/addon-docs/blocks';
import type { Preview } from '@storybook/react-vite';
import { initialize, mswLoader } from 'msw-storybook-addon';
import React from 'react';
import DynamicProvider from '../src/test/ProviderWrapper';
import GlobalNavigationProvider from './GlobalNavigationProvider';
import handlers from './helpers/handlers';
import globalMockConfigs from './mockAddonConfigs';

initialize();

const preview: Preview = {
  initialGlobals: {
    theme: 'light',
    pageLayout: 'default',
  },
  loaders: [
    async (...args) => {
      // Call the default mswLoader
      await mswLoader(...args);
      // Set global Authorization header for all requests
      if (window && window.fetch) {
        const originalFetch = window.fetch;
        window.fetch = (input, init = {}) => {
          console.log('Intercepting fetch request:', input, init);
          if (!init.headers) init.headers = {};
          // Set the mock token
          init.headers = {
            ...init.headers,
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGVfaWQiOjMsImlhdCI6MTc1NDE2NjcxMSwiZXhwIjoxNzU0MTcwMzExLCJhdWQiOiJueXVuaXRlZHNkYS1hcHAiLCJpc3MiOiJueXVuaXRlZHNkYS1hcGkifQ.CctMZHQpnXgRXTKltECTiT0pRj_uTlPkvjNF1E2srjY',
          };

          console.log('Mocked fetch request:', input, init);
          return originalFetch(input, init);
        };
      }
    },
  ],
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
    msw: {
      handlers,
    },
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