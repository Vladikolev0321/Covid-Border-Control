import React from 'react';
import { AppBar, Toolbar, Typography, Link } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import TocIcon from '@material-ui/icons/Toc';

const Bar = () => {
    return (
        <AppBar position="relative" color="primary">
          <Toolbar>
            <PersonIcon />
            <Typography variant="h6" style={{marginRight: "2%"}}>
              Verification
            </Typography>
            <CheckCircleIcon />
            <Typography variant="h6" style={{marginRight: "2%"}}>
              <Link style={{color: 'white'}} href="/verification">
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