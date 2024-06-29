import React from "react";
import "./NavBar.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Global from '../utils/Global';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import { styled } from '@mui/joy/styles';
import { cookies } from "../App";

const DarkMenuButton = styled(MenuButton)({
  backgroundColor: '#333',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#555',
  }
});

export const NavBar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear user data (assuming it's stored in localStorage for this example)
    localStorage.removeItem('user');
    Global.user = null; // Clear user in the global object
    cookies.remove("token", { path: '/' });

    // Navigate to login page after logout
    navigate('/login');
  };

  return (
    <>
      <header>
        <div className="logo">
          <img src="final-logo.png" alt="ECO MITRA Logo" />
        </div>
        <nav>
          <ul>
            <li>
              <div className="group">
                <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
                  <g>
                    <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                  </g>
                </svg>
                <input placeholder="Search" type="search" className="input" />
              </div>
            </li>
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/services">SERVICES</Link>
            </li>
            <li>
              <Link to="/recyclers">RECYCLERS</Link>
            </li>
            <li>
              {Global.user ? (
                <Dropdown>
                  <DarkMenuButton>Dashboard</DarkMenuButton>
                  <Menu>
                    <MenuItem>Profile</MenuItem>
                    {
                      Global.user?.type === 'RECYCLERS' && (
                        <MenuItem onClick={() => navigate('/recycler/pickups')}>Pickups</MenuItem>
                      )
                    }
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </Dropdown>
              ) : (
                <Link to="/register">REGISTER</Link>
              )}
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
};
