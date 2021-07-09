import React, { useState } from 'react';
import Webcam from "react-webcam";
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import {Container, CssBaseline, Grid, Button, Paper} from "@material-ui/core";

const videoConstraints = {
    width: 800,
    height: 500,
    facingMode: "user"
};



export const WebcamCapture = () => {

    const [image,setImage]=useState('');
    const webcamRef = React.useRef(null);


    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setImage(imageSrc)
        });
    const myContinue = e => {
        e.preventDefault();
        this.props.nextStep();
    }
        

    return (
        <React.Fragment>
            <Container className="webcam-container" style={{marginTop: "3%"}} maxWidth="md">
                <CssBaseline />
                <Paper style={{padding: "2%"}} elevation={12}>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignContent="center"
                        className="webcam-img"
                    >
                        <Grid item xs={5} sm={12} md={12}>
                            {image === '' ? <Webcam
                                audio={false}
                                height={500}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                width={800}
                                videoConstraints={videoConstraints}
                            /> : <img alt="Person's face" src={image} />}
                        </Grid>
                      
                    </Grid>
                    <br />
                    <Grid container
                            direction="column"
                            justifyContent="center"
                            alignItems="center">
                        {image !== '' ?
                            <Button variant="contained" color="primary" size="large" startIcon={< CameraAltIcon />} onClick={(e) => {
                                e.preventDefault();
                                setImage('')
                            }}
                                    className="webcam-btn">
                                Retake Image</Button> :
                            <Button variant="contained" color="primary" size="large" startIcon={< CameraAltIcon />} onClick={(e) => {
                                e.preventDefault();
                                capture();
                            }}
                                    className="webcam-btn">Capture</Button>
                        }
                    </Grid>
                    <br />
                    <br />
                    <br />
                    <br />
                    <Grid container spacing={6} justify="center" >
                        <Button variant="contained" color="secondary" size="large" style={{width: "30%", marginRight: "25%"}} >Back</Button>
                        <Button variant="contained" color="primary" size="large" style={{width: "30%"}} onClick={ (e) => {
                            e.preventDefault();
                            this.props.nextStep();
                        }

                        }>Next</Button>
                    </Grid>
                    <br />
                    <br />
                </Paper>
            </Container>
        </React.Fragment>
    );
};

