import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    TablePagination,
    TableFooter,
} from '@material-ui/core';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: 950
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    avatar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    }
}));

function MyTable() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [loadingData, setLoadingData] = useState(true);
    const [data, setData] = useState([]);
    useEffect(() => {
        async function getData() {
            await axios.get('https://server.tuesbordercontrol.com/person/get_all').then((response) => {
                console.log(response.data);
                setData(response.data);
                setLoadingData(false);
            });
        }
        if (loadingData) {
            getData();
        }
    })
    

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div>
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHeaderCell}> ID </TableCell>
                        <TableCell className={classes.tableHeaderCell}> First Name </TableCell>
                        <TableCell className={classes.tableHeaderCell}> Last Name </TableCell>
                        <TableCell className={classes.tableHeaderCell}> Birthdate </TableCell>
                        <TableCell className={classes.tableHeaderCell}> Health Status </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>
                                <Typography className={classes.name}>{row.id}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography color="primary" variant="subtitle2">{row.firstName}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography color="primary" variant="subtitle2">{row.lastName}</Typography>
                            </TableCell>
                            <TableCell>{row.birthdate}</TableCell>
                            <TableCell>
                                <Typography className={classes.status}>{row.healthStatus}</Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </TableFooter>
            </Table>
        </TableContainer>
        </div>
    );
}

export default MyTable;