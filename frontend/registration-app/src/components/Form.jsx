import React from 'react';
import {Button, Container} from '@material-ui/core';
import PersonDetails from './PersonDetails';
import {WebcamCapture} from "./Webcam";

class Form extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            step: 1,
            firstName: '',
            lastName: '',
            birthdate: '',
            healthStatus: '',
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

    // Handle Image change
    handleImageChange = (newImage) => {
        this.setState({image: newImage})
    }

    async postData() {
        try{
            let result = await fetch('https://webhook.site/24349262-5cfb-4e8c-a8da-d95846aecf09', {
                method: 'post',
                mode: 'no-cors',
                headers: {
                    'Accept': 'aplication/json',
                    'Content-type': 'aplication/json',
                },
                body: JSON.stringify(
                    {
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        birthdate: this.state.birthdate,
                        healthStatus: this.state.healthStatus,
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
        const { firstName, lastName, birthdate, healthStatus, image } = this.state;
        const values = { firstName, lastName, birthdate, healthStatus, image  }
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
                        <WebcamCapture 
                        nextStep={this.nextStep} 
                        prevStep={this.prevStep}
                        handleImageChange={this.handleImageChange}
                        defaultImage={this.state.image}
                        />
                        <Button onClick={ () => this.postData() }>Gosho</Button>
                    </div>
                    
                );
            case 3:
                return(
                    <h1>kf;kfgo;a</h1>
                );
            default:
        }
    }
}

export default Form;