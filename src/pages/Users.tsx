
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
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
  TextField,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  MoreVert,
  FilterList,
  Visibility,
  PersonAdd,
  Download,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import DashboardLayout from '../components/Layout/DashboardLayout';
import { mockUsers, User } from '../utils/mockDataGenerator';

const FilterDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '4px',
    padding: theme.spacing(2),
    minWidth: '400px',
  },
}));

const FilterForm = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

const StatusChip = styled(Chip)<{ status: string }>(({ theme, status }) => {
  const statusColors = {
    Active: { bg: 'rgba(57, 205, 98, 0.1)', color: '#39CD62' },
    Inactive: { bg: 'rgba(84, 95, 125, 0.1)', color: '#545F7D' },
    Pending: { bg: 'rgba(233, 178, 0, 0.1)', color: '#E9B200' },
    Blacklisted: { bg: 'rgba(228, 3, 59, 0.1)', color: '#E4033B' },
  };

  const colors = statusColors[status as keyof typeof statusColors] || statusColors.Inactive;

  return {
    backgroundColor: colors.bg,
    color: colors.color,
    fontWeight: 600,
    fontSize: '12px',
    textTransform: 'uppercase',
    borderRadius: '20px',
    padding: '4px 12px',
    height: '24px',
  };
});


export default function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [filters, setFilters] = useState({
    organization: '',
    username: '',
    email: '',
    phone: '',
    dateJoined: '',
    status: '',
  });

  const rowsPerPage = 10;

  useEffect(() => {
    const base = import.meta.env.DEV ? 'http://localhost:4000' : ''
    const url = import.meta.env.DEV ? `${base}/users` : '/mock/db.json'

    const handleData = (data: any) => {
      // data could be the array (json-server) or an object { users: [...] }
      const list = Array.isArray(data) ? data : data.users
      setUsers(list || [])
    }

    axios
      .get(url)
      .then((res) => handleData(res.data))
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false))
  }, []);

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
      navigate(`/users/${selectedUser.id}`);
    }
    handleMenuClose();
  };

  const handleFilterOpen = () => {
    setFilterDialogOpen(true);
  };

  const handleFilterClose = () => {
    setFilterDialogOpen(false);
  };

  const handleFilterReset = () => {
    setFilters({
      organization: '',
      username: '',
      email: '',
      phone: '',
      dateJoined: '',
      status: '',
    });
  };

  const handleFilterApply = () => {
    // Apply filters logic
    console.log('Applying filters:', filters);
    setFilterDialogOpen(false);
  };

  const filteredUsers = users.filter(user => {
    return (
      (filters.organization ? user.organization.includes(filters.organization) : true) &&
      (filters.username ? user.username.includes(filters.username) : true) &&
      (filters.email ? user.email.includes(filters.email) : true) &&
      (filters.phone ? user.phone.includes(filters.phone) : true) &&
      (filters.status ? user.status === filters.status : true)
    );
  });

  const paginatedUsers = filteredUsers.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  if (loading) {
    return (
      <DashboardLayout>
        <Box sx={{ p: 3 }}>
          <Typography>Loading users...</Typography>
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h1" sx={{ mb: 3 }}>
          Users
        </Typography>

        {/* Action Buttons */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<FilterList />}
                  onClick={handleFilterOpen}
                  sx={{ textTransform: 'none' }}
                >
                  Filter
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Download />}
                  sx={{ textTransform: 'none' }}
                >
                  Export
                </Button>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<PersonAdd />}
                  sx={{ textTransform: 'none', backgroundColor: '#39CDCC' }}
                >
                  Add User
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <TableContainer component={Paper} elevation={0}>
            <Table sx={{ minWidth: 1200 }}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      ORGANIZATION
                      <FilterList fontSize="small" sx={{ cursor: 'pointer' }} onClick={handleFilterOpen} />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      USERNAME
                      <FilterList fontSize="small" sx={{ cursor: 'pointer' }} onClick={handleFilterOpen} />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      EMAIL
                      <FilterList fontSize="small" sx={{ cursor: 'pointer' }} onClick={handleFilterOpen} />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      PHONE NUMBER
                      <FilterList fontSize="small" sx={{ cursor: 'pointer' }} onClick={handleFilterOpen} />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      DATE JOINED
                      <FilterList fontSize="small" sx={{ cursor: 'pointer' }} onClick={handleFilterOpen} />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      STATUS
                      <FilterList fontSize="small" sx={{ cursor: 'pointer' }} onClick={handleFilterOpen} />
                    </Box>
                  </TableCell>
                  <TableCell>ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>{user.organization}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.dateJoined}</TableCell>
                    <TableCell>
                      <StatusChip label={user.status} status={user.status} />
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={(e) => handleMenuOpen(e, user)}>
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
            <Typography variant="body2" color="textSecondary">
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredUsers.length)} of {filteredUsers.length} entries
            </Typography>
            
            <Pagination
              count={Math.ceil(filteredUsers.length / rowsPerPage)}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="primary"
            />
          </Box>
        </Card>

        {/* Filter Dialog */}
        <FilterDialog open={filterDialogOpen} onClose={handleFilterClose}>
          <DialogTitle>Filter Users</DialogTitle>
          <DialogContent>
            <FilterForm>
              <FormControl fullWidth size="small">
                <InputLabel>Organization</InputLabel>
                <Select
                  value={filters.organization}
                  onChange={(e) => setFilters(prev => ({ ...prev, organization: e.target.value }))}
                  input={<OutlinedInput label="Organization" />}
                >
                  {Array.from(new Set(mockUsers.map(user => user.organization))).sort().map(org => (
                    <MenuItem key={org} value={org}>{org}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Username"
                size="small"
                value={filters.username}
                onChange={(e) => setFilters(prev => ({ ...prev, username: e.target.value }))}
              />

              <TextField
                label="Email"
                size="small"
                value={filters.email}
                onChange={(e) => setFilters(prev => ({ ...prev, email: e.target.value }))}
              />

              <TextField
                label="Phone Number"
                size="small"
                value={filters.phone}
                onChange={(e) => setFilters(prev => ({ ...prev, phone: e.target.value }))}
              />

              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                  input={<OutlinedInput label="Status" />}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Blacklisted">Blacklisted</MenuItem>
                </Select>
              </FormControl>
            </FilterForm>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleFilterReset}>Reset</Button>
            <Button onClick={handleFilterApply} variant="contained">Apply Filters</Button>
          </DialogActions>
        </FilterDialog>

        {/* Action Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleViewDetails}>
            <Visibility sx={{ mr: 1 }} fontSize="small" />
            View Details
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <PersonAdd sx={{ mr: 1 }} fontSize="small" />
            Blacklist User
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <PersonAdd sx={{ mr: 1 }} fontSize="small" />
            Activate User
          </MenuItem>
        </Menu>
      </Box>
    </DashboardLayout>
  );
}