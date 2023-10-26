import '../src/styles/index.scss';

export const parameters = {
  backgrounds: {
    default: 'light',
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const globalTypes = {};
