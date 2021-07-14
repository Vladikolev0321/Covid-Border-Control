import React from 'react';
import { Container, Paper, Typography, CssBaseline } from '@material-ui/core';
import CrossMark from './crossmark.png';


export default function CrossScreen() {

  return (
    <div>
      <Container  style={{marginTop: "2%"}} maxWidth="sm">
        <CssBaseline />
        <Paper style={{padding: "8%"}} elevation={12}>
            <Typography variant="h4" color="textPrimary" align="center" >You were not recognised!</Typography>
            <br/>
            <hr/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Container style={{marginTop: "2%"}} maxWidth="sm" align="center">
            <img src={CrossMark} alt="CheckMark" />
            </Container>
            <br />
            <br />
            <br />
            
          </Paper>
      </Container>
    </div>
  );
}