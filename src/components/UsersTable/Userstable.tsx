// src/components/UsersTable/UsersTable.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Pagination,
  Chip,
  CircularProgress,
  FormControl,
  Select,
} from '@mui/material';
import { MoreVert, FilterList, Visibility } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledTable = styled(Table)({
  minWidth: 1200,
});

const StyledTableHead = styled(TableHead)({
  backgroundColor: '#EAEEF0',
});

const StyledTableCell = styled(TableCell)({
  fontFamily: 'Avenir Next, sans-serif',
  fontSize: '12px',
  fontWeight: 600,
  color: '#545F7D',
  textTransform: 'uppercase',
  borderBottom: '1px solid #EAEEF0',
  padding: '12px 16px',
});

const StyledTableRow = styled(TableRow)({
  '&:hover': {
    backgroundColor: 'rgba(33, 63, 125, 0.02)',
  },
});

const StatusChip = styled(Chip)<{ status: string }>(({ status }) => {
  const statusConfig = {
    Active: { bg: 'rgba(57, 205, 98, 0.06)', color: '#39CD62', border: '1px solid #39CD62' },
    Inactive: { bg: 'rgba(84, 95, 125, 0.06)', color: '#545F7D', border: '1px solid #545F7D' },
    Pending: { bg: 'rgba(233, 178, 0, 0.06)', color: '#E9B200', border: '1px solid #E9B200' },
    Blacklisted: { bg: 'rgba(228, 3, 59, 0.06)', color: '#E4033B', border: '1px solid #E4033B' },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.Inactive;

  return {
    backgroundColor: config.bg,
    color: config.color,
    border: config.border,
    fontWeight: 500,
    fontSize: '12px',
    textTransform: 'uppercase',
    borderRadius: '20px',
    height: '24px',
    fontFamily: 'Avenir Next, sans-serif',
  };
});

interface UsersTableProps {
  searchTerm?: string;
}

interface User {
  id: number;
  organization: string;
  username: string;
  email: string;
  phone: string;
  dateJoined: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';
  fullName: string;
  firstName?: string;
  lastName?: string;
  hasLoans?: boolean;
  hasSavings?: boolean;
}

export default function UsersTable({ searchTerm = '' }: UsersTableProps) {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      
      const usersData = localStorage.getItem('users');
      let usersList: User[] = [];

      if (usersData) {
        usersList = JSON.parse(usersData);
      } else {
        usersList = generateMockUsers();
        localStorage.setItem('users', JSON.stringify(usersList));
      }

      setUsers(usersList);
    } catch (error) {
      console.error('Error loading users:', error);
      setUsers(generateBasicMockUsers());
    } finally {
      setLoading(false);
    }
  };

  const generateMockUsers = (): User[] => {
    const organizations = ['Lendsqr', 'Irorun', 'Lendstar', 'Union Bank', 'Access Bank'];
    const firstNames = ['Ade', 'Grace', 'Tosin', 'Debby', 'Chike', 'Funke', 'Emeka', 'Bola'];
    const lastNames = ['Adedeji', 'Effiom', 'Osibodu', 'Ogana', 'Nwosu', 'Adeyemi', 'Okafor', 'Ahmed'];
    
    return Array.from({ length: 500 }, (_, i) => {
      const firstName = firstNames[i % firstNames.length];
      const lastName = lastNames[i % lastNames.length];
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${organizations[i % organizations.length].toLowerCase().replace(' ', '')}.com`;
      const username = `${firstName}${lastName}`;
      
      return {
        id: i + 1,
        organization: organizations[i % organizations.length],
        username: username,
        email: email,
        phone: `080${String(30000000 + i).slice(-8)}`,
        dateJoined: new Date(2020 + Math.floor(i / 100), i % 12, (i % 28) + 1).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        status: ['Active', 'Inactive', 'Pending', 'Blacklisted'][i % 4] as User['status'],
        fullName: `${firstName} ${lastName}`,
        firstName: firstName,
        lastName: lastName,
        hasLoans: i % 3 === 0,
        hasSavings: i % 2 === 0,
      };
    });
  };

  const generateBasicMockUsers = (): User[] => {
    return [
      {
        id: 1,
        organization: 'Lendsqr',
        username: 'Adedeji',
        email: 'adedaji@lendsqr.com',
        phone: '08070000000',
        dateJoined: 'May 15, 2020 10:00 AM',
        status: 'Active',
        fullName: 'Ade Adedeji',
        firstName: 'Ade',
        lastName: 'Adedeji',
        hasLoans: true,
        hasSavings: true,
      },
      {
        id: 2,
        organization: 'Irorun',
        username: 'DebbyOgana',
        email: 'debby.ogana@irorun.com',
        phone: '08060000000',
        dateJoined: 'Apr 15, 2020 10:00 AM',
        status: 'Active',
        fullName: 'Debby Ogana',
        firstName: 'Debby',
        lastName: 'Ogana',
        hasLoans: false,
        hasSavings: true,
      },
      {
        id: 3,
        organization: 'Lendsqr',
        username: 'GraceEffiom',
        email: 'grace@lendsqr.com',
        phone: '07030000000',
        dateJoined: 'Apr 15, 2020 10:00 AM',
        status: 'Pending',
        fullName: 'Grace Effiom',
        firstName: 'Grace',
        lastName: 'Effiom',
        hasLoans: true,
        hasSavings: false,
      },
    ];
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, user: User) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleViewDetails = () => {
    if (selectedUser) {
      localStorage.setItem(`user:${selectedUser.id}`, JSON.stringify(selectedUser));
      navigate(`/users/${selectedUser.id}`);
    }
    handleMenuClose();
  };

  const filteredUsers = users.filter(user => 
    searchTerm === '' || 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm) ||
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <TableContainer component={Paper} elevation={0}>
        <StyledTable>
          <StyledTableHead>
            <TableRow>
              <StyledTableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  ORGANIZATION
                  <FilterList fontSize="small" sx={{ cursor: 'pointer', color: '#545F7D' }} />
                </Box>
              </StyledTableCell>
              <StyledTableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  USERNAME
                  <FilterList fontSize="small" sx={{ cursor: 'pointer', color: '#545F7D' }} />
                </Box>
              </StyledTableCell>
              <StyledTableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  EMAIL
                  <FilterList fontSize="small" sx={{ cursor: 'pointer', color: '#545F7D' }} />
                </Box>
              </StyledTableCell>
              <StyledTableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  PHONE NUMBER
                  <FilterList fontSize="small" sx={{ cursor: 'pointer', color: '#545F7D' }} />
                </Box>
              </StyledTableCell>
              <StyledTableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  DATE JOINED
                  <FilterList fontSize="small" sx={{ cursor: 'pointer', color: '#545F7D' }} />
                </Box>
              </StyledTableCell>
              <StyledTableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  STATUS
                  <FilterList fontSize="small" sx={{ cursor: 'pointer', color: '#545F7D' }} />
                </Box>
              </StyledTableCell>
              <StyledTableCell>ACTIONS</StyledTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {paginatedUsers.map((user) => (
              <StyledTableRow key={user.id}>
                <TableCell sx={{ 
                  fontFamily: 'Avenir Next, sans-serif',
                  fontSize: '14px',
                  color: '#545F7D',
                  borderBottom: '1px solid #EAEEF0',
                  padding: '12px 16px'
                }}>
                  {user.organization}
                </TableCell>
                <TableCell sx={{ 
                  fontFamily: 'Avenir Next, sans-serif',
                  fontSize: '14px',
                  color: '#545F7D',
                  borderBottom: '1px solid #EAEEF0',
                  padding: '12px 16px'
                }}>
                  {user.username}
                </TableCell>
                <TableCell sx={{ 
                  fontFamily: 'Avenir Next, sans-serif',
                  fontSize: '14px',
                  color: '#545F7D',
                  borderBottom: '1px solid #EAEEF0',
                  padding: '12px 16px'
                }}>
                  {user.email}
                </TableCell>
                <TableCell sx={{ 
                  fontFamily: 'Avenir Next, sans-serif',
                  fontSize: '14px',
                  color: '#545F7D',
                  borderBottom: '1px solid #EAEEF0',
                  padding: '12px 16px'
                }}>
                  {user.phone}
                </TableCell>
                <TableCell sx={{ 
                  fontFamily: 'Avenir Next, sans-serif',
                  fontSize: '14px',
                  color: '#545F7D',
                  borderBottom: '1px solid #EAEEF0',
                  padding: '12px 16px'
                }}>
                  {user.dateJoined}
                </TableCell>
                <TableCell sx={{ 
                  borderBottom: '1px solid #EAEEF0',
                  padding: '12px 16px'
                }}>
                  <StatusChip label={user.status} status={user.status} />
                </TableCell>
                <TableCell sx={{ 
                  borderBottom: '1px solid #EAEEF0',
                  padding: '12px 16px'
                }}>
                  <IconButton onClick={(e) => handleMenuOpen(e, user)}>
                    <MoreVert sx={{ color: '#545F7D' }} />
                  </IconButton>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableContainer>

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        p: 3,
        borderTop: '1px solid #EAEEF0'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" sx={{ color: '#545F7D', fontFamily: 'Avenir Next, sans-serif' }}>
            Showing
          </Typography>
          <FormControl size="small" sx={{ minWidth: 80 }}>
            <Select
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              sx={{ fontFamily: 'Avenir Next, sans-serif' }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="body2" sx={{ color: '#545F7D', fontFamily: 'Avenir Next, sans-serif' }}>
            out of {filteredUsers.length}
          </Typography>
        </Box>
        
        <Pagination
          count={Math.ceil(filteredUsers.length / rowsPerPage)}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
          shape="rounded"
        />
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            boxShadow: '3px 5px 20px 0px rgba(0, 0, 0, 0.04)',
            borderRadius: '4px',
          }
        }}
      >
        <MenuItem onClick={handleViewDetails} sx={{ fontFamily: 'Avenir Next, sans-serif', fontSize: '14px' }}>
          <Visibility sx={{ mr: 1, fontSize: '16px' }} />
          View Details
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ fontFamily: 'Avenir Next, sans-serif', fontSize: '14px' }}>
          Blacklist User
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ fontFamily: 'Avenir Next, sans-serif', fontSize: '14px' }}>
          Activate User
        </MenuItem>
      </Menu>
    </Box>
  );
}