
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  InputBase,
  Badge,
  Avatar,
  Divider,
  Collapse,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search,
  Notifications,
  KeyboardArrowDown,
  Dashboard as DashboardIcon,
  People,
  Business,
  Settings,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const drawerWidth = 283;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
  backgroundColor: '#FFFFFF',
  color: '#213F7D',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 3),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
  borderBottom: '1px solid #E5E5E5',
}));

const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '8px',
  border: '1px solid #E5E5E5',
  backgroundColor: '#FFFFFF',
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '400px',
  [theme.breakpoints.down('sm')]: {
    width: '200px',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#545F7D',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const OrganizationButton = styled(ListItemButton)(({ theme }) => ({
  backgroundColor: 'rgba(57, 205, 204, 0.06)',
  borderRadius: '4px',
  marginBottom: theme.spacing(2),
  '&:hover': {
    backgroundColor: 'rgba(57, 205, 204, 0.1)',
  },
}));

interface DashboardLayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  text: string;
  icon: React.ReactElement;
  path: string;
  children?: NavItem[];
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [open, setOpen] = useState(true);
  const [organizationMenuAnchor, setOrganizationMenuAnchor] = useState<null | HTMLElement>(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    customers: true,
    businesses: false,
    settings: false,
  });
  const location = useNavigate();
  const currentPath = useLocation();

  const navItems: { [key: string]: NavItem[] } = {
    customers: [
      {
        text: 'Users',
        icon: <People />,
        path: '/users',
      },
      {
        text: 'Guarantors',
        icon: <People />,
        path: '/guarantors',
      },
      {
        text: 'Loans',
        icon: <People />,
        path: '/loans',
      },
      {
        text: 'Decision Models',
        icon: <People />,
        path: '/decision-models',
      },
      {
        text: 'Savings',
        icon: <People />,
        path: '/savings',
      },
      {
        text: 'Loan Requests',
        icon: <People />,
        path: '/loan-requests',
      },
      {
        text: 'Whitelist',
        icon: <People />,
        path: '/whitelist',
      },
      {
        text: 'Karma',
        icon: <People />,
        path: '/karma',
      },
    ],
    businesses: [
      {
        text: 'Organization',
        icon: <Business />,
        path: '/organization',
      },
      {
        text: 'Loan Products',
        icon: <Business />,
        path: '/loan-products',
      },
      {
        text: 'Savings Products',
        icon: <Business />,
        path: '/savings-products',
      },
      {
        text: 'Fees and Charges',
        icon: <Business />,
        path: '/fees-charges',
      },
      {
        text: 'Transactions',
        icon: <Business />,
        path: '/transactions',
      },
      {
        text: 'Services',
        icon: <Business />,
        path: '/services',
      },
      {
        text: 'Service Account',
        icon: <Business />,
        path: '/service-account',
      },
      {
        text: 'Settlements',
        icon: <Business />,
        path: '/settlements',
      },
      {
        text: 'Reports',
        icon: <Business />,
        path: '/reports',
      },
    ],
    settings: [
      {
        text: 'Preferences',
        icon: <Settings />,
        path: '/preferences',
      },
      {
        text: 'Fees and Pricing',
        icon: <Settings />,
        path: '/fees-pricing',
      },
      {
        text: 'Audit Logs',
        icon: <Settings />,
        path: '/audit-logs',
      },
    ],
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleOrganizationMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOrganizationMenuAnchor(event.currentTarget);
  };

  const handleOrganizationMenuClose = () => {
    setOrganizationMenuAnchor(null);
  };

  const handleUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleSectionToggle = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const isActivePath = (path: string) => {
    return currentPath.pathname === path;
  };

  const drawer = (
    <Box sx={{ overflow: 'auto' }}>
      <DrawerHeader>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#213F7D', flexGrow: 1 }}>
            Lendsqr
          </Typography>
          <IconButton onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        </Box>
      </DrawerHeader>

      <Box sx={{ p: 2 }}>
        <OrganizationButton onClick={handleOrganizationMenu}>
          <ListItemIcon>
            <Business />
          </ListItemIcon>
          <ListItemText 
            primary="Switch Organization" 
            primaryTypographyProps={{ fontSize: '14px', fontWeight: 400 }}
          />
          <KeyboardArrowDown />
        </OrganizationButton>

        <ListItemButton 
          component={Link} 
          to="/users"
          sx={{ 
            mb: 2,
            backgroundColor: isActivePath('/users') || isActivePath('/dashboard') ? 'rgba(57, 205, 204, 0.1)' : 'transparent',
            '&:hover': {
              backgroundColor: 'rgba(57, 205, 204, 0.05)',
            },
          }}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Dashboard" 
            primaryTypographyProps={{ 
              fontSize: '14px', 
              fontWeight: isActivePath('/users') || isActivePath('/dashboard') ? 600 : 400,
              color: isActivePath('/users') || isActivePath('/dashboard') ? '#213F7D' : '#545F7D',
            }}
          />
        </ListItemButton>

        {Object.entries(navItems).map(([section, items]) => (
          <Box key={section}>
            <ListItemButton onClick={() => handleSectionToggle(section)}>
              <ListItemText 
                primary={section.toUpperCase()} 
                primaryTypographyProps={{ 
                  fontSize: '12px', 
                  fontWeight: 500,
                  color: '#545F7D',
                }}
              />
              {openSections[section] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            
            <Collapse in={openSections[section]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {items.map((item) => (
                  <ListItemButton
                    key={item.text}
                    component={Link}
                    to={item.path}
                    sx={{ 
                      pl: 4,
                      backgroundColor: isActivePath(item.path) ? 'rgba(57, 205, 204, 0.1)' : 'transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(57, 205, 204, 0.05)',
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.text} 
                      primaryTypographyProps={{ 
                        fontSize: '14px', 
                        fontWeight: isActivePath(item.path) ? 600 : 400,
                        color: isActivePath(item.path) ? '#213F7D' : '#545F7D',
                      }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
            <Divider sx={{ my: 1 }} />
          </Box>
        ))}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBarStyled position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Users
          </Typography>

          <SearchContainer>
            <SearchIconWrapper>
              <Search />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search for anything..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </SearchContainer>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography 
              variant="body2" 
              component={Link} 
              to="/docs" 
              sx={{ textDecoration: 'none', color: '#213F7D' }}
            >
              Docs
            </Typography>
            
            <IconButton color="inherit">
              <Badge badgeContent={4} color="error">
                <Notifications />
              </Badge>
            </IconButton>

            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleUserMenu}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: '#213F7D', mr: 1 }}>
                A
              </Avatar>
              <Typography variant="body2" sx={{ mr: 1 }}>
                Adedeji
              </Typography>
              <KeyboardArrowDown />
            </Box>
          </Box>
        </Toolbar>
      </AppBarStyled>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#FFFFFF',
            borderRight: '1px solid #E5E5E5',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        {drawer}
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>

      {/* Organization Menu */}
      <Menu
        anchorEl={organizationMenuAnchor}
        open={Boolean(organizationMenuAnchor)}
        onClose={handleOrganizationMenuClose}
      >
        <MenuItem onClick={handleOrganizationMenuClose}>Lendsqr Organization</MenuItem>
        <MenuItem onClick={handleOrganizationMenuClose}>Another Organization</MenuItem>
      </Menu>

      {/* User Menu */}
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
      >
        <MenuItem onClick={handleUserMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleUserMenuClose}>Settings</MenuItem>
        <MenuItem onClick={() => {
          localStorage.removeItem('token');
          location('/login');
        }}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}