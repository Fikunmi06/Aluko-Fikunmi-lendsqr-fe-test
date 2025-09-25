// src/pages/SignUp/SignUp.tsx
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Link, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LendsqrLogo from '../components/icons/LendsqrLogo.jsx';
import theme from '../theme';

const PageContainer = styled(Box)({
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

const Title = styled(Typography)({
  fontFamily: 'Avenir Next, Arial, sans-serif',
  fontSize: '40px',
  fontWeight: 700,
  letterSpacing: '-1.60px',
  color: '#213F7D',
  marginBottom: '10px',
});

const SubTitle = styled(Typography)({
  fontFamily: 'Avenir Next, Arial, sans-serif',
  fontSize: '20px',
  fontWeight: 400,
  color: '#545F7D',
  marginBottom: '50px',
});

const StyledTextField = styled(TextField)({
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
});

const PrimaryButton = styled(Button)({
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
  marginTop: '10px',
  '&:hover': {
    backgroundColor: '#2BB8B6',
  },
});

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Add this function
const extractNameFromEmail = (email: string, fullName: string) => {
  if (fullName.trim()) {
    const names = fullName.trim().split(' ');
    return {
      firstName: names[0] || 'User',
      lastName: names.slice(1).join(' ') || 'Account',
      username: names.join('').toLowerCase() || email.split('@')[0]
    };
  }
  
  const emailPrefix = email.split('@')[0];
  const names = emailPrefix.split('.');
  return {
    firstName: names[0] ? names[0].charAt(0).toUpperCase() + names[0].slice(1) : 'User',
    lastName: names[1] ? names[1].charAt(0).toUpperCase() + names[1].slice(1) : 'Account',
    username: emailPrefix
  };
};

export default function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const resetErrors = () => {
    setEmailError(null);
    setPasswordError(null);
    setConfirmError(null);
    setGeneralError(null);
  };

  // Replace the existing handleSubmit with this one:
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetErrors();

    let hasError = false;

    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address');
      hasError = true;
    }
    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    }
    if (password !== confirmPassword) {
      setConfirmError('Passwords do not match');
      hasError = true;
    }

    if (hasError) return;

    setIsLoading(true);

    try {
      const nameInfo = extractNameFromEmail(email, fullName);
      
      const userData = {
        fullName: fullName || `${nameInfo.firstName} ${nameInfo.lastName}`,
        firstName: nameInfo.firstName,
        lastName: nameInfo.lastName,
        username: nameInfo.username,
        email: email.toLowerCase(),
        password: password,
        createdAt: new Date().toISOString(),
        status: 'Active',
        organization: 'Lendsqr',
        phone: `080${Math.floor(10000000 + Math.random() * 90000000)}`,
        dateJoined: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      // Check if user already exists
      const existingUser = localStorage.getItem(`registered:${email.toLowerCase()}`);
      if (existingUser) {
        setGeneralError('User with this email already exists');
        setIsLoading(false);
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

      // Save to registered users
      localStorage.setItem(`registered:${email.toLowerCase()}`, JSON.stringify(userData));
      
      // Also add to users list for dashboard
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const newUser = {
        id: existingUsers.length + 1,
        ...userData
      };
      localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));
      
      localStorage.setItem('token', 'mock-token');
      localStorage.setItem('currentUser', JSON.stringify(userData));
      
      navigate('/dashboard');
    } catch (error) {
      setGeneralError('An error occurred during signup. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <PageContainer>
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
          <FormContainer>
            <Box>
              <Title>Create your account</Title>
              <SubTitle>Enter details to sign up.</SubTitle>

              {generalError && (
                <Typography color="error" sx={{ mb: 2 }}>
                  {generalError}
                </Typography>
              )}

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <StyledTextField
                  fullWidth
                  placeholder="Full name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                <StyledTextField
                  fullWidth
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
                  error={!!passwordError}
                  helperText={passwordError || ''}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Typography
                          sx={{ color: '#39CDCC', fontWeight: 600, fontSize: '12px', letterSpacing: '1.20px', cursor: 'pointer', userSelect: 'none', textTransform: 'uppercase' }}
                          onClick={() => setShowPassword((s) => !s)}
                        >
                          {showPassword ? 'HIDE' : 'SHOW'}
                        </Typography>
                      </InputAdornment>
                    ),
                  }}
                />
                <StyledTextField
                  fullWidth
                  placeholder="Confirm password"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  error={!!confirmError}
                  helperText={confirmError || ''}
                />

                <PrimaryButton 
                  type="submit" 
                  variant="contained"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Sign Up'}
                </PrimaryButton>

                <Typography sx={{ mt: 2 }}>
                  Already have an account?{' '}
                  <Link component={RouterLink} to="/login" underline="always" sx={{ fontWeight: 600 }}>
                    Log In
                  </Link>
                </Typography>
              </Box>
            </Box>
          </FormContainer>
        </RightSection>
      </PageContainer>
    </ThemeProvider>
  );
}