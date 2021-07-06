import React from 'react';
import { TextField, Grid, Typography, Select, MenuItem, InputLabel, Button, FormControl} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';


class Form extends React.Component {
    render() {
        return (
            <main>
                <div>
                    <Grid container alignItems="center" md={4}>
                        <Grid item style={{margin: "15%", border: "1px solid black", borderRadius: "25px", padding: "5% 0"}} >
                            <Typography variant="h3" align="center" color="textPrimary" style={{borderBottom: "1px solid black", paddingBottom: "5%"}}>Register Now</Typography>
                            <Grid container spacing={4} justify="center" style= {{marginTop: 20}}>
                                <Grid item xs={10} sm={5} md={5}>
                                    <TextField 
                                        label="First Name"
                                        color="primary"
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={10} sm={5} md={5}>
                                    <TextField 
                                        label="Last Name"
                                        color="primary"
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={10} sm={5} md={10} style= {{marginTop: "5%"}}>
                                    <FormControl fullWidth >
                                        <TextField
                                            id="date"
                                            color="primary"
                                            label="Birthday"
                                            defaultValue="2017-05-24"
                                            type="date"
                                            required
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={10} sm={5} md={10}style= {{marginTop: "5%"}}>
                                    <FormControl fullWidth>
                                        <InputLabel id={"covid status"}>Covid Status</InputLabel>
                                        <Select
                                            color="secondary"
                                            labelId = "covid status"
                                            lable = "Covid Status"
                                            required
                                            
                                        >
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                        </Select>
                                    </FormControl>
                                    
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} justify="center" style= {{marginTop: "10%"}}>
                                <Grid item>
                                    <Button variant="contained" color="secondary" endIcon={<SendIcon/>}>Submit</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                
            </main>
            
        );
    }
}

export default Form;