import React from 'react';
import './imageLinkForm.css'

const ImageLinkForm = ({onInputChange,onDetectSubmit}) =>{
    return (
        <div>
            <p className='f4 ma1'>
                {'This smart brain will detect faces in your images, try it!'}
            </p>
            <div>
            <div className='pa3 br3 w-60 form shadow-5 center'>
                <input 
                    className='f5 pa2 w-80 center' 
                    type='text' 
                    placeholder='enter image url'
                    onChange={onInputChange} >
                </input>
                <button 
                    className='f5 w-20 grow link ph3 pv2 dib white bg-light-purple' 
                    onClick={onDetectSubmit} 
                >Detect</button>
            </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;