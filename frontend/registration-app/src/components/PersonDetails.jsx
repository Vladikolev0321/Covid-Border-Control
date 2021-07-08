import React from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { CssBaseline, Paper, Container, TextField, Typography, Grid, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
export class PersonDetails extends React.Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }
    render() { 
        const { values, handleChange } = this.props;
        
        return (
            <MuiThemeProvider>
                <React.Fragment>
                    <Container  style={{marginTop: "3%"}} maxWidth="sm">
                        <CssBaseline />
                        <Paper style={{padding: "8%"}} elevation={12}>
                            <Typography variant="h3" color="textPrimary" align="center" >Person Details</Typography>
                            <br/>
                            <br/>
                            <hr/>
                            <br />
                            <Grid container spacing={6} justify="center">
                                <Grid item xs={12} sm={6} md={6}>
                                    <TextField
                                        fullWidth
                                        placeholder="Enter your First Name"
                                        label = "First Name"
                                        onChange={handleChange('firstName')}
                                        defaultValue={values.firstName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <TextField
                                        fullWidth
                                        placeholder="Enter your Last Name"
                                        label = "Last Name"
                                        onChange={handleChange('lastName')}
                                        defaultValue={values.lastName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} style= {{marginTop: "5%"}}>
                                    <InputLabel>Birthday</InputLabel>
                                    <br />
                                    <TextField
                                        fullWidth
                                        format={'DD/MM/YYYY'}
                                        defaultValue ={values.birthdate}
                                        onChange={handleChange('birthdate')}
                                        type="date"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} style= {{marginTop: "5%"}}>
                                    <InputLabel>Covid status</InputLabel>
                                    <br />
                                    <Select
                                        fullWidth
                                        color = "primary"
                                        labelId = "covid status"
                                        lable = "Covid Status"
                                        value = {values.healthStatus}
                                        onChange = {handleChange('healthStatus')}
                                        required  
                                    >
                                        <MenuItem value={'NONE'}>None</MenuItem>
                                        <MenuItem value={'RECENTLY_INFECTED'}>Recently Infected</MenuItem>
                                        <MenuItem value={'RECENTLY_VACCINATED'}>Recently Vaccinated</MenuItem>
                                        <MenuItem value={'RECENTLY_INFECTED_AND_VACCINATED'}>Recently Infected and Vaccinated</MenuItem>
                                    </Select>
                                </Grid>
                            </Grid>
                            <br />
                            <Grid container justify="flex-end">
                                <Button variant="contained"color="primary" onClick={this.continue} style={{width: "50%"}} size="large">Next</Button>
                            </Grid>
                        </Paper>
                    </Container>
                </React.Fragment>
            </MuiThemeProvider>
        )
    }
}
export default PersonDetails