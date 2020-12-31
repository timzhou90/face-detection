import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {

    
   
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputimage' alt='' src={imageUrl} width='500px' heigh='auto'/>
        {
            box && box.length>0 && box.map((box,index) =>
            (<div className='bounding-box'
                key={box.topRow} 
                style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}>
            </div>))
        }
        
      </div>
    </div>
  );
}

export default FaceRecognition;