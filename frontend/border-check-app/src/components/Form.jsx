import React from 'react';
import {WebcamCapture} from "./Webcam";
import {WebcamCaptureSubmit} from "./WebcamSubmit";
import { Button, Container, Paper, Typography, CssBaseline, Grid, TextField } from '@material-ui/core';

class Form extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            step: 1,
            image: '',
            alert: 0,
            data: []
        }
    }

    //next step
    nextStep = () => {

        if( this.state.step === 1 || (this.state.step === 2 && this.state.image !== '')) {
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
            step: step - 1,
            image: '',
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
    handleDataChange = (newData) => {
        this.setState({data: newData})
        console.log(this.state.data.firstName)
    }
    render() {
        const { step } = this.state;
        switch(step) {
            case 1:
                return(
                    <WebcamCapture 
                    nextStep={this.nextStep} 
                    prevStep={this.prevStep}
                    handleImageChange={this.handleImageChange}
                    defaultImage={this.state.image}
                    alert={this.state.alert}
                    />
                );
            case 2:
                return(
                    <WebcamCaptureSubmit 
                    postData={this.postData}
                    prevStep={this.prevStep}
                    nextStep={this.nextStep} 
                    handleImageChange={this.handleImageChange}
                    handleDataChange={this.handleDataChange}
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
                <Grid container spacing={6} justify="center">
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                            fullWidth
                            label="First Name"
                            defaultValue={this.state.data.firstName}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                            fullWidth
                            label="Last Name"
                            defaultValue={this.state.data.lastName}
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
                            defaultValue ={this.state.data.birthdate}
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
                            defaultValue={this.state.data.healthStatus}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                </Grid>
                <br />
                <br />
                <br />
            </Paper>
        </Container>
                );
            
            default:
        }
    }
}

export default Form;