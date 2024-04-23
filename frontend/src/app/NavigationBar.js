import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';

const NavigationBar = ({ showLinks, showLogOut }) => {
  return (
    <AppBar position="static">
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <Box>
          {showLinks && (
            <>
              <Button color="inherit" component={Link} to="/home">Home</Button>
              <Button color="inherit" component={Link} to="/notes">Notes</Button>
              <Button color="inherit" component={Link} to="/tasks">Tasks</Button>
            </>
          )}
        </Box>
        {showLogOut && <Button color="inherit" component={Link} to="/login">Log Out</Button>}
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
