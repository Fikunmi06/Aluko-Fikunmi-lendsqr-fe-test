// src/pages/Dashboard/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import UsersTable from '../components/UsersTable/Userstable';
import theme from '../theme'; //     Fixed import path
import DashboardLayout from '../components/Layout/DashboardLayout';

const StatCard = styled(Card)({
  background: '#FFFFFF',
  borderRadius: '4px',
  border: '1px solid rgba(33, 63, 125, 0.06)',
  boxShadow: '3px 5px 20px 0px rgba(0, 0, 0, 0.04)',
  height: '160px',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

const StatIcon = styled(Box)<{ bgcolor: string }>(({ bgcolor }) => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  background: bgcolor,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '14px',
}));

const StatValue = styled(Typography)({
  fontSize: '24px',
  fontWeight: 600,
  color: '#213F7D',
  fontFamily: 'Avenir Next, sans-serif',
  marginBottom: '4px',
});

const StatTitle = styled(Typography)({
  fontSize: '14px',
  fontWeight: 500,
  color: '#545F7D',
  fontFamily: 'Avenir Next, sans-serif',
  textTransform: 'uppercase',
});

const SearchContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '24px',
  gap: '16px',
  flexWrap: 'wrap',
});

const SearchField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: '#FFFFFF',
    '& input': {
      padding: '12px 16px',
      fontFamily: 'Avenir Next, sans-serif',
    },
  },
  minWidth: '300px',
});

interface UserStats {
  totalUsers: number;
  activeUsers: number;
  usersWithLoans: number;
  usersWithSavings: number;
}

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [userStats, setUserStats] = useState<UserStats>({
    totalUsers: 0,
    activeUsers: 0,
    usersWithLoans: 0,
    usersWithSavings: 0,
  });

  useEffect(() => {
    const calculateStats = () => {
      try {
        const usersData = localStorage.getItem('users');
        let users = [];
        
        if (usersData) {
          users = JSON.parse(usersData);
        } else {
          users = Array.from({ length: 500 }, (_, i) => ({
            id: i + 1,
            status: ['Active', 'Inactive', 'Pending', 'Blacklisted'][i % 4],
            hasLoans: i % 3 === 0,
            hasSavings: i % 2 === 0,
          }));
        }

        const stats = {
          totalUsers: users.length,
          activeUsers: users.filter((user: any) => user.status === 'Active').length,
          usersWithLoans: users.filter((user: any) => user.hasLoans).length,
          usersWithSavings: users.filter((user: any) => user.hasSavings).length,
        };

        setUserStats(stats);
      } catch (error) {
        console.error('Error calculating stats:', error);
        setUserStats({
          totalUsers: 2453,
          activeUsers: 2453,
          usersWithLoans: 12453,
          usersWithSavings: 102453,
        });
      }
    };

    calculateStats();
  }, []);

  const statCards = [
    {
      title: 'USERS',
      value: userStats.totalUsers.toLocaleString(),
      icon: '👥',
      color: '#DF18FF',
      bgColor: 'rgba(223, 24, 255, 0.1)',
    },
    {
      title: 'ACTIVE USERS',
      value: userStats.activeUsers.toLocaleString(),
      icon: '✅',
      color: '#5718FF',
      bgColor: 'rgba(87, 24, 255, 0.1)',
    },
    {
      title: 'USERS WITH LOANS',
      value: userStats.usersWithLoans.toLocaleString(),
      icon: '💰',
      color: '#F55F44',
      bgColor: 'rgba(245, 95, 68, 0.1)',
    },
    {
      title: 'USERS WITH SAVINGS',
      value: userStats.usersWithSavings.toLocaleString(),
      icon: '🏦',
      color: '#FF3366',
      bgColor: 'rgba(255, 51, 102, 0.1)',
    },
  ];

  return (
    <DashboardLayout>
      <Box sx={{ p: 3 }}>
        <SearchContainer>
          <Typography variant="h1" sx={{ 
            fontSize: '24px', 
            fontWeight: 500, 
            color: '#213F7D',
            fontFamily: 'Avenir Next, sans-serif'
          }}>
            Users
          </Typography>
          
          <SearchField
            placeholder="Search for anything..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#545F7D' }} />
                </InputAdornment>
              ),
            }}
          />
        </SearchContainer>
        
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {statCards.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <StatCard>
                <StatIcon bgcolor={stat.bgColor}>
                  <span style={{ color: stat.color, fontSize: '20px' }}>{stat.icon}</span>
                </StatIcon>
                <StatTitle>{stat.title}</StatTitle>
                <StatValue>{stat.value}</StatValue>
              </StatCard>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ background: 'white', borderRadius: '4px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <UsersTable searchTerm={searchTerm} />
        </Box>
      </Box>
    </DashboardLayout>
  );
}