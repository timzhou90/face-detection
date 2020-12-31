import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css';
import brain from './brain.png';

const Logo = () =>{
    return <div className = "ma4 mt0">
        <Tilt className="Tilt br-2 shadow-2" options={{ max : 155 }} style={{ height: 150, width: 150 }} >
        <div className="Tilt-inner pa3"> <img style={{paddingTop:'5px'}} src = {brain} alt = "face scan"/> </div>
        </Tilt>
    </div>
}

export default Logo