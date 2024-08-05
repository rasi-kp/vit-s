import { createTheme } from '@mui/material/styles';

const adminTheme = createTheme({
  palette: {
    primary: {
      main: '#FFEB3B', // Yellow
    },
    secondary: {
      main: '#FFFFFF', // White
    },
  },
  typography: {
    fontFamily: 'Fira Sans',
    button: {
      textTransform: 'none',
    },
  },
});

export default adminTheme;
