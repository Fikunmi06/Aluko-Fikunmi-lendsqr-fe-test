import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#39CDCC',
    },
    secondary: {
      main: '#213F7D',
    },
    text: {
      primary: '#213F7D',
      secondary: '#545F7D',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    grey: {
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
    },
  },
  typography: {
    fontFamily: 'Avenir Next, Arial, sans-serif',
    h1: {
      fontSize: '40px',
      fontWeight: 700,
      letterSpacing: '-1.60px',
      color: '#213F7D',
    },
    h2: {
      fontSize: '20px',
      fontWeight: 400,
      color: '#545F7D',
    },
    body1: {
      fontSize: '14px',
      fontWeight: 400,
      color: '#545F7D',
    },
    body2: {
      fontSize: '12px',
      fontWeight: 600,
      letterSpacing: '1.20px',
      textTransform: 'uppercase',
      color: '#39CDCC',
    },
    button: {
      fontSize: '14px',
      fontWeight: 600,
      letterSpacing: '1.40px',
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 5,
  },
  shadows: [
    'none',
    '0px 15px 90px rgba(0, 0, 0, 0.03)',
    '0px 2px 4px rgba(0, 0, 0, 0.1)',
    '0px 4px 8px rgba(0, 0, 0, 0.12)',
    '0px 8px 16px rgba(0, 0, 0, 0.14)',
    '0px 16px 32px rgba(0, 0, 0, 0.16)',
    '0px 24px 48px rgba(0, 0, 0, 0.18)',
    '0px 32px 64px rgba(0, 0, 0, 0.20)',
    '0px 40px 80px rgba(0, 0, 0, 0.22)',
    '0px 48px 96px rgba(0, 0, 0, 0.24)',
    '0px 56px 112px rgba(0, 0, 0, 0.26)',
    '0px 64px 128px rgba(0, 0, 0, 0.28)',
    '0px 72px 144px rgba(0, 0, 0, 0.30)',
    '0px 80px 160px rgba(0, 0, 0, 0.32)',
    '0px 88px 176px rgba(0, 0, 0, 0.34)',
    '0px 96px 192px rgba(0, 0, 0, 0.36)',
    '0px 104px 208px rgba(0, 0, 0, 0.38)',
    '0px 112px 224px rgba(0, 0, 0, 0.40)',
    '0px 120px 240px rgba(0, 0, 0, 0.42)',
    '0px 128px 256px rgba(0, 0, 0, 0.44)',
    '0px 136px 272px rgba(0, 0, 0, 0.46)',
    '0px 144px 288px rgba(0, 0, 0, 0.48)',
    '0px 152px 304px rgba(0, 0, 0, 0.50)',
    '0px 160px 320px rgba(0, 0, 0, 0.52)',
    '0px 168px 336px rgba(0, 0, 0, 0.54)',
  ],
});

export default theme;