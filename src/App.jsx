// import the react-json-view component

import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Main } from './screens/main';
import './defaults.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#81A1C1',
      dark: '#5E81AC',
      light: '#88C0D0',
      contrastText: '#2E3440',
    },
    secondary: {
      main: '#434C5E',
      dark: '#2E3440',
      light: '#4C566A',
      contrastText: '#D8DEE9',
    },
    background: { default: '#2E3440', paper: '#4C566A' },
    text: { primary: '#ECEFF4', secondary: '#D8DEE9', disabled: '#4C566A' },
    warning: { main: '#D08770' },
    error: { main: '#BF616A' },
    success: { main: '#A3BE8C' },
    common: { black: '#2E3440', white: '#D8DEE9' },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  );
}

export default App;
