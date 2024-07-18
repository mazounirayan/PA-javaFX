import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggleButton from './ThemeToggleButton';
import { AppBar, Toolbar, IconButton, Button, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <AppBar position="sticky" className="top-0 z-999 bg-white shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <Toolbar className="flex-grow px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <IconButton
            aria-label="open sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" className="block flex-shrink-0 lg:hidden">
            {/* <img src={Logo} alt="Logo" /> */}
          </Link>
        </div>

        <div className="hidden sm:block">
          <form action="https://formbold.com/s/unique_form_id" method="POST">
            <div className="relative">
              {/* <Button className="absolute left-0 top-1/2 -translate-y-1/2">Button</Button> */}
            </div>
          </form>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <li>
              <ThemeToggleButton />
            </li>
          </ul>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
