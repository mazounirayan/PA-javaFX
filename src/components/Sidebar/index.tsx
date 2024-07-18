// Sidebar.tsx
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, IconButton, Box, styled } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EventIcon from '@mui/icons-material/Event';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PaletteIcon from '@mui/icons-material/Palette';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from './logo.png';
import { useTheme } from '../Header/ThemeContext'; // Adjust the path as per your project structure

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.default,
  },
}));

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;
  const { theme } = useTheme();
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  const ListItemLink: React.FC<ListItemLinkProps> = ({ icon, primary, to }) => {
    const selected = pathname === to;

    return (
      <ListItem 
        button 
        component={Link} 
        to={to} 
        selected={selected}
        sx={{ 
          color: selected ? 'primary.main' : 'text.primary',
          '&:hover': {
            backgroundColor: 'action.hover',
          },
        }}
      >
        {icon && <ListItemIcon sx={{ color: 'inherit' }}>{icon}</ListItemIcon>}
        <ListItemText primary={primary} />
      </ListItem>
    );
  };

  return (
    <StyledDrawer
      variant="persistent"
      anchor="left"
      open={sidebarOpen}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', padding: 2, justifyContent: 'space-between' }}>
        <img src={Logo} alt="Logo" style={{ height: 40 }} />
        <IconButton onClick={() => setSidebarOpen(false )} sx={{ display: { sm: 'none' } }}>
          <MenuIcon />
        </IconButton>
      </Box>
      <List>
        <Typography variant="overline" sx={{ ml: 2 }}>MENU</Typography>
        <ListItemLink to="/" primary="Dashboard" icon={<DashboardIcon />} />
        <ListItemLink to="/employeeForm" primary="Employee Form" icon={<PersonAddIcon />} />
        <ListItemLink to="/sessions" primary="Sessions" icon={<EventIcon />} />
        <ListItemLink to="/create-session" primary="Create Session" icon={<AddCircleOutlineIcon />} />
        <ListItemLink to="/themeCreation" primary="Theme Creation" icon={<PaletteIcon />} />
      </List>
    </StyledDrawer>
  );
};

export default Sidebar;
