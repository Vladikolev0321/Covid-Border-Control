import React, { useState } from 'react';
import Webcam from "react-webcam";
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import {Container, CssBaseline, Grid, Button, Paper, Typography } from "@material-ui/core";
// import Alert from '@material-ui/lab/Alert';

const videoConstraints = {
    width: 800,
    height: 450,
    facingMode: "user"
};

export const WebcamCapture = () => {

    const [image,setImage]=useState('');
    const webcamRef = React.useRef(null);

    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setImage(imageSrc)
        }, []);

    // const renderAlert = () => {
    //     if(alert === 2) {
    //         return <div>
    //             <Alert severity="error" variant="filled" >
    //                 You must take a picture!
    //             </Alert>
    //             <br />
    //         </div>
    //     }
    // }

    return (
        <React.Fragment>
            <Container className="webcam-container" style={{marginTop: "2%"}} maxWidth="md">
                <CssBaseline />
                <Paper style={{padding: "8%"}} elevation={12}>
                    {/*{renderAlert()}*/}
                    <Typography variant="h4" color="textPrimary" align="center" >Take a picture</Typography>
                    <br />
                    <hr />
                    <br />
                    <Grid
                        container
                        justify="center"
                    >
                        {image === '' ? <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                        /> : <img alt="Person's face" src={image} />}

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
                </Paper>
            </Container>
        </React.Fragment>
    );
};

