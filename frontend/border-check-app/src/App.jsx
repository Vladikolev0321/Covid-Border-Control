import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Bar from './components/Bar';
import Form from './components/Form';
import { Table } from './components/Table';

import { CssBaseline } from '@material-ui/core';


const App = () => {
    return (
        <>
            <Router>
                <div>
                    <CssBaseline />
                    <Bar />
                    <Switch>
                        <Route path='/table' component={Table} />
                        <Route path='/verification' component={Form} />
                    </Switch>
                </div>
            </Router>
        </>
    );
}

export default App;