import React from 'react';
import './faceRecognition.css'

const FaceRecognition = ({imageUrl,boxes}) =>{
    // console.log('FaceRecognition',imageUrl);
    // console.log('FaceRecognition',boxes)
    let faceBoxes = (<div></div>)
    if(boxes.length>0)
    {
        faceBoxes = boxes.map(img=>{  
            return (<div 
                //key is required to make the dom elements unique incase we want to remove/update them later
                key={img.id}
                className='bounding-box' 
                style={{
                    top: img.top_row, 
                    right: img.right_col, 
                    bottom: img.bottom_row, 
                    left: img.left_col
                }}>
            </div>)
        })
    }
    return(
        <div className='center ma'>
            <div className='absolute mt2'>
                <img 
                    id='inputImage' 
                    src={imageUrl} 
                    alt='' 
                    width='500px' 
                    height='auto'>
                </img> 
                <section>
                {faceBoxes}
                </section>
            </div>
        </div>
    )

}

export default FaceRecognition;