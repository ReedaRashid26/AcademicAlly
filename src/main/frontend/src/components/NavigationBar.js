import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import Logo from '../images/logo.png'; // Ensure the path to the logo is correct

const NavigationBar = ({ showLinks, showLogOut }) => {
  return (
    <AppBar position="static">
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <img src={Logo} alt="Logo" style={{ width: '30px', marginRight: '8px' }} />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {showLinks && (
            <>
              <Button color="inherit" component={Link} to="/home" sx={{
                '&:hover': {
                  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.3)',
                  transform: 'scale(1.05)'
                },
                '&:active': {
                  boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.5)',
                  transform: 'scale(0.95)'
                }
              }}>Home</Button>
              <Button color="inherit" component={Link} to="/notes" sx={{
                '&:hover': {
                  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.3)',
                  transform: 'scale(1.05)'
                },
                '&:active': {
                  boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.5)',
                  transform: 'scale(0.95)'
                }
              }}>Notes</Button>
              <Button color="inherit" component={Link} to="/tasks" sx={{
                '&:hover': {
                  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.3)',
                  transform: 'scale(1.05)'
                },
                '&:active': {
                  boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.5)',
                  transform: 'scale(0.95)'
                }
              }}>Tasks</Button>
            </>
          )}
        </Box>
        {showLogOut && (
          <Button color="primary" variant="contained" component={Link} to="/login" sx={{
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
            '&:hover': {
              boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.3)'
            },
            '&:active': {
              boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.5)'
            }
          }}>Log Out</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
