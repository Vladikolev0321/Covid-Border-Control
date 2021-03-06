import React from 'react';
import { AppBar, Toolbar, Typography, Link } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import TocIcon from '@material-ui/icons/Toc';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';

const Bar = () => {
    return (
        <AppBar position="relative" color="primary">
          <Toolbar>
            <AirplanemodeActiveIcon />
            <Typography variant="h6" style={{marginRight: "2%"}}>
              Border Verification
            </Typography>
            <CheckCircleIcon />
            <Typography variant="h6" style={{marginRight: "2%"}}>
              <Link style={{color: 'white'}} href="/verify">
                Verify now
              </Link>
            </Typography>
            <TocIcon/>
            <Typography variant="h6" style={{marginRight: "2%"}}>
              <Link style={{color: 'white'}} href="/table">
                Table with People
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
    );
}

export default Bar;