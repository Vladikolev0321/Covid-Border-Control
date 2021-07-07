import React from 'react';
import ReactDOM from 'react-dom';

import Bar from './components/Bar';
import { WebcamCapture } from './components/Webcam';

ReactDOM.render(
  <React.StrictMode>
    <>
    <Bar />
    <WebcamCapture />
    </>
  </React.StrictMode>,
  document.getElementById('root')
);
