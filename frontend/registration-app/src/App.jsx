import React from 'react';

import Bar from './components/Bar';
import Form from './components/Form'
import {WebcamCapture} from './components/Webcam'

import { CssBaseline } from '@material-ui/core';


const App = () => {
    return (
        <>
            <CssBaseline />
            <Bar />
            <Form />
            <WebcamCapture />
        </>
    );
}

export default App;