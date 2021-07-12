import React from 'react';
import {WebcamCapture} from "./Webcam";
import {WebcamCaptureSubmit} from "./WebcamSubmit";
import axios from 'axios';

class Form extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            step: 1,
            image: '',
            alert: 0
        }
    }

    //next step
    nextStep = () => {

        if( this.state.step === 1 || (this.state.step === 2 && this.state.image !== '')) {
            const { step } = this.state;
            this.setState({
                step: step + 1,
                alert: 0
            });
        }
        else{
            if(this.state.step === 1) {
                this.setState({
                    alert: 1
                })
            }
            if(this.state.step === 2) {
                this.setState({
                    alert: 2
                })
            }
           
        }

    }

    //prev step
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1,
            image: '',
        });
    }

    // Handle input change
    handleChange = input => e => {
        this.setState({[input]: e.target.value});
    }

    // Handle Image change
    handleImageChange = (newImage) => {
        this.setState({image: newImage})
    }

    async postData() {
        const content = {
            image: this.state.image
        }
        const response = await axios.post('http://3.140.105.132:8081/person/create', content)
        console.log(response)
    }
    render() {
        const { step } = this.state;
        const { image, alert } = this.state;
        const values = { image, alert }
        switch(step) {
            case 1:
                return(
                    <WebcamCapture 
                    nextStep={this.nextStep} 
                    prevStep={this.prevStep}
                    handleImageChange={this.handleImageChange}
                    defaultImage={this.state.image}
                    alert={this.state.alert}
                    />
                );
            case 2:
                return(
                    <WebcamCaptureSubmit 
                    postData={this.postData}
                    prevStep={this.prevStep}
                    handleImageChange={this.handleImageChange}
                    defaultImage={this.state.image}
                    alert={this.state.alert}
                    />
                );
            default:
        }
    }
}

export default Form;