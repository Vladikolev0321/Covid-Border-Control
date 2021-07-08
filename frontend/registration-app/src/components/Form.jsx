import React from 'react';
import { Button } from '@material-ui/core';
import PersonDetails from './PersonDetails';
import {WebcamCapture} from './Webcam';


class Form extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            step: 1,
            firstName: '',
            lastName: '',
            birthdate: '2021-07-08',
            healthStatus: 'NONE',
            image : 'data:image/webp;base64,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'
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
            let result = await fetch('http://3.138.109.41:8081/person/create', {
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
                        <Button onClick={ () => this.postData() }>Gosho</Button>
                        {/* <WebcamCapture /> */}
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