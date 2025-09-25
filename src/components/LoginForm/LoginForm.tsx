import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  InputAdornment,
  Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const FormContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0px 15px 90px rgba(0, 0, 0, 0.03)',
  width: '100%',
  height: '100%',
  padding: '0 128px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    padding: '60px 40px',
    height: 'auto',
    minHeight: '100vh',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '40px 24px',
  },
}));

const WelcomeTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Avenir Next, Arial, sans-serif',
  fontSize: '40px',
  fontWeight: 700,
  letterSpacing: '-1.60px',
  color: '#213F7D',
  marginBottom: '10px',
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Avenir Next, Arial, sans-serif',
  fontSize: '20px',
  fontWeight: 400,
  color: '#545F7D',
  marginBottom: '50px',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: '24px',
  '& .MuiOutlinedInput-root': {
    height: '50px',
    borderRadius: '5px',
    border: '2px solid rgba(84, 95, 125, 0.15)',
    backgroundColor: 'transparent',
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: 'none',
    },
    '&.Mui-focused fieldset': {
      border: 'none',
    },
    '& input': {
      fontFamily: 'Avenir Next, Arial, sans-serif',
      fontSize: '14px',
      fontWeight: 400,
      color: '#545F7D',
      padding: '16px 14px',
      '&::placeholder': {
        fontFamily: 'Avenir Next, Arial, sans-serif',
        fontSize: '14px',
        fontWeight: 400,
        color: '#545F7D',
        opacity: 0.6,
      },
    },
  },
  '& .MuiInputLabel-root': {
    display: 'none',
  },
}));

const LoginButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#39CDCC',
  color: '#FFFFFF',
  fontFamily: 'Avenir Next, Arial, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  letterSpacing: '1.40px',
  textTransform: 'uppercase',
  borderRadius: '5px',
  height: '48px',
  width: '100%',
  marginTop: '30px',
  '&:hover': {
    backgroundColor: '#2BB8B6',
  },
}));

const ForgotPasswordLink = styled(Link)(({ theme }) => ({
  fontFamily: 'Avenir Next, Arial, sans-serif',
  fontSize: '12px',
  fontWeight: 600,
  letterSpacing: '1.20px',
  textTransform: 'uppercase',
  color: '#39CDCC',
  textDecoration: 'none',
  cursor: 'pointer',
  marginTop: '24px',
  marginBottom: '30px',
  display: 'block',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const ShowPasswordText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Avenir Next, Arial, sans-serif',
  fontSize: '12px',
  fontWeight: 600,
  letterSpacing: '1.20px',
  textTransform: 'uppercase',
  color: '#39CDCC',
  cursor: 'pointer',
  userSelect: 'none',
}));

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const resetErrors = () => {
    setEmailError(null);
    setPasswordError(null);
    setGeneralError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    resetErrors();

    let hasError = false;
    const emailKey = email.trim().toLowerCase();
    if (!isValidEmail(emailKey)) {
      setEmailError('Please enter a valid email address');
      hasError = true;
    }
    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    }
    if (hasError) return;

    const localUserRaw = localStorage.getItem(`registered:${emailKey}`) ?? localStorage.getItem(`registered:${email}`);

    if (!localUserRaw) {
      setGeneralError('User does not exist. Please sign up to continue.');
      return;
    }

    try {
      const localUser = JSON.parse(localUserRaw) as { email?: string; fullName?: string; password?: string };
      if (!localUser.password || localUser.password !== password) {
        setPasswordError('Incorrect password for this email');
        return;
      }
    } catch {
      setGeneralError('There is an issue with your account data. Please sign up again.');
      return;
    }

    localStorage.setItem('token', 'mock-token');
    navigate('/dashboard');
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormContainer>
      <Box>
        <WelcomeTitle>
          Welcome!
        </WelcomeTitle>
        <SubTitle>
          Enter details to login.
        </SubTitle>

        {generalError && (
          <Typography color="error" sx={{ mb: 2 }}>
            {generalError}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <StyledTextField
            fullWidth
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            variant="outlined"
            error={!!emailError}
            helperText={emailError || ''}
          />

          <StyledTextField
            fullWidth
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            variant="outlined"
            error={!!passwordError}
            helperText={passwordError || ''}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <ShowPasswordText onClick={handleTogglePassword}>
                    SHOW
                  </ShowPasswordText>
                </InputAdornment>
              ),
            }}
          />

          <ForgotPasswordLink component={RouterLink} to="/signup">
            Sign Up
          </ForgotPasswordLink>

          <LoginButton
            type="submit"
            variant="contained"
          >
            Sign In
          </LoginButton>

          <Typography sx={{ mt: 2 }}>
            Don’t have an account?{' '}
            <Link href="/signup" underline="always" sx={{ fontWeight: 600 }}>
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>
    </FormContainer>
  );
}