import { createTheme, createMixin } from '..';

export const { connectStyle } = createTheme({
  colors: {
    white: '#efefef',
    black: '#222222',
    red: '#f03134'
  },
  serifFont: 'Andale Mono, Georgia, "Times New Roman", serif',
  containerStyle: createMixin({
    padding: 20,
    fontFamily: 'helvetica'
  })
});
