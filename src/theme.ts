import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minWidth: 90,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: '16px'
        }
      }
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '16px',
          paddingTop: '16px !important'
        },
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          color: 'black',
          margin: '1em 0'
        }
      }
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          marginTop: '16px',
          padding: '8px'
        }
      }
    }
  },
});

export default theme;
