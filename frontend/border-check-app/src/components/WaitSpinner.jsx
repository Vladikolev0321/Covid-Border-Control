import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Paper, Typography, CssBaseline } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container  style={{marginTop: "2%"}} maxWidth="sm">
        <CssBaseline />
        <Paper style={{padding: "8%"}} elevation={12}>
            <Typography variant="h4" color="textPrimary" align="center" >You will get result in a second</Typography>
            <br/>
            <hr/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Container align="center">
              <CircularProgress size={300} />
            </Container>
            <br />
            <br />
            <br />
            
          </Paper>
      </Container>
    </div>
  );
}