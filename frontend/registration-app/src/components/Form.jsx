import React from 'react';
import { Button, Container, Paper, Typography, CssBaseline, Grid, TextField } from '@material-ui/core';
import PersonDetails from './PersonDetails';
import {WebcamCapture} from "./Webcam";
import axios from 'axios';

class Form extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            step: 1,
            firstName: '',
            lastName: '',
            birthdate: '',
            healthStatus: '',
            image: '',
            alert: 0,
        }
    }

    //next step
    nextStep = () => {

        if((this.state.step === 1 && this.state.firstName !== '' && this.state.lastName !== '' && this.state.birthdate !== '' && this.state.healthStatus !== '') || (this.state.step === 2 && this.state.image !== '')) {
            const { step } = this.state;
            this.setState({
                step: step + 1,
                alert: 0
            });
        }
        else{
            if(this.state.step === 1) {
                this.setState({
                    alert: 1
                })
            }
            if(this.state.step === 2) {
                this.setState({
                    alert: 2
                })
            }
           
        }

        
    }

    //prev step
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    }

    // Handle input change
    handleChange = input => e => {
        this.setState({[input]: e.target.value});
    }

    // Handle Image change
    handleImageChange = (newImage) => {
        this.setState({image: newImage})
    }

    async postData() {
        const content = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            birthdate: this.state.birthdate,
            healthStatus: this.state.healthStatus,
            image: this.state.image
        }
        const response = await axios.post('http://3.140.105.132:8081/person/create', content)
        console.log(response)
        window.location.reload();
    }
    render() {
        const { step } = this.state;
        const { firstName, lastName, birthdate, healthStatus, image, alert } = this.state;
        const values = { firstName, lastName, birthdate, healthStatus, image, alert }
        switch(step) {
            case 1:
                return(
                    <PersonDetails 
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                );
            case 2:
                return(
                    <WebcamCapture 
                    nextStep={this.nextStep} 
                    prevStep={this.prevStep}
                    handleImageChange={this.handleImageChange}
                    defaultImage={this.state.image}
                    alert={this.state.alert}
                    />
                );
            case 3:
                return(
                    <Container  style={{marginTop: "2%"}} maxWidth="sm">
                        <CssBaseline />
                        <Paper style={{padding: "8%"}} elevation={12}>
                            <Typography variant="h4" color="textPrimary" align="center" >Final Form</Typography>
                            <br/>
                            <hr/>
                            <br />
                            <Grid container justify="center">
                                <img src={this.state.image} width="80%" alt="sgsjgslkj"/>
                            </Grid>
                            <br />
                            <Grid container spacing={6} justify="center">
                                <Grid item xs={12} sm={6} md={6}>
                                    <TextField
                                        fullWidth
                                        label="First Name"
                                        defaultValue={this.state.firstName}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Last Name"
                                        defaultValue={this.state.lastName}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} >
                                    <TextField
                                        fullWidth
                                        label="Birthdate"
                                        format={'DD/MM/YYYY'}
                                        defaultValue ={this.state.birthdate}
                                        type="date"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <TextField
                                        fullWidth
                                        label="Covid Status"
                                        defaultValue={this.state.healthStatus}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <br />
                            <br />
                            <br />
                            <Grid container spacing={6} justify="center" >
                                <Button variant="contained" color="secondary" size="large" style={{width: "45%", marginRight: "10%"}} onClick={this.prevStep} >Back</Button>
                                <Button variant="contained" color="primary" size="large" style={{width: "45%"}} onClick={this.postData.bind(this)}>Submit</Button>
                            </Grid>
                        </Paper>
                    </Container>
                );
            default:
        }
    }
}

export default Form;