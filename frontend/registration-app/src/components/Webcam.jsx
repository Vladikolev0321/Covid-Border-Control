import React from 'react'
import Webcam from 'react-webcam';
import { useRef } from "react";

function Cam() {
    const webRef=useRef(null);

    const takePhoto = () => {
        console.log(webRef.current.getScreenshot());
    };

    return <div className="Cam">
        React webcam
        <Webcam ref={ webRef }/>
        <button onClick={ () => {
            takePhoto();
        }
        }>
            Take a photo
        </button>
        <br />

    </div>
}

export default Cam;