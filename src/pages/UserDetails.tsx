// src/pages/UserDetails/UserDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Divider,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import DashboardLayout from '../components/Layout/DashboardLayout';
import { generateDetailedUser, DetailedUser } from '../utils/mockDataGenerator';

const DetailCard = styled(Card)({
  marginBottom: '24px',
  borderRadius: '4px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
});

const SectionTitle = styled(Typography)({
  fontSize: '16px',
  fontWeight: 500,
  color: '#213F7D',
  marginBottom: '16px',
});

const InfoGrid = styled(Grid)({
  marginBottom: '24px',
});

const InfoItem = styled(Box)({
  marginBottom: '16px',
});

const InfoLabel = styled(Typography)({
  fontSize: '12px',
  fontWeight: 400,
  color: '#545F7D',
  textTransform: 'uppercase',
  marginBottom: '4px',
});

const InfoValue = styled(Typography)({
  fontSize: '16px',
  fontWeight: 500,
  color: '#213F7D',
});

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<DetailedUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    // Check localStorage first
    const stored = localStorage.getItem(`user:${id}`);
    if (stored) {
      setUser(JSON.parse(stored));
      setLoading(false);
      return;
    }

    // Generate detailed user data based on ID
    setTimeout(() => {
      const userId = parseInt(id);
      if (userId >= 1 && userId <= 500) {
        const mockUser = generateDetailedUser(userId);
        setUser(mockUser);
        // Save to localStorage for future visits
        localStorage.setItem(`user:${id}`, JSON.stringify(mockUser));
      } else {
        setUser(null);
      }
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleSave = () => {
    if (user) {
      localStorage.setItem(`user:${id}`, JSON.stringify(user));
      alert('User details saved to localStorage!');
    }
  };

  const handleBack = () => {
    navigate('/users');
  };

  if (loading) {
    return (
      <DashboardLayout>
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <Typography>Loading user details...</Typography>
        </Box>
      </DashboardLayout>
    );
  }

  if (!user) {
    return (
      <DashboardLayout>
        <Box sx={{ p: 3 }}>
          <Typography color="error">User not found</Typography>
          <Button onClick={handleBack} sx={{ mt: 2 }}>
            Back to Users
          </Button>
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Box sx={{ p: 3 }}>
        <Button startIcon={<ArrowBack />} onClick={handleBack} sx={{ mb: 3 }}>
          Back to Users
        </Button>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h1" sx={{ fontSize: '24px', fontWeight: 500 }}>
            User Details
          </Typography>
          <Box>
            <Button variant="outlined" sx={{ mr: 2 }} color="error">
              BLACKLIST USER
            </Button>
            <Button variant="outlined" color="primary">
              ACTIVATE USER
            </Button>
          </Box>
        </Box>

        {/* User Summary Card */}
        <DetailCard>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 3 }}>
              <Box sx={{ 
                width: 80, 
                height: 80, 
                borderRadius: '50%', 
                bgcolor: 'rgba(223, 24, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                color: '#213F7D',
              }}>
                {user.fullName.split(' ').map(n => n[0]).join('')}
              </Box>
              <Box sx={{ flex: 1, minWidth: '200px' }}>
                <Typography variant="h4" sx={{ fontWeight: 500, mb: 1, fontSize: '22px' }}>
                  {user.fullName}
                </Typography>
                <Typography color="textSecondary">{user.username}</Typography>
              </Box>
              <Box sx={{ textAlign: 'center', minWidth: '100px' }}>
                <Typography variant="body2" color="textSecondary">User's Tier</Typography>
                <Typography variant="h6" color="#E9B200">Tier {user.tier}</Typography>
              </Box>
              <Box sx={{ minWidth: '150px' }}>
                <Typography variant="h5" color="#213F7D" sx={{ mb: 1, fontSize: '18px' }}>
                  {user.monthlyIncome}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {user.bvn} • {user.bankName}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              <Button variant="text" color="primary" sx={{ fontWeight: 600 }}>
                General Details
              </Button>
              <Button variant="text" color="textSecondary">
                Documents
              </Button>
              <Button variant="text" color="textSecondary">
                Bank Details
              </Button>
              <Button variant="text" color="textSecondary">
                Loans
              </Button>
              <Button variant="text" color="textSecondary">
                Savings
              </Button>
              <Button variant="text" color="textSecondary">
                App and System
              </Button>
            </Box>
          </CardContent>
        </DetailCard>

        {/* Detailed Information */}
        <DetailCard>
          <CardContent sx={{ p: 4 }}>
            <SectionTitle>Personal Information</SectionTitle>
            <InfoGrid container spacing={4}>
              <Grid item xs={12} md={6}>
                <InfoItem>
                  <InfoLabel>Full Name</InfoLabel>
                  <InfoValue>{user.fullName}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Phone Number</InfoLabel>
                  <InfoValue>{user.phone}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Email Address</InfoLabel>
                  <InfoValue>{user.email}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>BVN</InfoLabel>
                  <InfoValue>{user.bvn}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Gender</InfoLabel>
                  <InfoValue>{user.gender}</InfoValue>
                </InfoItem>
              </Grid>
              <Grid item xs={12} md={6}>
                <InfoItem>
                  <InfoLabel>Marital Status</InfoLabel>
                  <InfoValue>{user.maritalStatus}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Children</InfoLabel>
                  <InfoValue>{user.children}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Type of Residence</InfoLabel>
                  <InfoValue>{user.typeOfResidence}</InfoValue>
                </InfoItem>
              </Grid>
            </InfoGrid>

            <Divider sx={{ my: 3 }} />

            <SectionTitle>Education and Employment</SectionTitle>
            <InfoGrid container spacing={4}>
              <Grid item xs={12} md={6}>
                <InfoItem>
                  <InfoLabel>Level of Education</InfoLabel>
                  <InfoValue>{user.levelOfEducation}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Employment Status</InfoLabel>
                  <InfoValue>{user.employmentStatus}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Sector of Employment</InfoLabel>
                  <InfoValue>{user.sectorOfEmployment}</InfoValue>
                </InfoItem>
              </Grid>
              <Grid item xs={12} md={6}>
                <InfoItem>
                  <InfoLabel>Duration of Employment</InfoLabel>
                  <InfoValue>{user.durationOfEmployment}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Office Email</InfoLabel>
                  <InfoValue>{user.officialEmail}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Monthly Income</InfoLabel>
                  <InfoValue>{user.monthlyIncome}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Loan Repayment</InfoLabel>
                  <InfoValue>{user.loanRepayment}</InfoValue>
                </InfoItem>
              </Grid>
            </InfoGrid>

            <Divider sx={{ my: 3 }} />

            <SectionTitle>Socials</SectionTitle>
            <InfoGrid container spacing={4}>
              <Grid item xs={12} md={6}>
                <InfoItem>
                  <InfoLabel>Twitter</InfoLabel>
                  <InfoValue>{user.twitter}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Facebook</InfoLabel>
                  <InfoValue>{user.facebook}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Instagram</InfoLabel>
                  <InfoValue>{user.instagram}</InfoValue>
                </InfoItem>
              </Grid>
            </InfoGrid>

            <Divider sx={{ my: 3 }} />

            <SectionTitle>Guarantors</SectionTitle>
            {user.guarantors.map((guarantor, index) => (
              <Box key={index}>
                <InfoGrid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <InfoItem>
                      <InfoLabel>Full Name</InfoLabel>
                      <InfoValue>{guarantor.name}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>Phone Number</InfoLabel>
                      <InfoValue>{guarantor.phone}</InfoValue>
                    </InfoItem>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InfoItem>
                      <InfoLabel>Email Address</InfoLabel>
                      <InfoValue>{guarantor.email}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>Relationship</InfoLabel>
                      <InfoValue>{guarantor.relationship}</InfoValue>
                    </InfoItem>
                  </Grid>
                </InfoGrid>
                {index < user.guarantors.length - 1 && <Divider sx={{ my: 3 }} />}
              </Box>
            ))}
          </CardContent>
        </DetailCard>

        <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>
          Save to Local Storage
        </Button>
      </Box>
    </DashboardLayout>
  );
}