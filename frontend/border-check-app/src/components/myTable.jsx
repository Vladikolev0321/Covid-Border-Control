import React from 'react';
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
    TableFooter
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
    let data = [];

    const getData = async () => {
        const response = await axios.get('https://server.tuesbordercontrol.com/person/get_all')
        console.log(response)
        return response.data

    };

    data = [{"id":1,"firstName":"Boiko","lastName":"Birosov","birthdate":"1999-09-19","healthStatus":"RECENTLY_INFECTED","imagePath":".\\uploads\\Boiko_Birosov_1999-09-19.jpg"},{"id":2,"firstName":"Biser","lastName":"Dediv","birthdate":"1644-01-02","healthStatus":"RECENTLY_INFECTED_AND_VACCINATED","imagePath":".\\uploads\\Biser_Dediv_1644-01-02.jpg"},{"id":3,"firstName":"Stelian ","lastName":"Todorichkov ","birthdate":"2003-05-20","healthStatus":"NONE","imagePath":".\\uploads\\Stelian _Todorichkov _2003-05-20.jpg"},{"id":4,"firstName":"petar","lastName":"borisov","birthdate":"2006-05-25","healthStatus":"RECENTLY_VACCINATED","imagePath":".\\uploads\\petar_borisov_2006-05-25.jpg"},{"id":5,"firstName":"Jing","lastName":"Ping","birthdate":"1677-07-17","healthStatus":"NONE","imagePath":".\\uploads\\Jing_Ping_1677-07-17.jpg"},{"id":6,"firstName":"Ching","lastName":"Chong","birthdate":"1950-05-12","healthStatus":"RECENTLY_INFECTED_AND_VACCINATED","imagePath":".\\uploads\\Ching_Chong_1950-05-12.jpg"},{"id":7,"firstName":"viki","lastName":"viki","birthdate":"2021-06-30","healthStatus":"NONE","imagePath":".\\uploads\\viki_viki_2021-06-30.jpg"}];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
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
    );
}

export default MyTable;