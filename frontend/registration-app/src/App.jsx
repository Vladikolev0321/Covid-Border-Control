import React from 'react';

import Bar from './components/Bar';
import Form from './components/Form'
import Cam from './components/Webcam'

import { CssBaseline } from '@material-ui/core';


const App = () => {
    return (
        <>
            <CssBaseline />
            <Bar />
            <Form />
            <Cam />
        </>
    );
}

export default App;