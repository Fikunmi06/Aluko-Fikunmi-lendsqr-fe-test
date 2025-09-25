import React from 'react';
import { Box, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import LoginForm from '../components/LoginForm/LoginForm';
import LendsqrLogo from '../components/icons/LendsqrLogo';
import theme from '../theme';

const LoginContainer = styled(Box)({
  width: '1440px',
  height: '900px',
  display: 'flex',
  backgroundColor: '#FFFFFF',
  margin: '0 auto',
  '@media (max-width: 1440px)': {
    width: '100vw',
    height: '100vh',
  },
});

const LeftSection = styled(Box)(({ theme }) => ({
  width: '736px',
  height: '900px',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  padding: '106px 0 0 97px',
  [theme.breakpoints.down('lg')]: {
    padding: '60px 0 0 40px',
  },
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const RightSection = styled(Box)(({ theme }) => ({
  width: '704px',
  height: '900px',
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'stretch',
  padding: 0,
  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: '100vh',
    padding: 0,
  },
}));

const IllustrationImage = styled('img')(({ theme }) => ({
  width: '600px',
  height: '338px',
  objectFit: 'cover',
  marginTop: '139px',
  [theme.breakpoints.down('lg')]: {
    width: '500px',
    height: '280px',
    marginTop: '100px',
  },
  [theme.breakpoints.down('md')]: {
    width: '400px',
    height: '224px',
    marginTop: '80px',
  },
}));

const LogoContainer = styled(Box)({
  marginBottom: 0,
});

export default function Login() {
  return (
    <ThemeProvider theme={theme}>
      <LoginContainer>
        <LeftSection>
          <LogoContainer>
            <LendsqrLogo width={174} height={36} />
          </LogoContainer>
          <IllustrationImage
            src="/images/login-illustration.png"
            alt="Login illustration with colorful geometric shapes"
          />
        </LeftSection>
        
        <RightSection>
          <LoginForm />
        </RightSection>
      </LoginContainer>
    </ThemeProvider>
  );
}