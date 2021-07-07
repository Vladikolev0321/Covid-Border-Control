import React from 'react';
import { TextField, Grid, Typography, Select, MenuItem, InputLabel, Button, FormControl} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

class Form extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            firstname: '',
            lastname: '',
            birthday: '',
            status: '1'
        }
    }

    handleFirstnameChange = (event) => {
        this.setState({
            firstname: event.target.value
        })
    }
    hanfleLastnameChange = (event) => {
        this.setState({
            lastname: event.target.value
        })
    }
    handleBirthdayChange = (event) => {
        this.setState({
            birthday: event.target.value
        })
    }
    handleStatusChange = (event) => {
        this.setState({
            status: event.target.value
        })
    }

    async postData() {
        try{
            let result = await fetch('https://webhook.site/38082826-26c4-4c60-a58b-74ef8178eeb3', {
                method: 'post',
                mode: 'no-cors',
                headers: {
                    'Accept': 'aplication/json',
                    'Content-type': 'aplication/json',
                },
                body: JSON.stringify({
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    birthday: this.state.birthday,
                    status: this.state.status,
                })

            });

            console.log(result)

        } catch(e) {
            console.log(e)
        }
    }


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
                                        label = "First Name"
                                        color = "primary"
                                        fullWidth
                                        value = {this.state.firstname}
                                        onChange = {this.handleFirstnameChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={10} sm={5} md={5}>
                                    <TextField 
                                        label="Last Name"
                                        color="primary"
                                        fullWidth
                                        value = {this.state.lastname}
                                        onChange = {this.hanfleLastnameChange}
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
                                            value = {this.state.birthday}
                                            onChange = {this.handleBirthdayChange}
                                            required
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={10} sm={5} md={10} style= {{marginTop: "5%"}}>
                                    <FormControl fullWidth>
                                        <InputLabel id={"covid status"}>Covid Status</InputLabel>
                                        <Select
                                            color = "primary"
                                            labelId = "covid status"
                                            lable = "Covid Status"
                                            value = {this.state.status}
                                            onChange = {this.handleStatusChange}
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
                                    <Button variant="contained" color="primary" endIcon={<SendIcon/>} onClick={ () => this.postData() }>Submit</Button>
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