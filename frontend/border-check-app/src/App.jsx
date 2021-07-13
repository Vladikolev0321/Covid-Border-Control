import React from 'react';

import Bar from './components/Bar';
import Form from './components/Form';
import { Table } from './components/Table';

import { CssBaseline } from '@material-ui/core';


const App = () => {
    return (
        <>
            <Table/>
            <CssBaseline />
            <Bar />
            <Form />
        </>
    );
}

export default App;