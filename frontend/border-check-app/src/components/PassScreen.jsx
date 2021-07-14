import React from 'react';
import { Container, Paper, Typography, CssBaseline } from '@material-ui/core';
import CheckMark from './checkmark.png';


export default function PassScreen() {

  return (
    <div>
      <Container  style={{marginTop: "2%"}} maxWidth="sm">
        <CssBaseline />
        <Paper style={{padding: "8%"}} elevation={12}>
            <Typography variant="h4" color="textPrimary" align="center" >You can now pass!</Typography>
            <br/>
            <hr/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Container style={{marginTop: "2%"}} maxWidth="sm" align="center">
            <img src={CheckMark} alt="CheckMark" />
            </Container>
            <br />
            <br />
            <br />
            
          </Paper>
      </Container>
    </div>
  );
}