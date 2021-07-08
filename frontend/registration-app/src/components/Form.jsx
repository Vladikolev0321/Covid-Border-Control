import React from 'react';
import {Button, Container} from '@material-ui/core';
import PersonDetails from './PersonDetails';
import {WebcamCapture} from "./Webcam";

class Form extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            step: 1,
            firstname: '',
            lastname: '',
            birthday: '',
            status: '1',
            image: ''
        }
    }

    //next step
    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    }

    //prev step
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    }

    // Hadle input change
    handleChange = input => e => {
        this.setState({[input]: e.target.value});
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
                body: JSON.stringify(
                    {
                        firstname: this.state.firstname,
                        lastname: this.state.lastname,
                        birthday: this.state.birthday,
                        status: this.state.status,
                        image: this.state.image
                    }
                )
            });
            console.log(result)
            window.location.reload();
        } catch(e) {
            console.log(e)
        }
    }
    render() {
        const { step } = this.state;
        const { firstname, lastname, birthday, status, image } = this.state;
        const values = { firstname, lastname, birthday, status, image }
        switch(step) {
            case 1:
                return(
                    <PersonDetails 
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                );
            case 2:
                return(
                    <div>
                        <Button onClick={ () => this.postData() }>Gosho</Button>
                        <Container disableGutters={true}>
                             <WebcamCapture />
                        </Container>
                    </div>
                );
            case 3:
                return(
                    <h1>kf;kfgo;a</h1>
                )
        }
    }
}

export default Form;