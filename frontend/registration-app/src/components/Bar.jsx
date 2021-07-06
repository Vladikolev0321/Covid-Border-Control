import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

const Bar = () => {
    return (
        <AppBar position="relative" color="primary">
          <Toolbar>
            <PersonIcon />
            <Typography variant="h6">
              Registration
            </Typography>
          </Toolbar>
        </AppBar>
    );
}

export default Bar;