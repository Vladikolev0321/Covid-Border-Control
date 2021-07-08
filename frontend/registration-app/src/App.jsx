import React from 'react';

import Bar from './components/Bar';
import Form from './components/Form'

import { CssBaseline } from '@material-ui/core';


const App = () => {
    return (
        <>
            <CssBaseline />
            <Bar />
            <Form />
        </>
    );
}

export default App;