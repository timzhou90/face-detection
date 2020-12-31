import React, {useMemo} from 'react';
import './ImageLinkForm.css';
const ImageLinkForm = ({onInputChange, onButtonSubmit, faceNumber}) =>{
    
    const faceNumberDiv = useMemo(()=>{
        if(!faceNumber){
            return <div>No faces in the image</div>
        }else if(faceNumber == 0){
            return <div>No faces in the image</div>
        }else{
            return <div>There are {faceNumber} faces in the image</div>
        }
    },[faceNumber])
    return <div> 
            <p className='f3'>
                {'This image will be detect faces in your picture. Git it a try.'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='tex' onChange = {(e)=>onInputChange(e)}/>
                    <button
                        className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
                        onClick={onButtonSubmit}
                    >Detect</button>
                </div>
         
            </div>
            <p className='f4'> {faceNumberDiv}</p>  
            </div>
}

export default ImageLinkForm