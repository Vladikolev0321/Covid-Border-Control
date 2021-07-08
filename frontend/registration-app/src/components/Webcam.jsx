import React, { useState } from 'react';
import Webcam from "react-webcam";
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import {Container, CssBaseline, Grid, Button} from "@material-ui/core";
import { borders } from '@material-ui/system'

const videoConstraints = {
    width: 1280,
    height: 720,
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


    return (
        <React.Fragment>
            <CssBaseline />
            <Container
                  className="webcam-container">
                    <Grid
                        container
                          direction="column"
                          justifyContent="center"
                          alignItems="center"className="webcam-img">

                        {image === '' ? <Webcam
                            audio={false}
                            height={500}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            width={1000}
                            videoConstraints={videoConstraints}
                        /> : <img alt="Person's face" src={image} />}
                    </Grid>
                    <br/>
                    <Grid container
                          direction="column"
                          justifyContent="center"
                          alignItems="center">
                        {image !== '' ?
                            <Button variant="contained" color="primary" startIcon={< CameraAltIcon />} onClick={(e) => {
                                e.preventDefault();
                                setImage('')
                            }}
                                    className="webcam-btn">
                                Retake Image</Button> :
                            <Button variant="contained" color="primary" startIcon={< CameraAltIcon />} onClick={(e) => {
                                e.preventDefault();
                                capture();
                            }}
                                    className="webcam-btn">Capture</Button>
                        }
                    </Grid>
            </Container>
        </React.Fragment>
    );
};

