import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createTheme } from '@mui/system';

const theme = createTheme({
  components: {
    // Name of the component
    MuiInput: {
      styleOverrides: {
        root: {
          color: 'white'
        },
      }
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          color: 'white'
        },
      },
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
